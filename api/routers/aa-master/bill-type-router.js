
const router = require('express').Router();
const controller = require('../../controllers/aa-master/bill-type-controller');

router.post('/create', controller.createBillType);
router.post('/createMany', controller.createManyBillType);
router.post('/update', controller.updateBillType);
router.get('/get', controller.getBillType);
router.get('/getActive', controller.getActiveBillType);
router.delete('/delete/:id', controller.deleteBillType);
router.post('/deleteMany', controller.deleteManyBillType);
router.post('/deleteAll', controller.deleteAllBillType);

module.exports = router;
