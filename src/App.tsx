import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import UserContextProvider from "./contexts/userContext";
import CartContextProvider from "./contexts/cartContext";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <UserContextProvider>
          <CartContextProvider>
            <Router />
          </CartContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
