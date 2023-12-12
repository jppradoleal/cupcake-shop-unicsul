import React, { createContext, FC, ReactNode } from "react";
import { useImmerReducer } from "use-immer";
import { CartAction, cartReducer, CartState } from "../reducers/cart.reducer";

type CartContextType = {
  state: CartState,
  dispatch: React.Dispatch<CartAction>
};

export const CartContext = createContext<CartContextType>({
  state: { products: [] },
  dispatch: () => {}
});

const CartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(cartReducer, { products: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
