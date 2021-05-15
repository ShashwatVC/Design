const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const econtroller = require('./controllers/err');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://tester:tester19@cluster0.hg8rf.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
//setting up the view engine

app.set('view engine','ejs');
app.set('views','views');

//importing the modules for routes
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth.js');

const { userInfo } = require('os');
const { maxHeaderSize } = require('http');


// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0],result[1]);
//     })
//     .catch(err=>{
//         console.log(err);
//     });

//Middlewares...
//setting up body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
// serving static files
app.use(express.static(path.join(__dirname,'public')));
// sessions middleware
app.use(session({secret: 'my seceret', resave: false, saveUninitialized: false, store:store}));

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