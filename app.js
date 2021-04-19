const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//importing errror controller
const econtroller = require('./controllers/err');

const mongoose = require('mongoose');
// const mongoConnect = require('./util/db').mongoConnect;

const User = require('./models/user');

const app = express();

//setting up the view engine

app.set('view engine','ejs');
app.set('views','views');

//importing the modules for routes
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const { userInfo } = require('os');
const { maxHeaderSize } = require('http');


// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0],result[1]);
//     })
//     .catch(err=>{
//         console.log(err);
//     });

//setting up body parser middleware
app.use(bodyParser.urlencoded({extended:false}));

// serving static files
app.use(express.static(path.join(__dirname,'public')));



app.use((req,res,next) => {
    console.log("Hii ✌");

    User.findById('607dce1bc77b7124b80895b9')    
        .then(user => {
            req.user = user;
            //console.log("USER: ",req.user)
            next();
        })
        .catch(err => console.log(err));
    
});

mongoose.connect('mongodb+srv://tester:tester19@cluster0.hg8rf.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne()
    .then(user => {
        if(!user){
            const user = new User({
                name: 'Mximoff',
                email: 'max@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});
    
    

// //filtering "/admin" routes to adminData.routes
app.use('/admin',adminRoutes);

// // setting up middleware to use shopRoutes declared above:
 app.use(shopRoutes);

//404 route declaration
app.use(econtroller.pgnotfnd);