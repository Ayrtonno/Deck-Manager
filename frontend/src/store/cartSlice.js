import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cart: [],
    },
})

const totalPrice = (cart) => {

}


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



/* creare slice che avrà come initial state un cart [] array vuoto, poi almeno 3 reducer, uno per aggiungere qualcosa al cart,
uno per rimuovere dal cart (o l'ultimo se faccio schifo, o entrambe se baro) e uno per svuotare il carrello. I dettagli
poi li vede simo. SE ADDIRITTURA RIESCO, fai una minifunzione che calcola il costo totale*/