
const router = require('express').Router();
const controller = require('../../controllers/aa-master/reminder-controller');

router.post('/create', controller.createReminder);
router.post('/createMany', controller.createManyReminder);
router.post('/update', controller.updateReminder);
router.get('/get', controller.getReminder);
router.get('/getActive', controller.getActiveReminder);
router.delete('/delete/:id', controller.deleteReminder);
router.post('/deleteMany', controller.deleteManyReminder);
router.post('/deleteAll', controller.deleteAllReminder);

module.exports = router;
