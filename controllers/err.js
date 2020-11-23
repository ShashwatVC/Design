exports.pgnotfnd = (req,res,next)=>{
    res.status(404).render('pagenotfound.ejs', {pageTitle:'page not found', path:'error'});
};