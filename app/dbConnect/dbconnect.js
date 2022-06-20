require('dotenv').config()
const { Sequelize } = require('sequelize')

//this is how you connect to database using 
// const user = 'postgres'
// const host = 'localhost'
// const database = 'Todo'
// const password = '#mnisikamatla'
// const port = process.env('port')

// const sequelizeConnection = new Sequelize(database, user, password, {
//     host,
//     port,
//     dialect: 'postgres',
//     logging: false
//   })

const sequelizeConnection = new Sequelize("postgres://fsvdjgdzujocfo:3e3f98aef21016c7127c9dc78e01bfcc143c0cb46469b3d6ed51b2343fb2329f@ec2-52-72-99-110.compute-1.amazonaws.com:5432/de161uql6dge0i", {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
} );

//Test if the connection
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// try {

module.exports = sequelizeConnection