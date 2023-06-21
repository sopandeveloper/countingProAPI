
const router = require('express').Router();
const controller = require('../controllers/party-controller');

router.post('/create', controller.createParty);
router.post('/createMany', controller.createManyParty);
router.post('/update', controller.updateParty);
router.post('/getPartyByCompId', controller.getPartyByCompId);
router.get('/getActive', controller.getActiveParty);
router.delete('/delete/:id', controller.deleteParty);
router.post('/deleteMany', controller.deleteManyParty);
router.post('/deleteAll', controller.deleteAllParty);

module.exports = router;
 