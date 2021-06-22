const { Schema, model } = require("mongoose");

// Schema è la forma del mio oggetto che salverò nel database
const cardSchema = new Schema({
    name: { type: String, unique: true },
    type: {
        type: String, enum: ["Saint", "Artifact", "Building", "Benediction", "Curse", "Token"]
    },
    energy: Number,
    atk: Number,
    def: Number
})

// const Card = model salva il modello con nome Card a cui corrisponde lo schema sovracreato
const Card = model("Card", cardSchema)

exports.Card = Card

