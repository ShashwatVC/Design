//const Product = require('../models/product');

const Product = require('../models/product');
const user = require('../models/user');

const P = require('../models/product')


exports.getAddProduct = (req,res,next)=>{// app.post to filter requests to post requests could be done for GET,POST,DELETE,PATCH,UPDATE
    if (!req.session.isLoggedIn){
      return res.redirect('/login')
    }
    res.render('admin/edit',{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        editing:false,
        isAuthenticated: req.session.isLoggedIn,
        
    });

};

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl= req.body.imageurl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title, 
        price:price, 
        imageUrl: imageUrl, 
        description: description,
        userId: req.user._id
    });
        product
        .save()
        .then(result=>{
            //console.log(result);
            console.log('Created');
            res.redirect('/products');
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getEditProduct = (req,res,next)=>{// app.post to filter requests to post requests could be done for GET,POST,DELETE,PATCH,UPDATE
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.id;
    
    P.findById(prodId)
    .then(product => {
        
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing: true,
            products: product,
            isAuthenticated: req.session.isLoggedIn,
            isSu: req.session.user.role


        });
         
    })
    .catch(err=>{
        console.log(err);
    });
    

};

exports.getAdminProducts = (req,res,next) =>{
    res.render('admin/products.ejs',{
        pageTitle:'Admin Products',
        path:'/admin/products',
        // activeShop: true,
        // productCSS: true,
        isAuthenticated: req.session.isLoggedIn,
        

    });
};

exports.postEditProduct = (req,res,next) =>{
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedImageurl= req.body.imageurl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    
    P.findById(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.imageUrl = updatedImageurl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product
        .save()
    })
        
    .then( result => {
        console.log('UPDATED')
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
    

}

exports.getProducts = (req,res,next)=>{
    //const products = adminData.products; was used when controller wasn't set up...

        P.find()
        // .select('title price -_id')
        .populate('userId')
        // req.user
        // .getProducts()
        .then(products=>{
            // console.log(products);
            res.render('admin/products',{
                prods:products, 
                pageTitle:'Admin Products',
                path:'/admin/products',
                isAuthenticated: req.session.isLoggedIn,
                isSu: req.session.user.role

             });
        })
        .catch(err=>{
            console.log(err);
        });
        
};

exports.postDeleteproduct = (req,res,next)=>{
    const prodId = req.body.id;
        P.findByIdAndRemove(prodId)
        .then(() => {
            console.log('DELETED');
            res.redirect('/admin/products')
        })
        .catch(err=>console.log(err));
    
};

exports.getEditProfile = (req,res,next) =>{
    const uID = req.session.user._id;
    user.findById(uID)
    .then(user=>{
        res.render('admin/editProfile.ejs',{
            pageTitle:'Edit Profile',
            path:'/admin/editProfile',
            isAuthenticated: req.session.isLoggedIn,
            user: user
        });
    });
}
exports.postEditProfile = (req,res,next) =>{
    const image = req.file;
    const updatedName = req.body.userName;
    const updatedAge = req.body.age;
    const updatedCountry = req.body.country;
    const updatedCategory = req.body.category;
    const updatedEmail = req.body.email;
    const uID = req.session.user._id;
    if(!image){
        user.findById(uID)
        .then(user=>{   
        user.imageUrl = user.imageUrl;
        user.name = updatedName;
        user.age = updatedAge;
        user.country = updatedCountry;
        user.category = updatedCategory;
        user.email = updatedEmail;
        return user.save();
        })
        .then(result => {
            res.redirect('/admin/profile');    
            // isAuthenticated: req.session.isLoggedIn;
        })
    }  
    else{
        const updatedImageUrl = image.path
        user.findById(uID)
        .then(user=>{   
        user.imageUrl = updatedImageUrl;
        user.name = updatedName;
        user.age = updatedAge;
        user.country = updatedCountry;
        user.category = updatedCategory;
        user.email = updatedEmail;
        return user.save();
        })
        .then(result => {
            res.redirect('/admin/profile');    
            // isAuthenticated: req.session.isLoggedIn;
        })
    }
        
}

exports.getUsers = (req,res,next) =>{
    const uid = req.session.user._id;
    
    // console.log(uid);
    user.findById(uid)
    .then(user=>{
        // console.log(user);
        res.render('admin/profile.ejs',{
            user : user,
            pageTitle: user.userName,
            path:'/admin/Profile',
            isAuthenticated: req.session.isLoggedIn,

        });
    })

    
}
