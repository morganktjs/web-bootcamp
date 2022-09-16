const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    res.send(`Result is ${Number(req.body.n1) + Number(req.body.n2)}`);
});

app.get("/bmiCalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", (req, res) => {
    res.send(`Your BMI is ${Number(req.body.weight) / (Number(req.body.height) * Number(req.body.height))}`);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})