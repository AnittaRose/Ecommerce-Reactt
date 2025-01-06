import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Buyer() {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    // Fetch token and user id directly from URL params
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    console.log("Token:", token);

    let userId = params.get('id');
    console.log("User ID:", userId);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        const response = await axios.get(' http://localhost:3000/Viewselleraddedproducts', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchUser = async () => {
      try {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        const response = await axios.get(` http://localhost:3000/singleuser/${id}`, {
          headers: {
            'Authorization': token,
          },
        });
        if (response.data && response.data.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  const handleAddToCart = (productId) => {
    // Add to cart logic
    console.log(`Added product ${productId} to cart`);
  };

  const handleAddToWishlist = (productId, price, title) => {
    // Add to wishlist logic
    console.log(`Added product ${title} to wishlist`);
  };
  const Single = (id) => {
    navigate(`/Single?login=${token_key}&productId=${id}&userId=${userId}`);
};
const Cart = (id) => {
    navigate(`/Cart?login=${token_key}&id=${id}&userId=${userId}`);
  };

  const Wishlist = async (id) => {
    try {
        // Send POST request to add product to the wishlist
        const response = await axios.post('http://localhost:3000/addtowishlist', {
            userId,
            productId: id,
            Title: 'Product Title', // Replace with the actual title of the product
            Price: 'Product Price', // Replace with the actual price of the product
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            alert(response.data.message); // Show success message
            // Optionally navigate to the wishlist page or update the UI
            // navigate(`/Wishlist?login=${token_key}&id=${id}&userId=${userId}`);
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add product to wishlist. Please try again later.');
    }
};

// const Add = (id) => {
//     navigate(`/Add?login=${token_key}&id=${id}&userId=${userId}`);
// };

const Myaccount = (id) =>{
    navigate(`/Myaccount?login=${token_key}&id=${id}`);
}

const Orders = () => {
  navigate(`/Orders?login=${token_key}&id=${userId}`);
};

const WishLists = () => {
  navigate(`/WishListproducts?login=${token_key}&id=${userId}`);
};

const GotoCart = () => {
  navigate(`/GotoCart?login=${token_key}&id=${userId}`);
};
const Onsok = () =>{
  navigate(`/Buyer?login=${token_key}&id=${userId}`)
}


const UpgradetoSeller = async () => {
  try {
    // Make an API call to the backend to upgrade the user to a seller
    const response = await axios.put(`http://localhost:3000/buyerUpgrade/${userId}`);

    console.log("response", response);

    if (response.status === 200) {
      // If the response is successful, navigate to the next page
      navigate('/login');
      alert('User successfully upgraded to seller');
    } else {
      // Handle errors like already a seller or other API errors
      alert(response.data.message || 'Failed to upgrade user');
    }
  } catch (error) {
    console.error(error);
    // Handle network or other errors
    alert(error.response?.data?.message || 'An error occurred while upgrading the user');
  }
};




  if (loading) {
    return <div>Loading...</div>;
  }


  const logout = async () => {
    console.log("Reached..... at log out");

    let params = new URLSearchParams(window.location.search);
    console.log('params', params);

    let token_key = params.get('login');
    console.log("token_key:", token_key);

    if (token_key) {
        let token = localStorage.getItem(token_key);
        console.log("token", token);

        if (token) {
            localStorage.removeItem(token_key);
            navigate("/Login"); // Use navigate to redirect to the login page
        } else {
            console.log("Token not found");
            navigate("/Login");
        }
    } else {
        console.log("No login parameter found in the URL");
        navigate("/Login");
    }
};

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-evenly navbaree">
          <div className="d-flex">
            <div className="Onsko p-2 link-light" onClick={() => Onsok(userId)}>Onsko</div>
            <div className="home p-2">
              <a href="./index.html" className="login link-light">
                Home
              </a>
            </div>
            <div className="home p-2">
              <a href="" className=" link-light text-decoration-none">Store</a>
            </div>
            <div className="home p-2">
              <a href="" className="login link-light">
                About
              </a>
            </div>
            <div className="home p-2">
              <a href="" className="login link-light">
                Contact
              </a>
            </div>
          </div>
          <div className="d-flex">
            <div className="profile">
              {user ? (
                <div className="text-center dropdown">
                  <button className="dropbtttn px-3" aria-haspopup="true" aria-expanded="false" role="button">
                    <span className="text-break"><strong>Hello,</strong> {user.name}</span><br />
                    <span><strong></strong></span>
                  </button>
                  <div className="dropdown-content pt-3" role="menu">
                    {/* <div className=""><button onClick={()=>Add(userId)} className="bttn">Add product</button></div> */}
                    <div className="dropdown-item pt-3" tabIndex="0"><button onClick={() => Myaccount(userId)} className="bttn">My Account</button></div>
                    <div className='pt-3'>
                                            <button onClick={Orders} className="dropmybtn">Orders</button>
                                        </div>
                                        <div className='pt-3'>
                                            <button onClick={WishLists} className="dropmybtn">WishList</button>
                                        </div>
                    <div className="dropdown-item pt-3" tabIndex="0"><button onClick={UpgradetoSeller} className="bttn">Upgrade to Seller</button></div>
                  </div>
                </div>
              ) : null}
            </div>
            
            <div className="p-2 home">
              
                <img
                onClick={GotoCart}
                  src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000"
                  alt="cart"
                  className="cart"
                />
             
            </div>
           
            <div className="p-2 home">
              <img
                src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                alt="search"
                className="search"
              />
            </div>
            <div className='pt-1 px-3'><button className='logg' onClick={logout}>Logout</button></div>
          </div>
        </div>
      </div>
      
      <div id="datacontainer" className="product-container">
    {products.length > 0 ? (
        products.map((item) => (
            <div className="product-card" key={item._id}>
                <div className="product">
                    <div
                        className="img-box"
                        onClick={() => alert(`View ${item.Title}`)}
                    >
                        <img
                            src={`http://localhost:3000/${item.Images[0]}`}
                            alt={item.Title}
                            className="proimage"
                            onClick={() => Single(item._id)}
                        />
                    </div>
                    <h3>{item.Title}</h3>
                    <p>{item.Description.slice(0, 40)}</p>
                    <p>Rs.{item.Price}</p>
                    <div className="button-container">
                        <button onClick={() => Cart(item._id)}>
                            Add To Cart
                        </button>
                        <button onClick={() => Wishlist(item._id)}>
                            Add To Wishlist
                        </button>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p>No products available.</p>
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

export default Buyer;
