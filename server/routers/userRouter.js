const express = require ('express');
const router = express.Router();
const usercontroller = require ('../controllers/usercontroller');
const multer = require('multer');
const upload = require('../utils/upload')

router.post('/user',usercontroller.Createusers);
router.get('/user',usercontroller.view)
router.get('/userall',usercontroller.viewall)
router.get('/user/:id',usercontroller.singleuser)
router.delete('/user/:id', usercontroller.deleteuser);
router.put('/user',usercontroller.edituser);

router.post('/Add/:userId', upload.array('Images', 10), usercontroller.addproduct);  // 'Images' is the field name, max 10 files
router.get('/Fetchcategories',usercontroller.fetchCategory);
router.get('/View',usercontroller.viewallproducts);
router.get('/Sellerproducts/:id',usercontroller.Sellerproducts);

router.get('/Single/:id',usercontroller.singleproductview);
router.get('/singleuser/:id',usercontroller.soloUser);
router.post('/Addtocart',usercontroller.addToCart)
router.post('/addtowishlist',usercontroller.addToWishlist);
router.get('/wishlistproducts/:id',usercontroller.wishlistaddedproducts);
router.delete('/delete/:id', usercontroller.deleteproduct);
router.get('/singlecartimg/:id',usercontroller.singlecart);
router.post('/updateCarts/:userId', usercontroller.updateCart);
router.put('/edit/:id',usercontroller.editsellerproduct);
router.delete('/deleteproduct/:id/:productId',usercontroller.deletewishlistproduct);
router.delete('/deleteproductcart/:id/:productId',usercontroller.deleteaddtocarttproduct);
router.get('/totalbuyers',usercontroller.totalBuyers);
router.get('/totalseller',usercontroller.totalseller);
router.get('/sellerDetails',usercontroller.sellerDetails);
router.get('/buyerDetails',usercontroller.BuyerDetails);
router.patch('/BlockSeller/:id',usercontroller.BlockSeller);
router.patch('/BlockBuyer/:id',usercontroller.BlockBuyer);
router.post('/order/:id',usercontroller.order);
router.put('/buyerUpgrade/:userId',usercontroller.buyerUpgrade);
router.get('/ViewOrders/:userId',usercontroller.ViewOrders);
router.get('/ViewWishlist/:userId',usercontroller.ViewWishlist);
router.get('/Viewselleraddedproducts',usercontroller.ViewallSellerproducts);
router.patch('/BlockProduct/:id',usercontroller.BlockProduct);
router.get('/gotoCart/:userId',usercontroller.gotoCart);
router.get('/sellerAddedProducts/:userId',usercontroller.sellerAddedProducts);
router.delete('/userdelete/:id',usercontroller.deleteuser);
router.get('/Singlee/:id',usercontroller.SingleproductEdit);
router.put('/update/:id', usercontroller.updateProduct);
router.delete('/DeleteSeedetails/:id',usercontroller.deleteseedetailsproducts);
// router.delete('/RemoveFromWishlist/:userId/:productId', usercontroller.RemoveFromWishlist);
// router.delete('/deleteWishlist/:productId',usercontroller.)
// router.post('/UpgradeSeller',usercontroller.requestUpgrade);




module.exports = router