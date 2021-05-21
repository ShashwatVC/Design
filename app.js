const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const econtroller = require('./controllers/err');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf =  require('csurf');
const multer = require('multer');
const flash = require('connect-flash');

const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://tester:tester19@cluster0.hg8rf.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

const csrfProtec = csrf();
//setting up the view engine

app.set('view engine','ejs');
app.set('views','views');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'images');
    },
    filename:(req,file,cb) => {
        cb(null, file.originalname);
    }
})

const filefilter = (req,file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg'){
    cb(null, true)
    }
    else{
    cb(null, false)
    }
};

//importing the modules for routes
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth.js');

const { userInfo } = require('os');
const { maxHeaderSize } = require('http');

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage: fileStorage, filefilter: filefilter}).single('image'));
// serving static files
app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));

// sessions middleware
app.use(
    session({
        secret: 'my seceret', 
        resave: false, 
        saveUninitialized: false, 
        store:store
    })
    );
app.use(csrfProtec);
app.use(flash());
app.use((req,res,next) => {
    if (!req.session.user){
        return next();
    }
    console.log("Hii ✌");
    User.findById(req.session.user._id)    
        .then(user => {
            req.user = user;
            //console.log("USER: ",req.user)
            next();
        })
        .catch(err => console.log(err));
    
});

app.use((req,res,next)=> {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();

})

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});
    
    

// //filtering "/admin" routes to adminData.routes
app.use('/admin',adminRoutes);

// filtering auth routes

app.use(authRoutes);

// // setting up middleware to use shopRoutes declared above:
 app.use(shopRoutes);

//404 route declaration
app.use(econtroller.pgnotfnd);