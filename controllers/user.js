       
const User = require('../models/users');

function isstringinvalid(string){
    if(string==undefined || string.length===0){
        return true
    } else{
        return false
    }
}


exports.signup= async (req,res)=>{
    try{
    const {name, email, password}= req.body;
  
     if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({err: "bad parameters . something is missing"})
     }

     await User.create({ name, email, password })
     res.status(201).json({message: 'successfuly create new user'})
    } catch(err){
       return res.status(500).json({err: "User already exists"});
    } 

    
}


exports.login= async (req, res)=>{
    try{
  const {email, password} = req.body;
  if(isstringinvalid(email) || isstringinvalid(password)){
    return res.status(400).json({message: "Email id or password is missing", success:false})
  }

const user= await User.findAll({where: {email}})
  if(user.length>0){
    if(user[0].password===password){
      return res.status(200).json({success:true, message: "User logged in successfully"})
  }else{
        return res.status(400).json({success:false, message: "Password is incorrect"})
    }
  }else{
    return res.status(404).json({success:false, message:"User does not exit"})
  }
    }catch(err){
   return res.status(500).json({message:err, success:false})
    }
}