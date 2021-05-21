module.exports = (req,res,next) => {
    if(req.session.isLoggedIn === true && req.session.user.role === 'superuser'){
        console.log(req.session.user.role);
        next();
    }
    return res.redirect('/login');
    
}