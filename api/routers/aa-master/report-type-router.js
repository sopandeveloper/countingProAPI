
const router = require('express').Router();
const controller = require('../../controllers/aa-master/report-type-controller');

router.post('/create', controller.createReportType);
router.post('/createMany', controller.createManyReportType);
router.post('/update', controller.updateReportType);
router.get('/get', controller.getReportType);
router.get('/getActive', controller.getActiveReportType);
router.delete('/delete/:id', controller.deleteReportType);
router.post('/deleteMany', controller.deleteManyReportType);
router.post('/deleteAll', controller.deleteAllReportType);

module.exports = router;
