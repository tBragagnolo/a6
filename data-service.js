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
        if(employeeData.isManager == undefined) employeeData.isManager = false;
        else employeeData.isManager = true;
        employeeData.employeeNum = employees.length + 1;
        employees.push(employeeData);
        resolve();
    });
}

exports.getEmployeesByStatus = function getEmployeesByStatus(status){
    return new Promise(function(resolve, reject){
        var emp_s = [];

        if(employees.length != 0){
            for(var i = 0; i < employees.length; i++){
                if(employees[i].status = status) emp_s.push(employees[i]);
            }
        }

        if(emp_s.length == 0) reject("No results returned");
        else resolve(emp_s);
    });
}

exports.getEmployeesByDepartment = function getEmployeesByDepartment(department){
    return new Promise(function(resolve, reject){
        var emp_d = [];

        if(employees.length != 0){
            for(var i = 0; i < employees.length; i++){
                if(employees[i].department = department) emp_d.push(employees[i]);
            }
        }

        if(emp_d.length == 0) reject("No results returned");
        else resolve(emp_d);
    });
}

exports.getEmployeesByManager = function getEmployeesByManager(manager){
    return new Promise(function(resolve, reject){
        var emp_m = [];

        if(employees.length != 0){
            for(var i = 0; i < employees.length; i++){
                if(employees[i].employeeManagerNum = manager) emp_m.push(employees[i]);
            }
        }

        if(emp_m.length == 0) reject("No results returned");
        else resolve(emp_m);
    });
}