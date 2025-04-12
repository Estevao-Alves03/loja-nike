import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserStore } from "./Zustand/UserStore"; // 👈 importa a store

// Páginas principais
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Contacts from './Components/Pages/Contact';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Checkout from "./Components/Layout/CheckoutSteps";
import CartPage from "./Components/Pages/CartPage";
import Payment from "./Components/Pages/Payment";
import Orders from "./Components/Pages/Orders";

// Layout
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import ProductDetail from "./Components/Pages/ProductDetail";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const setUser = useUserStore.setState;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser({ currentUser: user });
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Products/:id" element={<ProductDetail />} />
        <Route path="/Checkout" element={<Checkout currentStep={1} />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Orders" element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
