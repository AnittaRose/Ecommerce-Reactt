import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import { useNavigate } from 'react-router-dom';


function Orders() {
  const params = new URLSearchParams(window.location.search);

  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);
  let userId = params.get('id');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const Onsok = () =>{
    navigate(`/Buyer?login=${token_key}&id=${userId}`)
  }

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        // Fetch orders
        const ordersResponse = await fetch(`http://localhost:3000/ViewOrders/${userId}`);
        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch orders');
        }
        const ordersData = await ordersResponse.json();
        console.log("ordersData", ordersData);

        const fetchedOrders = Array.isArray(ordersData.order.products) ? ordersData.order.products : [];
        console.log("fetchedOrders", fetchedOrders);

        // Fetch products
        const productsResponse = await axios.get('http://localhost:3000/View');
        const fetchedProducts = productsResponse.data.data;
        console.log("fetchedProducts", fetchedProducts);

        // Match products with orders by product_id
        const matchedOrders = fetchedProducts.filter((order) =>
          fetchedOrders.some((product) => product.productId === order._id)
        );

        console.log("matchedOrders", matchedOrders);

        setOrders(matchedOrders);
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [userId, token]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
  <div className='pt-3'>
    <div className='navba'>
        <div className='d-flex justify-content-center'>
            <div className='px-2 pt-2 link-light' onClick={() => Onsok(userId)}><strong>Onsko</strong></div>
            <div className='px-2 pt-2 link-light'>Home</div>
            <div className='px-2 pt-2 link-light'>Store</div>
            <div className='px-2 pt-2 link-light'>About</div>
            <div className='px-2 pt-2 link-light'>Contact</div>
        </div>
    </div>
  </div>
    
    <div className="orders-container pt-5">
      {orders.length > 0 ? (
        orders.map((order, index) => {
          // Find the matched product for additional details if needed
          const matchedProduct = products.find((product) => product._id === order.productId);

          return (
            <div key={index} className="order-card">
              <div className="order-image">
                <img
                  alt="Order"
                  height={100}
                  src={`http://localhost:3000/${matchedProduct?.Images[0] || order.Images[0]}`}

                  width={100}
                />
              </div>
              <div className="order-details">
                <h3>{matchedProduct?.name || order.name}</h3>
                <p><strong>Title:</strong> {order.Title}</p>
                <p><strong>Price:</strong> ${matchedProduct?.Price || order.Price}</p>
                <p><strong>Description:</strong> {matchedProduct?.Description || order.Description.slice(0,100) || 'No description available'}</p>
                
              </div>
              {/* <div className="order-actions">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-shopping-bag"></i> Buy Again
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fas fa-heart"></i> Add to Wishlist
                </button>
              </div> */}
            </div>
          );
        })
      ) : (
        <div>No matching orders found</div>
      )}
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

export default Orders;
