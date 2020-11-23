const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//importing errror controller
const econtroller = require('./controllers/err');

const sqlz  = require('./util/db');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
//setting up the view wngine
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



   

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);

sqlz
    .sync()
    .then(result=>{
        
        return User.findByPk(1);
       // console.log(result);
    })
    .then(user=>{
        if(!user){
            return User.create({name: 'Max', email: 'letssee@op.com'});
        }
        return user;
    })
    .then(user=>{
        //console.log(user);
        app.listen(4000);
    })
    .catch(err=>{
        console.log(err);
    });

    app.use((req,res,next) => {
        console.log("Hii ✌");

        User.findByPk(1)    
            .then(user => {
                req.user = user;
                //console.log("USER: ",req.user)
                next();
            })
            .catch(err => console.log(err));
    });





//filtering "/admin" routes to adminData.routes
app.use('/admin',adminRoutes);

// setting up middleware to use shopRoutes declared above:
app.use('/',shopRoutes);

//404 route declaration
app.use(econtroller.pgnotfnd);