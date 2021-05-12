const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const cardSchema = new Schema({
    name: { type: String, unique: true },
    type: String,
    energy: Number,
    atk: Number,
    def: Number
})

const Card = model("Card", cardSchema)

exports.Card = Card
