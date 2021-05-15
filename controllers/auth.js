const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    // const isLoggedIn = 
    // req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1] === 'true';
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{
        pageTitle:'Login',
        path:'/login',
        isAuthenticated: false
        
    });
};

exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email : email})
    .then(user => {
        if(!user){
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
            .then(result => {
                if(result){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                    
                }
                res.redirect('/login')
            })
            .catch(err=> {
            console.log(err);
            res.redirect('/login');
        });
        
        
    })
    .catch(err => console.log(err));    
};

exports.postLogout = (req,res, next)=>{
    req.session.destroy((err)=> {
        console.log(err);
        res.redirect('/');
    })
}

exports.getSignup = (req,res,next)=> {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
      });
}

exports.postSignup = (req,res,next)=> {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email:email})
    .then(UserDoc => {
        if(UserDoc){
            return res.redirect('/signup');
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { item: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
    })
    .catch(err => {
        console.log(err);
    })
}