var express=require('express');  
var router=express.Router();  
  
router.get('/',function(req,resp,next){  
    resp.render('src/index.html');  
});  
  
module.exports=router;   