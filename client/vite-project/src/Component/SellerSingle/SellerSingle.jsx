

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Single() {
  const params = new URLSearchParams(window.location.search);
  const token_key = params.get('login');
  const userId = params.get('userId');
  const token = localStorage.getItem(token_key);

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); // State to track the currently displayed image

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.get('productId');
        if (!id) {
          setError('Product ID is missing in the URL.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/Single/${encodeURIComponent(id)}`);
        const productData = response.data?.data;

        if (productData) {
          if (Array.isArray(productData.Images) && productData.Images.length > 0) {
            setData(productData);
            setSelectedImage(productData.Images[0]); // Set the first image as default
          } else {
            setError('No images available for this product.');
          }
        } else {
          setError('No product data found.');
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Error fetching product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const addToCart = (productId) => {
    navigate(`/Cart?login=${token_key}&id=${productId}&userId=${userId}`);
  };

  const Onsok = () =>{
    navigate(`/Buyer?login=${token_key}&id=${userId}`)
  }

  const proceedToBuy = async (product) => {
    if (!product) {
      alert('Product details are missing. Please try again.');
      return;
    }
    

    const products = [
      {
        productId: product._id,
        quantity: product.quantity || 1, // Default to quantity 1 if not provided
      },
    ];

    try {
      const allProductsResponse = await axios.get('http://localhost:3000/View');
      const allProducts = allProductsResponse.data?.data;

      if (!Array.isArray(allProducts)) {
        throw new Error('Invalid response format: Products array not found.');
      }

      const invalidProducts = products.filter(
        (item) => !allProducts.some((product) => product._id === item.productId)
      );

      if (invalidProducts.length > 0) {
        alert('Some products are invalid or unavailable.');
        return;
      }

      await axios.post(`http://localhost:3000/order/${userId}`, { products });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error proceeding to buy:', error.message || error);
      // alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <>
  <div className='pt-2'>
    <div className='oooran'>
      <div className='d-flex justify-content-center'>
        <div className='px-2 pt-2 link-light' onClick={() => Onsok(userId)}><strong>Onsok</strong></div>
        <div className='px-2 pt-2 link-light'>Home</div>
        <div className='px-2 pt-2 link-light'>Store</div>
        <div className='px-2 pt-2 link-light'>About</div>
        <div className='px-2 pt-2 link-light'>Contact</div>
      </div>
    </div>
  </div>


    <div className="container product-container pt-5">
      <div className="row">
        {/* Product Image and Thumbnails */}
        <div className="col-md-6">
          <div className="product-image text-center">
            <img
              alt={data.Title}
              height={300}
              src={`http://localhost:3000/${selectedImage.replace(/\\/g, '/')}`}
              width={400}
            />
          </div>
          <div
            className="row product-thumbnails mt-3"
            style={{
              overflowX: 'auto',
              display: 'flex',
              gap: '10px',
              paddingBottom: '10px',
              scrollbarWidth: 'thin',
            }}
          >
            {data.Images.map((image, index) => (
              <div key={index} style={{ flex: '0 0 auto', width: '100px' }}>
                <img
                  alt={`Thumbnail ${index + 1}`}
                  height={100}
                  src={`http://localhost:3000/${image.replace(/\\/g, '/')}`}
                  width={100}
                  onClick={() => setSelectedImage(image)} // Set the clicked image as the large image
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === image ? '2px solid #007bff' : 'none',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6 product-info">
          <h1>{data.Title}</h1>
          <p>{data.Description.slice(0, 100)}...</p>
          <div className="reviews">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fas fa-star ${
                  index < Math.round(data.Rating) ? 'text-warning' : 'text-muted'
                }`}
              ></i>
            ))}
          </div>
          <div className="price">${data.Price}</div>
          <div className="discount mt-3">
            <strong>15% Discount For Membership</strong>
            <p>
              Unlock a 15% discount on {data.Title} when you join today. Experience restful
              nights with our natural formula, designed to help you fall asleep faster and wake
              up refreshed.
            </p>
          </div>
          <div className="mt-3">
            <button className="btn btn-secondary" onClick={() => addToCart(data._id)}>
              Add To Cart
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => proceedToBuy(data)}>
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information Sections */}
      <div className="pt-3">
        <div>
          <div className="re">Reviews</div>
          <div className="pro">
            I'm a product detail. I'm a great place to add more information about your product
            such as sizing, material, care and cleaning instructions.
          </div>
        </div>
      </div>
      <div className="pt-3">
        <div>
          <div className="re">Return & Refund Policy</div>
          <div className="pro">
            I'm a Return and Refund policy. I'm a great place to let your customers know what to
            do in case they are dissatisfied with their purchase.
          </div>
        </div>
      </div>
      <div className="pt-3">
        <div>
          <div className="re">Shipping Info</div>
          <div className="pro">
            I'm a shipping policy. I'm a great place to add more information about your shipping
            methods, packaging, and cost.
          </div>
        </div>
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

export default Single;
