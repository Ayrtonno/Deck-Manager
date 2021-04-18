const express = require("express")
const mongoose = require("mongoose")

const { Deck } = require("./models/deck")
const { myMiddleware } = require("./myMiddleware")
const main = async () => {

    // Express espone una funzione che crea l'applicazione, quindi chiamiamo questa funzione
    const app = express()

    /* Serve per connettersi al database vvvvv mongodb è il protocollo, root:example sono le credenziali 
    e @ indica il dominio e /test indica il nome del database. (Funziona anche senza le altre 2 parti) */
    await mongoose.connect('mongodb://root:example@localhost/test', { useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin" });

    //app.use serve per chiamare middleware json, che serve per parsare il body in json 
    app.use(express.json())
    app.use(myMiddleware)

    //variabili in minuscolo, classi in maiuscolo
    const tuna = new Deck({ name: "Tunadeck", type: "Water", cardNumber: 50, price: 5 })
    const simo = new Deck({ name: "Simodeck", type: "Holy", cardNumber: 50, price: 5 })
    /* Map è una classe che dispone le informazione in coppie chiave-valore
    const decks = new Map()
    decks.set("0", tuna)
    decks.set("1", simo) */
    await tuna.save()
    await simo.save()

    app.get("/deck", async (req, res) => {
        //res.json([...decks.values()])
        try {
            const decks = await Deck.find()
            res.json(decks)   
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.get("/deck/:id", async (req, res) => {
        try {
            const { id } = req.params
            const deck = await Deck.findById(id)
            res.json(deck) 
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.post("/deck", async (req, res) => {
        try {
            // new è una keyword per creare un oggetto di una classe, deck è una nuova variabile di tipo Deck, {...req etc, serve per prendere da body tutte le copie chiave valore e ficcarle in un nuovo oggetto
            const newDeck = new Deck({ ...req.body })
            await newDeck.save()
            //res.json serve a rimandarlo al client
            res.json(newDeck)
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.put("/deck/:id", async (req, res) => {
        try {
            const { id } = req.params
            const editDeck = await Deck.findByIdAndUpdate(id, req.body)
            res.json(editDeck)   
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.delete("/deck/:id", async (req, res) => {
        try {
            //{id: } prende la variabile prima dei : e la sostituisce con quello dopo
            const { id } = req.params
            await Deck.findByIdAndRemove(id)
            res.send("Deleted")            
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.listen(8080, () => {
        console.log("listening")
    })
}

main()