const express=require("express");
const https=require("https");
const bodyParser=require("body-parser")

const app=express();
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/",(req,res)=>{
    
    res.sendFile(__dirname+'/index.html')
    
})
app.post("/",(req,res)=>{
    var cityname=req.body.city;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=7dc028acab40d9d102a2ca75d2043458&units=metric";
    
    https.get(url,function(response){
        // console.log(response)
        response.on("data",function(data){
        const weather_data=JSON.parse(data)
        const temp=weather_data.main.temp
        const icon_id=weather_data.weather[0].icon
        const iconUrl=" https://openweathermap.org/img/wn/"+icon_id+"@2x.png";
        res.write("<h1>temperature is  "+temp+" Degree Celcius </h1>")
        res.write("<img src=" +iconUrl+ ">")
        res.send()
        })
    })
})


app.listen(3000,function(){
    console.log("live on port 3000");
})