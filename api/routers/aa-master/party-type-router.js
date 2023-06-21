
const router = require('express').Router();
const controller = require('../../controllers/aa-master/party-type-controller');

router.post('/create', controller.createPartyType);
router.post('/update', controller.updatePartyType);
router.get('/get', controller.getPartyType);
router.get('/getActive', controller.getActivePartyType);
router.delete('/delete/:id', controller.deletePartyType);

module.exports = router;
