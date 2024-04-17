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
    const { isComplete } = req.body; // Get isComplete from the request body
    const { id } = req.params;
    todoModel.findByIdAndUpdate({_id: id}, {isComplete}, {new: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

//Delete Todo
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id: id})
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})

//Get route for editing 
app.get('/get/:id', (req, res) => {
    const { id } = req.params;
    todoModel.findById(id)
      .then(task => {
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
      })
      .catch(err => {
        console.error("Error fetching task:", err);
        res.status(500).json({ message: "Error fetching task", error: err });
      });
  });

//Edit Todo
app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    console.log("Request body:", req.body); // This will show what data is actually coming in
    console.log("Backend received ID:", id);  // Ensure 'id' is logged correctly

    const { task, description, category, start, end, dueDate, isHighPriority, isComplete } = req.body;

    if (!task) {
        return res.status(400).json({ error: "Task field is required" });
    }

    todoModel.findByIdAndUpdate({_id: id}, {
        task,
        description,
        start,
        end,
        dueDate,
        category,
        isComplete,
        isHighPriority,
    }, { new: true })
    .then(result => {
        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(result);
    })
    .catch(err => {
        console.error("Update error:", err);
        res.status(500).json(err);
    });
});


//---------------------PORT DEFINITION & SERVER SET UP------------------
const PORT = 7000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});