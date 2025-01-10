import React from "react";

function Contact(){
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
          <div className="icon">
            <a href="#">log in</a>
            <a href="#">
              <i className="fas fa-heart"></i>0
            </a>
            <a href="#">
              <i className="fas fa-search"></i>
            </a>
          </div>
        </div>
      </div>
<div className="pt-3">
<div className="containersr">
  <div className="contact-info">
    <h2>
      GET IN TOUCH:
      <br />
      WE'RE HERE TO HELP
    </h2>
    <p>
      500 Terry Francine St.
      <br />
      San Francisco, CA 94158
    </p>
    <p>
      Mon - Fri 9:00 am – 5:00 pm
      <br />
      Saturday 9:00 am – 2:00 pm
      <br />
      Sunday 9:00 am – 2:00 pm
    </p>
    <p>
      123-456-7890
      <br />
      info@mysite.com
    </p>
    <p>
      This is the space to share the business’s contact information. Let people
      know the best ways to get in touch and encourage them to reach out.
    </p>
  </div>
  <div className="contact-form">
    <label htmlFor="first-name">First name *</label>
    <label htmlFor="last-name">Last name *</label>
    <input type="text" id="first-name" name="first-name" required="" />
    <input type="text" id="last-name" name="last-name" required="" />
    <label htmlFor="email">Email *</label>
    <label htmlFor="phone">Phone *</label>
    <input type="email" id="email" name="email" required="" />
    <input type="tel" id="phone" name="phone" required="" />
    <label htmlFor="message">Message</label>
    <textarea id="message" name="message" defaultValue={""} />
    <button type="submit">Submit</button>
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
    )
}
export default Contact;