import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar, IconButton, Toolbar, TextField } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { BrowserRouter, Switch, Route } from "react-router-dom"


import classes from "./App.module.css"

import HomePage from "./pages/Homepage/HomePage"
import SignUpPage from "./pages/SignUp/SignUpPage"
import LogInPage from "./pages/Login/LoginPage"

const Deck = (props) => {
    return (
        <div className="deckList">
            {props.name}
            {" "}
            {props.type}
            {" "}
            {props.cardNumber}
            {" "}
            {props.price}
        </div>
    )
}

// per react quest "App" è un componente funzionale perche è una funzione di per sè.
const App = () => {
    /* const [counter, setCounter] = useState(0) */
    /*     const [filters, setFilters] = useState("")
        const [page, setPage] = useState(0)
        const [decks, setDecks] = useState([])
        const [limit, setLimit] = useState(0) */

    /*  useEffect(() => {
         axios.get("http://localhost:8080/deck", { params: { offset: page * 10, limit: 10 } }).then((response) => {
             setDecks(response.data.docs)
             setLimit(response.data.totalPages)
         }
         )
     }, [page]) */

    /* useEffect(() => {
        if (counter === 10) {
            console.log("Bravo scemo")
        }
        // [counter] è un array delle dipendenza, quando cambia una di queste variabili viene richiamata la funzione all'interno
    }, [counter]) */
    /* useEffect(() => {
        setInterval(() => {
            console.log("...")
            console.log("Sei gay!")
        }, 10000)
    }) */

    /*
    return (
        <div>
            <input className="box1" type="text" name="Search" placeholder="Deck Name" onChange={(inputEvent) => setFilters(inputEvent.target.value)} />
            <div>
                {decks.filter((deck) => {
                    if (!filters) {
                        return true
                    } else {
                        return (`${deck.name} ${deck.type} ${deck.cardNumber} ${deck.price}`).toString().toLowerCase().includes(filters.toLowerCase())
                    }
                }).map((deck) => <Deck name={deck.name} type={deck.type} cardNumber={deck.cardNumber} price={deck.price} />)}
            </div>
            <input className="box2" type="number" min={0} max={limit} name="Page Number" onChange={(inputEvent) => setPage(inputEvent.target.value)} value={page} />
        </div>
    )
    */
    return (
        <>
            <AppBar position="static">
                <Toolbar classes={{ root: classes.toolbar }}>
                    <IconButton>
                        <Menu />
                    </IconButton>
                    <h1>
                        HOLY WAR DECKS SHOP
                    </h1>
                    <TextField label="Search for a Deck..." />
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/sign-up" exact>
                        <SignUpPage />
                    </Route>
                    <Route path="/login" exact>
                        <LogInPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}
export default App

