import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

function Home() {
    return(
      <div>
          <div className="bg-fundo h-96 w-full bg-center bg-cover p-60"></div>
          <div className="flex justify-center items-center">
             <hr className="w-10/12 h-2 bg-black rounded-md   "/>
          </div>

          <main>
                <h1 className="text-3xl font-black flex items-center justify-center p-5 pb-2">Produtos em alta!</h1>
                <p className="flex items-center justify-center font-semibold">Aproveite as ofertas diarias!</p>

                <div className="grid grid-cols-3 gap-5 justify-around items-center p-10">
                    <section className="flex justify-center">
                        <div className="bg-img1 h-96 w-80 bg-cover bg-center rounded-md">
                            <h2 className="text-3xl text-white font-bold mt-5 ml-6 mr-48 p-1 rounded-md bg-black bg-opacity-65">tenis 1</h2>
                            <p className="text-md text-white font-semibold s ml-6 mr-52 p-1 rounded-md bg-black bg-opacity-65">Promoção</p>
                            <Link to="../Projects/Products">
                                <Button className="ml-6 mt-56 hover:bg-blue-900" type="submit">Buy now</Button>
                            </Link>
                        </div>
                    </section>
                    <section className="flex justify-center">
                        <div className="bg-img2 h-96 w-80 bg-cover bg-center rounded-md">
                            <h2 className="text-3xl text-white font-bold mt-5 ml-6 mr-48 p-1 rounded-md bg-black bg-opacity-65">tenis 2</h2>
                            <p className="text-md text-white font-semibold s ml-6 mr-52 p-1 rounded-md bg-black bg-opacity-65">Promoção</p>
                            <Link to="../Projects/Products">
                                <Button className="ml-6 mt-56 hover:bg-blue-900" type="submit">Buy now</Button>
                            </Link>
                        </div>
                    </section>
                    <section className="flex justify-center">
                        <div className="bg-img3 h-96 w-80 bg-cover bg-center rounded-md">
                            <h2 className="text-3xl text-white font-bold mt-5 ml-6 mr-48 p-1 rounded-md bg-black bg-opacity-65">tenis 3</h2>
                            <p className="text-md text-white font-semibold s ml-6 mr-52 p-1 rounded-md bg-black bg-opacity-65">Promoção</p>
                            <Link to="../Projects/Products">
                            '   <Button className="ml-6 mt-56 hover:bg-blue-900" type="submit">Buy now</Button>
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
                            <li className="pr-5 cursor-pointer hover:text-blue-700">All products</li>
                            <li className="pr-5 cursor-pointer hover:text-blue-700">Women</li>
                            <li className="pr-5 cursor-pointer hover:text-blue-700">Men</li>
                            <li className="pr-5 cursor-pointer hover:text-blue-700">Tennis shoes</li>
                            <li className="pr-5 cursor-pointer hover:text-blue-700">Shirts</li>
                        </ul>
                    </nav>
                    <Button className=" bg-black hover:bg-gray-900 mr-16 font-bold px-7 py-5 rounded-xl">Pesquisar</Button>
                </div>

                <div className="grid grid-cols-5 gap-5 p-5 pt-0">
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-portugal h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Portugal preta</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section> 
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-alemanha h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Alemanha "Die Adler"</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-bayern h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Nova camisa titular do Bayern</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-real h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa Real Madrid Fourth</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-brasil h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camiseta seleção brasileira</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-argentina h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa seleção argentina</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-united h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa Manchester United</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-psg h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold ">Camisa PSG</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">                                                      
                        <Link to="../Projects/Products">
                            <div className="bg-city h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Manchester City</h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <Link to="../Projects/Products">
                            <div className="bg-barcelona h-72 w-56 bg-cover bg-center rounded-2xl"></div>
                        </Link>
                        <h2 className="flex items-center justify-center font-bold">Camisa Barcelona </h2>
                        <h3 className="font-black">R$:329,99</h3>
                    </section>
                </div>
          </main>
      </div>
    )
}

export default Home