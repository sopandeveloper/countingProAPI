
const router = require('express').Router();
const controller = require('../controllers/transaction-controller');

router.post('/create', controller.createTransaction);
router.post('/update', controller.updateTransaction);
router.post('/get', controller.getTransactionByCompany);
router.delete('/delete/:id', controller.deleteTransaction);

module.exports = router;
