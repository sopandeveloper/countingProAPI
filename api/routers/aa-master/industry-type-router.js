
const router = require('express').Router();
const controller = require('../../controllers/aa-master/industry-type-controller');

router.post('/create', controller.createIndustryType);
router.post('/createMany', controller.createManyIndustryType);
router.post('/update', controller.updateIndustryType);
router.get('/get', controller.getIndustryType);
router.get('/getActive', controller.getActiveIndustryType);
router.delete('/delete/:id', controller.deleteIndustryType);
router.post('/deleteMany', controller.deleteManyIndustryType);
router.post('/deleteAll', controller.deleteAllIndustryType);

module.exports = router;
