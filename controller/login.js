var express = require('express'),
app= express(),
    router = express.Router(),
    login = require('../model/user');
    var config = require('../config/index');
    	var jwt    = require('jsonwebtoken');
  //  var localStorage = require('node-localstorage').LocalStorage;
      app.set('superSecret', config.secret);
      if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.post('/login', function(req, res) {
    try {
        var loginData = {
            email: req.body.email,
            password: req.body.password,
            //username:req.body.username
        }
        login.checklogin(loginData,function (err,data) {
        	try {
        		if (err || !data) {
        			throw err
        		}
            var Userobj=data.toJSON();
            var token = jwt.sign({id:Userobj._id}, app.get('superSecret'), {
   				 	 expiresIn: 1440*60 // expires in 24 hours
   			   });
          localStorage.setItem('myKey', token);
						res.send({"status":true,"message":"Successfully Login",token:token});
        	} catch (e) {
            console.log(e);
        		res.send({"status":false,"message":"Authorization failed"});
        	}
        });

    } catch (e) {
        console.log(e);
        res.send({
            "status": false,
            "message": "server error"
        });
    }

});
module.exports = router;
