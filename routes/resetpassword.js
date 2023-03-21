const express= require('express');

const router= express.Router();

const resetpasswordController= require('../controllers/resetpassword'); 


router.post('/forgotpassword', resetpasswordController.forgotpassword)

module.exports=router; 
