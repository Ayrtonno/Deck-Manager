const express = require("express")
const deckRouter = express.Router()
const { Deck } = require("../models/deck")

deckRouter.get("/deck", async (req, res) => {
    //res.json([...decks.values()])
    try {
        //  const decks = await Deck.find({name: "Simodeck"})
        let decks
        if (req.query.name) {
            decks = await Deck.paginate({ name: req.query.name }, { offset: req.query.offset, limit: req.query.limit, sort: { createdAt: "desc" } })
        } else {
            decks = await Deck.paginate({}, { offset: req.query.offset, limit: req.query.limit, sort: { createdAt: "desc" } })
        }
        if (decks.totalDocs === 0) {
            res.status(404).send("There is no such deck!")
            return
        } else {
            res.json(decks)
        }

    } catch (error) {
        console.error(error)
        res.send("Error!")
    }
})

deckRouter.get("/deck/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deck = await Deck.findById(id)
        res.json(deck)
        /*  const cardNumber = deck.cardList.length */
    } catch (error) {
        console.error(error)
        res.send("Error")
    }
})

deckRouter.post("/deck", async (req, res) => {
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

deckRouter.put("/deck/:id", async (req, res) => {
    try {
        const { id } = req.params
        const editDeck = await Deck.findByIdAndUpdate(id, req.body)
        res.json(editDeck)
    } catch (error) {
        console.error(error)
        res.send("Error")
    }
})

deckRouter.delete("/deck/:id", async (req, res) => {
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

exports.deckRouter = deckRouter