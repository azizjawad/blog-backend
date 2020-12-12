const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req, res) => {
    const post = req.body;
    
    // Validate the data before creating a user.
    const {error} = registerValidation(post);
    if(error) return res.status(400).send({status:false, msg:error.details[0].message});

    // Check if email is already exists in the database
    const emailExists = await User.findOne({email: post.email});
    if(emailExists) res.status(400).send({status:false, msg:'email id already exists'});
    
    //Hash Paswords 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(post.password, salt);

    // Create user  
    const user = new User({
        name: post.name,
        email:post.email,
        password: hashPassword,
    });

    try{
        const savedUser = await user.save();
        res.send({status:true, id: savedUser._id});
    }catch(err){
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    const post = req.body;
    
    // Validate the data before verifying the user.
    const {error} = loginValidation(post);
    if(error) return res.status(400).send({status:false, msg: error.details[0].message});

    // Check if user exists in the database
    const user = await User.findOne({email: post.email});
    if(!user) res.status(400).send({status:false, msg:'email id does not exists'});
    
    // Check Paswords 
    const validPass = await bcrypt.compare(post.password, user.password);
    if(!validPass) res.status(400).send({status:false, msg:'Incorrect password'});
    else {
        const token = jwt.sign({id: user._id}, 'jsonwebsecrettoken123');
        res.header('auth-token', token).send({status:true, token});
    }
});

module.exports = router;