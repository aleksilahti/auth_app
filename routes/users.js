const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user')

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.getUSerByUsername(newUser.username, (err, user) => {
      if(err){
        res.json({success: false, msg:'Something went wrong'});
      }
      if(user){
          return res.json({success: false, msg: 'Username taken, Please select a new username'});
      } else {
        User.getUSerByEmail(newUser.email, (err, user) => {
          if(err){
            res.json({success: false, msg:'Something went wrong'});
          }
          if(user){
              return res.json({success: false, msg: 'Email is already registered. Please use another email or try to login.'});
          } else {
            User.addUser(newUser, (err, user) => {
              if(err){
                  res.json({success: false, msg:'failed to register user'});
              } else {
                  res.json({success: true, msg:'User was successfully registered'});
              }
          });
        }}); 
      }
    
    });

    
});



//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUSerByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePasswords(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1week
                });

                res.json({
                    success: true,
                    msg: 'Authentication successful',
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email

                    }
                });
            }else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});
module.exports = router;