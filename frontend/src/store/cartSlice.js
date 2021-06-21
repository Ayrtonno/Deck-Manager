import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cart: [],
    },
    reducers: {
      addToCart: (state, action) => {
        const addedDeck = action.payload
        const currentCart = state.cart
        currentCart.push(addedDeck)
        state.cart = currentCart
      },
      removeFromCart: (state, action) => {
        const removedDeckId = action.payload
        const currentCart = state.cart
        const filteredDecks = currentCart.filter(({id}) => id !== removedDeckId)
        state.cart = filteredDecks
      },
      clearCart: (state) => {
        state.cart = []
      },
    }
})

/* const totalPrice = (cart) => { 
  let totalPrice = 0
  for (let index = 0; index < cart.length; index++) {
    const deck = cart[index];  
    totalPrice = totalPrice + deck.price
  }
  return totalPrice
} */

//il ,0 alla fine indica il valore di partenza, totalPrice si 
//chiama Accumulatore e deck è il valore corrente dell'array

const totalPrice = (cart) => cart.reduce((totalPrice, deck) => totalPrice + deck.price,0)

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



