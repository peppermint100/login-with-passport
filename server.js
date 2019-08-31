const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const PORT = 3000;
const passport = require('passport');
const initPassport = require('./passport');

const checkAuth = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
const checkNotAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
}

app.set('view engine','ejs'); 
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
initPassport(passport);

app.get('/',checkNotAuth,(req,res)=>{
    res.render('index.ejs');
})

app.get('/dashboard',checkAuth,(req,res)=>{
    res.render('dashboard.ejs',{id : req.user.id});
})

app.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});

app.post('/',passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect : '/',
    failureFlash : true
}))

app.listen(PORT , ()=>{
    console.log(`server running on PORT ${PORT}`);
})