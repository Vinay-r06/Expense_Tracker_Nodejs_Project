const Sib =require('sib-api-v3-sdk');
const sequelize=require('../util/database');
const bcrypt = require('bcrypt')
const User = require('../models/users');

require('dotenv').config();


// sending dummy mail for test  


exports.forgotpassword= async(req,res,next)=>{
    
    try{
        const {email}= req.body;
        
     const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey=process.env.Forgot_PASS_API_KEY;
    const transEmailApi= new Sib.TransactionalEmailsApi()

    const sender={
        email: 'vinayreyme333@gmail.com'
    }
    const receivers = [
        {
            email:email
        },
    ]

    const response = await transEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject:'Forgot Password',
         textContent:`you are requested for password reset`  
    })
    
    console.log(response)
    return res.status(200).json({response:response, message:"link sent to email successfully "})
    }catch(err){
        console.log('ERROR IN FORGOT PASSWORD',err);
    return res.status(500).json({success:false,error:err})
    }
}







// exports.forgotpassword= async(req,res,next)=>{
//     //const t = await sequelize.transaction();
//     try{
//         const {email}= req.body;
        
// //   const user= await User.findOne({where:{email}},
// //     {transaction:t}
// //    )
// //   console.log('forgot user>>>', user)
// //   if(user){
// //    console.log('if loop user>>' ,user)
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
//       //  htmlContent:`<a href="https://localhost:3000/password/resetpassword/${id}">Reset Password</a>`
//          textContent:`you are requested for password reset`  
//     })
//     //  t.commit();
//     console.log(response)
//      res.status(200).json({response:response})
// //   }else{
// //     return res.status(402).json({message:'No user found'})
// //  }
//     }catch(err){
//         console.log('ERROR IN FORGOT PASSWORD',err);
//         //t.rollback();
//      res.status(500).json({success:false,error:err})
//         //throw new Error(JSON.stringify(err))
//     }
// }


