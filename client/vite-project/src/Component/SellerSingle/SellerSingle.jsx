import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Reusable component for product details
const ProductDetailSection = ({ title, content }) => (
  <div className="pt-3">
    <div className="re">{title}</div>
    <div className="pro">{content}</div>
  </div>
);

function Single() {
  const params = new URLSearchParams(window.location.search);
  const token_key = params.get('login');
  const userId = params.get('userId');
  const token = localStorage.getItem('authToken'); // Use correct token retrieval

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [expandedImage, setExpandedImage] = useState('');
  const [expandedImageText, setExpandedImageText] = useState('');

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
            setSelectedImage(productData.Images[0]);
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

  const Onsok = () => {
    navigate(`/Buyer?login=${token_key}&id=${userId}`);
  };

  const proceedToBuy = async (product) => {
    if (!product) {
      alert('Product details are missing. Please try again.');
      return;
    }

    const products = [
      {
        productId: product._id,
        quantity: product.quantity || 1,
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
    }
  };

  const handleImageClick = (imgElement) => {
    if (imgElement) {
      setExpandedImage(`http://localhost:3000/${imgElement.replace(/\\/g, '/')}`);
      setExpandedImageText(imgElement.alt || 'Expanded Product');
    } else {
      console.error('Image URL is undefined');
    }
  };

  return (
    <>
      <div className="pt-2">
        <div className="oooran">
          <div className="d-flex justify-content-center">
            <div className="px-2 pt-2 link-light" onClick={Onsok}>
              <strong>Onsok</strong>
            </div>
            <div className="px-2 pt-2 link-light">Home</div>
            <div className="px-2 pt-2 link-light">Store</div>
            <div className="px-2 pt-2 link-light">About</div>
            <div className="px-2 pt-2 link-light">Contact</div>
          </div>
        </div>
      </div>

      <div className=" product-container pt-5">
        <div className="row w-75">
          <div className='d-flex'>
          <div className="col-12 col-sm-4 w-25">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              data?.Images?.map((img, idx) => (
                <div className="p-2" key={idx}>
                  <img
                    src={`http://localhost:3000/${img.replace(/\\/g, '/')}`}
                    className="img-fluid cursor-pointer"
                    onClick={() => handleImageClick(img)}
                    alt={`Product Image ${idx + 1}`}
                  />
                </div>
              ))
            )}
          </div>

          <div className="col-12 col-sm-8 p-2 d-flex">
            <div className="image_container ">
              <img
                className="img-fluid"
                src={expandedImage || 'placeholder.jpg'}
                alt={expandedImageText || 'Expanded Product'}
              />
            </div>
           

          </div>
          <div className=" text-black">

          <div className="col-12 col-md-6 pt-4">
      <h1 className='titlee'>{data?.Title}</h1>
      <p className='desp'>{data?.Description.slice(0, 100)}...</p>
      <div className="reviewss">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`fas fa-star ${index < Math.round(data?.Rating) ? 'text-warning' : 'text-muted'}`}
          ></i>
        ))}
      </div>
      <div className="">${data?.Price}</div>
      <div className="discount mt-3">
        <strong>15% Discount For Membership</strong>
        <p className='un pt-2'>
          Unlock a 15% discount on {data?.Title} when you join today. Experience restful nights with our natural formula, designed to help you fall asleep faster and wake up refreshed.
        </p>
      </div>
      <div className="mt-3 d-flex ">
        <div className=''><button className="btn btn-secondary to" onClick={() => addToCart(data?._id)}>
          Add To Cart
        </button></div>
        <div className='px-3'><button className="btn btn-primary  too" onClick={() => proceedToBuy(data)}>
          Proceed to Pay
        </button></div>
      </div>
 
</div>
          </div>
          </div>

          <ProductDetailSection
            title="Reviews"
            content="I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care, and cleaning instructions."
          />

          <ProductDetailSection
            title="Return & Refund Policy"
            content="I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase."
          />

          <ProductDetailSection
            title="Shipping Info"
            content="I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging, and cost."
          />
        </div>

        <div className="greennn p-5">
          <div className="row p-5">
            <div className="col-3">
              <div className="fs-3 fw-bold link-light">Shop</div>
              <div className="pt-3 link-light">home</div>
              <div className="link-light">about</div>
              <div className="link-light">Shop</div>
              <div className="link-light">blog</div>
            </div>
            <div className="col-3">
              <div className="fs-3 fw-bold link-light">Policy</div>
              <div className="pt-3 link-light">terms & conditions</div>
              <div className="link-light">privacy policy</div>
              <div className="link-light">refund policy</div>
            </div>
            <div className="col-3">
              <div className="fs-3 fw-bold link-light">contact</div>
              <div className="pt-3 link-light">500 terry francine street</div>
              <div className="link-light">san francisco, ca 94158</div>
              <div className="link-light">info@mysite.com</div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="fs-1 fw-bold link-light p-5">onsko</div>
            <div>
              <div className="fs-1 fw-bold link-light p-5">subscribe to our newsletter</div>
              <div className="px-5">
                <div className="fs-5 link-light">
                  <label htmlFor="">Email</label>
                </div>
                <div className="pt-3">
                  <input type="email" className="w-100 p-3 bggg" />
                </div>
              </div>
              <div className="px-5 pt-2 d-flex">
                <div>
                  <input type="checkbox" />
                  <span className="px-3 link-light">Yes, subscribe me to your newsletter.</span>
                </div>
                <div>
                  <button className="subsc">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Single;
