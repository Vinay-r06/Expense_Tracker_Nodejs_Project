const path=require('path')  
const User = require('../models/users');
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')

module.exports=path.dirname(process.mainModule.filename)

function isstringinvalid(string){
    if(string==undefined || string.length===0){
        return true
    } else{
        return false
    }
}
 

const generateAccessToken = (id,name, ispremiumuser)=>{
  return jwt.sign({userId:id, name:name,ispremiumuser}, 'secretkey')
}


const signup= async (req,res)=>{
    try{
    const {name, email, password}= req.body;
  
     if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({err: "bad parameters . something is missing"})
     }

     const saltrounds= 10 ;
     bcrypt.hash(password, saltrounds, async(err, hash)=>{                       // register and password will be stored by encrypt
     console.log(err)
        await User.create({ name, email, password:hash })
      return  res.status(201).json({message: 'successfuly create new user'})
     })

    } catch(err){
       return res.status(500).json({err: "User already exists"});
    } 

    
}


const login= async (req, res)=>{
    try{
  const {email, password} = req.body;
  if(isstringinvalid(email) || isstringinvalid(password)){
    return res.status(400).json({message: "Email id or password is missing", success:false})
  }

const user= await User.findAll({where: {email}})
  if(user.length>0){
    bcrypt.compare(password, user[0].password, (err, result)=>{
  if(err){
  throw new Error("something went wrong");                                 // handle the bcrypt error if caused...it jump to catches error 
  }
  if(result===true){
    return res.status(200).json({success:true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)})        // if matches password
  }else{
    return res.status(400).json({success:false, message: "Password is incorrect"})             // if not matches password
  }
    })
  }else{
    return res.status(404).json({success:false, message:"User does not exit"})               // if no email means error handle
  }
    }catch(err){
   return res.status(500).json({message:err, success:false})                             //   try fails catch error handle
    }
}


module.exports={signup,login,generateAccessToken}

