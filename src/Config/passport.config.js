import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../models/userSchema.js';
import { createHash, isValidPassword } from "../utils/utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField: 'email'}, async(req, email, password, done) =>{
        try {
            const { name } = req.body;
            if (!name || !email || !password) return done(null, false);
            let existUser = await userModel.findOne({ email: email });
            if (existUser) return done(null, false);
            let user = await userModel.create({
                name,
                email,
                password: createHash(password)
            })
            return done(null, user);
        } catch (error) {
            // return done(error)
            console.log(error)
            res.status(500).send({ error: error })
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
        try {
            if (!email || !password) return done(null, false);
            const user = await userModel.findOne({ email: email });
            if (!user) return done(null, false);
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
    }))

    passport.serializeUser((user,done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id,done) => {
        let result = await userModel.findOne({_id: id})
        return done(null,result);
    })
};

export default initializePassport;