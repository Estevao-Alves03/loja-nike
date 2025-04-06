import CheckoutSteps from "../Layout/CheckoutSteps";
import PaymentMethods from "../Layout/PaymentMethods";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { useCartStore } from "../../Zustand/CartStore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";

const CartPage: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const calculateTotals = useCartStore((state) => state.calculateTotals);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const discount = useCartStore((state) => state.discount);
  const finalPrice = useCartStore((state) => state.finalPrice);

  const [cep, setCep] = useState("");
  const [cupom, setCupom] = useState("");
  const [IsLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  function handleIdentification() {
    setIsLoading(true)
   
    setTimeout(() => {
      setIsLoading(false)
      navigate('/payment');
    }, 2000);
  }

  // Chama calculateTotals toda vez que o carrinho for atualizado
  useEffect(() => {
    calculateTotals();
  }, [cart, calculateTotals]);

  return (
    <div className="flex flex-col items-center w-full p-4">

        {IsLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Loading />
                </div>
            )}
      <CheckoutSteps currentStep={1} />

      {/* Tabela do Carrinho */}
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6 mt-6">
        {cart.length > 0 ? (
          <>
            {/* Cabeçalho da tabela */}
            <div className="grid grid-cols-5 font-semibold text-gray-700 pb-4 border-b">
              <p className="col-span-2">Produtos</p>
              <p className="text-center">Quantidade</p>
              <p className="text-center">Valor unitário</p>
              <p className="text-center mr-10">Valor total</p>
            </div>

            {/* Itens do Carrinho */}
            {cart.map((product) => (
              <div key={product.id} className="grid grid-cols-5 items-center py-4 border-b">
                {/* Produto */}
                <div className="flex items-center col-span-2">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover border rounded-lg" />
                  <div className="ml-4">
                    <h2 className="font-bold text-sm">{product.name}</h2>
                    <p className="text-xs text-gray-500">Tamanho: {product.size}</p>
                  </div>
                </div>

                {/* Controle de Quantidade */}
                <div className="flex items-center justify-center">
                  <button onClick={() => decrementQuantity(product.id)} className="border px-2 py-1 text-gray-600 rounded-md hover:bg-gray-200">
                    <AiOutlineMinus size={16} />
                  </button>
                  <span className="mx-3">{product.quantity}</span>
                  <button onClick={() => incrementQuantity(product.id)} className="border px-2 py-1 text-gray-600 rounded-md hover:bg-gray-200">
                    <AiOutlinePlus size={16} />
                  </button>
                </div>

                {/* Preço Unitário */}
                <div className="text-center">
                  <p className="font-bold text-lg">R$ {Number(product.price).toFixed(2)}</p>
                </div>

                {/* Valor Total + Botão de Remover */}
                <div className="flex items-center justify-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">R$ {(Number(product.price) * product.quantity).toFixed(2)}</p>
                    <p className="text-xs text-green-600">+5% off no Pix</p>
                  </div>
                  <button
                    onClick={() => window.confirm("Tem certeza que deseja remover este produto?") && removeFromCart(product.id)}
                    className="text-gray-500 text-2xl hover:text-red-400 pl-3"
                  >
                    <GoTrash />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-black">Seu carrinho está vazio.</p>
        )}
      </div>

      {/* Seção de Frete, Cupom e Resumo */}
      {cart.length > 0 && (
        <div className="w-3/4 mt-6 grid grid-cols-3 gap-6">
          {/* Prazo de Entrega */}
          <div>
            <h2 className="font-semibold mb-2">Prazo de entrega</h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none pr-20"
              />
              <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-lg transition">
                Calcular
              </button>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-2 block">Confira a nossa Política de Frete e Entregas.</a>
            <a href="#" className="text-black text-sm mt-1 block">Não sei o CEP</a>
          </div>

          {/* Cupom de Desconto */}
          <div>
            <h2 className="font-semibold mb-2">Cupom de desconto</h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Digite o código"
                value={cupom}
                onChange={(e) => setCupom(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none pr-20"
              />
              <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-lg transition">
                Aplicar
              </button>
            </div>
          </div>

          {/* Resumo da Compra */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg mb-2">Resumo</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Valor dos produtos</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Frete</span>
              <span className="text-gray-500">A calcular</span>
            </div>
            <div className="flex justify-between text-green-600 mb-2">
              <span>Descontos</span>
              <span>- R$ {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total da compra</span>
              <span>R$ {finalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleIdentification} className="mt-4 w-full bg-black text-white py-2 rounded-lg text-lg">
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Exibe as bandeiras apenas se houver itens no carrinho */}
      {cart.length > 0 && (
        <div className="mt-6">
          <PaymentMethods />
        </div>
      )}
    </div>
  );
};

export default CartPage;
