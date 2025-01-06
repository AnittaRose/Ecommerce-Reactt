import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAllproduts.css";

function AdminAllproduts() {
  const [products, setProducts] = useState([]);
  const [blockReason, setBlockReason] = useState(""); // State for the blocking reason
  const [showReasonInput, setShowReasonInput] = useState(false); // Toggle the reason input
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the product to block

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/View");
        console.log("responsedatfufufyu", response.data.data);
        setProducts(response.data.data); // Assuming the API response returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
    <div className="pt-3">
        <div className="navba">
            <div className='d-flex justify-content-center'>
                <div className='px-2 pt-2'><strong>Onsko</strong></div>
                <div className='px-2 pt-2'>Home</div>
                <div className='px-2 pt-2'>Store</div>
                <div className='px-2 pt-2'>About</div>
                <div className='px-2 pt-2'>Contact</div>
            </div>
        </div>
    </div>

  <div className="AdminAllproduts_list">
  {products.length > 0 ? (
    <div className="grid-container">
      {products.map((product) => (
        <div className="AdminAllproduts_product-card" key={product._id}>
          <img
            alt={product.title || "Product Image"}
            height={200}
            src={`http://localhost:3000/${product.Images ? product.Images[0] : "default-image.jpg"}`}
            width={300}
          />
          <div className="AdminAllproduts_details">
            <span className="fs-5">{product.Title || "No Title"}</span>
            <p>{product.Description.slice(0, 10) || "No description available"}</p>
            <div className="AdminAllproduts_price">
              {product.Price ? `$${product.Price}` : "Price not available"}
            </div>

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
      ))}
    </div>
  ) : (
    <p>Loading products...</p>
  )}

  {/* Modal for blocking reason */}
  {showReasonInput && selectedProduct && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Provide Block Reason for {selectedProduct.Title}</h3>
        <textarea
          value={blockReason}
          onChange={(e) => setBlockReason(e.target.value)}
          placeholder="Write reason for blocking"
        />
        <button
          className="AdminAllproduts_btn"
          style={{ backgroundColor: "orange" }}
          onClick={() =>
            blockProduct(
              selectedProduct._id,
              !selectedProduct.isBlocked,
              blockReason
            )
          }
        >
          Submit Block Reason
        </button>
        <button
          className="AdminAllproduts_btn"
          style={{ backgroundColor: "gray" }}
          onClick={() => {
            setShowReasonInput(false);
            setSelectedProduct(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>
</>

  );
}

export default AdminAllproduts;
