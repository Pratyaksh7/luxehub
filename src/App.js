import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/Auth/LoginPage";
import SingupPage from "./pages/Auth/SingupPage";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import HomePage from "./pages/HomePage/Homepage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import WishList from "./pages/WishList/WishList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./pages/PrivateRoute";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SingupPage />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
          </Route>
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}
