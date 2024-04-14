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
    const { task, description, category, start, end, dueDate, isHighPriority, isComplete } = req.body; //Request body destructured
   
    todoModel.create({
        task: task,
        description: description,
        start: start,
        end: end,
        dueDate: dueDate,
        category: category,
        isComplete: isComplete,
        isHighPriority: isHighPriority,

    }).then(result => {
        // Fetch all tasks including the newly added one
        return todoModel.find();
    })
    .then(tasks => {
        // Modify result to include high priority flag
        const todos = tasks.map(todo => ({
            ...todo._doc,
            isHighPriority: todo.isHighPriority ? true : false // Add high priority indicator
        }));
        res.json(todos);
    })
    .catch(err => res.json(err));
});

//Update Todo As Complete
app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id}, {isComplete:true})
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

//Edit Todo
app.put('/edit/:id', (req, res) =>{
    try {
        if(
            request.body.task ||
            request.body.description ||
            request.body.category ||
            request.body.start ||
            request.body.end ||
            request.body.dueDate ||
            request.body.isHighPriority
        ){
            return res.status(400).send({
                message: 'Send all required fields: task, description, category, dueDate...'
            });
        }

        const {id} = req.params;

        const result = todoModel.findByIdAndUpdate({_id: id}, request.body)
        
        if(!result){
            return response.status(400).send({
                message: 'Book not found',
            });
        }
    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }

})



//---------------------PORT DEFINITION & SERVER SET UP------------------
const PORT = 7000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});