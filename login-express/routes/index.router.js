const express = require('express');
const router = express.Router();

// JWT strategy
require('../utils/auth/strategies/jwt');

const authRouter = require('./auth.router');
const blogRouter = require('./blog.router');

router.get('/', (req, res, next) => {
    res.json({name: 'API REST DAWM', version: '1.0.0'});
});

router.use('/auth', authRouter);
router.use('/blog', blogRouter);

module.exports = router;