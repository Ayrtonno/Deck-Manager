import { Schema, model, Document, PaginateModel, PopulatedDoc } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { iDeck } from "./deck";

interface iOrder extends Document  {
    user: string
    cart: PopulatedDoc <iDeck>
}
const orderSchema = new Schema({
    user: { type: String, required: true },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Deck",
        required: true
    }],
}, { timestamps: true })

orderSchema.plugin(mongoosePaginate)

interface OrderModel <T extends Document> extends PaginateModel<T> {}

export const Order: OrderModel<iOrder> = model("Order", orderSchema)

