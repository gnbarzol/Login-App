const { response } = require("express");
const express = require("express")
const router = express.Router()
const passport = require('passport');
const blog = require("../models/blog");
require('../utils/auth/strategies/jwt');
const BlogService = require("../services/blog.service")
router.post('/me',  passport.authenticate('jwt', { session: false }), async function(req, res, next){
    try{
    const user_id = req.user.id
    const blog = req.body
    const blogService = new BlogService()
    const createdBlog = await blogService.createBlog({blog, user_id})
    res.status(201).json(createdBlog)
    }catch(error){
        next(error)
    }
    


});

router.get('/me',  passport.authenticate('jwt', { session: false }), async function(req, res, next){
    try{
        const user_id = req.user.id
        const blogService = new BlogService()
        const blog = await blogService.getBlogByUser({user_id})
        res.status(200).json(blog)
        }catch(error){
            next(error)
        }
});

router.put('/me/:blogId',   passport.authenticate('jwt', { session: false }), async function(req, res, next){
    try{
        const user_id = req.user.id
        const blog = req.body
        const id = req.params.blogId
        const blogService = new BlogService()
        const blogUpdated = await blogService.updateBlog({blog, blog_id: id, user_id})
        res.status(202).json(blogUpdated)
        }catch(error){
            next(error)
        }
});

router.delete('/me/:blogId',   passport.authenticate('jwt', { session: false }), async function(req, res, next){
    try{
        
        const blog_id = req.params.blogId
        const blogService = new BlogService()
        const blogEliminated = await blogService.deleteBlog({ blog_id})
        res.status(200).json(blogEliminated)
        }catch(error){
            next(error)
        }
});


module.exports = router