// otplib serve a generare i token temporanei per validare l'email.
import { totp } from "otplib"

//vvvv resistuisce opzioni di base e poi noi, con il totp.create ne sovrascriviamo le opzioni
const defaultOptions = totp.allOptions()
const TOTPGenerator = totp.create({
    ...defaultOptions,
    // ogni quanto rigeneriamo i token
    step: 24 * 60 * 60,
    // 7 per quanto durano
    window: 7 * 24 * 60 * 60,
})

// tokenSecret è tipo un seed per la generazione dei codici
export const constants = {
    tokenSecret: "W1gP2Vdkj0cvOkOs",
    TOTPGenerator
}
