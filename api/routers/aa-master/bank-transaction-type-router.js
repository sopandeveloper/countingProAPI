
const router = require('express').Router();
const controller = require('../../controllers/aa-master/bank-transaction-type-controller');

router.post('/create', controller.createBankTransactionType);
router.post('/update', controller.updateBankTransactionType);
router.get('/getActive', controller.getActiveBankTransactionType);
router.delete('/delete/:id', controller.deleteBankTransactionType);

module.exports = router;
