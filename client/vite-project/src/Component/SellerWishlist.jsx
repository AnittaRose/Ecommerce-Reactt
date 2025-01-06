
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  

  useEffect(() => {
    async function fetchWishlist() {
      setLoading(true); // Set loading state to true
      let params = new URLSearchParams(window.location.search);
      let token_key = params.get("login");
      let token = localStorage.getItem(token_key);
      let userId = params.get("userId");
      
      try {
        // Fetch all products
        const allProductsResponse = await fetch("http://localhost:3000/View", {
          method: "GET",
        });

        if (!allProductsResponse.ok) {
          throw new Error("Failed to fetch all products");
        }

        const allProductsData = await allProductsResponse.json();
        const products = allProductsData?.data || [];
        setAllProducts(products);

        // Fetch wishlist
        const wishlistResponse = await fetch(
          `http://localhost:3000/wishlistproducts/${userId}`,
          {
            method: "GET",
          }
        );

        if (!wishlistResponse.ok) {
          throw new Error(
            `Failed to fetch wishlist. Status: ${wishlistResponse.status}`
          );
        }

        const wishlistData = await wishlistResponse.json();
        const wishlistItems = Array.isArray(wishlistData?.data)
          ? wishlistData?.data
          : [];

        if (!Array.isArray(wishlistItems) || wishlistItems.length === 0) {
          throw new Error("Invalid or empty wishlist data received.");
        }

        // Match wishlist items with all products
        const wishlistIds = wishlistItems.flatMap((item) =>
          item.productId ? [item.productId] : []
        );
        const matchedItems = products.filter((product) =>
          wishlistIds.includes(product._id)
        );

        if (matchedItems.length === 0) {
          setErrorMessage(
            "No items in your wishlist match available products."
          );
        } else {
          setErrorMessage(""); // Clear error message
        }

        setWishlist(matchedItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setErrorMessage("Failed to load wishlist. Please try again later.");
        setWishlist([]); // Reset wishlist on error
      } finally {
        setLoading(false); // Set loading state to false
      }
    }

    fetchWishlist();
  }, []);

  // Delete a product from the wishlist
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

  // Render loading, error, or wishlist
  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;


  const Onsok = () =>{
    navigate(`/View?login=${token_key}&id=${userId}`)
  }
  return (
    <>
      <div className="p-3">
        <div className="navtopp">
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-between">
              <div className="Onsko p-2 pt-3 link-light" onClick={() => Onsok(userId)}>Onsko</div>
              <div className="home p-2 pt-3 link-light">Home</div>
              <div className="home p-2 pt-3 link-light">Store</div>
              <div className="home p-2 pt-3 link-light">
                <a href="./About.html" className="login link-light">
                  About
                </a>
              </div>
              <div className="home p-2 pt-3 link-light">Contact</div>
            </div>
            <div className="d-flex">
              <div className="p-2 home pt-3">
                {/* <a href="./login.html" className="login link-light">
                  Login
                </a> */}
              </div>
              <div className="p-2 home pt-3">
                {/* <a href="./signup.html" className="login link-light">
                  Signup
                </a> */}
              </div>
              <div className="p-2 home">
                {/* <img
                  src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000"
                  alt=""
                  className="cartimgsmall"
                /> */}
              </div>
              <div className="p-2 home">
                {/* <img
                  src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"
                  alt=""
                  className="wishlistimgsmall"
                /> */}
              </div>
              <div className="p-2 home">
                {/* <img
                  src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                  alt=""
                  className="searchh"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div id="datacontainer" className="wishlist-container pt-5">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            wishlist.map((item) => {
              const imageUrl = item.Images?.[0] || "placeholder.jpg";
              const title = item.Title || "No title available";
              const price = item.Price || "N/A";
              const itemId = item._id || `${item.productId}-${Math.random()}`;

              return (
                <div
                  key={itemId}
                  className="shadow-lg p-3 mb-5 bg-body rounded "
                >
                  <div>
                    <div
                      onClick={() =>
                        console.log(`View details for item ID: ${itemId}`)
                      }
                    >
                      <img
                        src={`http://localhost:3000/${imageUrl}`}

                        alt={title}
                        className="product-image"
                        style={{ width: "100%", height: "auto", maxWidth: "200px" }}
                      />
                    </div>
                    <div className="px-5">
                      <p className="titlepara px-2">{title}</p>
                      <div className="priceh2 px-2">Rs.{price}</div>
                    </div>
                  </div>
                  <div>
                    <div className="trashh">
                      <img
                        src="https://img.icons8.com/?size=100&id=14237&format=png&color=FA5252"
                        className="trash"
                        onClick={() => deleteWishlistProduct(itemId)}
                        alt="Delete"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
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

export default Wishlist;
