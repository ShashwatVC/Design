const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//importing errror controller
const econtroller = require('./controllers/err');

const mongoConnect = require('./util/db').mongoConnect;

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
        // console.log("Hii ✌");

        // User.findByPk(1)    
        //     .then(user => {
        //         req.user = user;
        //         //console.log("USER: ",req.user)
        //         next();
        //     })
        //     .catch(err => console.log(err));
        next();
    });

mongoConnect(() => {
    app.listen(4000);
})

// //filtering "/admin" routes to adminData.routes
app.use('/admin',adminRoutes);

// // setting up middleware to use shopRoutes declared above:
 app.use('/',shopRoutes);

//404 route declaration
app.use(econtroller.pgnotfnd);