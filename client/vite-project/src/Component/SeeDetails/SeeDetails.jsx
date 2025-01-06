
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function SeeDetails() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id'); // Extract `userId` from URL parameters
  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);
  console.log("Token:", token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [blockReason, setBlockReason] = useState(""); // State for the blocking reason
    const [showReasonInput, setShowReasonInput] = useState(false); // Toggle the reason input
    const [selectedProduct, setSelectedProduct] = useState(null); // Store the product to block
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sellerAddedProducts/${userId}`);
        if (response.status === 200) {
          setProducts(response.data.products || []);
        } else {
          throw new Error('Failed to fetch seller products');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, [userId]);

  

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/DeleteSeedetails/${productId}`);
      if (response.status === 200) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== productId));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const Singlee = (id) => {
    navigate(`/Singlee?login=${token_key}&productId=${id}&userId=${userId}`);
  };

  const blockProduct = async (id, isBlocked, reason) => {
    try {
      const response = await axios.patch(`http://localhost:3000/BlockProduct/${id}`, {
        isBlocked,
        reason,
      });
      console.log(response.data.message);
      // Update the product status in the UI after blocking/unblocking
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? { ...product, isBlocked: response.data.product.isBlocked }
            : product
        )
      );
      setShowReasonInput(false); // Hide the reason input after submitting
      setSelectedProduct(null); // Clear the selected product
    } catch (error) {
      console.error("Error blocking/unblocking product:", error);
    }
  };

  return (
    <>
      <div className='pt-3'>
        <div className='navba'>
          <div className="d-flex justify-content-center">
            <div className="Onsko p-2 link-light">Onsko</div>
            <div className="home p-2">
              <a href="./index.html" className="login link-light">Home</a>
            </div>
            <div className="home p-2">
              <a href="./Bestsellers.html" className="login link-light" />
              Store
            </div>
            <div className="home p-2">
              <a href="./About.html" className="login link-light">About</a>
            </div>
            <div className="home p-2">
              <a href="./Contact.html" className="login link-light">Contact</a>
            </div>
          </div>
        </div>
      </div>

      <div className="wishlist-container">
        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="product rounded shadow-sm overflow-hidden hover-shadow">
                  <div className="product-image mb-3">
                    <img
                      alt="Product"
                      src={`http://localhost:3000/${product.Images[0]}`}
                      className="img-fluid img-hover"
                      height={200}
                      width="100%" onClick={() => Singlee(product._id)}
                    />
                  </div>
                  <div className="product-details px-3 py-2">
                    <h5>{product.name}</h5>
                    <p><strong>Title:</strong> {product.Title}</p>
                    <p><strong>Price:</strong> ${product.Price}</p>
                    <p><strong>Description:</strong> {product.Description?.slice(0, 100) || 'No description available'}</p>
                  </div>
                  <div className="product-actions text-center mb-3">
                    <button className="btn btn-primary w-100" onClick={() => deleteProduct(product._id)}>Delete</button>
                    <button
              className="AdminAllproduts_btn"
              style={{
                backgroundColor: product.isBlocked ? "red" : "green",
              }}
              onClick={() => {
                setSelectedProduct(product);
                setShowReasonInput(true);
              }}
            >
              {product.isBlocked ? "Unblock" : "Block"}
            </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default SeeDetails;
