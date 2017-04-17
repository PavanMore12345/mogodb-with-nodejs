var express = require('express'),
router = express.Router();
router.get('/',function(req,res){
   res.send('main controller');
});
router.use('/',require('./signup'));
router.use('/',require('./login'));
router.use('/',require('./auth'));
router.use('/',require('./auth'),require('./userprofile'));
router.use('/',require('./logout'));

//router.use('/',require('./checklogin'));
//router.use('/',require('./logout'));
module.exports = router;
