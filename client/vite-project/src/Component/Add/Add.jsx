
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Add() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    rating: '',
    brand: '',
    category: '',
    images: []
  });

  const navigate = useNavigate();

  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const Addproducts = async (event) => {
    event.preventDefault();
    console.log('Reached Add Product function.');

    // Retrieve URL parameters
    const params = new URLSearchParams(window.location.search);
    const token_key = params.get("login");
    // const id = params.get("id");
    const userId = params.get("userId");
    console.log(userId);
    const token = localStorage.getItem(token_key);

    // Validate inputs
    if (!formData.title || !formData.description || !formData.price || !formData.rating || !formData.brand || !formData.category) {
      alert('Please fill in all the fields.');
      return;
    }

    // if (!formData.images || formData.images.length === 0) {
    //   alert('Please select at least one image.');
    //   return;
    // }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    for (let file of formData.images) {
      if (!validTypes.includes(file.type)) {
        alert('Please upload only valid image files (JPEG, PNG, GIF).');
        return;
      }
      if (file.size > maxSize) {
        alert('Each image must be smaller than 2MB.');
        return;
      }
    }

    // Prepare FormData
    const data = new FormData();
    data.append('Title', formData.title);
    data.append('Description', formData.description);
    data.append('Price', formData.price);
    data.append('Rating', formData.rating);
    data.append('Brand', formData.brand);
    data.append('Category', formData.category);

    for (let i = 0; i < formData.images.length; i++) {
      data.append('Images', formData.images[i]);
    }

    try {
      const response = await axios.post(`http://localhost:3000/Add/${userId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');

      // Optionally redirect or clear the form
      // window.location.href = `Seller.html?login=${token_key}&id=${id}`;
      navigate(`/View?login=${token_key}&id=${userId}`);

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  // const View = (id) => {
  //   navigate(`/Add?login=${token_key}&id=${id}&userId=${userId}`);
  // };
  

  return (
<div className='backgroundimg'>
      <div className="form12 pt-5 px-5 position-absolute top-50 start-50 translate-middle">
      <div className="d-flex flex-column flex-md-row">
        <div className="pt-4 w-100">
          <form onSubmit={Addproducts} className="form123">
            <div className=" p-4 rounded shadow-sm fo">
              <div className="mb-3">
                <input
                  placeholder="Title"
                  className="form-control1"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Description"
                  className="form-control1"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Price"
                  className="form-control1"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Stock"
                  className="form-control1"
                  id="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Brand"
                  className="form-control1"
                  id="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <select
                  id="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Make up">Make up</option>
                  <option value="Skin care">Skin care</option>
                  <option value="Hair care">Hair care</option>
                  <option value="Body care">Body care</option>
                  <option value="Fragrance">Fragrance</option>
                  <option value="Face care">Face care</option>
                </select>
              </div>
              <div className="mt-3 mul">
              <input
                type="file"
                id="images"
                name="images"
                multiple
                className="form-control1"
                onChange={handleFileChange}
              />
            </div>
            </div>
            {/* <div className="mt-3 mul">
              <input
                type="file"
                id="images"
                name="images"
                multiple
                className="form-control"
                onChange={handleFileChange}
              />
            </div> */}
            <div className="text-center mt-4">
              <button type="submit" className="btnn123 w-100">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>


  );
}

export default Add;
