import types from "../actions/types";
// import { GET_ALL_PRODUCTS } from "../actions/getAllChlotes";
// import { DELETE_PRODUCT } from "../actions/deleteProducts";

const initialState = {
  Products: [],
  Filters: [],
  Detail: {},
  Favorites: [],
  User: {},
  Cart: {
    items: [
      { id: 1, name: "Campera", price: 100, quantity: 0 },
      { id: 2, name: "Buzo", price: 200, quantity: 0 },
      { id: 3, name: "Zapas", price: 300, quantity: 0 },
      { id: 4, name: "Pantalon", price: 400, quantity: 0 },
      { id: 5, name: "Ojota", price: 500, quantity: 0 },
    ],
    total: 0,
  },
};

export default function rootReducer(state = initialState, action) {
  if (action.type === types.GET_ALL_CLOTHES) {
    return {
      ...state,
      Products: action.payload,
      Filters: action.payload,
    };
  }
  if (action.type === types.DELETE_PRODUCT) {
    return {
      ...state,
      Products: [...state.Products].filter(
        (product) => product.id !== action.payload
      ),
    };
  }
  if (action.type === types.ADD_TO_CART) {
    const itemsCopy = [...state.Cart.items];
    const index = itemsCopy.findIndex((e) => e.id === action.payload.id);
    itemsCopy[index].quantity = itemsCopy[index].quantity + 1;
    return {
      ...state,
      Cart: {
        items: itemsCopy,
        total: state.Cart.total + action.payload.price,
      },
    };
  }

  if (action.type === types.REMOVE_ONE_FROM_CART) {
    const itemsCopy = [...state.Cart.items];
    const index = itemsCopy.findIndex((e) => e.id === action.payload.id);
    itemsCopy[index].quantity = itemsCopy[index].quantity - 1;
    const shouldDelete = !itemsCopy[index].quantity;

    return {
      ...state,
      Cart: {
        items: shouldDelete
          ? itemsCopy.filter((product) => product.id !== action.payload.id)
          : itemsCopy,
        total: state.Cart.total - action.payload.price,
      },
    };
  }
  if (action.type === types.REMOVE_ALL_FROM_CART) {
    return {
      ...state,
      Cart: {
        items: [],
        total: 0,
      },
    };
  }
  if(action.type === types.PRODUCT_DETAIL){
    return{
      ...state,
      Detail: action.payload
    }
  }
  if(action.type === types.LOGIN_USER){
    return{
      ...state,
      User: action.payload
    }
  }
  return { ...state };
}
