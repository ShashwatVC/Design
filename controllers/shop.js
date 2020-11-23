const P = require('../models/product')
const C = require('../models/cart')

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
  C.getCart(cart => {
    P.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};


exports.postCart = (req,res,next) =>{
    const prodID = req.body.pid;
    P.findByPk(prodID,(prod) =>{
    C.addProduct(prodID,prod.price);
    //console.log(prod.title);
    });
    
     res.redirect('/cart');
}

exports.postCartDeleteProduct = (req,res,next) =>{
    const prodID = req.body.pid;
    P.findById(prodID, product =>{
        C.deleteProduct(prodID, product.price);
        res.redirect('/cart');
    });
};
    
    


exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        pageTitle:'CheckOut',
        
    });
};

exports.getOrders = (req,res,next)=>{
    res.render('shop/orders',{
        pageTitle:'Orders',
        path:'/orders'
    });
};