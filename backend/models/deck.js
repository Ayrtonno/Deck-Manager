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
const mongoosePaginate = require('mongoose-paginate-v2');

//con Schema vado a definire la struttura del dato da inserire nel DB 
const deckSchema = new Schema({
    name: { type: String, unique: true },
    type: String,
    cardList: [{
        type: Schema.Types.ObjectId,
        ref: "Card"
    }],
    price: Number,
}, { toJSON: { virtuals: true } })

deckSchema.virtual("cardNumber").get(function () {
    return this.cardList.length
})


deckSchema.plugin(mongoosePaginate)

/* deckSchema.methods.incrementPrice = function () {
    this.price = this.price + 10
} */

//con Model decido dove mettere il deckSchema 
const Deck = model("Deck", deckSchema)

exports.Deck = Deck

