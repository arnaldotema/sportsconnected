const express = require('express');
const router = express.Router();
const ping = (req, res) => {
    return res.status(200).json({
        message: 'pong'
    });
};
router.get('/', ping);

module.exports = router;
