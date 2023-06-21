
const router = require('express').Router();
const controller = require('../controllers/party-category-controller');

router.post('/create', controller.createPartyCategory);
router.post('/getbycompid', controller.getPartyCategoryByCompany);
router.post('/update', controller.updatePartyCategory);
router.delete('/delete/:id', controller.deletePartyCategory);

module.exports = router;
