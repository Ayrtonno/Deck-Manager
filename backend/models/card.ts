import { Schema, model, Document } from "mongoose";
enum CardTypes {
    Saint = "Saint", 
    Artifact = "Artifact",
    Building = "Building",
    Benediction = "Benediction",
    Curse = "Curse",
    Token = "Token"
}
export interface iCard extends Document {
    name: string
    type: CardTypes
    energy: number
    atk: number
    def: number
}
// Schema è la forma del mio oggetto che salverò nel database
const cardSchema = new Schema<iCard>({
    name: { type: String, unique: true },
    type: {
        type: String, enum: Object.values(CardTypes)
    },
    energy: Number,
    atk: Number,
    def: Number
})

// const Card = model salva il modello con nome Card a cui corrisponde lo schema sovracreato
export const Card = model<iCard>("Card", cardSchema)


