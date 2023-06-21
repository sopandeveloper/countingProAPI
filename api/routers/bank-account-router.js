
const router = require('express').Router();
const controller = require('../controllers/bank-account-controller');

router.post('/create', controller.createBankAccount);
router.post('/update', controller.updateBankAccount);
router.post('/get', controller.getBankAccountByCompany);
router.post('/getById', controller.getById);
router.delete('/delete/:id', controller.deleteBankAccount);

module.exports = router;
