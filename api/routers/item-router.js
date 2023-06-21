
const router = require('express').Router();
const controller = require('../controllers/item-controller');

router.post('/create', controller.createItem);
router.post('/createMany', controller.createManyItem);
router.post('/update', controller.updateItem);
router.get('/get', controller.getItem);
router.get('/getActive', controller.getActiveItem);
router.delete('/delete/:id', controller.deleteItem);
router.post('/deleteMany', controller.deleteManyItem);
router.post('/deleteAll', controller.deleteAllItem);


router.post('/getStockValue', controller.getStockValue);


module.exports = router;
