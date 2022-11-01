var fs = require('fs').promises;

var employees = [];
var departments = [];

exports.initialize = function initialize(){
    return new Promise(function(resolve, reject){
        fs.readFile('./data/employees.json',(err,data)=>{
            if (err) reject("Failure to read file employees.json!");
            employees = JSON.parse(data);
        }).then(()=>{
            fs.readFile('./data/departments.json',(err,data)=>{
                if (err) reject("Failure to read file departments.json!");
                departments = JSON.parse(data);
            }).then(()=>{
                resolve();
            });   
        });
    });
}

exports.getAllEmployees = function getAllEmployees(){
    return new Promise(function(resolve, reject){
        if(employees.length == 0){
            reject("No results returned");
        }
        else{
            resolve(employees);
        }
    });
}

exports.getManagers = function getManagers(){
    return new Promise(function(resolve, reject){
        var managers = [];

        if(employees.length != 0){
            for(var i = 0; i < employees.length; i++){
                if(employees[i].isManager == true){
                    managers.push(employees[i]);
                }
            }
        }

        if(managers.length == 0){
            reject("No results returned");
        }
        else{
            resolve(managers);
        }
    });
}

exports.getDepartments = function getDepartments(){
    return new Promise(function(resolve, reject){
        if(departments.length == 0){
            reject("No results returned");
        }
        else{
            resolve(departments);
        }
    });
}