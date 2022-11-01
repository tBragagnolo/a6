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
        if(employees.lenght == 0){
            reject("No results returned");
        }
        else{
            resolve(employees);
        }
    });
}