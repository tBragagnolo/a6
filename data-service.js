var fs = require('fs');

var employees = [];
var departments = [];

exports.initialize = function initialize(){
    return new Promise(function(resolve, reject){
        fs.readFile('./data/employees.json', 'utf8', (err,data)=>{
            if (err) reject("Failure to read file employees.json!");
            else{
                employees = JSON.parse(data);

                fs.readFile('./data/departments.json', 'utf8', (err, data)=>{
                    if(err) reject("Failure to read file from departments.json");
                    else{
                        departments = JSON.parse(data);
                        resolve();
                    }
                });
            }
        });
    })
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

exports.addEmployee = function addEmployee(employeeData){
    return new Promise(function(resolve, reject){
        if(employeeData.isManager === undefined){ employeeData.isManager = false; }
        else{ employeeData.isManager = true; }

        employeeData.employeeNum = employees.length + 1;
        employees.push(employeeData);
        resolve();
    });
}