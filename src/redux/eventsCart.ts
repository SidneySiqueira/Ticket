import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventProps } from "../Types/types";

interface CartProps {
  cart: EventProps[]
}

const initialState: CartProps = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartSlice(state, action: PayloadAction<any>) {
      const itemToAdd = action.payload;
      const existingItem = state.cart.find(
        (item) => item.name === itemToAdd.name
      );
      if (!existingItem) {
        state.cart.push(itemToAdd);
      }
    },
    removeFromCartSlice(state, action: PayloadAction<string>) {
      const itemToRemove = action.payload;
      state.cart = state.cart.filter((item) => item.name !== itemToRemove);
    },
    clearCartSlice(state) {
      state.cart = [];
    },
  },
});

export const { setCartSlice, removeFromCartSlice, clearCartSlice } = cartSlice.actions;

export default cartSlice.reducer;
