const express= require('express');

const router= express.Router();

const resetpasswordController= require('../controllers/resetpassword'); 


router.post('/forgotpassword', resetpasswordController.forgotpassword)

router.get('/resetpassword/:id', resetpasswordController.resetpassword)

router.get('/updatepassword/:id', resetpasswordController.updatepassword)

module.exports=router; 
