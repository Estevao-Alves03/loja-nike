import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { SiNike } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { useMemo } from "react";
import { useCartStore } from "@/Zustand/CartStore";
import Cart from "../MyCart/Cart";

function Navbar() {   

    const cart = useCartStore((state) => state.cart)

    const productsCount = useMemo(() => {
        return cart.reduce((acc, curr) => acc + curr.quantity, 0)
    }, [cart])

    return(
    <div className='bg-black py-3 px-20 flex justify-around items-center'>
        <Link to='/'>
            <h1 className='text-white font-extrabold font-sans text-7xl pr-7 pl-5'> <SiNike /></h1>
        </Link>
        <nav>
            <ul className="text-white flex">
                <li  className="text-lg px-5 hover:text-yellow-400">
                    <Link to='/About'>About</Link>
                </li>
                <li  className="text-lg px-5 hover:text-yellow-400">
                    <Link to='/Contact'>Contact</Link>
                </li>
                <li  className="text-lg px-5 hover:text-yellow-400"> 
                    <Link to='/Login'>Login</Link>
                </li>
                <li className="text-lg px-5 hover:text-yellow-400">
                    <Link to='/Register'>Register</Link>
                </li>
            </ul>
        </nav>
       <div className=" flex items-center">
        <Button className="text-lg bg-black hover:bg-transparent hover:text-yellow-400 px-6 py-5 rounded-2xl">
            <FaShoppingCart className="mr-2"/>
          <div className="mr-1">
            <Cart /> 
          </div>
           - {productsCount}
        </Button>
       </div>
    </div>
    )
}

export default Navbar