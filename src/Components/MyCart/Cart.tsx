import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { useCartStore } from "../../Zustand/CartStore";
import { useNavigate } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

import { useAuthStore } from "../../Zustand/AuthStore"; 
import CartItens from "./CartItens";
import Loading from "../Layout/Loading";
import Alert from "../Layout/Alert";

function Cart() {
    const [IsLoading, setIsLoading] = useState(false);
    const [IsCartOpen, setIsCartOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const cart = useCartStore((state) => state.cart);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated); 

    const navigate = useNavigate();

    const total = cart.reduce((acc, cartItem) => {
        const price = typeof cartItem.price === "number" 
            ? cartItem.price 
            : parseFloat(cartItem.price.replace(",", "."));
        return acc + price * (cartItem.quantity || 1);
    }, 0);

    function handleCheckout() {
        if (!isAuthenticated) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        setIsCartOpen(false);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigate('/cartpage');
        }, 3000);
    }

    useEffect(() => {
      console.log("Autenticação:", isAuthenticated);
  }, [isAuthenticated]);

    return (
        <div>
            {IsLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Loading />
                </div>
            )}

            {showAlert && <Alert message="É preciso estar logado para finalizar a compra!" type="error" />} 

            <Sheet open={IsCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger>Carrinho</SheetTrigger>
                <SheetContent className="h-screen overflow-x-auto !bg-white">
                    <SheetHeader>
                        <SheetTitle className="!text-black">Seus Produtos:</SheetTitle>
                        <SheetDescription className="pb-5 !text-black">
                            Adicione mais itens ao seu carrinho!
                        </SheetDescription>
                    </SheetHeader>
                    {cart.length > 0 ? (
                        <>
                            {cart.map((product) => (
                                <CartItens key={product.id} product={product} />
                            ))}
                            <div className="mt-4 flex items-center justify-between">
                                <h2 className="font-bold">Total: R$: {total.toFixed(2).replace(".", ",")}</h2>
                                <Button 
                                    onClick={handleCheckout} 
                                    className="bg-black hover:bg-black hover:text-yellow-400">
                                    finalizar compra
                                    <span className="ml-2">
                                        <FaShopify />
                                    </span>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="pt-56 flex items-center justify-center text-black">Seu carrinho está vazio.</p>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Cart;
