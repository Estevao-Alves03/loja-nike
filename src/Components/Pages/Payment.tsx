import CheckoutSteps from "../Layout/CheckoutSteps";
import { useState } from "react";
import { useCartStore } from "../../Zustand/CartStore";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("pix");

  const totalPrice = useCartStore((state) => state.totalPrice);
  const discount = useCartStore((state) => state.discount);
  const finalPrice = useCartStore((state) => state.finalPrice);

  return (
    <div>
      <CheckoutSteps currentStep={2} />
      <div className="max-w-md mx-auto bg-white p-6 border rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Pagamento</h2>

        {/* Opções de pagamento */}
        <h3 className="text-sm font-semibold mb-2">Selecione um meio de pagamento</h3>
        <div className="space-y-2">
            {/* Pix */}
            <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="pix"
              checked={paymentMethod === "pix"}
              onChange={() => setPaymentMethod("pix")}
              className="accent-black"
            />
            <span>Pix</span>
            <span className="text-xs text-green-600">(Ganhe até 3% de desconto)</span>
          </label>
          {/* Cartão de Crédito */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={() => setPaymentMethod("credit")}
              className="accent-black"
            />
            <span>Cartão de crédito</span>
            <span className="text-xs text-gray-500">(Parcele sem juros)</span>
          </label>
        </div>

        {/* Formulário de Cartão de Crédito */}
        {paymentMethod === "credit" && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50 text-sm">
            <h3 className="text-md font-semibold mb-2">Preencha os dados do cartão</h3>
            <input
              type="text"
              placeholder="Número do cartão"
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Nome impresso"
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Validade (MM/AA)"
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Código de segurança (CVC)"
              className="w-full p-2 border rounded-md mb-2"
            />
            <select className="w-full p-2 border rounded-md mb-2">
              <option>Número de parcelas</option>
              <option>1x sem juros</option>
              <option>2x sem juros</option>
              <option>3x sem juros</option>
              <option>4x sem juros</option>
              <option>5x sem juros</option>
            </select>
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-black" />
              <span>Salvar cartão para compras futuras</span>
            </label>
          </div>
        )}

        {/* Resumo do Pagamento */}
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
          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg text-lg">
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
