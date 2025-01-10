// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AdminApproveRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUpgradeRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/upgradeRequests');
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching upgrade requests:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUpgradeRequests();
//   }, []);

//   const handleApprove = async (userId) => {
//     try {
//       const response = await axios.put(`http://localhost:3000/buyerUpgrade/${userId}`);
//       alert('Request approved successfully!');
//       setRequests(requests.filter((request) => request.userId !== userId)); // Remove approved request from the list
//     } catch (error) {
//       console.error('Error approving request:', error);
//       alert('Failed to approve the request.');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="py-5">
//       <h2 className="text-center">Upgrade Requests</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Company Name</th>
//             <th>License Number</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((request, index) => (
//             <tr key={`${request.userId}-${index}`}> {/* Make sure key is unique */}
//               <td>{request.userId}</td>
//               <td>{request.companyName}</td>
//               <td>{request.licenseNumber}</td>
//               <td>{request.status}</td>
//               <td>
//                 <button
//                   className="btn btn-success"
//                   onClick={() => handleApprove(request.userId)}
//                 >
//                   Approve
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminApproveRequests;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminApproveRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  console.log("params", params); // Debugging log for parameters in the URL

  // Fetch token and user id directly from URL params
  let token_key = params.get('login');
  console.log("Token Key from URL:", token_key);

  // If token_key exists, fetch the token from localStorage
  let token = localStorage.getItem(token_key);
  console.log("Token from localStorage:", token);

  let userId = params.get('id');
  console.log("User ID from URL:", userId);

  useEffect(() => {
    const fetchUpgradeRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upgradeRequests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching upgrade requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpgradeRequests();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3000/buyerUpgrade/${userId}`);
      alert('Request approved successfully!');
      setRequests(requests.filter((request) => request.userId !== userId)); // Remove approved request from the list
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve the request.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  
  const AllProducts = () => {
    navigate(`/AdminAllproduts?login=${token_key}&userId=${userId}`);


  }
  const Requestt = () => {
    navigate(`/AdminApproveRequests?login=${token_key}&userId=${userId}`);


  }

  const logout = async () => {
    console.log("Reached..... at log out");

    let params = new URLSearchParams(window.location.search);
    console.log('params', params);

    let token_key = params.get('login');
    console.log("token_key:", token_key);

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
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="py-5">
            <h2 className="text-center">Upgrade Requests</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Company Name</th>
                    <th>License Number</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={`${request.userId}-${index}`}>
                      <td>{request.userId}</td>
                      <td>{request.companyName}</td>
                      <td>{request.licenseNumber}</td>
                      <td>{request.status}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(request.userId)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminApproveRequests;
