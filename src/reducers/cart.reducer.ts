import { Tables } from "../types/supabase";

export enum CartActionKind {
  ADD,
  REMOVE
}

export interface CartAction {
  type: CartActionKind
  payload: Tables<"Cupcake">
}

export interface CartState {
  products: Tables<"Cupcake">[]
}

export function cartReducer(state: CartState, action: CartAction) {
  const { type, payload } = action

  switch (type) {
    case CartActionKind.ADD:
      return {
        ...state,
        products: [
          ...state.products,
          payload
        ]
      }
    case CartActionKind.REMOVE:
      return {
        ...state,
        products: state.products.filter(product => product.id !== payload.id)
      }
    default:
      return state
  }
}
