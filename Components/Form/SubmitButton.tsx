import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/Zustand/CartStore";
import { useParams } from "react-router-dom";

interface SubmitButtonProps {
  selectedSize: string;
  quantity: number;
}

function SubmitButton({ selectedSize, quantity }: SubmitButtonProps) { 
  
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addToCart);

  async function getProducts() {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    if (!response.ok) throw new Error("erro ao carregar os produtos");
    const product = await response.json();
    return product;
  }

  async function handleProductsClick() {
    try {
      const product = await getProducts();
      const payload = {
        ...product,
        size: selectedSize,
        quantity: quantity,
      };
      addToCart(payload);
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
        className="ml-3 mt-1 py-3 px-4 bg-black hover:bg-black hover:text-yellow-400"
      >
        Adicionar ao carrinho
        <FaShoppingCart className="ml-2" />
      </Button>
    </div>
  );
}

export default SubmitButton;
