import React from "react";


function About(){
    return(
        <>
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
<div className="pt-4">
        <div className="containerss">
  <h1>our story</h1>
  <p>
    born from a passion for beauty rituals, we celebrate individuality and bring
    radiant confidence to everyone
  </p>
  <p className="subtext">for every body, anywhere</p>
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

    )
}
export default About;