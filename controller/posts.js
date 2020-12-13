const router = require('express').Router();
const multer = require('multer');
const fs = require('fs')

const verify = require('../verifyToken');
const Posts = require('../model/Posts');
const {postsValidation} = require('../validation');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/png') 
      cb(null, true);
      else cb(null, false);
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
        // Accept file size not more than 5MB
    },
    fileFilter: fileFilter 
});

router.post('/create', verify, upload.single('featured_image'), async (req, res) => {
    const post = req.body;

    // Validate the data before creating a post.
    const {error} = postsValidation(post);
    if(error) return res.status(400).send({status:false, msg:error.details[0].message});

    // Create Post  
    const posts = new Posts({
        title: post.title,
        description: post.description,
        featured_image: req.file.filename,
    });

    try{
        const savedpost = await posts.save(); // Save Post
        res.send({status:true, post: savedpost});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/update', verify, upload.single('featured_image'), async (req, res) => {
    const post = req.body;

    // Validate the data before creating a post.
    const {error} = postUpdateValidation(post);
    if(error) return res.status(400).send({status:false, msg:error.details[0].message});
    
    const data = {
        title: post.title,
        description: post.description
    }

    if(req.file) data.featured_image = req.file.filename
    
    // update post the old post
    const lastPosts = await Posts.findOneAndUpdate({_id:post.id}, data);
    
    // Delete the last update featured image from the server 
    if(req.file && lastPosts)
        fs.unlinkSync('uploads/' + lastPosts.featured_image);
    
    res.send({status:true, data: lastPosts});
});

router.get('/get/:id?', verify, async (req, res) => {
    const params = req.params;
    if(params.id !== undefined)
         res.send(await Posts.findById(params.id))
    else 
        res.send(await Posts.find());
});

router.delete('/delete', verify, async (req, res) => {
    const post = req.body;

    // Validate the data before creating a post.
    const {error} = postDeleteValidation(post);
    if(error) return res.status(400).send({status:false, msg:error.details[0].message});
    
    const DeletedPosts = await Posts.findOneAndDelete({_id:post.id});
    
    // Delete the last update featured image from the server 
    if(DeletedPosts) 
        fs.unlinkSync('uploads/' + DeletedPosts.featured_image);
    
    res.send({status:true, data: DeletedPosts});
});


module.exports = router;
