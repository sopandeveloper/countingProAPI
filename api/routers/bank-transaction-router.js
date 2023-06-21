
const router = require('express').Router();
const controller = require('../controllers/bank-transaction-controller');

router.post('/create', controller.createBankTransaction);
router.post('/update', controller.updateBankTransaction);
router.get('/get', controller.get);
router.post('/getByBank', controller.getByBank);
router.post('/getById', controller.getById);
router.delete('/delete/:id', controller.deleteBankTransaction);

module.exports = router;
