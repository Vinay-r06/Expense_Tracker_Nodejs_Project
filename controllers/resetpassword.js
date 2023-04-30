const Sib =require('sib-api-v3-sdk');
const sequelize=require('../util/database');
const bcrypt = require('bcrypt')
const User = require('../models/users');
const {v4: uuidv4}= require('uuid');


const Forgotpassword=require('../models/forgotpassword');
require('dotenv').config();


// // sending dummy mail for test  


// exports.forgotpassword= async(req,res,next)=>{
    
//     try{
//         const {email}= req.body;
        
//      const client = Sib.ApiClient.instance
//     const apiKey = client.authentications['api-key']
//     apiKey.apiKey=process.env.Forgot_PASS_API_KEY;
//     const transEmailApi= new Sib.TransactionalEmailsApi()

//     const sender={
//         email: 'vinayreyme333@gmail.com'
//     }
//     const receivers = [
//         {
//             email:email
//         },
//     ]

//     const response = await transEmailApi.sendTransacEmail({
//         sender,
//         to: receivers,
//         subject:'Forgot Password',
//          textContent:`you are requested for password reset`  
//     })
    
//     console.log(response)
//     return res.status(200).json({response:response, message:"link sent to email successfully "})
//     }catch(err){
//         console.log('ERROR IN FORGOT PASSWORD',err);
//     return res.status(500).json({success:false,error:err})
//     }
// }





// reset password and create forgot password table - task

exports.forgotpassword= async(req,res,next)=>{
    const t = await sequelize.transaction();
    try{
        const {email}= req.body;
        
  const user= await User.findOne({where: {email}},{transaction:t})

  console.log('forgot user>>>', user.email)
  if(user.email){
    const id=uuidv4()
    const createForgotpassword= await Forgotpassword.create({
        id:id,
        isactive:true,
        userId:user.id,
    },{transaction:t})

     const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey=process.env.Forgot_PASS_API_KEY;
    const transEmailApi= new Sib.TransactionalEmailsApi()

    const sender={
        email: 'vinayreyme333@gmail.com'
    }
    const receivers = [
        {
            email:user.email
        },
    ]

    const response = await transEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject:'Forgot Password',
        htmlContent:`<a href="http://44.201.102.117:3000/password/resetpassword/${id}">Reset Password</a>`,
        textContent:`you are requested for password reset`,  
    })
     t.commit();
    console.log(response)
    return res.status(200).json({response:user, message:"link sent to email successfully "})
  }else{
    return res.status(402).json({message:'No user found'})
 }
    }catch(err){
        console.log('ERROR IN FORGOT PASSWORD',err);
        t.rollback();
        return res.status(500).json({success:false,error:err})
       // throw new Error(JSON.stringify(err))
    }
}


exports.resetpassword= async(req,res,next)=>{
    try{
  const forgotid=req.params.id
  const forgotpassword= await Forgotpassword.findOne({where:{id:forgotid}})    
  console.log(forgotpassword)

  if(forgotpassword.isactive){
    forgotpassword.update({isactive:false})

   return res.status(200).send(`
                          <html>
                          <body>

              <form action="http://44.201.102.117:3000/password/updatepassword/${forgotid}" name="resetform" id="resetform" method="get">
              <label for="password">Enter New Password</label><br>
              <input type="password" name="password" id="password" required/><br><br>
              <button type="submit" >Set password</button><br><br>
              </form>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
           
              <script>
              document.getElementById("resetform").addEventListener('sumbit', formSubmit)
              const pass = document.getElementById("password")
             async function formSubmit(e){
                e.preventDefault();
                console.log('called')
               
              }
              </script>
                  
              </body>
    
              </html> `)
    res.end();
  }else{
    res.send('<body>Reset Link Expired</body>')
    res.end();
  }
    }catch(err){
       res.status(500).json({success:false, error:err})
       console.log('Error>>>',err)
       throw new Error(JSON.stringify(err))
    }

}


exports.updatepassword=async (req,res,next)=>{
   try{
 const {password} = req.query;
 const forgotid= req.params.id;
 console.log('checking newp and forgotid',password,forgotid)
 const user = await Forgotpassword.findOne({where:{id:forgotid}})
const userId= user.userId;
const saltRounds= 10 ;
bcrypt.genSalt(saltRounds, function(err,salt){
    if(err){
        console.log(err)
        throw new Error(err);
    }

bcrypt.hash(password, salt, async function(err,hash){
    if(err){
        console.log(err);
        throw new Error(err);
    }
    const response = await User.update({
        password:hash},
        {where:{id:userId}})
      return res.status(201).json({message:'Successfully updated the new password', response:response})
    })
})
   }catch(err){
    console.log(err);
    return res.status(500).json({message:err})
   }
}