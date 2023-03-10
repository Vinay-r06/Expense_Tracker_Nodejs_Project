       
const User = require('../models/users');
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')


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
    return res.status(200).json({success:true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name)})        // if matches password
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

// bcrypt-->old technique..
// we do one way encryption..means---once u encrypt it u get hash..but u never go back to password again from this hash.. u cannot decrypt the hash ever
// the alogorithm we use --> blowfish encrpyt

// string password-->blowfish encrpyt--> hash (this hash value stored in database)

// but old technique problem is example: same password multiple user is same value hash u will get... u use same password u will get same hash value..

// user a
// 12345--> encrypt--> hasha


// user b
//12345--->encrypt--> hasha


// to overcome this-->used salt(random string)

// user a
// 12345 + salt(small string) --> encrypt--> hasha     ....when u had salt... even if u put the same password u might get some different output all the time..


// user b
//12345 + salt--->encrypt--> hasha............they will not same similiar hashes


// u should metion (saltrounds--default -10) how much time u should randomize and get some string.. that string along with password  would get hased..
// the more saltrounds the protection is increased the system get slowed
// if u put 10--> the 2 percent will get matched password chances... 
//if u put 100--> background lot of computation and less chances of matching password decrease...



// login encrpt



// password forgot..


// user b

// normal password--12345678 + salt -----> encrypt --> hashb ("csdmfekrm")

// basically it takes normal password and hash password --> tries to compare them...
// basically it converts this into one encryption and it tries to compare it behind the scenes..

// u had to use..."bcryt.compare"