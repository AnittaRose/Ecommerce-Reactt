
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function TotalBuyerPage() {

//   const params = new URLSearchParams(window.location.search);
//   console.log("params", params);

//   // Fetch token and user id directly from URL params
//   let token_key = params.get('login');
//   let id = params.get('id');

//   let token = localStorage.getItem(token_key);
//   console.log("Token:", token);

//   let userId = params.get('id');
//   console.log("User ID:", userId);
//   const [buyers, setBuyers] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedBuyer, setSelectedBuyer] = useState(null);
//   const [reason, setReason] = useState("");

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchBuyerDetails = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/buyerDetails");
//         setBuyers(response.data.totalBuyer);
//         console.log("response.data.totalBuyer", response.data.totalBuyer);
//       } catch (err) {
//         setError("Failed to fetch Buyer details");
//       }
//     };

//     fetchBuyerDetails();
//   }, []);

//   const handleBlockUnblock = async (id, isBlocked, reason) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/BlockBuyer/${id}`, {
//         isBlocked: !isBlocked,
//         reason,
//       });

//       // Update the buyer's blocked status in state
//       setBuyers((prevBuyers) =>
//         prevBuyers.map((buyer) =>
//           buyer._id === id ? { ...buyer, isBlocked: !isBlocked } : buyer
//         )
//       );

//       alert(response.data.message); // Show success message
//       setSelectedBuyer(null); // Close the modal
//       setReason(""); // Reset reason
//     } catch (err) {
//       console.error("Error blocking/unblocking buyer:", err);
//       alert("Error occurred while updating block status");
//     }
//   };

//   const openModal = (buyer) => {
//     setSelectedBuyer(buyer);
//   };

//   const closeModal = () => {
//     setSelectedBuyer(null);
//     setReason("");
//   };

//   const SeeDetails = (id) => {
//     navigate(`/Orders?login=${token_key}&id=${id}`);
// };

//   return (
//     <div className="">
//       <div className="mainboxx" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <div className="mt-5" style={{ width: '80%', maxWidth: '1000px' }}>
//           <h1 className="mb-4" style={{ textAlign: 'center', color: '#4CAF50' }}>Total Buyer Details</h1>
//           {error ? (
//             <p className="text-danger">{error}</p>
//           ) : (
//             <table className="table table-bordered" style={{ textAlign: 'center', backgroundColor: '#f4f4f9' }}>
//               <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
//                 <tr>
//                   <th>No:</th>
//                   <th>Buyer Name</th>
//                   <th>Email</th>
//                   <th>Contact</th>
//                   <th>View</th>
//                   <th>Block/Unblock</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {buyers.map((buyer, index) => (
//                   <tr key={buyer._id}>
//                     <td>{index + 1}</td>
//                     <td>{buyer.name}</td>
//                     <td>{buyer.email}</td>
//                     <td>{buyer.phoneno}</td>
//                     <td><button onClick={()=>SeeDetails(buyer._id)} className="btn btn-info">See Details</button></td>
//                     <td>
//                       <button
//                         className={`btn ${buyer.isBlocked ? "btn-success" : "btn-danger"}`}
//                         onClick={() => openModal(buyer)}
//                       >
//                         {buyer.isBlocked ? "Unblock" : "Block"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Modal for providing reason */}
//       {selectedBuyer && (
//         <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   {selectedBuyer.isBlocked ? "Unblock Buyer" : "Block Buyer"}
//                 </h5>
//                 <button type="button" className="btn-close" onClick={closeModal}></button>
//               </div>
//               <div className="modal-body">
//                 {!selectedBuyer.isBlocked && (
//                   <>
//                     <p>Please provide a reason for blocking:</p>
//                     <textarea
//                       className="form-control"
//                       value={reason}
//                       onChange={(e) => setReason(e.target.value)}
//                       placeholder="Enter reason here"
//                     ></textarea>
//                   </>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className={`btn ${selectedBuyer.isBlocked ? "btn-success" : "btn-danger"}`}
//                   onClick={() =>
//                     handleBlockUnblock(
//                       selectedBuyer._id,
//                       selectedBuyer.isBlocked,
//                       reason
//                     )
//                   }
//                   disabled={!selectedBuyer.isBlocked && reason.trim() === ""}
//                 >
//                   {selectedBuyer.isBlocked ? "Unblock" : "Block"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TotalBuyerPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TotalBuyerPage() {
  const params = new URLSearchParams(window.location.search);
  let token_key = params.get("login");
  let userId = params.get("id");
  let token = localStorage.getItem(token_key);

  const [buyers, setBuyers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buyerDetails");
        setBuyers(response.data.totalBuyer);
      } catch (err) {
        setError("Failed to fetch Buyer details");
      }
    };

    fetchBuyerDetails();
  }, []);

  const handleBlockUnblock = async (id, isBlocked, reason) => {
    try {
      const response = await axios.patch(`http://localhost:3000/BlockBuyer/${id}`, {
        isBlocked: !isBlocked,
        reason,
      });

      setBuyers((prevBuyers) =>
        prevBuyers.map((buyer) =>
          buyer._id === id ? { ...buyer, isBlocked: !isBlocked } : buyer
        )
      );

      alert(response.data.message);
      setSelectedBuyer(null);
      setReason("");
    } catch (err) {
      alert("Error occurred while updating block status");
    }
  };

  const openModal = (buyer) => {
    setSelectedBuyer(buyer);
  };

  const closeModal = () => {
    setSelectedBuyer(null);
    setReason("");
  };

  const SeeDetails = (id) => {
    navigate(`/Orders?login=${token_key}&id=${id}`);
  };

  const logout = () => {
    localStorage.removeItem(token_key);
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-md-2 d-none d-md-block sidebar bg-dark">
          <div className="position-sticky pt-3">
            <h4 className="text-center py-3">Admin Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() =>
                    navigate(`/AdminDashboard?login=${token_key}&userId=${userId}`)
                  }
                  href=""
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() =>
                    navigate(`/AdminAllproduts?login=${token_key}&userId=${userId}`)
                  }
                  href="#"
                >
                  All Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() =>
                    navigate(`/AdminApproveRequests?login=${token_key}&userId=${userId}`)
                  }
                  href="#"
                >
                  Request
                </a>
              </li>
              <li className="nav-item px-2">
                <button className="logu" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          <div className="mainboxx mt-5" style={{ width: "100%" }}>
            <h1
              className="mb-4"
              style={{ textAlign: "center", color: "#4CAF50" }}
            >
              Total Buyer Details
            </h1>
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  style={{ textAlign: "center", backgroundColor: "#f4f4f9" }}
                >
                  <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                    <tr>
                      <th>No:</th>
                      <th>Buyer Name</th>
                      <th>Email</th>
                      <th>phoneno</th>
                      <th>View</th>
                      <th>Block/Unblock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyers.map((buyer, index) => (
                      <tr key={buyer._id}>
                        <td>{index + 1}</td>
                        <td>{buyer.name}</td>
                        <td>{buyer.email}</td>
                        <td>{buyer.phoneno}</td>
                        <td>
                          <button
                            onClick={() => SeeDetails(buyer._id)}
                            className="btn btn-info"
                          >
                            See Details
                          </button>
                        </td>
                        <td>
                          <button
                            className={`btn ${
                              buyer.isBlocked ? "btn-success" : "btn-danger"
                            }`}
                            onClick={() => openModal(buyer)}
                          >
                            {buyer.isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal for providing reason */}
          {selectedBuyer && (
            <div
              className="modal"
              style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {selectedBuyer.isBlocked ? "Unblock Buyer" : "Block Buyer"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {!selectedBuyer.isBlocked && (
                      <>
                        <p>Please provide a reason for blocking:</p>
                        <textarea
                          className="form-control"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Enter reason here"
                        ></textarea>
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        selectedBuyer.isBlocked ? "btn-success" : "btn-danger"
                      }`}
                      onClick={() =>
                        handleBlockUnblock(
                          selectedBuyer._id,
                          selectedBuyer.isBlocked,
                          reason
                        )
                      }
                      disabled={!selectedBuyer.isBlocked && reason.trim() === ""}
                    >
                      {selectedBuyer.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default TotalBuyerPage;
