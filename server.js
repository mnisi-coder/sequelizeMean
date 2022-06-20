


//--------------------------------------modules-----------------------------------------------------//
//Express Module
const express = require('express');
const app = express();
//cors Module
const cors = require('cors')
//Body parser
const bodyparse = require('body-parser')
// ---------------------------------End Of Module file-----------------------------------------------//


// -----------------------------------END external calls------------------------------------------//
const dbConnect = require("./app/dbConnect/dbconnect");
// -----------------------------------END external calls------------------------------------------//

//-------------------------------------Declaration of any variable-----------------------------------//
// Get port from environment and store in Express.
const port = process.env.PORT || 4318;


//---------------------------------End of Declaration of any variable----------------------------------//


//----------------------------------------------APP Use------------------------------------------------//

// CORS MIDDLEWARE MIDDLEWARE
app.use( cors({origin: true, credentials: true}) )

// SERVE JSON REQUESTS
app.use( express.json() )

// SERVE POST FORM REQUESTS
app.use( express.urlencoded({ extended: false }) )

//-----------------------------------------------END APP Use---------------------------------------------//


// -------------------------------------------------Routes-----------------------------------------------//

// ROUTES
app.use('/todo', require('./app/routers/todo.route'))
// -------------------------------------------End Of Routes-----------------------------------------------//


//For any unhadled errors 
process.on('uncaughtException', (error)  => {
    console.log('Alert! ERROR : ',  error);
    process.exit(1); // Exit your app 
 })

 process.on('unhandledRejection', (error, promise)  => {
    console.log('Alert! ERROR : ',  error);
    process.exit(1); // Exit your app 
 })


 // Listen on provided port, on all network interfaces.
app.listen(port, () => console.log(`API running on localhost:${port}`));