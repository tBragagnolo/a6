/*************************************************************************
* BTI325– Assignment 3 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
No part of this assignment has been copied manually or electronically from any other source.
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Tom Bragagnolo Student ID: 139157218 Date: November 3, 2022
* 
* Your app’s URL (from Heroku) that I can click to see your application: 
* https://whispering-chamber-59566.herokuapp.com/
* 
*************************************************************************/ 

var express = require("express");
var path = require("path");
var multer = require("multer");
var exphbs = require("express-handlebars");
var fs = require('fs');
var dat = require('./data-service');

app = express();
var port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers:{
        navLink: function(url, options){
            return '<li' + 
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
            '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
        }, 
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
            return options.inverse(this);
            } else {
            return options.fn(this);
            } 
        } 
    }
}));
app.set("view engine", ".hbs");

function onStart(){
    console.log("Express http server listening on port", port);
}

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
   });

app.get("/", (req, res) =>{
    res.render("home", {layout: "main"});
});

app.get("/about", (req, res) => {
    res.render("about", {layout: "main"});
});

app.get("/employees/add", (req, res)=>{
    res.render("addEmployee", {layout: "main"});
});

app.post("/employees/add", (req, res)=>{
    dat.addEmployee(req.body).then(()=>{
        res.redirect("/employees");
    });
});

app.get("/images/add", (req, res)=>{
    res.render("addImage", {layout: "main"});
});

app.post("/images/add", upload.single("imageFile"), (req, res)=>{
    res.redirect("/images");
});

app.get("/images", (req, res)=>{
    res.render("images");
    
    /*fs.readdir("./public/images/uploaded", function(err, items){
        if(err) console.log(err);
        else res.json(items);
    });*/
});

app.get("/employees", (req, res)=>{
    if(req.query.status){
        dat.getEmployeesByStatus(req.query.status).then((data)=>{
            res.render("employees", {employees: data});
        }).catch((message)=>{
            res.render({message: "no results"});
        });
    }

    else if(req.query.department){
        dat.getEmployeesByDepartment(req.query.department).then((data)=>{
            res.json(data);
        }).catch((message)=>{
            res.json({"Message": message});
        })
    }

    else if(req.query.manager){
        dat.getEmployeesByManager(req.query.manager).then((data)=>{
            res.json(data);
        }).catch((message)=>{
            res.json({"Message": message});
        });
    }

    else{
        dat.getAllEmployees().then((data)=>{
            res.json(data);
        }).catch((message)=>{
            res.json({"Message": message});
        });
    }
});

app.get("/employee/:val", (req, res)=>{
    dat.getEmployeeByNum(req.params.val).then((data)=>{
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