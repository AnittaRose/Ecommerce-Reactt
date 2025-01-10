import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function GotoCart() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  let token_key = params.get('login');
    let id = params.get('userId');

    let token = localStorage.getItem(token_key);
    console.log("Token:", token);
  
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // Helper function to calculate totals
  const calculateTotals = (items) => {
    let totalQty = 0;
    let totalCost = 0;
    items.forEach((item) => {
      totalQty += item.quantity;
      totalCost += item.price * item.quantity;
    });
    setTotalQuantity(totalQty);
    setTotalPrice(totalCost);
  };

  useEffect(() => {
    const loadCartAndProducts = async () => {
      try {
        // if (!userId) {
        //   console.error('Missing userId');
        //   return;
        // }

        // Fetch cart items
        const userId = localStorage.getItem("userId");
        console.log("userId",userId);
        const cartResponse = await axios.get(`http://localhost:3000/gotoCart/${userId}`);
        console.log("cartresponse :",cartResponse);
        if (cartResponse.status !== 200) {
          throw new Error(`Failed to fetch cart products: ${cartResponse.status}`);
        }
        const cartData = cartResponse.data.cartItems || [];

        // Fetch product details
        const productResponse = await axios.get('http://localhost:3000/View');
        if (productResponse.status !== 200) {
          throw new Error(`Failed to fetch products: ${productResponse.status}`);
        }
        const productData = productResponse.data.data || [];

        console.log('Cart items:', cartData);
        console.log('Product data:', productData);

        // Merge cart items with product details
        const mergedData = cartData.map((cartItem) => {
          const product = productData.find((prod) => prod._id === cartItem.productId);
          return product ? { ...cartItem, ...product } : cartItem; // Merge product details into cart item
        });
        console.log('Merged data:', mergedData);

        setCartItems(mergedData);
        calculateTotals(mergedData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    loadCartAndProducts();
  }, [userId]);

  const handleQuantityChange = async (item, increment) => {
    const newQuantity = item.quantity + increment;

    if (newQuantity < 1) return; // Prevent zero or negative quantities

    // Optimistic UI update (update quantity locally first)
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.productId._id === item.productId._id
        ? { ...cartItem, quantity: newQuantity }  // Ensure the correct productId is compared
        : cartItem
    );

    setCartItems(updatedCartItems);  // Update the cart state

    // Calculate new total
    calculateTotals(updatedCartItems);

    try {
      // Update the cart in the backend (make sure the correct request body is sent)
      await axios.post(`http://localhost:3000/updateCarts/${userId}`, {
        productId: item.productId._id,  // Send the correct productId
        newQuantity,
      });

      // Optionally, you can refetch the cart data after updating to ensure consistency
    } catch (error) {
      console.error('Error updating cart:', error);

      // Handle failure, revert optimistic update if necessary
      setCartItems(cartItems);
      calculateTotals(cartItems);
    }
};


// const removeCartItem = async (itemId) => {
//   try {
//     console.log(`Deleting product with ID: ${itemId}`);

//     // Retrieve token from URL params and localStorage
//     let params = new URLSearchParams(window.location.search);
//     let token_key = params.get("login");
//     let userId = params.get("id");

//     let token = localStorage.getItem(token_key);

//     if (!token) {
//       console.error("Token is missing. Please log in.");
//       alert("You are not logged in. Please log in first.");
//       return;
//     }

//     if (!userId) {
//       console.error("User ID is missing.");
//       alert("User ID is missing. Please log in again.");
//       return;
//     }

//     // Send DELETE request to backend API
//     const response = await fetch(`http://localhost:3000/cart/${userId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ productId: itemId })  // Pass productId in the body
//     });

//     // Check if the deletion was successful
//     if (!response.ok) {
//       throw new Error("Failed to delete the product.");
//     }

//     const result = await response.json();
//     console.log(`Product deleted successfully.`);

//     // Update the UI to remove the item from the cart
//     setCartItems((prevCart) => prevCart.filter((item) => item._id !== itemId));
    
//     alert(result.message || "Product deleted successfully.");

//     // Reload the page after successful deletion to reflect changes
//     window.location.reload();
//   } catch (error) {
//     console.error(`Error deleting product with ID ${itemId}:`, error);
//     alert("Failed to delete the product. Please try again later.");
//   }
// };


const removeCartItem = async (itemId) => {
  // Check if userId or token is missing
  if (!userId || !token) {
      alert("User ID or token is missing. Please log in again.");
      navigate("/login"); // Redirect to login page
      return; // Stop the removal process if user is not logged in
  }

  try {
      console.log(`Deleting product with ID: ${itemId}`);

      // Send DELETE request to backend API
      const response = await fetch(`http://localhost:3000/cart/${userId}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: itemId })  // Pass productId in the body
      });

      if (!response.ok) {
          throw new Error("Failed to delete the product.");
      }

      const result = await response.json();
      console.log(`Product deleted successfully.`);

      // Update the UI to remove the item from the cart
      setCartItems((prevCart) => prevCart.filter((item) => item._id !== itemId));

      alert(result.message || "Product deleted successfully.");
      window.location.reload();  // Optionally reload to reflect the changes
  } catch (error) {
      console.error(`Error deleting product with ID ${itemId}:`, error);
      alert("Failed to delete the product. Please try again later.");
  }
};











// Utility function to extract userId from token (assuming JWT)

const getUserIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    return payload.userId;  // Assuming the userId is in the token's payload
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
};


  const Checkout = (checkoutData, totalPrice) => {
    const encodedCheckoutData = encodeURIComponent(JSON.stringify(checkoutData));
    const encodedTotalPrice = encodeURIComponent(totalPrice);
    navigate(`/OrderPage?userId=${encodeURIComponent(userId)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const Onsok = () =>{
    navigate(`/Buyer?login=${token_key}&id=${userId}`)
  }

  return (
    <>
<div className='pt-3'>
<div className="header">
        <div className="logo">
          <span onClick={() => Onsok(userid)}>onsko</span> {/* Correct usage */}
        </div>
        <div className="nav">
          <a href="#">Home</a>
          <a href="#">shop</a>
          <a href="#">about</a>
          <a href="#">Contact</a>
        </div>
</div>
</div>
    
    <div className="cart-wrapper pt-5">
      {cartItems.map((item) => {
        const imageUrl = item.productId && item.productId.Images && Array.isArray(item.productId.Images) && item.productId.Images[0]
        ? `http://localhost:3000/${item.productId.Images[0]}`
        : 'http://localhost:3000/path/to/placeholder-image.jpg'; // Fallback image
      

        return (
          <div  className="cart-item-container">
            <div className="cart-item-content">
              <div className="cart-item-image">
              <img src={imageUrl} alt={item.Title || 'Product'} className="cart-img" />
              </div>
              <div className="cart-item-details">
              <h1 className="cart-item-title">{item.productId?.Title || 'Default Title'}</h1>
                <p className="cart-item-description">{item.productId?.Description}</p>
                <h2 className="cart-item-price">${item.productId?.Price}</h2>
                <h3 className="cart-item-remove" onClick={() => removeCartItem(item.productId._id)}>Remove</h3>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-wrapper">
                  <div className="quantity-display">{item.quantity}</div>
                  <div className="quantity-controls d-flex">
                    <button className="quantity-increase" onClick={() => handleQuantityChange(item, 1)}>+</button>
                    <div className='px-4'><button className="quantity-decrease" onClick={() => handleQuantityChange(item, -1)}>-</button></div>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        );
      })}

      <div className="cart-summary px-5">
        <h1 className="summary-title">Subtotal</h1>
        <h2 className="summary-items">{totalQuantity} Items</h2>
        <h3 className="summary-total">${totalPrice.toFixed(2)}</h3>
        <h4 className="summary-note">Shipping + Tax Included</h4>
        <button className="checkout-button" onClick={() => Checkout(cartItems, totalPrice)}>
          Purchase
        </button>
      </div>
    </div>



    <div className='greenn'>
        <div className='row p-5'>
            <div className='col-3'>
              <div className='fs-3 fw-bold link-light'>Shop</div>
              <div className='pt-3 link-light'>home</div>
              <div className='link-light'>about</div>
              <div className='link-light'>Shop</div>
              <div className='link-light'>blog</div>
            </div>
            <div className='col-3'>
              <div className='fs-3 fw-bold link-light'>Policy</div>
              <div className='pt-3 link-light'>terms & conditions</div>
              <div className='link-light'>privacy policy</div>
              <div className='link-light'>refund policy</div>
            </div>
             <div className='col-3'>
              <div className='fs-3 fw-bold link-light'>contact</div>
              <div className='pt-3 link-light'>500 terry francine street</div>
              <div className='link-light'>san francisco, ca 94158</div>
              <div className='link-light'>info@mysite.com</div>
            </div>
        </div>


        <div className='d-flex justify-content-between'>
          <div className='fs-1 fw-bold link-light p-5'>onsko</div>
          <div className=''>
             <div className='fs-1 fw-bold link-light p-5'>subscribe to our newsletter</div>
             <div className='px-5'>
                <div className='fs-5 link-light'><label htmlFor="">Email</label></div>
                <div className='pt-3'><input type="email" className='w-100 p-3 bggg' /></div>
             </div>
             <div className='px-5 pt-2 d-flex '>
                <div className=''><input type="checkbox" /><span className='px-3 link-light'>Yes, subscribe me to your newsletter.</span></div>
                <div className=''><button className='subsc'>Subscribe</button></div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GotoCart;
