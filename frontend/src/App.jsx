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
    const [counter, setCounter] = useState(0)

    const [decks, setDecks] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/deck").then((response) => setDecks(response.data))
    })

    useEffect(() => {
        if (counter === 10) {
            console.log("Bravo scemo")
        }
        // [counter] è un array delle dipendenza, quando cambia una di queste variabili viene richiamata la funzione all'interno
    }, [counter])
    return (
        <div>
            <button onClick={() => setCounter((current) => current + 1)}>
                +1
            </button>
            <button onClick={() => setCounter((current) => current - 1)}>
                -1
            </button>
            <span>
                {counter}
            </span>
            <div>
                {decks.map((deck) => <Deck name={deck.name} type={deck.type} cardNumber={deck.cardNumber} price={deck.price} />)}
            </div>
        </div>
    )
}
export default App
