import { Draft } from "immer";
import { Tables } from "../types/supabase";

export enum CartActionKind {
  ADD,
  REMOVE,
  UPDATE_QUANTITY,
  CLEAR,
}

export interface CartItem extends Tables<"Cupcake"> {
  quantity?: number;
}

export interface CartAction {
  type: CartActionKind;
  payload?: CartItem;
}

export interface CartState {
  products: CartItem[];
}

export function cartReducer(draft: Draft<CartState>, action: CartAction) {
  const { type, payload } = action;

  const productIdx = draft.products.findIndex(
    (product) => product.id === payload?.id
  );

  switch (type) {
    case CartActionKind.ADD:
      if (productIdx >= 0) {
        draft.products[productIdx].quantity =
          (draft.products[productIdx].quantity ?? 0) + 1;
        break;
      }

      if (payload)
        draft.products.push({ ...payload, quantity: 1 });
      break;
    case CartActionKind.REMOVE:
      if (productIdx >= 0) draft.products.splice(productIdx, 1);
      break;
    case CartActionKind.UPDATE_QUANTITY:
      if (payload && productIdx >= 0) {
        draft.products[productIdx].quantity = (payload.quantity ?? 0);
      }
      break;
    case CartActionKind.CLEAR:
      return { products: [] }
    default:
      break;
  }
}
