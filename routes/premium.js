const express= require('express');

const router= express.Router();

const premiumController= require('../controllers/premiumFeature'); 

const authentication= require('../middleware/auth');

router.get('/showLeaderBoard', authentication.authenticate, premiumController.getUserLeaderBoard)



module.exports=router; 
