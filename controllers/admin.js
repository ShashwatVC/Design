//const Product = require('../models/product');
const Product = require('../models/product');
const P = require('../models/product')

exports.getAddProduct = (req,res,next)=>{// app.post to filter requests to post requests could be done for GET,POST,DELETE,PATCH,UPDATE
    res.render('admin/edit',{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        editing:false
    });

};

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const imageurl= req.body.imageurl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageurl);
        product
        .save()
        .then(result=>{
            //console.log(result);
            console.log('Created');
            res.redirect('/admin/products');
        })
        .catch(err=>{
            console.log(err);
        });
};

// exports.getEditProduct = (req,res,next)=>{// app.post to filter requests to post requests could be done for GET,POST,DELETE,PATCH,UPDATE
//     const editMode = req.query.edit;
//     if(!editMode){
//         return res.redirect('/');
//     }
//     const prodId = req.params.id;
//     req.user
//     .getProducts({where:{id:prodId}})
//     //P.findByPk(prodId)
//     .then(products => {
//         const product = products[0];
//         if(!product){
//             return res.redirect('/');
//         }
//         res.render('admin/edit',{
//             pageTitle:'Edit Product',
//             path:'/admin/edit-product',
//             editing: true,
//             products: product

//         });
         
//     })
//     .catch(err=>{
//         console.log(err);
//     });
    

// };

// // exports.getAdminProducts = (req,res,next) =>{
// //     res.render('admin/products.ejs',{
// //         pageTitle:'Admin Products',
// //         path:'/admin/products',
// //         activeShop: true,
// //         productCSS: true
// //     });
// // };

// exports.postEditProduct = (req,res,next) =>{
//     const prodId = req.body.id;
//     const updatedTitle = req.body.title;
//     const updatedImageurl= req.body.imageurl;
//     const updatedPrice = req.body.price;
//     const updatedDescription = req.body.description;
//     P.findByPk(prodId)
//         .then(product =>{
//             product.title = updatedTitle;
//             product.imageurl = updatedImageurl;
//             product.price = updatedPrice;
//             product.description = updatedDescription;
//             return product.save()
//         })
//         .then( result => {
//             console.log('UPDATED')
//             res.redirect('/admin/products');
//         })
//         .catch(err=>{
//             console.log(err);
//         });
    

// }

// exports.getProducts = (req,res,next)=>{
//     //const products = adminData.products; was used when controller wasn't set up...

//         //P.findAll()
//         req.user
//         .getProducts()
//         .then(products=>{
//             res.render('admin/products',{
//                 prods:products, 
//                 pageTitle:'Admin Products',
//                 path:'/admin/products',   
//              });
//         })
//         .catch(err=>{
//             console.log(err);
//         });
        
// };

// exports.postDeleteproduct = (req,res,next)=>{
//     const prodId = req.body.id;
//         P.findByPk(prodId)
//         .then(product =>{
//             return product.destroy();
//         })
//         .then(result => {
//             console.log('DELETED');
//             res.redirect('/admin/products')
//         })
//         .catch(err=>console.log(err));
    
// }
