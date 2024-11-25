import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/Zustand/CartStore";
import { FaShopify } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartItens from "./CartItens";

function Cart() {

    const navigate =useNavigate()

    const cart = useCartStore((state) => state.cart)

    const total = cart.reduce((acc, cart) => {
        const price = parseFloat(cart.price.replace(',', '.'));
        return acc + price * (cart.quantity || 1); 
      }, 0);

    function handleBuycart() {
      navigate('/checkout')
    }
    

  return (
    <div>
      <Sheet>
        <SheetTrigger>Carrinho</SheetTrigger>
        <SheetContent className="h-screen overflow-x-auto">
          <SheetHeader>
            <SheetTitle>Seus Produtos:</SheetTitle>
            <SheetDescription className="pb-5">
              Adicione mais itens ao seu carrinho!
            </SheetDescription>
          </SheetHeader>
          {cart.length > 0 ? (
            <>
              {cart.map((product) => (
                <CartItens key={product.id} product={product} />
              ))}
              <div className="mt-4 flex items-center justify-between">
                <h2 className="font-bold">Total: R$: {total.toFixed(2)}</h2>
                <Button onClick={handleBuycart} className="bg-black hover:bg-black hover:text-yellow-400">
                    finalizar compra
                    <FaShopify className="ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <p className="pt-56 flex items-center justify-center">Seu carrinho está vazio.</p>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Cart;
