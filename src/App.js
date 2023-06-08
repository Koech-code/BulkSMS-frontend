import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/home/home'
import Children from "./pages/parents/createChildAccount";
import Artworks from "./pages/artworks/CreateArtwork";
// import LeftDrawer from "./components/Drawer";
import NavBar from "./components/NavBar";

import ArtworkCheckoutPage from "./pages/checkout";
import Login from "./pages/parents/parentLogin";
import CheckoutArt from "./pages/chekoutArt";
import ArtworkView from "./pages/artworks/singleArtwork";
import ParentsRegister from "./pages/parents/ParentsRegister";
import RegistrationPage from "./components/Register";
import CustomerRegister from "./pages/customers/Register";
import CustomerLogin from "./pages/customers/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import AccountStatus from "./pages/admin/Accounts";
import SendRequest from "./pages/activation/sendRequest";
import ActivationRequests from "./pages/activation/activationRequests";
import Checkout from "./pages/checkout/pay";
import Sidebar from "./components/Sidebar";
import PermanentDrawerLeft from "./components/ResponsiveSidebar";
import Allparents from "./pages/parents/Allparents";
import Allcustomers from "./pages/customers/Allcustomers";
import CustomersView from "./pages/artworks/customersView";
import Alltransactions from "./pages/transactions/transactionsList";
import Withdraw from "./pages/withdraw/withdraw";
import Footer from "./components/Footer";

function App() {
  const isLoginPage = window.location.pathname === "/" || window.location.pathname === "/customer/login" || window.location.pathname === "/parent/login" || window.location.pathname === "/footer";

  return (
    <div className="max-w-screen my-0 ">

      <BrowserRouter>
        {!isLoginPage && <PermanentDrawerLeft />}
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/artworks" element={<Home />} />
          <Route path="/children" element={<Children />} />
          <Route path="/artworks/create" element={<Artworks />} />
          <Route path="/checkout" element={<ArtworkCheckoutPage />} />
          <Route path="/parent/login" element={<Login />} />
          <Route path="/checkout-art" element={<CheckoutArt />} />
          <Route path="/artwork/:id" element={<ArtworkView />} />
          <Route path="/register-parent" element={<ParentsRegister />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/login" element={<CustomerLogin />} />

          <Route path="/admin/accounts" element={<AccountStatus />} />
          <Route path="/send/request/:ID" element={<SendRequest />} />
          <Route path="/activation/requests" element={<ActivationRequests />} />
          <Route path="/pay/:id" element={<Checkout />} />
          <Route path="/parents" element={<Allparents />} />
          <Route path="/customers" element={<Allcustomers />} />
          <Route path="/arts&crafts" element={<CustomersView />} />
          <Route path="/transactions" element={<Alltransactions />} />
          <Route path="/withdraw" element={<Withdraw />} />
          {/* <Route path="/footer" element={<Footer />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;