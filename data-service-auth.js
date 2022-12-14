var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
        if(userData.password == " " || userData.password2 == " "){
            reject("Error: Password cannot be empty");
        }
        else if(userData.password != userData.password2){
            reject("Error: Passwords do not match");
        }
        else{
            let newUser = new User(userData);
            
            bcrypt.hash(newUser.password, 10,).then((hash)=>{
                newUser.password = hash;

                newUser.save().then(()=>{
                    resolve();
                }).catch(()=>{
                    reject("Error Saving New User");
                });
            }).catch((err)=>{
                if(err.code == 11000){
                    reject("Username Already Taken");
                }
                else{
                    reject("Unable to Create User");
                }
            });
        }
    });
}

exports.checkUser = function checkUser(userData){
    User.findOne({"userName": userData.userName}).exec().then((data)=>{
        if(!data) reject("Unable to find user:", userData.userName);
        else if(data.password != userData.password) reject("Incorrect Password for user:", data.userName);
        else{
            data.loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
            
        }
    }).catch(()=>{

    });
}