/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic 
Policy. No part * of this assignment has been copied manually or electronically from any 
other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Tom Bragagnolo Student ID: 139157218 Date: October 31, 2022
*
* Your app’s URL (from Cyclic) : https://real-erin-lizard-cuff.cyclic.app
*
*************************************************************************/

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

app.get("/employees/add", (req, res)=>{
    //Code here
});

app.get("/images/add", (req, res)=>{
    //Code here
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
    res.status(404).send("<h1 style='font-family:verdana;'>Error 404: Page not found</h1>");
});

dat.initialize().then(()=>{
    app.listen(port, onStart);
}).catch((message)=>{
    console.log(message);
});