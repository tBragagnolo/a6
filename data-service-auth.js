var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb+srv://dbUser:12312378DBpass!@senecaweb.ecgnt9t.mongodb.net/a6?retryWrites=true&w=majority");

var userSchema = new Schema({
    "userName": {
        type: String,
        unique: true
    },
    "password": String,
    "email": String,
    "loginHistory": [{"dateTime": Date, "userAgent": String}]
});

let User; //User instance

exports.initialize = function initialize(){
    return new Promise(function(resolve, reject){
        mongoose.createConnection("mongodb+srv://dbUser:12312378DBpass!@senecaweb.ecgnt9t.mongodb.net/a6?retryWrites=true&w=majority")
        .then(()=>{
            
        }).catch((err)=>{
            reject(err);
        });
    });
}

exports.registerUser = function registerUser(userData){
    return new Promise(function(resolve, reject){
        if(userData.password == "" || userData.password2 == ""){
            reject("Error: Password cannot be empty");
        }
        else if(userData.password != userData.password2){
            reject("Error: Passwords do not match");
        }
    });
}

/*var Test = mongoose.model("test_coll", testSchema);

var testDoc = new Test({
    name: "Hello",
    num: 2
});

testDoc.save().then(()=>{
    console.log("Success");
}).catch(()=>{
    console.log("Error");
})*/