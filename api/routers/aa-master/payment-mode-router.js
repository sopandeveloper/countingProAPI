
const router = require('express').Router();
const controller = require('../../controllers/aa-master/payment-mode-controller');

router.post('/create', controller.createPaymentMode);
router.post('/update', controller.updatePaymentMode);
router.get('/get', controller.getPaymentMode);
router.get('/getActive', controller.getActivePaymentMode);
router.delete('/delete/:id', controller.deletePaymentMode);

module.exports = router;
