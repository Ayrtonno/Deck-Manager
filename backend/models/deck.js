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
// paginate in automatico pagina le informazioni del database
const mongoosePaginate = require('mongoose-paginate-v2');

//con Schema vado a definire la struttura del dato da inserire nel DB 
const deckSchema = new Schema({
    name: { type: String, unique: true },
    type: {
        type: String, enum: ["Christianity", "Animist", "Egyptian Deity", "Totemist"]
    },
    cardList: [{
        // serve a creare un riferimento ad un altro schema, in questo caso, card. Types è di mongoose, non nostro!
        type: Schema.Types.ObjectId,
        ref: "Card"
    }],
    price: Number,
}, { toJSON: { virtuals: true }, 
    //timestamps crea due informazioni in piu, che lono la createdAt e la updatedAt
    timestamps: true })

    //i virtual sono proprietà derivate, quando risolvi in json, devi risolvere anche i virtuals, in questo caso quanto lungo è l'array cardList del deck
deckSchema.virtual("cardNumber").get(function () {
    return this.cardList.length
})

// vvvv serve a registrare la paginazione
deckSchema.plugin(mongoosePaginate)

/* deckSchema.methods.incrementPrice = function () {
    this.price = this.price + 10
} */

//con Model decido dove mettere il deckSchema 
const Deck = model("Deck", deckSchema)

exports.Deck = Deck

