import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import logo from './assets/doitLogo5.png'
import moment from 'moment'; //for time format
import { Link } from 'react-router-dom'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    WhatsappShareButton,

    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    PinterestIcon,
    WhatsappIcon

} from "react-share";

function Home () {

    const [todos, setTodos] = useState ([])
    const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const [isComplete, setIsComplete] = useState(false)
    const currentPageUrl = 'http://localhost:5173/';

    useEffect(() => {
        axios.get('http://localhost:7000/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    //Handles loading changes, but is not EDITOR of tasks
    const handleUpdate=(id) =>{
        
        axios.put('http://localhost:7000/update/' +id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:7000/delete/' +id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleEdit = () =>{
            axios
              .put('http://localhost:7000/edit/' +id, {task:task, description:description, category:category, dueDate:dueDate, start: start, end: end,  isHighPriority: isHighPriority})
              .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    }


    // const capitalize=(str)=>{
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    //     }


    return(
        <div className='home'>

            {/* Share Icons */}
            <div style={{backgroundColor:'#FFF1EB', width:'100%', display:"flex", justifyContent:'flex-end'}}>
                <div style={{padding:'10px'}}>
                    <EmailShareButton url={currentPageUrl}>
                        <EmailIcon round={true} size={55}/>
                    </EmailShareButton>
                </div>

                <div style={{padding:'5px'}}>
                <WhatsappShareButton url={currentPageUrl}>
                    <WhatsappIcon round={true} size={55}/>
                </WhatsappShareButton>
                </div>

                <div style={{padding:'5px'}}>
                <FacebookShareButton url={currentPageUrl}>
                    <FacebookIcon round={true} size={55}/>
                </FacebookShareButton>
                </div>

                <div style={{padding:'5px'}}>
                <PinterestShareButton url={currentPageUrl}>
                    <PinterestIcon round={true} size={55}/>
                </PinterestShareButton>
                </div>

                <div style={{padding:'5px'}}>
                <LinkedinShareButton url={currentPageUrl}>
                    <LinkedinIcon round={true} size={55}/>
                </LinkedinShareButton>
                </div>

                <div style={{padding:'5px'}}>
                <TwitterShareButton url={currentPageUrl}>
                    <TwitterIcon round={true} size={55}/>
                </TwitterShareButton>
                </div>


            </div>

            <img src={logo} alt="Logo" />;
            <h2>To do List</h2>
            <Create />
            {
                todos.length ===0 ?
                <div><h2>No record</h2></div>
                :
                todos.map(todo=>(
                    <div className='task'>

                        
                        <div className='checkbox' style={{justifyContent:'space-between'}}>
                            <div className='checkbox' style={{}}>
                            {/* Fill circle if todo is done
                            {todo.isComplete? 
                            <BsFillCheckCircleFill className='icon'/>
                            :
                            <BsCircleFill className='icon'/>
                            } */}


                            {/* IsComplete Checkbox */}
                            <div style={{
                                display:'flex', 
                                justifyContent:'center',
                                marginRight: '10px'
                            }}>
                                <input
                                type="checkbox"
                                checked={todo.isComplete}
                                //onClick={handleIsComplete}
                                onChange={e => {
                                    setIsComplete(!isComplete)
                                    {handleUpdate(todo._id)}

                                
                                }}
                                />

                                {/* Render exclamation mark if high priority */}
                                 {todo.isHighPriority && (
                                <span className="priority-indicator" style={{fontSize:30}}>!</span>
                            )}
                            </div>



                                {/* Task - Strikethrough + grey out if isComplete:True */}
                                <p className={todo.isComplete ? "line_through" : ""} style={{textTransform:'capitalize', color: todo.isComplete ? 'grey' :'white' }}
                                >{todo.task}</p>
                            </div>

                            {/* Edit and Delete Icons */}
                            <div style={{display:'flex', justifyContent:'flex-end'}}> 
                                <Link style={{color:'white'}} to="/edit/id:">
                                <span><FaEdit className='icon'
                                    onClick={() => handleEdit(todo._id)} /></span>
                                </Link>
                                <span style={{color:'white'}}><BsFillTrashFill className='icon'
                                    onClick={() => handleDelete(todo._id)} /></span> 
                            </div>
                        </div> 

                        
                        <div>
                            {/* Description */}
                            <div><p style={{color:'#1E8285', textShadow:'2px 2px #FFF1EB', fontSize:20}}>Description</p></div>
                            <p>{(todo.description)}</p></div>
                            
                            {/* Category */}
                            <div><p style={{color:'#1E8285', textShadow:'2px 2px #FFF1EB', fontSize:20}}>Category</p></div>
                            <p style={{textTransform:'capitalize'}}> {todo.category}</p>

                            {/* Due Date */}
                            <div><p style={{color:'#1E8285', textShadow:'2px 2px #FFF1EB', fontSize:20}}>Due Date</p></div>
                            
                        <div>

                        <p>{moment().format('MMM Do YYYY')}</p>
                            {/* <p>Start Time: 
                                {todo.end}  
                            </p> */}
                            
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default Home