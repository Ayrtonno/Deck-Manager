const express = require("express")
const deckRouter = express.Router()
const { Deck } = require("../models/deck")
const { Order } = require("../models/order")

deckRouter.get("/popular-decks", async (req, res) => {
    try {
        //let boughtDeckIds = []
        const globalCounter = new Map()
        const allOrders = await Order.find({})

        for (let index = 0; index < allOrders.length; index++) {
            const order = allOrders[index];
            for (let i = 0; i < order.cart.length; i++) {
                const deckId = order.cart[i];
                //boughtDeckIds.push(deckId)
                if (globalCounter.has(deckId.toHexString())) {
                    const current = globalCounter.get(deckId.toHexString())
                    globalCounter.set(deckId.toHexString(), current + 1)
                }
                else {
                    globalCounter.set(deckId.toHexString(), 1)
                }
            }
        }
        //let globalCounter = [{id, counter}]
        /* let globalCounter = []
        for (let index = 0; index < boughtDeckIds.length; index++) {
            const search = boughtDeckIds[index].toHexString();
            let counter = 0
            boughtDeckIds.forEach(deckId => {
                if (search === deckId.toHexString()) {
                    counter += 1
                }
            });
            let deckIdCounter = { search, counter }
            globalCounter.push(deckIdCounter)
        } */
        /* 
        const decks = []
        globalCounter.forEach((counter, deckId) => {
            const deck = await Deck.findById(deckId)
            const deckObject = deck.toObject()
            decks.push({ ...deckObject, counter })
        }) 
        for (const [deckId, counter] of globalCounter) {
            const deck = await Deck.findById(deckId)
            const deckObject = deck.toObject()
            decks.push({ ...deckObject, counter })
        }
        */
        
        // una funzione async ti restituisce una promise, una cosa che verrà completata in futuro non sai quando.
        const addDeckInfoPromises = [...globalCounter.entries()].map(async ([deckId, counter]) => {
            const deck = await Deck.findById(deckId)
            const deckObject = deck.toObject()
            return { ...deckObject, counter }
        })

        // promise all esegue le promise se tutte sono state risolte. se una è in errore mi fa throw error
        const decks = await Promise.all(addDeckInfoPromises)

        res.json(decks)
        
    } catch (error) {
        console.error(error)
        res.send("Error!")
    }
})


deckRouter.get("/deck", async (req, res) => {
    //res.json([...decks.values()])
    try {
        //  const decks = await Deck.find({name: "Simodeck"})
        let decks
        // Get pagination query
        const { offset, limit } = req.query;
        // const offset = req.query.offset;
        // const limit = req.query.limit;

        // Prepare sort map values
        const sortMap = new Map();

        const createdAt = req.query.createdAt;
        if (createdAt) {
            sortMap.set("createdAt", createdAt);
        }

        const price = req.query.price; // = ""
        if (price) {
            sortMap.set("price", price);
        }

        const specs = { offset: offset, limit: limit, sort: sortMap };

        const name = req.query.name;
        const query = {};
        if (name) {
            query.name = name;
        }

        decks = await Deck.paginate(query, specs)

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
