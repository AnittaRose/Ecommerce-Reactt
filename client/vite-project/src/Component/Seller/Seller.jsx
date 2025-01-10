
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const MyAccount = () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');  // Get the 'id' parameter from the URL
  let token_key = params.get('login');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from localStorage or URL query parameters
        const storedToken = localStorage.getItem('your-token-key') || new URLSearchParams(window.location.search).get('login');
        
        if (!storedToken) {
          throw new Error("No token found. Please log in.");
        }

        // Set token in state
        setToken(storedToken);

        // Fetch products
        const response = await fetch("http://localhost:3000/Viewselleraddedproducts", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        if (Array.isArray(data.data)) {
          setProducts(data.data);  // Set products to state
        } else {
          setError("Invalid response format: Products not found");
        }

        // Fetch user details using token
        const userResponse = await fetch(`http://localhost:3000/singleuser/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.data);  // Set user data to state
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
        // Ensure the productId is a valid string (just for extra safety)
        if (!productId) {
            throw new Error("Invalid product ID");
        }

        const response = await fetch(`http://localhost:3000/delete/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json", // You can add Content-Type header for consistency
            },
        });

        // Check for response status
        if (response.ok) {
            // Success: Remove the product from state
            setProducts(products.filter(product => product._id !== productId));
            alert('Product deleted successfully');
        } else {
            // Handle different error status codes
            if (response.status === 404) {
                alert('Product not found');
            } else if (response.status === 400) {
                alert('Invalid product ID');
            } else {
                alert('Failed to delete product');
            }
        }
    } catch (err) {
        console.error("Delete error:", err);
        alert(`Error: ${err.message}`);
    }
};

    const Single = (id) => {
      navigate(`/Single?login=${token_key}&productId=${id}&userId=${userId}`);
    };

    const Edit = (id) => {
      navigate(`/SingleproductEdit?login=${token_key}&id=${id}`);
    };
    

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!token) {
    return <div>Please log in to access your account.</div>;
  }

  return (
    <div className='pt-4 p-3'>
      <div className='d-flex justify-content-evenly viewnavbar'>
        <div className='d-flex'>
          <div className='px-2 pt-2'><strong>Onsko</strong></div>
          <div className='px-2 pt-2'>Home</div>
          <div className='px-2 pt-2'>Store</div>
          <div className='px-2 pt-2'>About</div>
          <div className='px-2 pt-2'>Contact</div>
        </div>

        <div className='d-flex'>
          {/* <div className=''></div> */}
          <div className="px-2 ">
   
            {user && (
              <div className="text-center dropdown">
                <button className="drop"><strong>Hello,</strong> {user.name || 'Guest'}</button>
                <div className="dropdown-content pt-3">
                  <div><button onClick={() => alert('Add product')} className="dropaddbtn">Add product</button></div>
                  <div className='pt-3'>
                    <button onClick={() => alert('My Account')} className="dropmybtn">My Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='px-2 pt-2'>Login</div>
          <div className='px-2 pt-2'>Sign up</div>
        </div>
      </div>

      {/* Products display */}
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
                    // onClick={() => alert(`Viewing product ${item._id}`)}
                    onClick={() => Single(item._id)}
                  />
                </div>
                <h3>{item.Title}</h3>
                <p>{item.Description.slice(0, 40)}</p>
                <p>Rs.{item.Price}</p>
                <div className="button-container">
                  <button onClick={() => Edit(item._id)}>Edit</button>
                  {/* <button onClick={() => alert('Added to Wishlist')}>Add To Wishlist</button> */}
                  <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button> {/* Delete button */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
