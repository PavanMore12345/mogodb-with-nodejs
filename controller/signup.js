var express = require('express'),
  app= express(),
	router = express.Router(),
	signup = require('../model/user');
	
	//var morgan  = require('morgan');
	//app.use(morgan('dev'));
//   if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }
  router.post('/signup', function(req,res)
{
	try {
		console.log("xcgvcxg");
		var loginData =req.body;
	 signup.saveUser(loginData, function(err,data)
	 {
		 //console.log(loginData);
	 try {
		 if(err){
			 res.send({"status":false,"message":err});
			// console.log(err.errors);
		 }else{
			   //console.log(token);
      //localStorage.setItem('myKey',token);
       //console.log("localstorage",localStorage.getItem('myKey'));
			 res.send({"status":true,"message":"signup success"});
		 }
		} catch (e) {
			res.send({"status":false,"message":"signup fail"});
		}
	});
	}catch (e)
	 {
		res.send({
				"status": false,
				"message": "server err"
		});
	}
	});
module.exports = router;
