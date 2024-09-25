// middlewares/auth.mjs
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

export const isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = jwt.verify(token, 'VERYsecret123');

      const user = await User.findById(decode.userId);
      if (!user) {
        return res.json({ success: false, message: 'Unauthorized access!' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'Unauthorized access!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({ success: false, message: 'Session expired, try signing in again!' });
      }

      res.json({ success: false, message: 'Internal server error!' });
    }
  } else {
    res.json({ success: false, message: 'Unauthorized access!' });
  }
};

export default isAuth;