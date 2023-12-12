import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Cart from "./pages/Cart";
import OrdersList from "./pages/Order";
import { GuardedRoute } from "./components/GuarderRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/acessar" element={<Authentication />} />
        <Route path="/registrar" element={<Authentication isRegister />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route element={<GuardedRoute />}>
          <Route path="/pedidos" element={<OrdersList />} />
        </Route>
      </Route>
    </Routes>
  );
}
