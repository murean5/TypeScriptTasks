import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

export default router;
