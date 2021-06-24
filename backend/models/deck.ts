import { Schema, model, PaginateModel, Document, PopulatedDoc } from "mongoose";
// paginate in automatico pagina le informazioni del database
import mongoosePaginate from 'mongoose-paginate-v2';
import deckRouter from "../routes/deck";
import { iCard } from "./card";

enum DeckTypes {
    Christianity = "Christianity",
    Animist = "Animist",
    EgyptianDeity = "Egyptian Deity",
    Totemist = "Totemist"
}

export interface iDeck extends Document {
    name: string
    type: DeckTypes
    cardList: PopulatedDoc <iCard>
    price: number
    cardNumber: number
}

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
deckSchema.virtual("cardNumber").get(function (this: iDeck) {
    return this.cardList.length
})

// vvvv serve a registrare la paginazione
deckSchema.plugin(mongoosePaginate)

/* deckSchema.methods.incrementPrice = function () {
    this.price = this.price + 10
} */
interface DeckModel <T extends Document> extends PaginateModel<T> {} 

//con Model decido dove mettere il deckSchema 
export const Deck: DeckModel<iDeck> = model("Deck", deckSchema)

