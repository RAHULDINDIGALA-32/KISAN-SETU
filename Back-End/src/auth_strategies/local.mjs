import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../MongoDB/usersDB.mjs";
import { comparePassword } from "../utils/encryption/userPassword.mjs";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (ID, done) => {
    try {
        const findUser = await User.findById(ID);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: "userName", passReqToCallback: true }, async (req, userName, password, done) => {
        try {
            const user = await User.findOne({ userName: userName });
            if (!user) throw new Error("User not found");


            if (user.userType !== req.body.userType) {
                throw new Error("Incorrect user type");
            }

            if (!await comparePassword(password, user.password)) {
                throw new Error("Incorrect password");
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    })
);