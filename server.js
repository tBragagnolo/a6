/*********************************************************************************
* BTI325 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Tom Bragagnolo Student ID: 139157218 Date: November 28, 2022
*
* Online (Cyclic) Link: https://smiling-pear-xerus.cyclic.app
*
********************************************************************************/ 

var express = require("express");
var path = require("path");
var multer = require("multer");
var exphbs = require("express-handlebars");
var fs = require('fs');
var dat = require('./data-service');
var datAuth = require('./data-service-auth');

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

app.use(express.static("./public"));

app.get("/", (req, res) =>{
    res.render("home", {layout: "main"});
});

app.get("/about", (req, res) => {
    res.render("about", {layout: "main"});
});

app.get("/employees/add", (req, res)=>{
    dat.getDepartments().then((data)=>{
        res.render("addEmployee", {departments: data});
    }).catch(()=>{
        res.render("addEmployee", {departments: []});
    });
});

app.post("/employees/add", (req, res)=>{
    dat.addEmployee(req.body).then(()=>{
        res.redirect("/employees");
    }).catch(()=>{
        res.redirect("/employees");
    });
});

app.get("/images/add", (req, res)=>{
    res.render("addImage");
});

app.post("/images/add", upload.single("imageFile"), (req, res)=>{
    res.redirect("/images");
});

app.get("/images", (req, res)=>{
    fs.readdir("./public/images/uploaded", function(err, items){
        if(err) console.log(err);
        else res.render("images", {images: items});
    });
});

app.get("/employees", (req, res)=>{
    if(req.query.status){
        dat.getEmployeesByStatus(req.query.status).then((data)=>{
            if(data.length > 0) res.render("employees", {employees: data});
            else res.render("employees", {message: "no results"});;
        }).catch(()=>{
            res.render("employees", {message: "no results"});
        });
    }

    else if(req.query.department){
        dat.getEmployeesByDepartment(req.query.department).then((data)=>{
            if(data.length > 0) res.render("employees", {employees: data});
            else res.render("employees", {message: "no results"});
        }).catch(()=>{
            res.render("employees", {message: "no results"});
        });
    }

    else if(req.query.manager){
        dat.getEmployeesByManager(req.query.manager).then((data)=>{
            if(data.length > 0) res.render("employees", {employees: data});
            else res.render("employees", {message: "no results"});
        }).catch(()=>{
            res.render("employees", {message: "no results"});
        });
    }

    else{
        dat.getAllEmployees().then((data)=>{
            if(data.length > 0) res.render("employees", {employees: data});
            else res.render("employees", {message: "no results"});
        }).catch(()=>{
            res.render("employees", {message: "no results"});
        });
    }
});

app.get("/employee/:val", (req, res)=>{
    // initialize an empty object to store the values
    let viewData = {};

    dat.getEmployeeByNum(req.params.val).then((data) => {
        if (data) {
            viewData.employee = data; //store employee data in the "viewData" object as "employee"
        } else {
            viewData.employee = null; // set employee to null if none were returned
        }
    }).catch(() => {
        viewData.employee = null; // set employee to null if there was an error 
    }).then(dat.getDepartments)
    .then((data) => {
        viewData.departments = data; // store department data in the "viewData" object as "departments"

        // loop through viewData.departments and once we have found the departmentId that matches
        // the employee's "department" value, add a "selected" property to the matching 
        // viewData.departments object
        for (let i = 0; i < viewData.departments.length; i++) {
            if (viewData.departments[i].departmentId == viewData.employee.department) {
                viewData.departments[i].selected = true;
            }
        }
    }).catch(() => {
        viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
        if (viewData.employee == null) { // if no employee - return an error
            res.status(404).send("Employee Not Found");
        } else {
            res.render("employee", { viewData: viewData }); // render the "employee" view
        }
    });
});

app.post("/employee/update", (req, res) => {
    dat.updateEmployee(req.body).then(()=>{
        res.redirect("/employees");
    }).catch(()=>{
        res.status(500).send("Unable to update employee");
    });
});

app.get("/departments", (req, res)=>{
    dat.getDepartments().then((data)=>{
        if(data.length > 0) res.render("departments", {departments: data});
        else res.render("departments", {message: "no results"});
    }).catch((message)=>{
        res.render("departments", {message: "no results"});
    });
});

app.get("/departments/add", (req, res)=>{
    res.render("addDepartment");
});

app.post("/departments/add", (req, res)=>{
    dat.addDepartment(req.body).then(()=>{
        res.redirect("/departments");
    }).catch(()=>{
        res.status(500).send("Unable to add department");
    });
});

app.post("/department/update", (req, res)=>{
    dat.updateDepartment(req.body).then(()=>{
        res.redirect("/departments");
    }).catch(()=>{
        res.status(500).send("Unable to update department");
    });
});

app.get("/department/:val", (req, res)=>{
    dat.getDepartmentById(req.params.val).then((data)=>{
        if(data == undefined) res.status(404).send("Department Not Found");
        else res.render("department", {department: data});
    }).catch(()=>{
        res.status(404).send("Department Not Found");
    });
});

app.get("/employees/delete/:val", (req, res)=>{
    dat.deleteEmployeeByNum(req.params.val).then(()=>{
        res.redirect("/employees");
    }).catch(()=>{
        res.status(500).send("Unable to Remove Employee / Employee not found");
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