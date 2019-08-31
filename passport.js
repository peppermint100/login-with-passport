const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');
const flash = require('connect-flash');

const initPassport = (passport) =>{
passport.use(new LocalStrategy({
    usernameField:'id'
},(id,password,done)=>{
    let currentUser = users.find(user => user.id === id); 
    if(currentUser == null){
        return done(null, false, { message: 'ID incorrect' })
    }else{
        if(password !== currentUser.password){
            return done(null, false, { message: 'PW incorrect' })
        }else{
            return done(null,currentUser);
        }
    }
}))

passport.serializeUser((user,done)=>{ 
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});
}

module.exports = initPassport;