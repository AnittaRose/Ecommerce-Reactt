import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Llogin(){
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);
  const navigate = useNavigate();
  let token_key = params.get('login');
  let token = localStorage.getItem(token_key);
  console.log("Token:", token);
  let userId = params.get('id');
  console.log("User ID:", userId);

  const Shop = () => {
    navigate(`/Shop?login=${token_key}&id=${userId}`);
  };
    return(
        <>
        <div className="header d-flex justify-content-center">
        <div className="d-flex">
      <div className="logo">
        <div className=" fw-bold  link-light" onClick={() => Onsok(userId)}>Onsko</div>
      </div>
      <div className="nav d-flex">
        <a href="" className='px-3'>Home</a>
        {/* <Link to="/Shop" className="login11 link-light">Shop</Link> */}
        <span className='fw-bold' onClick={Shop}>Shop</span>
        <Link to="/About" className="login11 link-light">About</Link>
        <Link to="/Contact" className="login11 link-light">Contact</Link>
      </div>
    </div>
        </div>

<div className="signin-container position-absolute top-50 start-50 translate-middle">

  <h2 className="h5">Sign in</h2>
  <a className="text-decoration-none" href="#" style={{ color: "#007185" }}>
    Switch accounts
  </a>
  <div className="d-flex align-items-center my-3">
    <img
      alt="Profile image"
      className="rounded-circle me-2"
      height={50}
      src="https://placehold.co/50x50"
      width={50}
    />
    <div>
      <div>User Name</div>
      <div>+911010101010</div>
    </div>
  </div>
  <form onsubmit="alert('Form submitted!'); return false;">
    <div className="mb-3 text-start">
      <label className="form-label" htmlFor="password">
        Password
      </label>
      <a
        className="float-end text-decoration-none"
        href="#"
        style={{ color: "#007185" }}
      >
        Forgot password?
      </a>
      <input className="form-control" id="password" type="password" />
    </div>
    <button className="btn btn-primary" type="submit">
      Sign in
    </button>
    <div className="form-check my-3 text-start">
      <input className="form-check-input" id="keepSignedIn" type="checkbox" />
      <label className="form-check-label" htmlFor="keepSignedIn">
        Keep me signed in.
        <a className="details" href="#">
          Details
        </a>
      </label>
    </div>
  </form>
  <div className="or-divider">or</div>
  <button className="btn btn-secondary">Get an OTP on your phone</button>
</div>

        </>
    )
}
export default Llogin;