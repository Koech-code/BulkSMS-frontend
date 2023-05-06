import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/home'
import Parents from "./pages/parents";
import Children from "./pages/createChildAccount";
import Artworks from "./pages/artworks";
// import LeftDrawer from "./components/Drawer";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./components/auth";
import ArtworkCheckoutPage from "./pages/checkout";
import ActivateParentAcoount from "./pages/requestActivation";
import Login from "./pages/parentLogin";
import CheckoutArt from "./pages/chekoutArt";
import ArtworkView from "./pages/singleArtwork";

function App() {
  return (
    <div className="max-w-screen my-0 ">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/children" element={<Children />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<ArtworkCheckoutPage />} />
          <Route path="/activate" element={<ActivateParentAcoount />} />
          <Route path="/parent-login" element={<Login />} />
          <Route path="/checkout-art" element={<CheckoutArt />} />
          <Route path="/artwork/:id" element={<ArtworkView />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;