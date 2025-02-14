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
