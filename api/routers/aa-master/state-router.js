
const router = require('express').Router();
const controller = require('../../controllers/aa-master/state-controller');

router.post('/create', controller.createState);
router.post('/createMany', controller.createManyState);
router.post('/update', controller.updateState);
router.get('/get', controller.getState);
router.get('/getActive', controller.getActiveState);
router.delete('/delete/:id', controller.deleteState);
router.post('/deleteMany', controller.deleteManyState);
router.post('/deleteAll', controller.deleteAllState);

module.exports = router;
