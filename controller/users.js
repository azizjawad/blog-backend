const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../model/User');

router.get('/user', verify, async (req, res) => {
    const user = await User.findById(req.user.id).select('name');
    res.send(user);
});

module.exports = router;
