//this is use to connect to your database
const sequelizeConnection = require('../dbConnect/dbconnect');
// module for sequlize
const { Sequelize } = require('sequelize');

const { DataTypes } = Sequelize // GETS THE DataTypes Object, used to set data types of fields

const TodoList = sequelizeConnection.define('todolist',{
    task_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    task:{
        type:DataTypes.STRING, //if you thing your text will be too long just use TEXT
        allowNull:false
    },
    dateoftask:{
        type:DataTypes.STRING,
        allowNull:true
    },
    completed:{
        type:DataTypes.STRING,
        allowNull:true
    }
},
{
    timestamps: false,
    freezeTableName: true
  });

module.exports = TodoList;