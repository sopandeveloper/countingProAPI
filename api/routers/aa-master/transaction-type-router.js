
const router = require('express').Router();
const controller = require('../../controllers/aa-master/transaction-type-controller');

router.post('/create', controller.createTransactionType);
router.post('/createMany', controller.createManyTransactionType);
router.post('/update', controller.updateTransactionType);
router.get('/get', controller.getTransactionType);
router.get('/getActive', controller.getActiveTransactionType);
router.delete('/delete/:id', controller.deleteTransactionType);
router.post('/deleteMany', controller.deleteManyTransactionType);
router.post('/deleteAll', controller.deleteAllTransactionType);

module.exports = router;
