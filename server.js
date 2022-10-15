var express = require("express");
var path = require("path");

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
    res.send("<h1>Employees Page</h1>");
});

app.get("/managers", (req, res)=>{
    res.send("<h1>Managers Page</h1>");
});

app.listen(port, onStart);