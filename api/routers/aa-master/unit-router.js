
const router = require('express').Router();
const controller = require('../../controllers/aa-master/unit-controller');

router.post('/create', controller.createUnit);
router.post('/createMany', controller.createManyUnit);
router.post('/update', controller.updateUnit);
router.get('/get', controller.getUnit);
router.get('/getActive', controller.getActiveUnit);
router.delete('/delete/:id', controller.deleteUnit);
router.post('/deleteMany', controller.deleteManyUnit);
router.post('/deleteAll', controller.deleteAllUnit);

module.exports = router;
