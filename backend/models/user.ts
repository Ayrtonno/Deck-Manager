import { Schema, model, Document } from "mongoose";
import { constants } from "../config/constants";

export interface iUser extends Document {
    email: string
    username: string
    password: string
    firstName: string
    lastName: string
    address: string
    city: string
    nation: string
    phoneNumber: number
    isEmailVerified: boolean
    fullName: string
    verifyEmail: Function
}

const userSchema = new Schema<iUser>({
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    city: { type: String },
    nation: { type: String },
    phoneNumber: { type: Number },
    isEmailVerified: { type: Boolean, default: false },
}, {
    timestamps: true, toJSON: {
        // la transform prende il model user e ne rimuove la password cosi quando mando user al frontend, non mando anche la password (nasconde la password)
        transform: function (_document, ret) {
            const { password, ...user } = ret
            return user
        },
        virtuals: true
    }
})

userSchema.virtual("fullName").get(function (this: iUser) {
    return this.firstName + " " + this.lastName
});

/* const fullName = (user) => {
    user.firstName + " " + user.lastName
} */

// è una funzione associata ad un entità, in questo caso l'utente. Argomento è code
userSchema.methods.verifyEmail = async function (code) {

    // vvvv controlla che il codice dell'utente siccome tokenSecret sa se il codice è giusto o meno
    const isValid = constants.TOTPGenerator.check(code, constants.tokenSecret)

    if (!isValid) {
        throw new Error("Wrong code!")
    }

    this.isEmailVerified = true
    // this.save() salva le informazioni dell'utente nel database
    await this.save()
}

/* const verifyEmailAsFunction = async (user, code) => {
    const isValid = constants.TOTPGenerator.check(code, constants.tokenSecret)
 
    if (!isValid) {
        throw new Error("Wrong code!")
    }
 
    user.isEmailVerified = true
    await user.save()
} */

export const User = model<iUser>("User", userSchema)
