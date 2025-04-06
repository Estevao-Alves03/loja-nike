import { Button } from "../../components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../Zustand/CartStore";
import { useParams } from "react-router-dom";
import Alert from "../Layout/Alert";
import { useState } from "react";


interface SubmitButtonProps {
  selectedSize: string;
  quantity: number;
}

function SubmitButton({ selectedSize, quantity }: SubmitButtonProps) { 
  
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addToCart);
  const [alert, setAlert] = useState<null | {message: string, type: "success" | "error"| "warning" | "info"}>(null)

  // Função para sanitizar o nome do produto
  const sanitizeName = (name: string) =>
    name
      .toLowerCase()
      .replace(/ /g, "")
      .replace(/[^\w]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 

      async function getProducts() {
        const token = localStorage.getItem("authToken"); // pega o token salvo
      
        const response = await fetch(`http://localhost:3002/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // adiciona o token no header
          },
        });
      
        if (!response.ok) throw new Error("erro ao carregar os produtos");
        const product = await response.json();
        return product;
      }
  async function handleProductsClick() {
    try {
      const product = await getProducts();
      setAlert({message: "Produto adicionado com sucesso", type:"success"})
      console.log("dados pegos da api", product)

      const adjustedProduct = {
        id: product.cod_product,  // Alterado de codProduct para cod_product
        name: product.name_product,  // Alterado de nameProduct para name_product
        description: product.description,
        price: typeof product.price === "string" 
          ? parseFloat(product.price.replace(",", ".")) 
          : product.price, 
        image: `/img/${sanitizeName(product.name_product)}.jpg`,  // Alterado aqui também
        size: selectedSize,
        quantity: quantity,
      };

      setTimeout(() => {
        setAlert(null)
      }, 2000);
      
      
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

      {alert && <Alert message={alert.message} type={alert.type} />}
    </div>
  );
}

export default SubmitButton;
