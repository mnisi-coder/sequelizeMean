require("dotenv").config();

const sequelizeConnection = require("../dbConnect/dbconnect");

// GET THE USER MODEL
const todoModel = require("../model/todolist.model");

module.exports.todoController = {
  // INSERT A TASK
  todo: async (req, res) => {
    try {
      // CHECK IF THERE IS AN INPUT ERROR, ELSE CONTINUE WITH THE CONDE BLOCK
      if (req.authErrMessage) throw new Error(req.authErrMessage);

      // CONNECT TO THE DATABASE
      await sequelizeConnection.authenticate();

      // SYNC THE USER MODEL TO THE USERS TABLE
      todoModel.sync({ alter: true });

      // CHECK IF PHONE NUMBER IS ALREADY REGISTERED
      const findTask = await todoModel.findAll({
        where: { task: req.body.task },
        limit: 1,
      });

      // IF A TASK IS RETURNED, THROW AN ERROR, ELSE CONTINUE WITH CODE BLOCK
      if (findTask.length != 0)
        throw new Error("Mos You Have this task here??");

      

      // SAVE THE TODO IN THE DATABASE
      const newTask = await todoModel.create(req.body);
      console.log("new Task", newTask.dataValues);
      
      // insert using straight queries 
     // const newTask = await sequelizeConnection.query(`INSERT INTO todolist(task_id, task,  dateOfTask, completed) VALUES('', ${req.bodytask},  ${req.body.dateOfTask}, ${req.body.completed} );`);

     //this is the response using 
      res.status(200).json({ error: null, success: true, task: newTask.dataValues, message:"Task inserted"});
      
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message, success: false, task: null, message:"error found" });
    }
  },

  todoList: async (req, res) => {

    try{

    // CONNECT TO THE DATABASE
      await sequelizeConnection.authenticate();

      // SYNC THE USER MODEL TO THE USERS TABLE
      todoModel.sync({ alter: true });

      //query database using 
       const lis = await todoModel.findAll({});
    
  
      //query from Todo List using queryT
    //   const lis = await sequelizeConnection.query(`select * FROM Todo`);
  
      if(!lis[0]){
        throw new Error('Todo List not Found');
      }
  
      res.status(200).json({ todoList: lis, message: "successful query" });

    } catch(error) {
      console.log(error.message)
        res.status(400).json({ error: error.message, todoList: null })
    }
 
  },
  
  updateList: async (req, res)=>
  {

    // CONNECT TO THE DATABASE
    await sequelizeConnection.authenticate();
     // SYNC THE USER MODEL TO THE USERS TABLE
     todoModel.sync({ alter: true });

    try{

        const result = await todoModel.update(
            { 
              task: req.body.task,
              dateOfTask: req.body.dateOfTask , 
              completed: req.body.completed
            },
            { where: { task_id : req.params.id } }
          )

        if(result != 0)
        {
            res.status(200).json({ todoList: result, message: "successful Updated" });
          
        }else{
                throw new Error("Can't update Task");
            }


    }catch(error){
        res.status(400).json({ error: error.message, todoList: null })
    }
  }
}