var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://dbUser:12312378DBpass!@senecaweb.ecgnt9t.mongodb.net/a6?retryWrites=true&w=majority");

var testSchema = new Schema({
    "name": String,
    "number": {
        "type": Number,
        "default": 0
    }
});