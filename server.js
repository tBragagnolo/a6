/*************************************************************************
* BTI325– Assignment 3
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
var multer = require("multer");
var fs = require('fs');
var dat = require('./data-service');

app = express();
var port = process.env.PORT || 8080;
var storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

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
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.post("/employees/add", (req, res)=>{
    console.log(req.body); //For testing
    dat.addEmployee(req.body).then(()=>{
        res.redirect("/employees");
    });
});

app.get("/images/add", (req, res)=>{
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req, res)=>{
    res.redirect("/images");
});

app.get("/images", (req, res)=>{
    res.redirect();
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