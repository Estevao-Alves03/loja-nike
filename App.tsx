// importaçao do react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importaçao das paginas principais
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Contact from './Components/Pages/Contact';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import ProductDetail from "./Components/Pages/ProductDetail";
import Checkout from "./Components/Pages/Checkout";
// importaçao das paginas de layout
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Products/:id" element={<ProductDetail />} />
        <Route path="/Checkout" element={<Checkout/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
