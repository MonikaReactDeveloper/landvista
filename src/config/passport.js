const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../modules/auth/auth.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK_CLIENT_SECRET",
    callbackURL: process.env.CALLBACK_URL || "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
            if (!user.googleId) {
                user.googleId = profile.id;
                user.isVerified = true;
                user.provider = 'google';
                await user.save();
            }
        } else {
            user = await User.create({
                googleId: profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                isVerified: true,
                provider: 'google',
                status: 'pending' // Still requires admin approval for institutional access
            });
        }
        
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (e) {
        done(e, null);
    }
});

module.exports = passport;
