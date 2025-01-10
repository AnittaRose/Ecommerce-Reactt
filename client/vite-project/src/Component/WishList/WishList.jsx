import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WishList.css';
import { useNavigate } from 'react-router-dom';


function WishListproducts() {
  const params = new URLSearchParams(window.location.search);

  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);
  let userId = params.get('id');
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const Onsok = () =>{
    navigate(`/Buyer?login=${token_key}&id=${userId}`)
  }

  useEffect(() => {
    const fetchWishlistAndProducts = async () => {
      try {
        // Fetch wishlist
        const userId = localStorage.getItem("userId");
        console.log("userIdddddd:",userId);
        const wishlistResponse = await axios.get(`http://localhost:3000/ViewWishlist/${userId}`);
        
        const wishlistData  = wishlistResponse.data;
        console.log("wishlist response :",wishlistData);

        const fetchedWishlist = Array.isArray(wishlistData.wishlist) ? wishlistData.wishlist : [];
        console.log("fetchedWishlist", wishlistData.wishlist);
  
        // Fetch products
        const productsResponse = await axios.get('http://localhost:3000/View');
        const fetchedProducts = productsResponse.data.data;
        console.log("fetchedProducts", fetchedProducts);
  
        // Match wishlist items with products by product_id and handle blocked products
        const matchedWishlist = fetchedProducts.map((product) => {
          const isInWishlist = fetchedWishlist.some((item) => item.productId === product._id);
          if (isInWishlist) {
            return {
              ...product,
              isUnavailable: product.isBlocked, // Add a flag for blocked products
            };
          }
          return null;
        }).filter(Boolean); // Remove null values
  
        console.log("matchedWishlist", matchedWishlist);
  
        setWishlist(matchedWishlist);
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWishlistAndProducts();
  }, [userId, token]);
  

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const deleteWishlistProduct = async (itemId) => {
    try {
      console.log(`Deleting product with ID: ${itemId}`);

      let params = new URLSearchParams(window.location.search);
      let token_key = params.get("login");
      let token = localStorage.getItem(token_key);

      await fetch(`http://localhost:3000/wishlistproducts/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Product with ID: ${itemId} deleted successfully.`);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error(`Error deleting product with ID ${itemId}:`, error);
      alert("Failed to delete the product. Please try again later.");
    }
  };

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
    <div className="wishlist-container pt-5">
      {wishlist.length > 0 ? (
        wishlist.map((item, index) => {
          const matchedProduct = products.find((product) => product._id === item.productId);

          return (
            <div key={index} className="order-card">
              <div className="order-image">
                <img
                  alt="Wishlist"
                  height={100}
                  src={`http://localhost:3000/${matchedProduct?.Images[0] || item.Images[0]}`}
                  width={100}
                />
              </div>
              <div className="order-details">
                <h3>{matchedProduct?.name || item.name}</h3>
                <p><strong>Title:</strong> {item.Title}</p>
                {item.isUnavailable ? (
  <span style={{ color: 'red', fontWeight: 'bold' }}>Unavailable</span>
) : (
  <p>Price: ${item.Price}</p>
)}

                <p><strong>Description:</strong> {matchedProduct?.Description || item.Description.slice(0,100) || 'No description available'}</p>
              </div>
              <div className="order-actions px-3 w-25">
                {/* <button className="btn btn-outline-primary">
                  <i className="fas fa-shopping-bag"></i> Buy Now
                </button> */}
                <button className="btn btn-outline-primary" onClick={() => deleteWishlistProduct(item._id)}>
                  <i className="fas fa-trash"></i> Remove from Wishlist
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No items in wishlist</div>
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

export default WishListproducts;
