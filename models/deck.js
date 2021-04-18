/* class Deck {
    constructor(name, type, cardNumber, price){
        this.name = name
        this.type = type
        this.cardNumber = cardNumber
        this.price = price
    }
}

exports.Deck = Deck
*/

const { Schema, model } = require("mongoose");

//con Schema vado a definire la struttura del dato da inserire nel DB 
const deckSchema = new Schema({
    name: String,
    type: String,
    cardNumber: Number,
    price: Number,
})

//con Model decido dove mettere il deckSchema 
const Deck = model("deck", deckSchema)

exports.Deck = Deck