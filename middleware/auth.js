const jwt= require('jsonwebtoken');

const User=require('../models/users');


exports.authenticate =(req,res,next)=>{
    try{
    const token=req.header('Authorization')
    console.log('token>> here auth', token);
    const user=jwt.verify(token,'secretkey');       // user= had id and name
    console.log('userId>>>', user.userId)            // while decrypt we mentioned "used:id" while login "id" and "name"
    User.findByPk(user.userId).then(user=>{              // in user table it is mentioning "id" row so to access we should use ".id"
        req.user=user;                                 // while access in table id is "id" so we store id here in "req.user" is "1"
        next();
    })
    }catch(err){
     console.log(err);
     return res.status(401).json({success:false})
    }
}