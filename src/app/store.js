import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import cartsReducer from "../features/carts/cartSlice";
import ordersReducer from "../features/orders/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    carts: cartsReducer,
    orders: ordersReducer
  }
});

export default store;
