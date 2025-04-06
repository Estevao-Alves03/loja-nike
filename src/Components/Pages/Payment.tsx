import CheckoutSteps from "../Layout/CheckoutSteps";
import { useState } from "react";
import { useCartStore } from "../../Zustand/CartStore";
import { useUserStore } from "../../Zustand/UserStore";
import { useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isLoading, setIsLoading] = useState(false); // Estado para loading
  const navigate = useNavigate()

  const currentUser = useUserStore((state) => state.currentUser);
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const discount = useCartStore((state) => state.discount);
  const finalPrice = useCartStore((state) => state.finalPrice);

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Usuário não autenticado");
      return;
    }

    setIsLoading(true)

    try {
      const orderData = {
        user_id: currentUser.id,
        total_price: totalPrice,
        discount: discount,
        payment_method: paymentMethod,
        cart: cart.map((item) => ({
          cod_product: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        console.error("Erro ao criar o pedido");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Pedido criado:", data);

      setTimeout(() => {
        setIsLoading(false);
        alert("Pedido realizado com sucesso!");
        useCartStore.setState({ cart: [] });
        navigate('/Orders')
      }, 2000); // Simula o carregamento por 2 segundos antes da mensagem de sucesso
    } catch (error) {
      console.error("Erro na requisição:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CheckoutSteps currentStep={3} />
      <div className="max-w-md mx-auto bg-white p-6 border rounded-lg shadow-lg">
        {isLoading ? (
          <Loading /> // Mostra o loading enquanto está carregando
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Pagamento</h2>
            <h3 className="text-sm font-semibold mb-2">Selecione um meio de pagamento</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={() => setPaymentMethod("pix")}
                  className="accent-black"
                />
                <span>Pix</span>
                <span className="text-xs text-green-600">(Ganhe até 5% de desconto)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  checked={paymentMethod === "credit_card"}
                  onChange={() => setPaymentMethod("credit_card")}
                  className="accent-black"
                />
                <span>Cartão de crédito</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="debit_card"
                  checked={paymentMethod === "debit_card"}
                  onChange={() => setPaymentMethod("debit_card")}
                  className="accent-black"
                />
                <span>Cartão de débito</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="accent-black"
                />
                <span>Paypal</span>
              </label>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-2">Resumo</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Valor dos produtos</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600 mb-2">
                <span>Descontos</span>
                <span>- R$ {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total a pagar</span>
                <span>R$ {finalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg text-lg"
                disabled={isLoading}
              >
                Confirmar Pagamento
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
