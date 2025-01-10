import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnsokHomePage from "./Component/OnsokHomePage/OnsokHomePage";
import './Component/OnsokHomePage/OnsokHomePage.css'
import Login from "./Component/Login/Login";
import './Component/Login/Login.css'
import Signup from "./Component/Signup/Signup";
import './Component/Signup/Signup.css'
import View from "./Component/View/View";
import './Component/View/View.css'
import Single from "./Component/SellerSingle/SellerSingle";
import './Component/SellerSingle/SellerSingle.css'
import Cart from "./Component/Add-to-cart/Add-to-cart";
import './Component/Add-to-cart/Add-to-cart.css'
import Wishlist from "./Component/SellerWishlist";
import './Component/SellerWishlist.css'
import Add from "./Component/Add/Add";
import './Component/Add/Add.css'
import Myaccount from "./Component/Myaccount/Myaccount";
import './Component/Myaccount/Myaccount.css'
import SellerProducts from "./Component/Seller/Seller";
import './Component/Seller/Seller.css'
import Buyer from "./Component/Buyer/Buyer";
import './Component/Buyer/Buyer.css'
import OrderPage from "./Component/OrderPage/OrderPage";
import AdminDashboard from "./Component/AdminDashboard/Admin";
import './Component/AdminDashboard/Admin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Totalsellerdetailspage from "./Component/TotalSeller/Totalsellerdetailspage";
import './Component/TotalSeller/Totalsellerdetailspage.css'
import TotalBuyerpage from "./Component/TotalBuyer/TotalBuyer";
import './Component/TotalBuyer/TotalBuyer.css'
import Orders from "./Component/Orders/Orders";
import WishListproducts from "./Component/WishList/WishList";
import './Component/WishList/WishList.css'
import   AdminAllproduts from "./Component/AdminAllproduts/AdminAllproduts";
import GotoCart from "./Component/GotoCart/GotoCart";
import SeeDetails from "./Component/SeeDetails/SeeDetails";
import SingleproductEdit from "./Component/Seller/SingleproductEdit";
import './Component/Seller/SingleproductEdit.css'
import Singlee from "./Component/SeeDetails/Singlee";
import UpgradeRequestPage from "./Component/Request/UpgradeRequestPage";
import AdminApproveRequests from "./Component/AdminDashboard/ApproveUpgradeRequest";
import './Component/Request/UpgradeRequestPage.css'
import Shop from "./Component/Shop/Shop";
import './Component/Shop/Shop.css'
import About from "./Component/About/About";
import './Component/About/About.css'
import Contact from "./Component/Contact/Contact";
import './Component/Contact/Contact.css'
import Profile from "./Component/Profile/Profile";
import './Component/Profile/Profile.css'
import Llogin from "./Component/Myaccount/Security";
import './Component/Myaccount/Security.css'
import Prime from "./Component/Myaccount/Prime";
import './Component/Myaccount/Prime.css'
import Address from "./Component/Myaccount/Address";
import './Component/Myaccount/Address.css'
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Correct way to specify the component */}
          <Route path="/" element={<OnsokHomePage />} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/View" element={<View />} />
          <Route path="/Single" element={<Single />}/>
          <Route path="/Cart" element={<Cart />}/>
          <Route path="/Wishlist" element={<Wishlist />}/>
          <Route path="/Add" element={<Add />}/>
          <Route path="/Myaccount" element={<Myaccount />}/>
          <Route path="/SellerProducts" element={< SellerProducts/>}/>
          {/* <Route path="/Single" element={<Single />}/> */}
          {/* <Route path="/Product" element={<ProductinAddtoCart />}/> */}
          <Route path="/Buyer" element={<Buyer />}/>
          <Route path="/OrderPage" element={<OrderPage />}/>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="/Totalsellerdetailspage" element={<Totalsellerdetailspage />}/>
          <Route path="/TotalBuyerpage" element={<TotalBuyerpage />}/>
          <Route path="/Orders" element={<Orders />}/>
          <Route path="/WishListproducts" element={<WishListproducts />}/>
          <Route path="/AdminAllproduts" element={<AdminAllproduts />}/>
          <Route path="/GotoCart" element={<GotoCart />}/>
          <Route path="/SeeDetails" element={<SeeDetails />}/>
          <Route path="/SingleproductEdit" element={<SingleproductEdit />}/>
          <Route path="/Singlee" element={<Singlee />}/>
          <Route path="/UpgradeRequestPage" element={<UpgradeRequestPage />}/>
          <Route path="/AdminApproveRequests" element={<AdminApproveRequests />}/>
          <Route path="/Shop" element={<Shop />}/>
          <Route path="/About" element={<About />}/>
          <Route path="/Contact" element={<Contact />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/Llogin" element={<Llogin />}/>
          <Route path="/Prime" element={<Prime />}/>
          <Route path="/Address" element={<Address />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
