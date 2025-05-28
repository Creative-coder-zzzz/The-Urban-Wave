import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./components/ui/auth/layout";
import Authlogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import Adminlayout from "./pages/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import Shoppinglayout from "./pages/shopping/layout";
import NotFound from "./pages/not-found/notFound";
import ShoppingHome from "./pages/shopping/Home";
import ShoppingList from "./pages/shopping/List";
import ShoppingAccount from "./pages/shopping/account";
import ShoppingCheckout from "./pages/shopping/Checkout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth, LoginUser } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturn from "./pages/shopping/PaypalReturn";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen/>;
  }
  return (
    <div className=" flex flex-col overflow-hidden bg-white">

   <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* <div>Header component</div> */}
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Authlogin></Authlogin>} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Adminlayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* shopping route */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shoppinglayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="list" element={<ShoppingList />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
