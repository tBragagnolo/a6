var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://dbUser:12312378DBpass!@senecaweb.ecgnt9t.mongodb.net/a6?retryWrites=true&w=majority");

var testSchema = new Schema({
    "name": String,
    "num": {
        "type": Number,
        "default": 0
    }
});

var Test = mongoose.model("test_coll", testSchema);

var testDoc = new Test({
    name: "Hello",
    num: 2
});