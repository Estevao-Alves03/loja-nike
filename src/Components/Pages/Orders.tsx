import { useEffect, useState, useCallback } from "react";
import { useUserStore } from "../../Zustand/UserStore";

interface Product {
  id: number;
  cod_product: number;
  name_product: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  products?: Product[];
}

const Orders = () => {
  const { currentUser } = useUserStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!currentUser?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/orders?user_id=${currentUser.id}`);
      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

      const ordersData: Order[] = await response.json();
      console.log("Pedidos encontrados:", ordersData);

      // Usando um Set para evitar IDs duplicados
      const uniqueOrders = new Map<number, Order>();

      const ordersWithProducts = await Promise.all(
        ordersData.map(async (order) => {
          if (uniqueOrders.has(order.id)) return uniqueOrders.get(order.id);

          const productsResponse = await fetch(`http://localhost:3001/order_items?order_id=${order.id}`);
          if (!productsResponse.ok) throw new Error(`Erro ao buscar produtos do pedido ${order.id}`);

          const productsData = await productsResponse.json();
          console.log(`Produtos do pedido ${order.id}:`, productsData);

          const validProducts = productsData.filter((item: { product_id?: number }) => item.product_id);

          const detailedProducts = await Promise.all(
            validProducts.map(async (item: { product_id: number; quantity: number }) => {
              try {
                const productResponse = await fetch(`http://localhost:3001/products?cod_product=${item.product_id}`);

                if (!productResponse.ok) {
                  throw new Error(`Erro ao buscar detalhes do produto ${item.product_id}`);
                }

                const productDetails: Product[] = await productResponse.json();
                const matchedProduct = productDetails.find((p) => p.cod_product === item.product_id);

                if (!matchedProduct) {
                  console.warn(`Produto com ID ${item.product_id} não encontrado.`);
                  return null;
                }

                return { ...matchedProduct, quantity: item.quantity };
              } catch (error) {
                console.error(`Erro ao buscar detalhes do produto ${item.product_id}:`, error);
                return null;
              }
            })
          );

          const filteredProducts = detailedProducts.filter((p) => p !== null);

          console.log(`Produtos detalhados (Pedido ${order.id}):`, filteredProducts);

          const updatedOrder = { ...order, products: filteredProducts };
          uniqueOrders.set(order.id, updatedOrder);
          return updatedOrder;
        })
      );

      // Removendo possíveis `undefined` gerados por promessas que falharam
      const filteredOrders = ordersWithProducts.filter((order) => order !== undefined) as Order[];

      setOrders(filteredOrders);
    } catch (error) {
      setError("Não foi possível carregar os pedidos. Tente novamente mais tarde.");
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter(order => activeTab === "all" || order.status === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Meus Pedidos</h2>

      {/* Tabs de filtro */}
      <div className="flex space-x-4 border-b">
        {["all", "pending", "paid", "shipped", "delivered", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === status ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
            }`}
          >
            {status === "all" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="text-blue-500 mt-4">Carregando pedidos...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6 space-y-6">
        {filteredOrders.length === 0 && !loading && <p className="text-gray-500">Nenhum pedido encontrado.</p>}

        {filteredOrders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
            <p className="text-gray-500">Status: <span className="font-medium">{order.status}</span></p>
            <p className="text-gray-500">Total: <span className="font-bold">R$ {order.total_price.toFixed(2)}</span></p>

            {order.products && order.products.length > 0 ? (
              <div className="mt-4 space-y-4">
                {order.products.map((product, index) => (
                  <div key={`${product.id}-${index}`} className="flex items-center border p-2 rounded-lg">
                    {product.image ? (
                      <img src={product.image} alt={product.name_product} className="w-16 h-16 object-cover rounded-md" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        Sem Imagem
                      </div>
                    )}

                    <div className="ml-4">
                      <h4 className="font-medium">{product.name_product}</h4>
                      <p className="text-sm text-gray-500">{product.description}</p>
                      <p className="text-sm font-semibold">
                        Preço: <span className="text-green-600">R$ {(product.price - (product.discount || 0)).toFixed(2)}</span>
                        {product.discount ? <span className="text-red-500 line-through ml-2">R$ {product.price.toFixed(2)}</span> : null}
                      </p>
                      <p className="text-sm">Quantidade: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">Nenhum produto encontrado para este pedido.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
