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

app.listen(port, onStart);