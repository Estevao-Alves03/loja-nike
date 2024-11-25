import { Link } from "react-router-dom"


function Footer() {
    return(
        <div className="bg-black text-white flex justify-between items-center px-10 py-5">
            <p className="text-lg">Meu Site - Todos os direitos Reservados - 2024 </p>  
            <nav>
                <ul className="flex">
                    <li className="px-5 hover:text-yellow-400">
                        <Link to='/'>Termos de uso</Link>
                    </li>
                    <li className="px-5 hover:text-yellow-400">
                        <Link to='/'>Politica de provacidade</Link>
                    </li>
                    <li className="px-5 hover:text-yellow-400">
                        <Link to='/'>Suporte</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )   
}

export default Footer