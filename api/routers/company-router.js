
const router = require('express').Router();
const controller = require('../controllers/company-controller');

router.post('/create', controller.createCompany);
router.post('/update', controller.updateCompany);
router.post('/login', controller.login);
router.post('/getAppData', controller.getAppData);
router.get('/getActive', controller.getActiveCompany);
router.delete('/delete/:id', controller.deleteCompany);

module.exports = router;
