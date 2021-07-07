// il cors serve ad autorizzare i nostri frontend, accettando le sue richieste
import cors from 'cors'
// express è il server http dell'aplicazione (node js + express sono le fondamenta)
import express from "express"
// session serve per salvare le informazioni dell utente fra sessioni, cosi dal cookie possiamo sapere chi accede all'app
import expressSession from "express-session"
// multer gestisce il caricamento dei file
import multer from "multer"
// mongoose si occupa del database (ODM - object document model)
import mongoose from "mongoose"
// passport si occupa dell'autenticazione, ovvero identifica chi è l'utente
import passport from "passport"
// adattatore delle sessioni di express per mongo, ovvero salviamo le sessioni express sul database mongo
import MongoStore from 'connect-mongo'
//fs sono tutte le funzioni disponibili a node per operare sul file system, leggere file, crearli, etcetcetc
import fs from "fs/promises"

//genera gli id per le user pics
import { nanoid } from 'nanoid'

import mime  from 'mime-types'

//middleware --- funzione che sta fra funzioni (nel nostro caso controlla se l'user ha l'email verificata o meno), è una funziona in un altro file
import { myMiddleware } from "./myMiddleware"

/* MODELS */
import { Card } from "./models/card"
import { Deck } from "./models/deck"

/* ROUTERS */
import deckRouter from "./routes/deck"
import orderRouter from "./routes/order"
import authRouter from "./routes/auth"
import { requireUserEmailVerified } from './middlewares/requireUserEmailVerified'
import { iUser } from './models/user'

const main = async () => {
    await import("./config/auth")

    // Express espone una funzione che crea l'applicazione, quindi chiamiamo questa funzione
    const app = express()
    const upload = multer({storage: multer.memoryStorage()})

    /* Serve per connettersi al database vvvvv mongodb è il protocollo, root:example sono le credenziali 
    e @ indica il dominio e /test indica il nome del database. (Funziona anche senza le altre 2 parti) */
    await mongoose.connect('mongodb://root:example@localhost/test', { useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin" });

    //app.use serve per chiamare middleware json, che serve per parsare il body in json 
    app.use(express.json())
    app.use(myMiddleware)
    //cors è tipo myMiddleware, ma con le opzioni. Nelle tonde gli passiamo parametri per renderlo piu sicuro, e deve essere prima delle rotte
    app.use(cors({ origin: "http://localhost:3000", credentials: true }))
    //expressSession deve stare prima di passport.session
    app.use(expressSession({ secret: "Tettone", store: MongoStore.create({ mongoUrl: "mongodb://root:example@localhost/test?authSource=admin" }) }))
    //localStrategy deve stare prima dell'initialize
    //passport.use("local", localStrategy)
    //initialize deve stare dopo le strategy
    app.use(passport.initialize())
    app.use(passport.session())

    // ROUTERS
    app.use(deckRouter)
    app.use(orderRouter)
    app.use(authRouter)

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
            if (!deck) {
                return res.status(404).json({message: "Deck not found! :c"})
            }
            deck.cardList.push(newCard)
            await deck.save()
            res.json(newCard)
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    app.post("/user/avatar", requireUserEmailVerified,  upload.single("avatar"), async (req, res) => {
        try {
            const avatarFile = req.file
            
            if (!avatarFile) {
                throw new Error("Invalid avatar!");                            
            }
            const extension = mime.extension(avatarFile.mimetype)
            const picId = nanoid()
            const userPicture = picId + extension
            if (!extension) {
                throw new Error("Invalid File!");               
            }
            const path = `./uploads/${userPicture}`
            const user = req.user as iUser
            await fs.writeFile(path, avatarFile.buffer)  
            user.uploadPic(path)          
            res.send("Your avatar has been uploaded!")
        } catch (error) {
            console.error(error)
            res.send("Error")
        }
    })

    // app.listen apre un socket, ovvero ascolta solo la porta 8080
    app.listen(8080, () => {
        console.log(`listening at: http://localhost:8080`)
    })
}

//vvvv chiama la funzione main
main()


//far si che il frontend manda l'immagine al backend, sapere chi ha uploadato il file, facendolo sempre con l'auth (con passport), e anche salvare
//l'utente X ha messo avatar Y, e poi generare casualmente il nome del file   
