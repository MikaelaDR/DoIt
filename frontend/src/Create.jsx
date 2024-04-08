import React, {useState} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function Create () {
    const [task, setTask] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dueDate, setDueDate] = useState()
    const [highPriority, setHighPriority] = useState(false); // New state for high priority checkbox

    //Passes task data to server side app
    const handleAdd = () =>{
        axios.post('http://localhost:7000/add', {task:task, description:description, category:category, isHighPriority: highPriority})
        .then(result=> {
            location.reload()
        })
        .catch(err=> console.log(err))
    }

    return(
        <div className='create_form'>
            <input type="text" placeholder='Enter Task' onChange={(e)=> setTask(e.target.value)}/>
            <DatePicker placeholderText="Select Due Date" selected={dueDate} onChange={(date) => setDueDate(date)} />

            <button className="create_form" type="buton" onClick={handleAdd}>Add</button>

            <div className="form_category">
                <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option disable selected value> -- Choose Category --</option>
                    <option value = "">None</option>
                    <option value = "work">Work</option>
                    <option value = "personal">Personal</option>
                    <option value = "school">School</option>
                    <option value = "home">Home</option>
                </select> 
                
            </div>

            {/* Checkbox for high priority */}
            <div>
                <input
                type="checkbox"
                checked={highPriority}
                onChange={(e) => setHighPriority(e.target.checked)}
                />
                <label>High Priority</label>
            </div>

            <div>
                <DatePicker placeholderText="Select Start Date" selected={startDate} onChange={(date) => setStartDate(date)} />
                <DatePicker placeholderText="Select End Date"selected={endDate} onChange={(date) => setEndDate(date)} />

            </div>
            <div>
             <input type="text" placeholder='Enter Description' onChange={(e)=> setDescription(e.target.value)}/>

            </div>
            
        </div>
        
    )
}

export default Create