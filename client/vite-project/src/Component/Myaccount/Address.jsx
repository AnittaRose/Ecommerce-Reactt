import React from "react";
function Address(){
    return(
        <>
            <div className="container-fluid mt-4">
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <a href="#">Your Account</a>
      </li>
      <li aria-current="page" className="breadcrumb-item active">
        Your Addresses
      </li>
    </ol>
  </nav>
  <h2>Your Addresses</h2>
  <div className="row">
    <div className="col-md-4 d-flex">
      <div className="add-address-card w-100">
        <i className="fas fa-plus"></i>
        <div>Add address</div>
      </div>
    </div>
    <div className="col-md-4 d-flex">
      <div className="address-card default w-100">
        <div className="d-flex justify-content-between">
          <div>Default:</div>
          <img
            alt="Onsok logo"
            height={20}
            src="https://storage.googleapis.com/a1aa/image/QffUJdW3TKmELEBxrxpCvnOYhHgkA85fTKv7pJvHk6mLZ5GoA.jpg"
            width={50}
          />
        </div>
        <strong>Anitta nelson</strong>
        <br />
        238
        <br />
        Ellamkunnuroad po urakam
        <br />
        Urakam, KERALA 680562
        <br />
        India
        <br />
        Phone number: 8547986109
        <br />
        <a className="address-actions" href="#">
          Add delivery instructions
        </a>
        <div className="address-actions mt-2">
          <a href="#">Edit</a>|<a href="#">Remove</a>
        </div>
      </div>
    </div>
    <div className="col-md-4 d-flex">
      <div className="address-card w-100">
        <strong>Anitta nelson</strong>
        <br />
        238
        <br />
        Ellamkunnuroad
        <br />
        Urakam, KERALA 680562
        <br />
        India
        <br />
        Phone number: 8547986109
        <br />
        <a className="address-actions" href="#">
          Add delivery instructions
        </a>
        <div className="address-actions mt-2">
          <a href="#">Edit</a>|<a href="#">Remove</a>|
          <a href="#">Set as Default</a>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}
export default Address;