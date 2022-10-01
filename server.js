var express = require("express");
app = express();
var port = process.env.PORT || 8080;

app.get("/", (req, res) =>{
    res.send("./views/home.html");
});

app.listen(port);
console.log("Express http server listening on port", port);