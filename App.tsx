import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from'./Components/Pages/Home'
import About from './Components/Pages/About'
import Contact from'./Components/Pages/Contact'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import Products from "./Components/Projects/Products"
  
import Navbar from "./Components/Layout/Navbar"
import Footer from "./Components/Layout/Footer"

function App() {
  return (
      <Router>
        <Navbar/>
          <Routes>
             <Route path="/" Component={Home} />
             <Route path="/About" Component={About} />
             <Route path="/Contact" Component={Contact} />
             <Route path="/Login" Component={Login} />
             <Route path="/Register" Component={Register} />
             <Route path="/Projects/Products" Component={Products} />
          </Routes>
          <Footer/>                                                         
      </Router>
  )
}

export default App