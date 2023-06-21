
const router = require('express').Router();
const controller = require('../../controllers/aa-master/transaction-category-controller');

router.post('/create', controller.createTransactionCategory);
router.post('/createMany', controller.createManyTransactionCategory);
router.post('/update', controller.updateTransactionCategory);
router.get('/get', controller.getTransactionCategory);
router.get('/getActive', controller.getActiveTransactionCategory);
router.delete('/delete/:id', controller.deleteTransactionCategory);
router.post('/deleteMany', controller.deleteManyTransactionCategory);
router.post('/deleteAll', controller.deleteAllTransactionCategory);

module.exports = router;
 