import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function Myaccount() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);

  // Fetch token and user id directly from URL params
  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);
  console.log("Token:", token);

  let userId = params.get('id');
  console.log("User ID:", userId);

  let id = params.get('id'); // Adjust this if needed based on your logic
  console.log(id);

  const navigate = useNavigate();
  
  // Fetch user data with Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API call to fetch user data (you can replace this with your actual API)
        // const response = await axios.get("https://api.example.com/userdata");
        // setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const SellerProducts = (id) => {
    // Ensure that the id is correctly passed as a parameter
    navigate(`/SellerProducts?login=${token_key}&id=${id}`);
  };

  const Llogin = (id) => {
    // Ensure that the id is correctly passed as a parameter
    navigate(`/Llogin?login=${token_key}&id=${id}`);
  };

  const Prime = (id) => {
    // Ensure that the id is correctly passed as a parameter
    navigate(`/Prime?login=${token_key}&id=${id}`);
  };

  const Address = (id) => {
    // Ensure that the id is correctly passed as a parameter
    navigate(`/Address?login=${token_key}&id=${id}`);
  };
  
  return (
    <>
  <div className="pt-3">
    <div className="header">
        <div className="logo">
          <span onClick={() => Onsok(userid)}>onsko</span> {/* Correct usage */}
        </div>
        <div className="nav">
          <a href="#">Home</a>
          <a href="#">shop</a>
          <a href="#">about</a>
        </div>
      </div>
    </div>

    
{/* <div className="boxsection pt-3">
  <div className="d-flex flex-wrap justify-content-evenly pt-2">
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=108296&format=png&color=000000"
          className="user"
          alt="Profile Icon"
        />
      </div>
      <div className="card-info">
        <span>{userData?.profileName || "My Profile"}</span>
      </div>
      <div className="pt-4">
        
        <Link to="/Profile" className="button">Profile</Link>
      
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=ftv3foQkv3DY&format=png&color=000000"
          className="user"
          alt="Orders Icon"
        />
      </div>
      <div className="card-info">
        <span>My Orders</span>
      </div>
      <div className="pt-4">
        <a href="#" className="button">Orders</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=rMdkAyHngv7o&format=png&color=000000"
          className="user"
          alt="Wishlist Icon"
        />
      </div>
      <div className="card-info">
        <span>My Wishlist</span>
      </div>
      <div className="pt-4">
        <a href="#" className="button">Wishlist</a>
      </div>
    </div>
  </div>
  <div className="d-flex flex-wrap justify-content-evenly pt-2">
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=pyoKGGx6HHIU&format=png&color=000000"
          className="user"
          alt="Settings Icon"
        />
      </div>
      <div className="card-info">
        <span>Settings</span>
      </div>
      <div className="pt-4">
        <a href="./Settings.html" className="button">Settings</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=aPAHTIQEcgiq&format=png&color=000000"
          className="user"
          alt="Gift Card Icon"
        />
      </div>
      <div className="card-info">
        <span>Gift Cards</span>
      </div>
      <div className="pt-4">
        <a href="./Giftcard.html" className="button">Gift Cards</a>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=biTgjhfJT5Ej&format=png&color=000000"
          alt="Seller Account Icon"
        />
      </div>
      <div className="card-info">
        <span>Seller Account</span>
      </div>
      <div className="pt-4">
        <button className="button" onClick={() => SellerProducts(id)}>Seller Account</button>
      </div>
    </div>
    <div className="card">
      <div className="img">
        <img
          src="https://img.icons8.com/?size=100&id=biTgjhfJT5Ej&format=png&color=000000"
          alt="Seller Account Icon"
        />
      </div>
      <div className="card-info">
        <span>Seller Account</span>
      </div>
      <div className="pt-4">
        <button className="button" onClick={() => SellerProducts(id)}>Seller Account</button>
      </div>
    </div>

  </div>
</div> */}

<div className=" account-section">
  <h1>Your Account</h1>
  <div className="row">
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Onsok logo"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/0Ey5lIrAf62feo7E3iaYAW7sQQOPSpxQK6jrgJ5ob5dKG4GoA.jpg"
          width={50}
        />
        <div>
          <h2>Your Orders</h2>
          <p>Track, return, or buy things again</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Lock icon"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/ruU3ZOgqPtLlKRQ0K63Jfk33YZflVXXKtx1MfarH1pfxHwNQB.jpg"
          width={50} onClick={() => Llogin(id)}
        />
        <div>
          <h2>Login &amp; security</h2>
          <p>Edit login, name, and mobile number</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Prime box icon"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/Dy4XFNRhpSKEPlAXKh0qE7IYKWUiJb2MjkddHa8vA4SdA3AF.jpg"
          width={50} onClick={() => Prime(id)}
        />
        <div>
          <h2>Prime</h2>
          <p>View benefits and payment settings</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Location pin icon"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/FByKRiVw3vofbKb1gwACxTE6u0nIPsc1NFh3DfRovYk6BcDUA.jpg"
          width={50} onClick={() => Address(id)}
        />
        <div>
          <h2>Your Addresses</h2>
          <p>Edit addresses for orders and gifts</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Amazon business logo"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/bXw4Xo6pTzZMNNNiTncwGPDqezyeldcsjHIT6aJ684b4BcDUA.jpg"
          width={50}
        />
        <div>
          <h2>Your business account</h2>
          <p>
            Sign up for free to save up to 28% with GST <br></br> invoice and bulk
            discounts and purchase on credit.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Credit card icon"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/N3Xbrtfp2Y2IJ6cuboB1PJ31SFSNP9r9q0jdfL7Gx22eD4GoA.jpg"
          width={50}
        />
        <div>
          <h2>Payment options</h2>
          <p>Edit or add payment methods</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Wallet icon"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/afCQQ2k3uNRzLqW2q8n5ACZNCRkzojGe3ZlYTOrCejmjD4GoA.jpg"
          width={50}
        />
        <div>
          <h2>ONSOK Pay balance</h2>
          <p>Add money to your balance</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Headset icon"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/GzlSCM4zpeQoCa9sDYuVUDWzcRUnTFa2FIBAwB3WRBu7AuBKA.jpg"
          width={50}
        />
        <div>
          <h2>Contact Us</h2>
          <p>Contact our customer service via phone or chat</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="account-card">
        <img
          alt="Headset icon"
          height={50}
          src="https://img.icons8.com/?size=100&id=biTgjhfJT5Ej&format=png&color=000000"
          width={50} onClick={() => SellerProducts(id)}
        />
        <div>
          <h2>Seller Account</h2>
          <p>Seller Product Details</p>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="pt-5">
                <div className="green12">
                    <div className="row p-5">
                        <div className="col-2">
                            <div>
                                <div className="one px-3">Shop</div>
                                <ul className="pt-4">
                                    <li className="list">home</li>
                                    <li className="list">about</li>
                                    <li className="list">shop</li>
                                    <li className="list">Contact</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="one px-3">Policy</div>
                                <ul className="pt-4">
                                    <li className="list">terms &amp; conditions</li>
                                    <li className="list">privacy policy</li>
                                    <li className="list">refund policy</li>
                                    <li className="list">shipping policy</li>
                                    <li className="list">accessibility statement</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="one px-3">contact</div>
                                <ul className="pt-4">
                                    <li className="list">500 terry francine street</li>
                                    <li className="list">san francisco, ca 94158</li>
                                    <li className="list">info@mysite.com</li>
                                    <li className="list">123-456-7890</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="subscribe">subscribe to our newsletter</div>
                            <div className="be pt-3">
                                be the first to know about our hottest discounts
                            </div>
                            <div className="pt-3">
                                <label htmlFor="pt-2" className="label">
                                    Email
                                </label>
                                <div className="pt-2">
                                    <div className="pt-1">
                                        <input type="email" className="input" />
                                    </div>
                                    <div className="pt-1">
                                        <input type="checkbox" />
                                        <span className="px-3 span">
                                            Yes, subscribe me to your newsletter.
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-3">
                                    <button className="subb">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 pt-5">
                        <div className="Onsko1 fw-bold">#Onsko</div>
                    </div>
                </div>
            </div>

    </>
  );
}

export default Myaccount;
