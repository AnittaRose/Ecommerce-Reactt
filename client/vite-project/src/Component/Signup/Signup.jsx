
import React, { useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Signup() {
    const navigate = useNavigate(); // Initialize navigate function
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState(""); 

    // Form submission handler
    const addUser = async (event) => {
        event.preventDefault();

        // Frontend validation
        if (!name || !email || !password || !phone || !address) {
            alert("All fields are required.");
            return;
        }

        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const data = {
            name,
            email,
            password,
            phone,
            address
        };

        try {
            const response = await axios.post('http://localhost:3000/user', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("User successfully created");
                navigate('/login'); // Use navigate to go to the login page
            } else {
                alert("User creation failed");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("An error occurred. Please try again.");
        }
    };

    return (
     

<div className="containe position-absolute top-50 start-50 translate-middle">

  <div className="left">
    <img
      alt="A scenic view of a forest with a sunset in the background"
      height={500}
      src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?t=st=1736223104~exp=1736226704~hmac=733575bd96170b39d0f00e2e352a5d831ca68a5f2c582cdb092035d8e62af71a&w=740"
      width={450}
    />
    <div className="content">
      
    </div>
  </div>

  <div className="right">
  <form onSubmit={addUser} className="foorm">
    <div className="form-containe">
      <h2 className="rig">SIGN UP</h2>
      <div className="input-group">
        <i className="fas fa-user"></i>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
      </div>
      <div className="input-group">
        <i className="fas fa-phone"></i>
        <input type="password"id="password"  value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      </div>
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      </div>
      <button>Create User</button>
    </div>
    </form>
  </div>
  
</div>

    );
}

export default Signup;
