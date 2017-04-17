var express = require('express'),
    router = express.Router();
var jwt = require('jsonwebtoken');
//var config = require('../config/index');
var user=require('../model/user');

router.post('/userprofile', function(req, res) {
            console.log("hiifdgf");
            console.log(req.decoded);
            user.findById(req.decoded.id, function(err, user) {
            //  console.log("findbyid");
                if (err) throw err;
                // console.log(user);
                else {
                    res.send({
                      id:user.id,
                      email:user.email,
                      username:user.username
                    });
                }
                //console.log(req.decoded.Userobj.email);

            });
          });
            module.exports = router;
