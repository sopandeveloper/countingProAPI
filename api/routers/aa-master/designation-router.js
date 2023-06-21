
const router = require('express').Router();
const controller = require('../../controllers/aa-master/designation-controller');

router.post('/create', controller.createDesignation);
router.post('/createMany', controller.createManyDesignation);
router.post('/update', controller.updateDesignation);
router.get('/get', controller.getDesignation);
router.get('/getActive', controller.getActiveDesignation);
router.delete('/delete/:id', controller.deleteDesignation);
router.post('/deleteMany', controller.deleteManyDesignation);
router.post('/deleteAll', controller.deleteAllDesignation);

module.exports = router;
