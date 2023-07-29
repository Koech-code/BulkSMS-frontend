// import React, { useEffect } from "react";
// import jwtDecode from "jwt-decode";

// const useTokenExpirationCheck = () => {
//   useEffect(() => {
//     const localStoragetoken = localStorage.getItem("token");
//     // Decode the token payload
//     const decodedToken = jwtDecode(localStoragetoken);

//     if (
//       decodedToken &&
//       decodedToken.exp &&
//       Date.now() > decodedToken.exp * 1000
//     ) {
//       // Redirect to login page
//       window.location.href = "/";
//       // Alternatively, you can use router.push('/') if you are using a router library like react-router-dom.
//     }
//   }, []); // Pass an empty dependency array to run the effect only once
// };

// export default useTokenExpirationCheck;
