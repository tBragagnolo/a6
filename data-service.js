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

var Employee = sequelize.define('Project', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

var Department = sequelize.define('Project', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

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