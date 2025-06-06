const express = require("express");

const bodyParser = require("body-parser");


//make get request to external server 
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/weather.html");

});

app.post("/" , function(req , res){
  console.log (req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "bf897d8d6d54aa0321f4afc4d9d4da21";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="  + query+  "&appid="  +apiKey+  "&units=" + unit ;

https.get(url , function (response){
    console.log(response.statusCode);

    response.on("data" , function(data){
      const weatherData =  JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


     res.write("<p>The weather is currently "   + weatherDescription +  "</p>");
     res.write("<h1>The temperature in "  +  query +   " is "   + temp +   " degree  Celcius "  + "</h1>");
     res.write("<img src= " + imageUrl + ">");
     res.send();
   

    });
})
})

app.listen(3000 , function(){
    console.log("Server running on port 3000");
})
