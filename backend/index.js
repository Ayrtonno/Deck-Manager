const argon2 = require("argon2")
const cors = require('cors')
const express = require("express")
const expressSession = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")

const { myMiddleware } = require("./myMiddleware")

/* MODELS */
const { Card } = require("./models/card")
const { Deck } = require("./models/deck")
const { User } = require("./models/user")

/* ROUTERS */
const { deckRouter } = require("./routes/deck")
const { orderRouter } = require("./routes/order")

require("./config/auth")

const main = async () => {

    // Express espone una funzione che crea l'applicazione, quindi chiamiamo questa funzione
    const app = express()

    /* Serve per connettersi al database vvvvv mongodb è il protocollo, root:example sono le credenziali 
    e @ indica il dominio e /test indica il nome del database. (Funziona anche senza le altre 2 parti) */
    await mongoose.connect('mongodb://root:example@localhost/test', { useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin" });

    //app.use serve per chiamare middleware json, che serve per parsare il body in json 
    app.use(express.json())
    app.use(myMiddleware)
    //cors è tipo myMiddleware, ma con le opzioni. Nelle tonde gli passiamo parametri per renderlo piu sicuro, e deve essere prima delle rotte
    app.use(cors())
    //expressSession deve stare prima di passport.session
    app.use(expressSession({ secret: "Tettone" }))
    //localStrategy deve stare prima dell'initialize
    //passport.use("local", localStrategy)
    //initialize deve stare dopo le strategy
    app.use(passport.initialize())
    app.use(passport.session())

    // ROUTERS
    app.use(deckRouter)
    app.use(orderRouter)

    //variabili in minuscolo, classi in maiuscolo
    /*
    const tuna = new Deck({ name: "Tunadeck", type: "Water", cardNumber: 50, price: 5 })
    const simo = new Deck({ name: "Simodeck", type: "Holy", cardNumber: 50, price: 5 })
    //await tuna.save()
    //await simo.save()
     Map è una classe che dispone le informazione in coppie chiave-valore
    const decks = new Map()
    decks.set("0", tuna)
    decks.set("1", simo) 
    */

    app.get("/deck/:deckId/card", async (req, res) => {
        try {
            const { deckId } = req.params
            const deck = await Deck.findById(deckId).populate("cardList")
            res.json(deck)
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.post("/deck/:deckId/card", async (req, res) => {
        try {
            const newCard = new Card({ ...req.body })
            await newCard.save()
            const deck = await Deck.findById(req.params.deckId)
            deck.cardList.push(newCard)
            await deck.save()
            res.json(newCard)
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.post("/login", passport.authenticate("local"), (req, res, next) => {
        res.json({ user: req.user })
    })

    app.post("/sign-up", async (req, res) => {
        try {
            const hash = await argon2.hash(req.body.password)
            const signUp = new User({ ...req.body, password: hash })
            await signUp.save()
            res.send("User Created!")
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.listen(8080, () => {
        console.log(`listening at: http://localhost:8080`)
    })
}

main()
