import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
        { username: user.username },
        'secret_key',
        { expiresIn: '1h', algorithm: 'HS256' }
      );
    return res.json({ token });
  })(req, res, next);
});

export default router;
