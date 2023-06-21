
const router = require('express').Router();
const controller = require('../../controllers/aa-master/item-type-controller');

router.post('/create', controller.createItemType);
router.post('/update', controller.updateItemType);
router.get('/get', controller.getItemType);
router.get('/getActive', controller.getActiveItemType);
router.delete('/delete/:id', controller.deleteItemType);

module.exports = router;
