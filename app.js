var express      =  require("express");
  var   app          =  express();
    var bodyParser   =  require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require("cors");
//var cookieSession = require('cookie-session');
app.use(require('./controller/index.js'));
app.use(express.static("./public"));
var port = 8094;
app.listen(port,function () {
  // connect();
  console.log("listning from the port" +port);
});
