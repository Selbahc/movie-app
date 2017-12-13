const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const api = express.Router();

api.post('/login', 
  multer().array(),
  (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;

      if (!user) return res.json({ success: false, message: 'No user found' });
      
      bcrypt.compare(req.body.password, user.password)
        .then(success => {
          if (!success) return res.json({ success: false, message: 'Wrong password' });

          const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
          };

          const token = jwt.sign(payload, 'GUESSMEifYouCan', { expiresIn: '24h' });

          res.json({
            success: true,
            message: `Welcome back ${payload.firstName} !`,
            token: token,
          });
        });
    });
});

module.exports = api;