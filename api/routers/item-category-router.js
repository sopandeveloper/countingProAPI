
const router = require('express').Router();
const controller = require('../controllers/item-category-controller');

router.post('/create', controller.createItemCategory);
router.post('/getbycompid', controller.getItemCategoryByCompany);
router.post('/update', controller.updateItemCategory);
router.delete('/delete/:id', controller.deleteItemCategory);

module.exports = router;
