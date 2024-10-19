import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Navbar() {
    return(
    <div className='bg-black py-10 px-10 flex justify-around items-center'>
       <Link to='/'> <h1 className='text-white font-extrabold font-sans text-4xl'>Nike</h1></Link>
        <nav>
            <ul className="text-white flex">
                <li className="text-lg px-5 hover:text-blue-800">
                    <Link to='/'>Home</Link>
                </li>
                <li  className="text-lg px-5 hover:text-blue-800">
                    <Link to='/About'>About</Link>
                </li>
                <li  className="text-lg px-5 hover:text-blue-800">
                    <Link to='/Contact'>Contact</Link>
                </li>
                <li  className="text-lg px-5 hover:text-blue-800"> 
                    <Link to='/Login'>Login</Link>
                </li>
            </ul>
        </nav>
        <Link to='/Register'><Button className="bg-black text-lg hover:bg-gray-800 px-6 py-5 rounded-2xl ">Register</Button></Link>
    </div>
    )
}

export default Navbar