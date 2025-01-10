import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function UpgradeRequestPage() {
  const [companyName, setCompanyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token_key = new URLSearchParams(location.search).get('login');
  const userId = new URLSearchParams(location.search).get('id');
  const token = localStorage.getItem(token_key);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/submitUpgradeRequest',
        {
          userId,
          companyName,
          licenseNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Your request to upgrade to a seller has been submitted!');
        navigate(`/Buyer?login=${token_key}&id=${userId}`); // Redirect back to Buyer page after submission
      }
    } catch (error) {
      console.error('Error submitting upgrade request:', error);
      alert('Failed to submit the upgrade request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const Onsok = () =>{
    navigate(`/Buyer?login=${token_key}&id=${userId}`)
  }

  return (
    <>
  <div className='pt-3'>
    <div className="header">
        <div className="logo">
          <span onClick={() => Onsok(userId)}>onsko</span> {/* Correct usage */}
        </div>
        <div className="nav">
          <a href="#">Home</a>
          <a href="#">shop</a>
          <a href="#">about</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
 
     <div className=" py-5">
      <h2 className="text-center ">Upgrade to Seller</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="licenseNumber" className="form-label">License Number</label>
          <input
            type="text"
            id="licenseNumber"
            className="form-control"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
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
}

export default UpgradeRequestPage;
