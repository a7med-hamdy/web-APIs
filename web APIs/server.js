// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;//declare the port

const server = app.listen(port, listening);
 function listening(){
    // message will appear in the console to ensure the server is working
    console.log(`running on localhost: ${port}`);
  };
// a GET route that returns the projectData object
app.get("/all", (req, res) => {res.send(projectData);});
//post route to add incoming data to projectData
app.post('/weather', updateWeather);
function updateWeather (req,res){
    temp = req.body;
    try{
      projectData.temprature = temp.main.temp;
      projectData.temprature = projectData.temprature.toFixed(1);//remove unnecessary fraction
      projectData.date = temp.date;
      projectData.input = temp.userInput;
      console.log(projectData);
    }
    catch(error){
      console.log(projectData);
      return;
    }
};
