const P = require('../models/product');
//const  Order = require('../models/order');
//const CartItem = require('../models/cart-item');


exports.getIndex = (req,res,next)=>{
    P.find()
    .then(products => {
        console.log(products);
        res.render('shop/index',{
            prods:products,
            pageTitle:'Shop',
            path:'/',      
        });
    })
    .catch(err=>{

        console.log(err);
    });
    
};

exports.getProducts = (req,res,next)=>{
    //const products = adminData.products; was used when controller wasn't set up...
       P.find()
    .then(products => {
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'Products',
            path:'/Products',      
        });
    })
    .catch(err=>{
        
        console.log(err);
    });
};

exports.getProd = (req,res,next)=> {
    const prodID = req.params.id;
    P.findById(prodID)
    .then(product=>{
        res.render('shop/product-detail',{
            product : product,
            pageTitle: product.title,
            path:'/Products',
            
        });
    })
    .catch(err=>{
        console.log(err);
    });
    
};




exports.getCart = (req, res, next) => {
    req.user
    .getCart()
        .then(products => {
            res.render('shop/cart',{
                pageTitle:'Cart',
                path:'/cart',
                products: products
            });
        })
        .catch(err => console.log(err));

};


exports.postCart = (req,res,next) =>{
    const prodID = req.body.pid;

    P.findById(prodID)
    .then(product => {
        req.user.addToCart(product);
        res.redirect('/cart');

    })
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })

     
}

exports.postCartDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
   
};

exports.postOrder= (req,res,next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then( result => {
            res.redirect('/orders');     
        })
        .catch(err => console.log(err));
 };
    


exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle:'CheckOut',
        
    });
};

exports.getOrders = (req,res,next)=>{
    req.user
    .getOrders()
    .then(orders => {
        //console.log(orders);
        res.render('shop/orders',{
            pageTitle:'Orders',
            path:'/orders',
            orders : orders
        });
    })
    .catch(err => console.log(err));
    
};