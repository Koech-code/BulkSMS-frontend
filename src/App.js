import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import useTokenExpirationCheck from "./pages/useTokenExpirationCheck"; // Import the hook

import CustomerRegister from "./pages/customers/Register";
import CustomerLogin from "./pages/customers/Login";
import AdminLogin from "./pages/admin/AdminLogin";

import PermanentDrawerLeft from "./components/ResponsiveSidebar";

import Allcustomers from "./pages/customers/Allcustomers";
import MyEditor from "./pages/admin/sendMessage";

import Footer from "./components/Footer";

function App() {
  // useTokenExpirationCheck(); // Use the token expiration check hook

  const isLoginPage =
    window.location.pathname === "/" ||
    window.location.pathname === "/customer/login" ||
    window.location.pathname === "/parent/login" ||
    window.location.pathname === "/footer";

  return (
    <div className="max-w-screen my-0 ">
      <BrowserRouter>
        {!isLoginPage && <PermanentDrawerLeft />}
        <Routes>
          <Route path="/" element={<AdminLogin />} />

          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/login" element={<CustomerLogin />} />

          <Route path="/send/bulkSMS" element={<MyEditor />} />

          <Route path="/customers" element={<Allcustomers />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
