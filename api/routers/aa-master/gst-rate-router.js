
const router = require('express').Router();
const controller = require('../../controllers/aa-master/gst-rate-controller');

router.post('/create', controller.createGstRate);
router.post('/createMany', controller.createManyGstRate);
router.post('/update', controller.updateGstRate);
router.get('/get', controller.getGstRate);
router.get('/getActive', controller.getActiveGstRate);
router.delete('/delete/:id', controller.deleteGstRate);
router.post('/deleteMany', controller.deleteManyGstRate);
router.post('/deleteAll', controller.deleteAllGstRate);

module.exports = router;
