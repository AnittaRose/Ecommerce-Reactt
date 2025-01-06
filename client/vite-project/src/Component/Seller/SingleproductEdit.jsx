
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SingleproductEdit = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const id = params.get('id');
//   const token = params.get('login');  // Get token from query parameter

//   const [product, setProduct] = useState({
//     Title: '',
//     Description: '',
//     Price: '',
//     Images: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/Singlee/${id}`);
//         setProduct(response.data.data);
//       } catch (err) {
//         setError('Failed to fetch product details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();  // Prevent form from reloading the page
//     try {
//       await axios.put(`http://localhost:3000/update/${id}`, product);
//       setSuccess('Product updated successfully.');
  
//       // Redirect to SellerProducts page after successful update
//       setTimeout(() => {
//         navigate(`/SellerProducts?login=${token}`);
//       }, 1500);  // Redirect after 1.5 seconds to show success message
//     } catch (err) {
//       setError('Failed to update product.');
//     }
//   };
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="product-edit-form">
//       <h2>Edit Product</h2>
//       {success && <div className="success-message">{success}</div>}
//       <form onSubmit={handleUpdate}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             name="Title"
//             value={product.Title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             name="Description"
//             value={product.Description}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Price</label>
//           <input
//             type="number"
//             name="Price"
//             value={product.Price}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <button type="submit">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default SingleproductEdit;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleproductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const token = params.get('login');  // Get token from query parameter

  const [product, setProduct] = useState({
    Title: '',
    Description: '',
    Price: '',
    Images: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Singlee/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    try {
      await axios.put(`http://localhost:3000/update/${id}`, product);
      setSuccess('Product updated successfully.');

      // Redirect to SellerProducts page after successful update
      setTimeout(() => {
        navigate(`/SellerProducts?login=${token}`);
      }, 1500);  // Redirect after 1.5 seconds to show success message
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

    <div className="containerr py-5">
      <h2 className="text-center mb-4">Edit Product</h2>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleUpdate} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="Title"
            className="form-control"
            value={product.Title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="Description"
            className="form-control"
            value={product.Description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="Price"
            className="form-control"
            value={product.Price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update Product</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/SellerProducts')}>Cancel</button>
        </div>
      </form>
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
};

export default SingleproductEdit;
