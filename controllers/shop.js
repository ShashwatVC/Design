// const { RAW } = require('sequelize/types/lib/query-types');
const P = require('../models/product');
const Order = require('../models/order');
const order = require('../models/order');
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
            isAuthenticated: req.session.isLoggedIn
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
            isAuthenticated: req.session.isLoggedIn      
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
            isAuthenticated: req.session.isLoggedIn  
            
        });
    })
    .catch(err=>{
        console.log(err);
    });
    
};
exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
        .then(user => {
            console.log(user.cart.items);
            const products = user.cart.items;
            res.render('shop/cart',{
                pageTitle:'Cart',
                path:'/cart',
                products: products,
                isAuthenticated: req.session.isLoggedIn  
            });
        })
        .catch(err => console.log(err));

};


exports.postCart = (req,res,next) =>{
    const prodID = req.body.pid;

    P.findById(prodID)
    .then(product => {
        return req.user.addToCart(product);

    })
    .then(result => {
        console.log(result)
        res.redirect('/cart');

    })
    .catch(err => {
        console.log(err);
    })

     
}

exports.postCartDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
   
};

exports.postOrder= (req,res,next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i=> {
                return {quantity: i.quantity, product: {...i.productId._doc}};
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    email: req.user.email,
                    userId: req.user._id
                },
                products: products
            });
            // console.log(order);
            return order.save();
        })
        .then( result => {
            return req.user.clearCart();
                
        })
        .then(() => {
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
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        //console.log(orders);
        res.render('shop/orders',{
            pageTitle:'Orders',
            path:'/orders',
            orders : orders,
            isAuthenticated: req.session.isLoggedIn  
        });
    })
    
    
    .catch(err => console.log(err));
    
};