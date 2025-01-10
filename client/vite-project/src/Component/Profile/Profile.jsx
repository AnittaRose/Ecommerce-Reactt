import React from "react";

function Profile(){
    return(
        <>
        <div className="container-fluid">
  <div className="row">
    <nav className="col-md-2 d-none d-md-block sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <i className="fas fa-tachometer-alt"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-briefcase"></i>
              Opportunities
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-truck"></i>
              Suppliers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-users"></i>
              Buyers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-address-book"></i>
              Contacts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-star"></i>
              Watchlist
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-envelope"></i>
              Messages
              <span className="badge bg-danger">1</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-calendar-alt"></i>
              Scheduling
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
      <div className="profile-header text-center">
        <img
          alt="Profile picture of Nathaniel Poole"
          height={100}
          src="https://storage.googleapis.com/a1aa/image/5zJJeWITRb1el0eaMyULJxoXVGHSovRQD7sjpbzfa0Jlfe2AF.jpg"
          width={100}
        />
        <button className="change-cover">
          <i className="fas fa-camera"></i>
          Change Cover
        </button>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="profile-card text-center">
            <img
              alt="Profile picture of Nathaniel Poole"
              height={100}
              src="https://storage.googleapis.com/a1aa/image/5zJJeWITRb1el0eaMyULJxoXVGHSovRQD7sjpbzfa0Jlfe2AF.jpg"
              width={100}
            />
            <h3>Nathaniel Poole</h3>
            <p>Microsoft Inc.</p>
            <div className="stats">
              <div className="stat">
                <span>32</span>
                Opportunities applied
              </div>
              <div className="stat">
                <span>26</span>
                Opportunities won
              </div>
              <div className="stat">
                <span>6</span>
                Current opportunities
              </div>
            </div>
            <div className="view-profile">
              <a href="#">View Public Profile</a>
            </div>
            <div className="profile-link">
              <input
                readOnly=""
                type="text"
                defaultValue="https://app.ahireground.com"
              />
              <button>Copy Link</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="profile-settings">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  aria-controls="account-settings"
                  aria-selected="true"
                  className="nav-link active"
                  data-bs-target="#account-settings"
                  data-bs-toggle="tab"
                  id="account-settings-tab"
                  role="tab"
                  type="button"
                >
                  Account Settings
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  aria-controls="company-settings"
                  aria-selected="false"
                  className="nav-link"
                  data-bs-target="#company-settings"
                  data-bs-toggle="tab"
                  id="company-settings-tab"
                  role="tab"
                  type="button"
                >
                  Company Settings
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  aria-controls="documents"
                  aria-selected="false"
                  className="nav-link"
                  data-bs-target="#documents"
                  data-bs-toggle="tab"
                  id="documents-tab"
                  role="tab"
                  type="button"
                >
                  Documents
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  aria-controls="billing"
                  aria-selected="false"
                  className="nav-link"
                  data-bs-target="#billing"
                  data-bs-toggle="tab"
                  id="billing-tab"
                  role="tab"
                  type="button"
                >
                  Billing
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  aria-controls="notifications"
                  aria-selected="false"
                  className="nav-link"
                  data-bs-target="#notifications"
                  data-bs-toggle="tab"
                  id="notifications-tab"
                  role="tab"
                  type="button"
                >
                  Notifications
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                aria-labelledby="account-settings-tab"
                className="tab-pane fade show active"
                id="account-settings"
                role="tabpanel"
              >
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          className="form-control"
                          id="firstName"
                          type="text"
                          defaultValue="Nathaniel"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          className="form-control"
                          id="lastName"
                          type="text"
                          defaultValue="Poole"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          className="form-control"
                          id="phoneNumber"
                          type="text"
                          defaultValue="+1800-000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="emailAddress">Email address</label>
                        <input
                          className="form-control"
                          id="emailAddress"
                          type="email"
                          defaultValue="nathaniel.poole@microsoft.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          className="form-control"
                          id="city"
                          type="text"
                          defaultValue="Bridgeport"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="stateCounty">State/County</label>
                        <input
                          className="form-control"
                          id="stateCounty"
                          type="text"
                          defaultValue="WA"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="postcode">Postcode</label>
                        <input
                          className="form-control"
                          id="postcode"
                          type="text"
                          defaultValue={31005}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select className="form-control" id="country">
                          <option selected="">United States</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="update-button" type="submit">
                    Update
                  </button>
                </form>
              </div>
              <div
                aria-labelledby="company-settings-tab"
                className="tab-pane fade"
                id="company-settings"
                role="tabpanel"
              >
                Company Settings Content
              </div>
              <div
                aria-labelledby="documents-tab"
                className="tab-pane fade"
                id="documents"
                role="tabpanel"
              >
                Documents Content
              </div>
              <div
                aria-labelledby="billing-tab"
                className="tab-pane fade"
                id="billing"
                role="tabpanel"
              >
                Billing Content
              </div>
              <div
                aria-labelledby="notifications-tab"
                className="tab-pane fade"
                id="notifications"
                role="tabpanel"
              >
                Notifications Content
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

        </>
    )
}
export default Profile;