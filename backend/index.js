const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const todoModel = require('./Models/todoModel')


const app = express()

//Middleware for handling CORS policy
app.use(cors())

//Middleware to parsing request body
app.use(express.json())

//-----------------Connect to Database MongoDB---------------------

const mongoDbUrl = 'mongodb://127.0.0.1:27017/test' //127.0.0.1 is our own IP address

mongoose.connect(mongoDbUrl)


//-------------------------Routes -----------------------------------

//Display Todos
app.get('/get', (req, res) =>{
    todoModel.find() //gets all the data
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})

//Add Todo
app.post('/add', (req, res) =>{
    const { task, description, category, start, end, dueDate, isHighPriority, done } = req.body; //Request body destructured
   
    todoModel.create({
        task: task,
        description: description,
        start: start,
        end: end,
        dueDate: dueDate,
        category: category,
        done: done,
        isHighPriority: isHighPriority,

    }).then(result => {
        // Fetch all tasks including the newly added one
        return todoModel.find();
    })
    .then(tasks => {
        // Modify result to include high priority flag
        const todos = tasks.map(todo => ({
            ...todo._doc,
            highPriority: todo.isHighPriority ? true : false // Add high priority indicator
        }));
        res.json(todos);
    })
    .catch(err => res.json(err));
});

//Edit Todo
app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id}, {done:true})
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})

//Delete Todo
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id: id})
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})



//---------------------PORT DEFINITION & SERVER SET UP------------------
const PORT = 7000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});