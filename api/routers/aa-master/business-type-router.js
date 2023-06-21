
const router = require('express').Router();
const controller = require('../../controllers/aa-master/business-type-controller');

router.post('/create', controller.createBusinessType);
router.post('/createMany', controller.createManyBusinessType);
router.post('/update', controller.updateBusinessType);
router.get('/get', controller.getBusinessType);
router.get('/getActive', controller.getActiveBusinessType);
router.delete('/delete/:id', controller.deleteBusinessType);
router.post('/deleteMany', controller.deleteManyBusinessType);
router.post('/deleteAll', controller.deleteAllBusinessType);

module.exports = router;
