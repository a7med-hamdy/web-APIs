/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const key = '&appid=55a82a6f54eb1160dc03a74b8f8880d4&units=metric';
let zipcode;
let feelings;
let x = 0;//flag to know if everything goes alright
//event listener for click on the button
document.getElementById('generate').addEventListener('click', clicked);

//callback function
function clicked()
{
  window.scrollTo(0,document.body.scrollHeight);
  x = 0;
  zipcode = document.getElementById('zip').value;
  feelings = document.getElementById('feelings').value;
  let d = new Date();
  let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
  fetchData(baseURL+zipcode+key)
  .then(function(data)
  {
    if(data.cod === "400")//detect bad requests
    {
      x = 1;
      return;
    }
    data.date = newDate;
    data.userInput = feelings;
    postData('/weather', data);
  })
  .then(function(){
    if(x === 1)
    {
      alert("invalid zip code");
      document.getElementById('date').innerHTML = 'Error enter valid zip code';
      document.getElementById('temp').innerHTML = '';
      document.getElementById('content').innerHTML = '';
      return;
    }
    UpdateUI();
  })

}
//fetch data from the api
const fetchData = async (url) =>{
  try{
    const res = await fetch(url);

    const data = await res.json();
    return data;
  }
  catch(error)
  {
    console.log("Invalid Zip code.")
  }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

    try {
      const temp = await response.json();
      return temp;
    }
    catch(error){
      console.log("error");
    }
};

const UpdateUI = async () =>{
  const request = await fetch('/all');
  try{
    const retrieved = await request.json();
     document.getElementById('date').innerHTML = `the date now : ${retrieved.date}`;
     document.getElementById('temp').innerHTML = `temprature now : ${retrieved.temprature}`;
     document.getElementById('content').innerHTML = `your input : ${retrieved.input}`;
  }
  catch(error)
  {
    console.log("error updating UI");
  }
}
