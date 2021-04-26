import axios from "axios";
import { useState, useEffect } from "react";

const Deck = (props) => {
    return (
        <div>
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

    const [decks, setDecks] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/deck", { params: { offset: 0, limit: 10 } }).then((response) => setDecks(response.data.docs))
    }, [])



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
    const [filters, setFilters] = useState("")

    return (
        <div>
            <input type="text" name="Search" onChange={(inputEvent) => setFilters(inputEvent.target.value)} />
            <div>
                {decks.filter((deck) => {
                    if (!filters) {
                        return true
                    } else {
                        return (`${deck.name} ${deck.type} ${deck.cardNumber} ${deck.price}`).toString().toLowerCase().includes(filters.toLowerCase())
                    }
                }).map((deck) => <Deck name={deck.name} type={deck.type} cardNumber={deck.cardNumber} price={deck.price} />)}
            </div>
        </div>
    )
}
export default App

