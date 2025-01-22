// import { Button } from "../../components/ui/button";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCartStore } from "../../Zustand/CartStore";
// import { useParams } from "react-router-dom";

// interface SubmitButtonProps {
//   selectedSize: string;
//   quantity: number;
// }

// function SubmitButton({ selectedSize, quantity }: SubmitButtonProps) { 
  
//   const { id } = useParams<{ id: string }>();
//   const addToCart = useCartStore((state) => state.addToCart);

//   async function getProducts() {
//     const response = await fetch(`http://localhost:3001/products/${id}`);
//     if (!response.ok) throw new Error("erro ao carregar os produtos");
//     const product = await response.json();
//     return product;
//   }

//   async function handleProductsClick() {
//     try {
//       const product = await getProducts();
//       const payload = {
//         ...product,
//         id: product.codProduct,
//         size: selectedSize,
//         quantity: quantity,
//         price: typeof product.price === "string" ? parseFloat(product.price.replace(",", ".")) : product.price,
//       };
//       addToCart(payload);
//     } catch (error) {
//       console.log("erro ao buscar os produtos", error);
//     }
//   }

//   return (
//     <div>
//       <Button
//         onClick={(e) => {
//           e.preventDefault();
//           handleProductsClick();
//         }}
//         className="ml-3 mt-1 py-3 px-4 bg-black hover:bg-zinc-900 hover:text-yellow-400"
//       >
//         Adicionar ao carrinho
//         <div className="ml-2">
//           <FaShoppingCart />
//         </div>
//       </Button>
//     </div>
//   );
// }

// export default SubmitButton;

import { Button } from "../../components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../Zustand/CartStore";
import { useParams } from "react-router-dom";

interface SubmitButtonProps {
  selectedSize: string;
  quantity: number;
}

function SubmitButton({ selectedSize, quantity }: SubmitButtonProps) { 
  
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addToCart);

  // Função para sanitizar o nome do produto
  const sanitizeName = (name: string) =>
    name
      .toLowerCase()
      .replace(/ /g, "")
      .replace(/[^\w]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 

  async function getProducts() {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    if (!response.ok) throw new Error("erro ao carregar os produtos");
    const product = await response.json();
    return product;
  }

  async function handleProductsClick() {
    try {
      const product = await getProducts();

      const adjustedProduct = {
        id: product.codProduct, // Substituir codProduct por id
        name: product.nameProduct, // Substituir nameProduct por name
        description: product.description,
        price: typeof product.price === "string" 
          ? parseFloat(product.price.replace(",", ".")) 
          : product.price, // Padronizar o preço como número
        image: `/img/${sanitizeName(product.nameProduct)}.jpg`, // Ajustar a imagem, se necessário
        size: selectedSize,
        quantity: quantity,
      };
      
      addToCart(adjustedProduct); // Corrigido: Fechar a chamada da função
    } catch (error) {
      console.log("erro ao buscar os produtos", error);
    }
  }

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleProductsClick();
        }}
        className="ml-3 mt-1 py-3 px-4 bg-black hover:bg-zinc-900 hover:text-yellow-400"
      >
        Adicionar ao carrinho
        <div className="ml-2">
          <FaShoppingCart />
        </div>
      </Button>
    </div>
  );
}

export default SubmitButton;
