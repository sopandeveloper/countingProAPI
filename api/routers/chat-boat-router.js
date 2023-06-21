
const router = require('express').Router();
const controller = require('../controllers/chat-boat-controller');

router.post('/chat', controller.chatFn);

module.exports = router;
