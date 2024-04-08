const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        start: {
            type: Date,
            //default: Date.now(),
            required: false,
        }, 
        end: {
            type: Date,
            required: false,
        },
        dueDate:{
            type: Date,
            required: false,
        },
        category: {
            type: String,
            default: 'none',
            required: true,
        }, 
        done:{
            type: Boolean,
            default: false,
        },
        isHighPriority:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const todoModel = mongoose.model("todos", todoSchema); //todos = name of our database, todoSchema is what we're modeling
module.exports = todoModel
