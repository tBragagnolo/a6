var express = require("express");
var path = require("path");
var dat = require('./data-service');

app = express();
var port = process.env.PORT || 8080;

function onStart(){
    console.log("Express http server listening on port", port);
}

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employees", (req, res)=>{
    res.json("<h1>Employees Page</h1>");
});

app.get("/managers", (req, res)=>{
    res.send("<h1>Managers Page</h1>");
});

app.use((req, res)=>{
    res.status(404).send("<h1>Error 404: Page not found</h1>");
});

dat.initialize().then(()=>{
    app.listen(port, onStart);
}).catch((message)=>{
    console.log(message);
});