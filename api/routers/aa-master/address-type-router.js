
const router = require('express').Router();
const controller = require('../../controllers/aa-master/address-type-controller');

router.post('/create', controller.createAddressType);
router.post('/update', controller.updateAddressType);
router.get('/getActive', controller.getActiveAddressType);
router.delete('/delete/:id', controller.deleteAddressType);

module.exports = router;
