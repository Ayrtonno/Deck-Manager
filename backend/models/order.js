const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = new Schema({
    user: { type: String, required: true },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Deck",
        required: true
    }],
}, { timestamps: true })

orderSchema.plugin(mongoosePaginate)

const Order = model("Order", orderSchema)

exports.Order = Order
