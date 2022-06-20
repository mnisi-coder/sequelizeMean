const express = require('express')

// CREATE AN EXPRESS ROUTER TO GET THE AUTH ROUTES
const router = express.Router()

// GET THE TODO MIDDLEWARE
const todoMiddleware = require('../middleware/todo.middleware');

// GET THE TODO CONTROLLER
const todoControler = require('../controller/todo.controller');


// ADD TASK REQUEST HANDLE
router.post('/addTodo',todoMiddleware.addtodo, todoControler.todoController.todo);

//Get Tasks
router.get('/allTodo',todoControler.todoController.todoList)

//Update task
router.patch('/updateTask/:id', todoControler.todoController.updateList)


module.exports = router