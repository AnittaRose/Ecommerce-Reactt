
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Cart() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  // const token_key = localStorage.getItem('token_key');
  const userId = params.get('userId');
  const price = parseFloat(params.get('price')) || 0;
  const quantity = parseInt(params.get('quantity'), 10) || 1;
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);


    // Fetch token and user id directly from URL params
    let token_key = params.get('login');
    let id = params.get('userId');

    let token = localStorage.getItem(token_key);
    console.log("Token:", token);

  
 
    const Checkout = (checkoutData, totalPrice) => {
      const params = new URLSearchParams(location.search);
      const userId = params.get('userId');
      const token_key = params.get('login');
      const token = localStorage.getItem(token_key);
    
      // Encode the data
      const encodedCheckoutData = encodeURIComponent(JSON.stringify(checkoutData));
      const encodedTotalPrice = encodeURIComponent(totalPrice);
    
      // Proceed with navigation
      navigate(`/OrderPage?userId=${encodeURIComponent(userId)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}`);
    };

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
    const loadCart = async () => {
      try {
        if (!productId || !userId) {
          console.error('Missing productId or userId');
          return;
        }

        const data = { productId, userId, price, quantity };
        const cartResponse = await axios.post('http://localhost:3000/Addtocart', data);

        if (cartResponse.status !== 200) {
          throw new Error(`Failed to add to cart: ${cartResponse.status}`);
        }

        const productResponse = await axios.get('http://localhost:3000/View');

        if (productResponse.status !== 200) {
          throw new Error(`Failed to fetch product list: ${productResponse.status}`);
        }

        const productList = productResponse.data.data || [];
        const updatedCartItems = cartResponse.data.data.addCart?.flatMap(cart => cart.items) || [];

        // Match cart items with product list
        const matchedCartItems = updatedCartItems.map(cartItem => {
          const matchingProduct = productList.find(product => product._id === cartItem.productId);
          if (matchingProduct) {
            return { ...cartItem, ...matchingProduct };
          }
          return null;
        }).filter(item => item !== null);

        setCartItems(matchedCartItems);
        calculateTotals(matchedCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    loadCart();
  }, [productId, userId, price, quantity]);

  const handleQuantityChange = async (item, increment) => {
    const newQuantity = item.quantity + increment;

    if (newQuantity < 1) return; // Prevent zero or negative quantities

    // Optimistic UI update
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setCartItems(updatedCartItems);

    // Calculate new total
    calculateTotals(updatedCartItems);

    try {
      const response = await axios.post(`http://localhost:3000/updateCarts/${userId}`, {
        productId: item.productId,
        newQuantity,
      });

      if (response.status !== 200) {
        console.error('Failed to update quantity on the server:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };


  const Onsok = () =>{
    navigate(`/Buyer?login=${token_key}&id=${userId}`)
  }

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
  <div className='pt-2'>
    <div className='bgg'>
      <div className='d-flex justify-content-center'>
          <div className='px-2 pt-2 link-light'  onClick={() => Onsok(userId)}><strong>Onsok</strong></div>
          <div className='px-2 pt-2 link-light' >Home</div>
          <div className='px-2 pt-2 link-light' >Store</div>
          <div className='px-2 pt-2 link-light' >About</div>
          <div className='px-2 pt-2 link-light' >Contact</div>
      </div>
    </div>
  </div>
    <div className="cart-wrapper pt-5">
      {cartItems.map((item) => {
        const imageUrl = item.Images?.[0]
          ? `http://localhost:3000/${item.Images[0]}`
          : 'http://localhost:3000/path/to/placeholder-image.jpg'; // Fallback image

        return (
          <div key={item.productId} className="cart-item-container">
            <div className="cart-item-content">
              <div className="cart-item-image">
                <img src={imageUrl} alt={item.Title || 'Product'} className="cart-img" />
              </div>
              <div className="cart-item-details">
                <h1 className="cart-item-title">{item.Title}</h1>
                <p className="cart-item-description">{item.Description}</p>
                <h2 className="cart-item-price">${item.price}</h2>
                <h3 className="cart-item-remove" onClick={() => removeCartItem(item.productId)}>Remove</h3>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-wrapper">
                  <div className="quantity-display">{item.quantity}</div>
                  <div className="quantity-controls d-flex">
                    <div className=''><button className="quantity-increase" onClick={() => handleQuantityChange(item, 1)}>+</button></div>
                    <div className='px-5'><button className="quantity-decrease" onClick={() => handleQuantityChange(item, -1)}>-</button></div>
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
        {/* <button className="checkout-button">Purchase</button> */}
        <button className="checkout-button" onClick={() => Checkout(cartItems,totalPrice)}>
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

export default Cart;
