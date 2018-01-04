import jwt from 'jsonwebtoken';
import app from '../../index';

export default (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.token, app.get('app-secret'));
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.json({ success: false, message: "Unable to authenticate user", error });
  }
}