import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { mockUser } from '../services/authService';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    if (username !== mockUser.username) return done(null, false);
    
    const isMatch = await bcrypt.compare(password, mockUser.passwordHash);
    if (!isMatch) return done(null, false);
    
    return done(null, mockUser);
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret_key',
    },
    (jwtPayload, done) => {
      if (jwtPayload.username !== mockUser.username) return done(null, false);
      return done(null, mockUser);
    }
  )
);
