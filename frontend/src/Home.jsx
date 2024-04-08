import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";
import logo from './assets/doitLogo5.png'

function Home () {

    const [todos, setTodos] = useState ([])

    useEffect(() => {
        axios.get('http://localhost:7000/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    //Handles loading changes, but is not EDITOR of tasks
    const handleEdit=(id) =>{
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


    return(
        <div className='home'>
            <img src={logo} alt="Logo" />;
            <h2>To do List</h2>
            <Create />
            {
                todos.length ===0 ?
                <div><h2>No record</h2></div>
                :
                todos.map(todo=>(
                    <div className='task'>
                        <div className='checkbox' onClick={() =>handleEdit(todo._id)}>
                            {/* Fill circle if todo is done */}
                            {todo.done ? 
                            <BsFillCheckCircleFill className='icon'/>
                            :
                            <BsCircleFill className='icon'/>
                            }
                            
                            {/* Strikethrough styling if todo is done */}
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div> 
                            <div>
                                <p className='description'>{todo.description}</p></div>
                                <p>Category: {todo.category}</p>
                            {/* Render exclamation mark if high priority */}
                            {todo.highPriority && (
                                <span className="priority-indicator">!</span>
                            )}
                            {/* <div>
                                <p>Start Time:{todo.start}  </p>
                                <p>End Time:{todo.end}  </p>
                                <p>Due:{todo.dueDate}  </p>
                            </div> */}
                            
                       
                        <div>
                            <span><BsFillTrashFill className='icon'
                                onClick={() => handleDelete(todo._id)} /></span> 
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home