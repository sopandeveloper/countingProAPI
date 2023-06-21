
const router = require('express').Router();
const controller = require('../../controllers/aa-master/report-category-controller');

router.post('/create', controller.createReportCategory);
router.post('/createMany', controller.createManyReportCategory);
router.post('/update', controller.updateReportCategory);
router.get('/get', controller.getReportCategory);
router.get('/getActive', controller.getActiveReportCategory);
router.delete('/delete/:id', controller.deleteReportCategory);
router.post('/deleteMany', controller.deleteManyReportCategory);
router.post('/deleteAll', controller.deleteAllReportCategory);

module.exports = router;
