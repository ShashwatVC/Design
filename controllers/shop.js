const P = require('../models/product');
const  Order = require('../models/order');
const CartItem = require('../models/cart-item');


exports.getIndex = (req,res,next)=>{
    P.findAll()
    .then(products => {
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
       P.findAll()
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
    P.findByPk(prodID)
    .then(product=>{
        res.render('shop/product-detail',{
            product : product,
            pageTitle:product.title,
            path:'/Products',
            
        });
    })
    .catch(err=>{
        console.log(err);
    });
    
};


// exports.getCart = (req,res,next)=>{
//     res.render('shop/cart',{
//         pageTitle:'Cart',
//         path:'/cart'
//     });
// };

exports.getCart = (req, res, next) => {
    req.user
    .getCart()
        .then(cart => {
            return cart.getProducts()
            .then(products =>{
                res.render('shop/cart',{
                    pageTitle:'Cart',
                    path:'/cart',
                    products: products
                });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
//   C.getCart(cart => {
//     P.fetchAll(products => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           prod => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//       });
//     });
//   });
};


exports.postCart = (req,res,next) =>{
    const prodID = req.body.pid;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where:{id:prodID}});
        })
        .then(products =>{
            let product;
            if(products.length>0){
                 product = products[0];
            }
            // let newQuantity = 1;
            if(product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity+1;
                return product;
            }
            return P.findByPk(prodID)
                
        
        })
        .then(product=>{
            return fetchedCart.addProduct(product, {
                through:{quantity: newQuantity}
            }); 
        })
        .then( () => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    
    
     
}

exports.postCartDeleteProduct = (req,res,next) =>{
    const prodID = req.body.pid;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({WHERE: {id: prodID}});

        })
        .then(products => {
            const product = products[0];
            product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
   
};

exports.postOrder= (req,res,next) => {
    let fetchedCart;

    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(
                products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    console.log(product);

                    return product;
                })

            );

        })
        .catch(err => console.log(err));

    })
    .then( result => {
       return fetchedCart.setProducts(null);
           
    })
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
    req.user.getOrders({include : ['products']})
    .then( orders => {
        //console.log(orders);
        res.render('shop/orders',{
            pageTitle:'Orders',
            path:'/orders',
            orders : orders
        });
    })
    .catch(err => console.log(err));
    
};