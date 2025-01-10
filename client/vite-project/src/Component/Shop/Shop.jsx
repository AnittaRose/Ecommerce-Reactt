// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';


// function Shop() {
//   const params = new URLSearchParams(window.location.search);
//   console.log("params", params);
  
//   let token_key = params.get('login');
//   console.log("token_keyyyyy",token_key)

//   let token = localStorage.getItem(token_key);
//   console.log("Token:", token);
  
//   const navigate = useNavigate();
  
//   let userid = params.get('id');  // Correct variable name
//   console.log("User ID:", userid);  // Logging with the correct variable name

//   const Onsok = (id) => {
//     navigate(`/Buyer?login=${token_key}&id=${id}`);
//   };

//   return (
//     <>
//       <div className="header">
//         <div className="logo">
//           <span onClick={() => Onsok(userid)}>onsko</span> {/* Correct usage */}
//         </div>
//         <div className="nav">
//           <a href="#">Home</a>
//           <Link to="/Shop" className="login11 link-light">Shop</Link>
//           <Link to="/About" className="login11 link-light">About</Link>
//         </div>
//       </div>
//       <div className="containers">
//         <div className="sidebar">
//           <h3>browse by</h3>
//           <a href="#">All Products</a>
//           <a href="#">body care</a>
//           <a href="#">face care</a>
//           <a href="#">hair care</a>
//           <a href="#">best sellers</a>
//           <a href="#">new arrivals</a>
//           <h3>filter by</h3>
//           <label htmlFor="price">Price</label>
//           <input id="price" max={100} min={0} name="price" type="range" />
//         </div>
//         <div className="main-content">
//           <div className="product-grid">
//             <div className="product">
//               <div className="label">best seller</div>
//               <img
//                 alt="Green tube of Onsko Radiant Renewal Serum"
//                 height={300}
//                 src="https://storage.googleapis.com/a1aa/image/47wQmxyeuUSDe0Cf5enREBcapNsxDzVdpLsYdQjpWJ0EwcNQB.jpg"
//                 width={200}
//               />
//             </div>
            
//             <div className="product">
//               <div className="label">best seller</div>
//               <img
//                 alt="Green bottle of Onsko HydraGlow Moisturizer"
//                 height={300}
//                 src="https://storage.googleapis.com/a1aa/image/cG48zAI8F47cOlrGjIe7MgXpgsaFy2HHwhaUGyN3kSqBmrBKA.jpg"
//                 width={200}
//               />
//             </div>
//             <div className="product">
//               <div className="label">best seller</div>
//               <img
//                 alt="Orange tube of Onsko product"
//                 height={300}
//                 src="https://storage.googleapis.com/a1aa/image/28CJq6VAwz7sPpK5uQNOdeq1eX7TZro5ntMfjAlpCGrLYuGoA.jpg"
//                 width={200}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="pt-5">
//                 <div className="green12">
//                     <div className="row p-5">
//                         <div className="col-2">
//                             <div>
//                                 <div className="one px-3">Shop</div>
//                                 <ul className="pt-4">
//                                     <li className="list">home</li>
//                                     <li className="list">about</li>
//                                     <li className="list">shop</li>
//                                     <li className="list">Contact</li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-2">
//                             <div>
//                                 <div className="one px-3">Policy</div>
//                                 <ul className="pt-4">
//                                     <li className="list">terms &amp; conditions</li>
//                                     <li className="list">privacy policy</li>
//                                     <li className="list">refund policy</li>
//                                     <li className="list">shipping policy</li>
//                                     <li className="list">accessibility statement</li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-2">
//                             <div>
//                                 <div className="one px-3">contact</div>
//                                 <ul className="pt-4">
//                                     <li className="list">500 terry francine street</li>
//                                     <li className="list">san francisco, ca 94158</li>
//                                     <li className="list">info@mysite.com</li>
//                                     <li className="list">123-456-7890</li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-6">
//                             <div className="subscribe">subscribe to our newsletter</div>
//                             <div className="be pt-3">
//                                 be the first to know about our hottest discounts
//                             </div>
//                             <div className="pt-3">
//                                 <label htmlFor="pt-2" className="label">
//                                     Email
//                                 </label>
//                                 <div className="pt-2">
//                                     <div className="pt-1">
//                                         <input type="email" className="input" />
//                                     </div>
//                                     <div className="pt-1">
//                                         <input type="checkbox" />
//                                         <span className="px-3 span">
//                                             Yes, subscribe me to your newsletter.
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="pt-3">
//                                     <button className="subb">Subscribe</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="px-5 pt-5">
//                         <div className="Onsko1 fw-bold">#Onsko</div>
//                     </div>
//                 </div>
//             </div>
//     </>
//   );
// }

// export default Shop;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Shop() {
  const params = new URLSearchParams(window.location.search);
  const tokenKey = params.get("login");
  const userId = params.get("id");

  console.log("Token Key:", tokenKey);
  console.log("User ID:", userId);

  // Check if token key exists before fetching from localStorage
  let token = tokenKey ? localStorage.getItem(tokenKey) : null;
  console.log("Token:", token);

  const navigate = useNavigate();

  const Onsok = (id) => {
    if (id) {
      navigate(`/Buyer?login=${tokenKey}&id=${id}`);
    } else {
      console.error("User ID is missing. Cannot navigate.");
    }
  };
  const About = () => {
    navigate(`/About?login=${tokenKey}&id=${userId}`);
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <span onClick={() => Onsok(userId)}>onsko</span>
        </div>
        <div className="nav">
          <a href="#">Home</a>
          <Link to="/Shop" className="login11 link-light">
            Shop
          </Link>
          <span className="fw-bold" onClick={About}>About</span>
        </div>
      </div>
      <div className="containers">
        <div className="sidebar">
          <h3>browse by</h3>
          <a href="#">All Products</a>
          <a href="#">body care</a>
          <a href="#">face care</a>
          <a href="#">hair care</a>
          <a href="#">best sellers</a>
          <a href="#">new arrivals</a>
          <h3>filter by</h3>
          <label htmlFor="price">Price</label>
          <input id="price" max={100} min={0} name="price" type="range" />
        </div>
        <div className="main-content">
          <div className="product-grid">
            <div className="product">
              <div className="label">best seller</div>
              <img
                alt="Green tube of Onsko Radiant Renewal Serum"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/47wQmxyeuUSDe0Cf5enREBcapNsxDzVdpLsYdQjpWJ0EwcNQB.jpg"
                width={200}
              />
            </div>

            <div className="product">
              <div className="label">best seller</div>
              <img
                alt="Green bottle of Onsko HydraGlow Moisturizer"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/cG48zAI8F47cOlrGjIe7MgXpgsaFy2HHwhaUGyN3kSqBmrBKA.jpg"
                width={200}
              />
            </div>
            <div className="product">
              <div className="label">best seller</div>
              <img
                alt="Orange tube of Onsko product"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/28CJq6VAwz7sPpK5uQNOdeq1eX7TZro5ntMfjAlpCGrLYuGoA.jpg"
                width={200}
              />
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

export default Shop;
