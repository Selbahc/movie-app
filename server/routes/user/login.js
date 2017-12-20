import app from '../../index';
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../../models/user';
import jwt from 'jsonwebtoken';
import multer from 'multer';


export const login = express.Router().post('/login', multer().array(), (req, res) => {
  User.findOne({ email: req.body.email })
  .exec()
  .then(user => {
  
    if (!user) return res.json({ success: false, message: 'No user found' });
    
    bcrypt.compare(req.body.password, user.password)
    .then(success => {
      if (!success) return res.json({ success: false, message: 'Wrong password' });

      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
      };

      const token = jwt.sign(payload, app.get('app-secret'), { expiresIn: '24h' });

      res.json({
        success: true,
        message: `Welcome back ${payload.firstName} !`,
        token: token,
      });
    });
  })
  .catch(err => console.log(err))
});