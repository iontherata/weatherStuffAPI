const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function (req, res) {
  const city = req.body.cityName;
  const apiKey = "293722cfed9ccd7efb06d7b7ec7f0eeb";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca&appid=293722cfed9ccd7efb06d7b7ec7f0eeb&units=metric",
    function (response) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.feels_like;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        res.write("<p>The weather is currently " + description + "</p>");
      
        res.write(`<h3>The temperature in ${city} is ${temp} degrees Celcius</h3>`)
        res.write(`<img src=${imgURL}>`);
        // res.write("<img src=" + imgURL + ">")
        res.send();
      });
    }
  );
});

app.listen(3000, function () {
  console.log("Server is UP");
});
