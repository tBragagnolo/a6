const Sequelize = require("sequelize");

var sequelize = new Sequelize('ykncfxty', 'ykncfxty', 'f08ogSbiRkLJ677KnDlT17cjfW3rAVGw', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
    ssl: true
   },
   query:{raw: true} // update here. You need it.
   });

sequelize.authenticate().then(()=> console.log('Connection success.'))
.catch((err)=>console.log("Unable to connect to DB.", err));


exports.initialize = function initialize(){
    return new Promise(function(resolve, reject){
        reject();
    })
}

exports.getAllEmployees = function getAllEmployees(){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.getManagers = function getManagers(){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.getDepartments = function getDepartments(){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.addEmployee = function addEmployee(employeeData){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.getEmployeesByStatus = function getEmployeesByStatus(status){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.getEmployeesByDepartment = function getEmployeesByDepartment(department){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.getEmployeesByManager = function getEmployeesByManager(manager){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.getEmployeeByNum = function getEmployeeByNum(num){
    return new Promise(function(resolve, reject){
        reject();
    });
}

exports.updateEmployee = function updateEmployee(employeeData){
    return new Promise(function(resolve, reject){
        reject();
    });
}