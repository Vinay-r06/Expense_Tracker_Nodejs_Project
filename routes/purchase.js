const express= require('express');

const router= express.Router();

const purchaseController= require('../controllers/purchase'); 

const userauthentication= require('../middleware/auth');

router.get('/premiummembership', userauthentication.authenticate, purchaseController.purchasepremium)

router.post('/updatetransactionstatus', userauthentication.authenticate, purchaseController.updatetransactionstatus)
  
router.post('/transactionFailureUpdate', userauthentication.authenticate, purchaseController.transactionFailureUpdate)



module.exports=router; 
