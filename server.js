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
    dat.getAllEmployees().then((data)=>{
        res.json(data);
    }).catch((message)=>{
        res.json({"Message": message});
    });
});

app.get("/managers", (req, res)=>{
    dat.getManagers().then((data)=>{
        res.json(data);
    }).catch((message)=>{
        res.json({"Message": message});
    });
});

app.get("/departments", (req, res)=>{
    dat.getDepartments().then((data)=>{
        res.json(data);
    }).catch((message)=>{
        res.json({"Message": message});
    });
});

app.use((req, res)=>{
    res.status(404).send("<h1 style='font-family:verdana;'><b>Error 404</b>: Page not found</h1>");
});

dat.initialize().then(()=>{
    app.listen(port, onStart);
}).catch((message)=>{
    console.log(message);
});