var express = require('express'),
app= express(),
    router = express.Router();
var fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.post('/logout', function(req,res)
{
//fs.writeFile('../controller/myKey', '', function(){console.log('done')})
  localStorage.setItem('myKey', " ");
res.send({status:false,message:"logout sueccess"});
});
module.exports = router;
