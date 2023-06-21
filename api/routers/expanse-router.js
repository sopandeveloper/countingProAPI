
const router = require('express').Router();
const controller = require('../controllers/expanse-controller');

router.post('/create', controller.createExpanse);
router.post('/getbycompid', controller.getExpanseByCompany);
router.post('/update', controller.updateExpanse);
router.delete('/delete/:id', controller.deleteExpanse);

module.exports = router;
