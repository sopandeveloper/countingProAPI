
const router = require('express').Router();
const controller = require('../controllers/expanse-category-controller');

router.post('/create', controller.createExpanseCategory);
router.post('/getbycompid', controller.getExpanseCategoryByCompany);
router.post('/update', controller.updateExpanseCategory);
router.delete('/delete/:id', controller.deleteExpanseCategory);

module.exports = router;
