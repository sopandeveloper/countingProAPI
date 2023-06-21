
const router = require('express').Router();
const controller = require('../../controllers/aa-master/reminder-type-controller');

router.post('/create', controller.createReminderType);
router.post('/createMany', controller.createManyReminderType);
router.post('/update', controller.updateReminderType);
router.get('/get', controller.getReminderType);
router.get('/getActive', controller.getActiveReminderType);
router.delete('/delete/:id', controller.deleteReminderType);
router.post('/deleteMany', controller.deleteManyReminderType);
router.post('/deleteAll', controller.deleteAllReminderType);

module.exports = router;
