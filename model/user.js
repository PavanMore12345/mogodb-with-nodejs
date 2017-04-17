var mongo=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var validators= require('mongoose-validators');
var mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
var mongooseFieldEncryption1 = require('mongoose-field-encryption');
var connect1 = mongo.connect('mongodb://127.0.0.1/mydb2');
autoIncrement.initialize(connect1);
var Schema = mongo.Schema;
var userSchema = Schema({
  _id:
   {
     type: Number,
    unique:true
  },
  email: {
    type:String,
    required:true,
    //unique: true,
    lowercase: true,
    validate:validators.isEmail()
  },
  password: {
    type: String,
    required: true,
    match:new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  },
  username: {
    type: String,
    required: true,
    validate: [validators.isAlphanumeric(), validators.isLength(4, 60)]
  },
  references:
   {
   author: String,
   date: Date
 }
},{collection: "userReg"});
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
userSchema.plugin(mongooseFieldEncryption, {fields: ['password'], secret:'some secret key'});
//var User = connect1.model('User', userSchema);
userSchema.statics.checklogin = function(bodydata,callback) {
var email1 = bodydata.email;
var encrypted = mongooseFieldEncryption1.encrypt(bodydata.password, 'some secret key');
this.findOne({email:email1,password:encrypted}, callback);
//console.log(this.findOne({email:email1,password:encrypted}));
};

userSchema.statics.saveUser = function(data , callback)
{
//  console.log("dssfsfs");
  var self =this;
self.findOne({email:data.email},function(err,exist)
{
  if(exist)
  {
  callback("email is already used",null);
  }
  else
   {
    var newUser=new self({
     _id:data._id,
     email:data.email,
     password:data.password,
     username:data.username
    });
    console.log(newUser);
    newUser.save(callback);
    // console.log("sdfsfs");
  }
});
}
var User = connect1.model('User', userSchema);
module.exports=User;
