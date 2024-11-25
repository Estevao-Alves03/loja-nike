// import CartActionTypes from "./action-types";

// interface Product {
//     id: string;
//     name: string;
//     price: string;
//     image: string;
//     description: string;
//     size: string;
//     quantity: number;
// }
  
// interface CartState {
//     products: Product[];
//     productsTotalPrice: number;
// }
  
// const initialState: CartState = {
//     products: [],
//     productsTotalPrice: 0,
// };
  
// interface CartAction {
//     type: string;
//     payload: Product;
// }

// const cartReducer = (state = initialState, action: CartAction): CartState => {
//     switch (action.type) {
//         case CartActionTypes.ADD_PRODUCT: {
//             const existingProduct = state.products.find(
//                 (product) => product.id === action.payload.id && product.size === action.payload.size
//             );

//             if (existingProduct) {
//                 // Se o produto já existe no carrinho, atualize a quantidade
//                 const updatedProducts = state.products.map((product) =>
//                     product.id === action.payload.id && product.size === action.payload.size
//                         ? { ...product, quantity: product.quantity + action.payload.quantity }
//                         : product
//                 );

//                 // Atualiza o preço total considerando a quantidade adicionada
//                 const updatedTotalPrice =
//                     state.productsTotalPrice + parseFloat(action.payload.price.replace(',', '.')) * action.payload.quantity;

//                 return {
//                     ...state,
//                     products: updatedProducts,
//                     productsTotalPrice: updatedTotalPrice,
//                 };
//             }

//             // Se o produto é novo, adicione ao carrinho com a quantidade especificada
//             const newTotalPrice =
//                 state.productsTotalPrice + parseFloat(action.payload.price.replace(',', '.')) * action.payload.quantity;

//             return {
//                 ...state,
//                 products: [...state.products, { ...action.payload }],
//                 productsTotalPrice: newTotalPrice,
//             };
//         }   

//         default:
//             return state;   
//     }
// };

// export default cartReducer;
