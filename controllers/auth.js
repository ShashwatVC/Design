const bcrypt = require('bcryptjs');
const user = require('../models/user');
const User = require('../models/user');
const { get } = require('../routes/admin');

exports.getLogin = (req,res,next)=>{
    
    
    let message = req.flash('err');
        if(message.length > 0){
            message = message[0];
        }
        else{
            message = null;
        }
        
    res.render('auth/login',{
        pageTitle:'Login',
        path:'/login',
        errorMessage: message,
        // isSu: 'superuser'
    });
};

exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email : email})
    .then(user => {
        if(!user){
            req.flash('err','Invalid Email or Password.');
            return res.redirect('/login');
        }
        console.log(user);

        bcrypt.compare(password, user.password)
            .then(result => {
                if(result){
                    req.session.isLoggedIn = true;
                    // req.session.isSu = req.session.user.role;
                    // req.session.role = User.role;
                    req.session.user = user;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                    
                }
                req.flash('err','Invalid Email or Password.');
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
    let message = req.flash('err');
        if(message.length > 0){
            message = message[0];
        }
        else{
            message = null;
        }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
      });
}

exports.postSignup = (req,res,next)=> {
    const usrNm = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const image = req.file;
    const age = req.body.age;
    const name = req.body.name;
    const country = req.body.country;
    const category = req.body.category;
    // console.log(image);
    console.log(age);
    User.findOne({email:email,usrNm:usrNm})
    .then(UserDoc => {
        if(UserDoc){
            req.flash('err','User Already Exists!!');
            return res.redirect('/signup');
        }

        const imageUrl = image.path;
        console.log(imageUrl);
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                userName: usrNm,
                name: name,
                age: age,
                country: country,
                category: category,
                email: email,
                imageUrl: imageUrl,
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

exports.getReset = (req,res,next)=> {
    let message = req.flash('err');
        if(message.length > 0){
            message = message[0];
        }
        else{
            message = null;
        }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset',
        errorMessage: message
      });
}

exports.postReset = (req,res,next)=>{
    const email = req.body.email;
    const masterKey = req.body.masterKey;
    const newPwd = req.body.newPassword;
    User.findOne({email:email})
    .then(usrDoc=> {
        if (usrDoc){ 
            console.log(masterKey.toString());
            if(masterKey.toString() === usrDoc.userName.toString()){
                return bcrypt.hash(newPwd, 12)
                .then(hashPwd =>{
                    password = hashPwd;
                    User.findById(user._id)
                    .then(user =>{
                        usrDoc.password = hashPwd;
                        return usrDoc.save();
                    })
                    .then(result => {
                        res.redirect('/login');
                    })
                })
                .catch(err=> {
                    console.log(err);
                })
            }
            else{
                req.flash('err',"Wrong MasterKey!!!");
                return res.redirect('/reset') 
            }
        }
        else {
            req.flash('err',"User Doesn't Exist!!!");
            return res.redirect('/reset')

        }
    })
    
        
    
    
    


}