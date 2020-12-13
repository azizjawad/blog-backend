const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.sendStatus(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, 'jsonwebsecrettoken123');
        req.user = verified;
        next();
    }catch(err){
        res.sendStatus(400).send('Invalid Token')
    }
}