const express = require('express');
const router = express.Router();
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

// Services
const UsersService = require('../services/user.service');


// Basic Strategy
require('../utils/auth/strategies/basic');

// Configuration
const { config } = require('../config');


router.post('/sign-in', async function (req, res, next) {
  passport.authenticate('basic', { session: false }, function (error, user) {
    try {
      if (error || !user) {
        next(boom.unauthorized());
        return;
      }
      req.logIn(user, { session: false }, async function (error) {
        if (error) {
          next(error);
          return;
        }

        const { id, username, email } = user;
        const payload = {
          sud: id,
          username,
          email
        };
        const expires_in = 120;
        const access_token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: `${expires_in}s`,
        });

        res.status(200).json({ access_token, user: { id, username, email }, expires_in, token_type: 'Bearer' });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.post(
  '/sign-up',
  async function (req, res, next) {
    const { body: user } = req;
    const { username, email } = user;
    try {
      const userService = new UsersService();
      let userExists = await userService.getUserByUsername({ username });
      if(userExists) {
        res.status(202).json({ message: 'Username already exists' });
      }
      userExists = await userService.getUserByEmail({ email });
      if(userExists) {
        res.status(202).json({ message: 'Email already exists' });
      }

      if (!userExists) {
        const createdUserId = await userService.createUser({ user });
        if (createdUserId > 0) {
          res.status(201).json({
            user_id: createdUserId,
            message: 'user created successfully',
          });
        } else {
          res.status(202).json({
            message: 'error while creating user',
          });
        }
      } else {
        res.status(202).json({
          message: 'user already exists',
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
