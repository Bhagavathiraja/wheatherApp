const express = require('express');

const bodyParser = require('body-parser');

const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const port = 3000;

app.get('/',function(req,res){

    res.sendFile(__dirname+'/index.html')  
            
        })

app.post('/',function(req,res){
    console.log(req.body.cityName);

const city = req.body.cityName;
const key = '354fb347c3d922897ac327117029af05';
const units = 'metric';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${key}&q=${city}&units=${units}`

https.get(url , function(response){
    // console.log(response);
    response.on('data', function(data){
        console.log(data);
        const wheatherData = JSON.parse(data)
        console.log(wheatherData); 
        const temp = wheatherData.main.temp; 
        const description = wheatherData.weather[0].description;
        const icon = wheatherData.weather[0].icon;
        const imgurl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
        res.write('<h1>TODAY WEATHER</h1>');
        res.write(`<img src="${imgurl}">`);
        res.write(`<h1> wheather temp ${temp}</h1>`);
        res.write("<p> descripiton is " + description+'</p>');
        res.send()
    })
})

})
   



app.listen(port,function(){
    console.log(`server started on port ${port}`)
})