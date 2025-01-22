import { useCartStore } from "../../Zustand/CartStore";
import { TiDelete } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import React from 'react'


interface CartItensProps {
  product: {
    id: string;
    name: string;
    price: string | number;
    image: string;
    description: string;
    size: string; 
    quantity: number; 
  };
}

const CartItens: React.FC<CartItensProps> = ({product}) => {

  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const incrementQuantity = useCartStore((state) => state.incrementQuantity)
  const decrementQuantity = useCartStore((state) => state.decrementQuantity)
  

   return(
    <div className="flex items-center">
      {/* imagem */}
    <div className="w-36 h-40 flex-shrink-0 overflow-hidden mb-4 border-4 border-black rounded-lg">
      <img 
        src={product.image}  
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* dados dos produto */}
    <div className="ml-4 mb-4">
      <h2 className="font-bold text-sm w-[160px] ">{product.name}</h2>
      <p className="text-xs">
        R$:{" "}
        {typeof product.price === "number"
          ? product.price.toFixed(2).replace(".", ",") // Formata diretamente se for número
          : parseFloat(product.price.replace(",", ".") || "0").toFixed(2).replace(".", ",")} 
      </p>

      <p className="text-xs">Tamanho: {product.size}</p>

      {/* botoes */}
      <section className="mt-12 flex items-center justify-between">
        {/* diminuir produto */}
        <button
            onClick={() => decrementQuantity(product.id)}
            className="hover:cursor-pointer"
            aria-label="diminuir quantidade"
          >
            <AiOutlineMinus size={20} />
          </button>
         <p>{product.quantity}</p>  
        {/* aumentar produto */}
        <button
            onClick={() => incrementQuantity(product.id)}
            className="hover:cursor-pointer"
            aria-label="aumentar quantidade"
          >
            <AiOutlinePlus size={20} />
          </button>
        {/* exluir tudo */}
        <button 
            onClick={() => {
              if (window.confirm("Tem certeza que deseja remover este produto?")) {
                removeFromCart(product.id);
              }
            }}
          >
            <div className="text-red-800 hover:cursor-pointer text-2xl">
            <TiDelete/> 
            </div>
          </button>
      </section>                          
    </div>
    </div>
   )
}

export default CartItens