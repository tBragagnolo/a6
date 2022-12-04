var mongoose = require("mongoose");
const { initialize } = require("./data-service");
var Schema = mongoose.Schema;

var uri = "mongodb+srv://dbUser:12312378DBpass!@senecaweb.ecgnt9t.mongodb.net/a6?retryWrites=true&w=majority";

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
        User = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
            if(err) reject(err);
        });
        User = User.model("users", userSchema);
        resolve();
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

//Test
initialize().catch((err)=>{
    console.log(err);
})

var test = new User({
    userName: "Hello",
    password: "pass",
    email: "email"
});

test.save().then(()=>{
    console.log("Save Succes");
}).catch(()=>{
    console.log("Save Error");
})

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