var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var Employee_Schema = new Schema({  
    EmployeeName: String,  
    Designation: String,  
    Project: String,  
    Skills:String  
});  
  
var Employee = mongoose.model('employees', Employee_Schema);  
   
 module.exports=Employee;