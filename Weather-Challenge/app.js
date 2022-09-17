const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    var city = req.body.city;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84decf279087deee12fbd90a39909eb2&units=metric`;
    
    https.get(url, (httpRes) => {
        httpRes.on("data", (data) => {
            if (httpRes.statusCode === 200) {
                var weatherData = JSON.parse(data);
                var temp = weatherData.main.temp;
                var description = weatherData.weather[0].description;
                var iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    
                res.write(`<h1>${city} temperature is ${temp} degrees Celcius.</h1>`);
                res.write(`<h2>The weather is currently ${description}.</h2>`);
                res.write(`<img src="${iconUrl}" alt="Weather icon" />`);
    
                res.send();
            }
            else {
                var error = JSON.parse(data);
                
                res.write(`<h1> Error Code: ${error.cod}.</h1>`);
                res.write(`<h2>Error Message: ${error.message}.</h2>`);

                res.send();
            }
        });
    });
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})