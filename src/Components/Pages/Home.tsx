import { Button } from "../../components/ui/button"
import { Link } from 'react-router-dom'
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function Home() {

    return(
      <div>
         <div className="h-96 w-full bg-center bg-cover p-60 mt-3 mb-2"
            style={{ backgroundImage: `url("/img/fundo.png")` }}>
        </div>

          <div className="flex justify-center items-center">
             <hr className="w-10/12 h-2 bg-black rounded-md "/>
          </div>

          <main>
                <h1 className="text-3xl font-black flex items-center justify-center p-5 pb-2">Produtos em alta!</h1>
                <p className="flex items-center justify-center font-semibold">Aproveite as ofertas diarias!</p>

                <div className="grid grid-cols-3 gap-5 justify-around items-center p-10">
                    <section className="flex justify-center">
                        <div className="h-96 w-80 bg-cover bg-center rounded-md border-4 border-black"
                            style={{backgroundImage : `url("/img/img1.jpeg")`}}>
                            <h2 className="text-3xl text-white font-bold mt-5 ml-6 mr-32 p-1 rounded-tl-md rounded-tr-md rounded-br-md bg-black bg-opacity-65">tenis bege</h2>
                            <p className="text-md text-white font-semibold s ml-6 mr-52 p-1 rounded-bl-md rounded-br-md bg-black bg-opacity-65">Promoção</p>
                            <Link to="#">
                                <Button className="ml-6 mt-56 bg-black hover:bg-zinc-900 hover:text-yellow-400" type="submit">Buy now</Button>
                            </Link>
                        </div>
                    </section>
                    <section className="flex justify-center">
                        <div className="h-96 w-80 bg-cover bg-center rounded-md border-4 border-black"
                            style={{backgroundImage : `url("/img/img2.webp")`}}>
                            <h2 className="text-3xl text-white font-bold mt-5 ml-6 mr-24 p-1 rounded-tl-md rounded-tr-md rounded-br-md bg-black bg-opacity-65">tenis branco</h2>
                            <p className="text-md text-white font-semibold s ml-6 mr-52 p-1 rounded-bl-md rounded-br-md bg-black bg-opacity-65">Promoção</p>
                            <Link to="#">
                                <Button className="ml-6 mt-56 bg-black hover:bg-zinc-900 hover:text-yellow-400" type="submit">Buy now</Button>
                            </Link>
                        </div>
                    </section>
                    <section className="flex justify-center">
                        <div className="h-96 w-80 bg-cover bg-center rounded-md border-4 border-black"
                            style={{backgroundImage : `url("/img/img3.webp")`}}>
                            <h2 className="text-3xl text-white font-bold mt-5 ml-6 mr-32 p-1 rounded-tl-md rounded-tr-md rounded-br-md bg-black bg-opacity-65">tenis cinza</h2>
                            <p className="text-md text-white font-semibold s ml-6 mr-52 p-1 rounded-bl-md rounded-br-md bg-black bg-opacity-65">Promoção</p>
                            <Link to="#">
                               <Button className="ml-6 mt-56 bg-black hover:bg-zinc-900 hover:text-yellow-400" type="submit">Buy now</Button>
                            </Link>
                        </div>
                    </section>
                </div>

                <div className="flex justify-center items-center">
                    <hr className="w-10/12 h-2 bg-black rounded-md   "/>
                </div>

                <h1 className="text-3xl font-black flex items-start justify-start pt-8 pl-16">Os mais vendidos</h1>
                <div className="flex justify-between items-center pb-5">
                    <nav className="text-md font-medium">
                        <ul className="flex justify-start items-start pl-16 pt-5" >
                            <li className="pr-5 cursor-pointer hover:text-yellow-600">All products</li>
                            <li className="pr-5 cursor-pointer hover:text-yellow-600">Women</li>
                            <li className="pr-5 cursor-pointer hover:text-yellow-600">Men</li>
                            <li className="pr-5 cursor-pointer hover:text-yellow-600">Tennis shoes</li>
                            <li className="pr-5 cursor-pointer hover:text-yellow-600">Shirts</li>
                        </ul>
                    </nav>
                    <Button className="bg-black hover:bg-zinc-900 hover:text-yellow-400 mr-16 font-bold px-7 py-5 rounded-xl">
                    Pesquisar
                     <div className="ml-3">
                        <HiOutlineMagnifyingGlass/>
                     </div>
                    </Button>
                </div>
            

                <div className="grid grid-cols-5 gap-5 p-5 pt-0 mb-5 mt-5">
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/1">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl border-4 border-black "
                             style={{backgroundImage : `url("/img/camisaportugalpreta.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Portugal preta</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section> 
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/2">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                             style={{backgroundImage : `url("/img/camisaalemanhadieadler.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Alemanha "Die Adler"</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/3">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                             style={{backgroundImage : `url("/img/novacamisatitulardobayern.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Nova camisa titular do Bayern</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/4">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                             style={{backgroundImage : `url("/img/camisarealmadridfourth.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa Real Madrid Fourth</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/5">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                             style={{backgroundImage : `url("/img/camisetaselecaobrasileira.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camiseta seleção brasileira</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/6">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                             style={{backgroundImage : `url("/img/camisaselecaoargentina.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa seleção argentina</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/7">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                             style={{backgroundImage : `url("/img/camisamanchesterunited.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa Manchester United</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/8">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                            style={{backgroundImage : `url("/img/camisapsg.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa PSG</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">                                                  
                        <Link to="./Products/9">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                            style={{backgroundImage : `url("/img/camisamanchestercity.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Manchester City</h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="./Products/10">
                            <div className="h-72 w-56 bg-cover bg-center rounded-2xl  border-4 border-black"
                            style={{backgroundImage : `url("/img/camisabarcelona.jpg")`}}></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Barcelona </h2>
                        <h3 className="font-black">R$:330,00</h3>
                    </section>
                </div>
          </main>
      </div>
    )
}

export default Home