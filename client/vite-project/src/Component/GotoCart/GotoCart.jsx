import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function GotoCart() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

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
        if (!userId) {
          console.error('Missing userId');
          return;
        }

        // Fetch cart items
        const cartResponse = await axios.get(`http://localhost:3000/gotoCart/${userId}`);
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

    // Optimistic UI update
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.productId._id === item.productId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setCartItems(updatedCartItems);

    // Calculate new total
    calculateTotals(updatedCartItems);

    try {
      await axios.post(`http://localhost:3000/updateCarts/${userId}`, {
        productId: item.productId,
        newQuantity,
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      await axios.post('http://localhost:3000/RemoveCartItem', { productId });

      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
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

  return (
    <>
    <div className='pt-3'>
        <div className='navba'>
            <div className='d-flex justify-content-center'>
                <div className='px-2 pt-2'><strong>Onsko</strong></div>
                <div className='px-2 pt-2'>Home</div>
                <div className='px-2 pt-2'>Store</div>
                <div className='px-2 pt-2'>About</div>
                <div className='px-2 pt-2'>Contact</div>
            </div>
        </div>
    </div>
    <div className="cart-wrapper pt-5">
      {cartItems.map((item) => {
        const imageUrl = item.productId.Images?.[0]
          ? `http://localhost:3000/${item.productId.Images[0]}`
          : 'http://localhost:3000/path/to/placeholder-image.jpg'; // Fallback image

        return (
          <div key={item.productId._id} className="cart-item-container">
            <div className="cart-item-content">
              <div className="cart-item-image">
              <img src={imageUrl} alt={item.Title || 'Product'} className="cart-img" />
              </div>
              <div className="cart-item-details">
                <h1 className="cart-item-title">{item.productId.Title}</h1>
                <p className="cart-item-description">{item.productId.Description}</p>
                <h2 className="cart-item-price">${item.productId.price}</h2>
                <h3 className="cart-item-remove" onClick={() => removeCartItem(item.productId._id)}>Remove</h3>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-wrapper">
                  <div className="quantity-display">{item.quantity}</div>
                  <div className="quantity-controls d-flex">
                    <button className="quantity-increase" onClick={() => handleQuantityChange(item, 1)}>+</button>
                    <button className="quantity-decrease" onClick={() => handleQuantityChange(item, -1)}>-</button>
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
