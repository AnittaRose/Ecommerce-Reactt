

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function TotalSellerDetailsPage() {
//   const params = new URLSearchParams(window.location.search);
//   console.log("params", params);

//   // Fetch token and user id directly from URL params
//   let token_key = params.get('login');
//   let id = params.get('id');

//   let token = localStorage.getItem(token_key);
//   console.log("Token:", token);

//   let userId = params.get('id');
//   console.log("User ID:", userId);
//   const navigate = useNavigate();
//   const [sellers, setSellers] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedSeller, setSelectedSeller] = useState(null);
//   const [reason, setReason] = useState("");

//   useEffect(() => {
//     const fetchSellerDetails = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/sellerDetails");
//         setSellers(response.data.totalSeller);
//       } catch (err) {
//         setError("Failed to fetch seller details");
//       }
//     };

//     fetchSellerDetails();
//   }, []);

//   const handleBlockUnblock = async (id, isBlocked, reason) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/blockSeller/${id}`, {
//         isBlocked: !isBlocked,
//         reason,
//       });

//       // Update the sellers state with the updated data
//       setSellers((prevSellers) =>
//         prevSellers.map((seller) =>
//           seller._id === id ? { ...seller, isBlocked: !isBlocked } : seller
//         )
//       );

//       alert(response.data.message);
//       setSelectedSeller(null); // Close the modal
//       setReason(""); // Reset the reason
//     } catch (error) {
//       console.error("Error blocking/unblocking seller:", error);
//       alert("Failed to update seller status. Please try again.");
//     }
//   };

//   const openModal = (seller) => {
//     setSelectedSeller(seller);
//   };

//   const closeModal = () => {
//     setSelectedSeller(null);
//     setReason("");
//   };

//   const SeeDetails = (id) => {
//     navigate(`/SeeDetails?login=${token_key}&id=${id}`);
// };

//   return (
//     <>

//     <div className="dark">
//       <div className="mainboxx" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <div className="mt-5" style={{ width: '80%', maxWidth: '1000px' }}>
//           <h1 className="mb-4" style={{ textAlign: 'center', color: '#4CAF50' }}>Total Seller Details</h1>
//           {error ? (
//             <p className="text-danger">{error}</p>
//           ) : (
//             <table className="table table-bordered" style={{ textAlign: 'center', backgroundColor: '#f4f4f9' }}>
//               <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
//                 <tr>
//                   <th>No:</th>
//                   <th>Seller Name</th>
//                   <th>Email</th>
//                   <th>Contact</th>
//                   <th>Status</th>
//                   <th>View</th>
//                   <th>Block/Unblock</th>
//                   {/* <th></th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {sellers.map((seller, index) => (
//                   <tr key={seller._id}>
//                     <td>{index + 1}</td>
//                     <td>{seller.name}</td>
//                     <td>{seller.email}</td>
//                     <td>{seller.phoneno}</td>
//                     <td>{seller.isBlocked ? "Blocked" : "Active"}</td>
//                     <td><button onClick={()=>SeeDetails(seller._id)} className="btn btn-info">See Details</button></td>
//                     <td>
//                       <button
//                         className={`btn ${seller.isBlocked ? "btn-success" : "btn-danger"}`}
//                         onClick={() => openModal(seller)}
//                       >
//                         {seller.isBlocked ? "Unblock" : "Block"}
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
//       {selectedSeller && (
//         <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   {selectedSeller.isBlocked ? "Unblock Seller" : "Block Seller"}
//                 </h5>
//                 <button type="button" className="btn-close" onClick={closeModal}></button>
//               </div>
//               <div className="modal-body">
//                 {!selectedSeller.isBlocked && (
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
//                   className={`btn ${selectedSeller.isBlocked ? "btn-success" : "btn-danger"}`}
//                   onClick={() =>
//                     handleBlockUnblock(
//                       selectedSeller._id,
//                       selectedSeller.isBlocked,
//                       reason
//                     )
//                   }
//                   disabled={!selectedSeller.isBlocked && reason.trim() === ""}
//                 >
//                   {selectedSeller.isBlocked ? "Unblock" : "Block"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//     </>
//   );
// }

// export default TotalSellerDetailsPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TotalSellerDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  console.log("params", params);

  // Fetch token and user id directly from URL params
  let token_key = params.get('login');
  let id = params.get('id');

  let token = localStorage.getItem(token_key);
  console.log("Token:", token);

  let userId = params.get('id');
  console.log("User ID:", userId);
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sellerDetails");
        setSellers(response.data.totalSeller);
      } catch (err) {
        setError("Failed to fetch seller details");
      }
    };

    fetchSellerDetails();
  }, []);

  const handleBlockUnblock = async (id, isBlocked, reason) => {
    try {
      const response = await axios.patch(`http://localhost:3000/blockSeller/${id}`, {
        isBlocked: !isBlocked,
        reason,
      });

      // Update the sellers state with the updated data
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === id ? { ...seller, isBlocked: !isBlocked } : seller
        )
      );

      alert(response.data.message);
      setSelectedSeller(null); // Close the modal
      setReason(""); // Reset the reason
    } catch (error) {
      console.error("Error blocking/unblocking seller:", error);
      alert("Failed to update seller status. Please try again.");
    }
  };

  const openModal = (seller) => {
    setSelectedSeller(seller);
  };

  const closeModal = () => {
    setSelectedSeller(null);
    setReason("");
  };

  const SeeDetails = (id) => {
    navigate(`/SeeDetails?login=${token_key}&id=${id}`);
  };

  const logout = async () => {
    console.log("Reached..... at log out");

    if (token_key) {
      let token = localStorage.getItem(token_key);
      console.log("token", token);

      if (token) {
        localStorage.removeItem(token_key);
        navigate("/Login"); // Use navigate to redirect to the login page
      } else {
        console.log("Token not found");
        navigate("/Login");
      }
    } else {
      console.log("No login parameter found in the URL");
      navigate("/Login");
    }
  };

  return (
    <div className="container-fluid">
  <div className="row">
    {/* Sidebar */}
    <div className="col-12 col-md-3 col-lg-2 sidebar bg-dark">
      <div className="position-sticky pt-3">
        <h4 className="text-center py-3">Admin Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => navigate(`/AdminDashboard?login=${token_key}&userId=${userId}`)}
              href=""
            >
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => navigate(`/AdminAllproduts?login=${token_key}&userId=${userId}`)}
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
              onClick={() => navigate(`/AdminApproveRequests?login=${token_key}&userId=${userId}`)}
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

    {/* Main Content */}
    <main className="col-12 col-md-9 col-lg-10 px-4">
      <div className="">
        <div className=" py-4">
          <div className="mt-5">
            <h1
              className="mb-4 text-center"
              style={{ color: "#4CAF50" }}
            >
              Total Seller Details
            </h1>
            {error ? (
              <p className="text-danger text-center">{error}</p>
            ) : (
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  style={{ textAlign: "center", backgroundColor: "#f4f4f9" }}
                >
                  <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                    <tr>
                      <th>No:</th>
                      <th>Seller Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Block/Unblock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller, index) => (
                      <tr key={seller._id}>
                        <td>{index + 1}</td>
                        <td>{seller.name}</td>
                        <td>{seller.email}</td>
                        <td>{seller.phoneno}</td>
                        <td>{seller.isBlocked ? "Blocked" : "Active"}</td>
                        <td>
                          <button
                            onClick={() => SeeDetails(seller._id)}
                            className="btn btn-info"
                          >
                            See Details
                          </button>
                        </td>
                        <td>
                          <button
                            className={`btn ${seller.isBlocked ? "btn-success" : "btn-danger"}`}
                            onClick={() => openModal(seller)}
                          >
                            {seller.isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal for providing reason */}
        {selectedSeller && (
          <div
            className="modal"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedSeller.isBlocked ? "Unblock Seller" : "Block Seller"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {!selectedSeller.isBlocked && (
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
                    className={`btn ${selectedSeller.isBlocked ? "btn-success" : "btn-danger"}`}
                    onClick={() =>
                      handleBlockUnblock(
                        selectedSeller._id,
                        selectedSeller.isBlocked,
                        reason
                      )
                    }
                    disabled={!selectedSeller.isBlocked && reason.trim() === ""}
                  >
                    {selectedSeller.isBlocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  </div>
</div>

  );
}

export default TotalSellerDetailsPage;
