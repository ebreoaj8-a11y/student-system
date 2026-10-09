const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
 name: String,
 course: String,
 age: Number
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;