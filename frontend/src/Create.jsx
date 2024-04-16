import React, {useState} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker' //to have pop-up calendar
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

function Create () {
    const [task, setTask] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [dueDate, setDueDate] = useState(new Date())
    const [isHighPriority, setHighPriority] = useState(false); // New state for high priority checkbox

    //Passes task data to server side of app
    const handleAdd = () =>{
        
        axios.post('http://localhost:7000/add', 
        {task:task, description:description, category:category, dueDate:dueDate, start: start, end: end,  isHighPriority: isHighPriority,})
        .then(result=> {
            location.reload()
        })
        .catch(err=> console.log(err))
    }

    return(
        <div>

            {/* Task Title */}
            <div style={{display:'flex', justifyContent:'center'}}>
                <input
                style={{
                    padding:'10px',
                    width:'100%',
                    border:'2px solid #124E50',
                    borderRadius: '5px',
                    outline: 'none',
                    fontSize: 'larger',
                    fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
                }}
                    type="text" 
                    placeholder='Enter Task' 
                    onChange={(e)=> setTask(e.target.value)}/>
            </div>

            {/* Description */}
            <div style={{
                display:'flex', 
                justifyContent:'center',
                
                }}>
                <textarea 
                    style={{width:'100%',
                        padding:'10px',
                        border:'2px solid #124E50',
                        borderRadius: '5px',
                        outline: 'none',
                        fontSize: 'larger',
                        fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
                    }}
                    type="text" 
                    placeholder='Enter Description' 
                    onChange={(e)=> setDescription(e.target.value)}
                    rows={5}
                    
                />
            </div>

            {/* Due date Picker */}
            <div className='create_form' style={{display:'flex', justifyContent:'center'}}>
            <DatePicker 
                
                placeholderText="Select Due Date" 
                selected={dueDate} 
                onChange={(date) => setDueDate(date)}
                showIcon
                isClearable
                closeOnScroll={true}
            />
            </div>

            {/* Category Selection */}
            <div style={{display:'flex', justifyContent:'center'}}>
                <select 
                    style ={{ 
                        width:'100%',
                        padding:'10px',
                        border:'2px solid #124E50',
                        borderRadius: '5px',
                        outline: 'none',
                        fontSize: 'larger',
                        fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
                        backgroundColor:'#ffffff'
                    }} 
                    value={category} 
                    onChange={(e)=> setCategory(e.target.value
                )}>
                    <option disable selected value> -- Choose Category --</option>
                    <option value = "">None</option>
                    <option value = "work">Work</option>
                    <option value = "personal">Personal</option>
                    <option value = "school">School</option>
                    <option value = "home">Home</option>
                </select> 
                
            </div>

            
            {/* Time Pickers for Start time and End time */}
            {/* <div >
                <TimePicker
                    style={{backgroundColor:'black'}}
                    value={start}
                    onChange={(time) => setStart(time)}
                    //format='hh:mm a'
                />
                
                <TimePicker
                    style={{padding:'30px'}}
                    value={end}
                    onChange={(time) => setEnd(time)}
                />
            </div> */}

            {/* Checkbox for high priority */}
            <div style={{
                display:'flex', 
                justifyContent:'center',
                marginTop:'20px'
            }}>
                <input
                type="checkbox"
                checked={isHighPriority}
                onChange={(e) => setHighPriority(e.target.checked)}
                />

                <label
                    style={{
                        padding:'10px',
                        borderRadius: '5px',
                        // outline: 'none',
                        fontSize: 'larger',
                        fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
                    }}
                >High Priority</label>
            </div>

            {/* Add Button */}
            <div className='create_form' style={{display:'flex', justifyContent:'center', marginTop: '40px', marginBottom:'50px'}}>
                <button style={{width:'200px', fontFamily: 'Franklin Gothic Medium'}} type="buton" onClick={handleAdd}>Add</button>
            </div>

        </div>
        
    )
}

export default Create

