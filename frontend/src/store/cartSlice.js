import { createSlice } from "@reduxjs/toolkit";

// create slice crea una porzione di store
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cart: [],
    },
    // i reducers sono le cose che questa slice deve ricevere per poi metterle nello store
    reducers: {
      // in questo caso deve ricevere addToCart, e come argomento il deck aggiunto. 
      //Lo state è il valore della slice, mentre la action è il payload. Payload è l'argomento che passo nella dispatch
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



