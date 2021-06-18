import React from "react"
import Card from "@material-ui/core/Card";
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

const DeckInfoPage = () => {
    const [deck, setDeck] = useState({})
    const { deckId } = useParams()
    const fetchDeckInfo = async () => {
        const response = await axios.get(`http://localhost:8080/deck/${deckId}/card`)
        setDeck(response.data)
    }
    const [counter, setCounter] = useState(0)


    useEffect(() => {
        fetchDeckInfo()
    }, [])
    /* NOME al centro 
    TIPO poco sotto e meno grosso
    CARD LIST 
    PREZZO con accanto freccettine counter per scegliere quanti aggiurne al CART 
     */
    return (
        <div>
            <h1>{deck.name}</h1>
            <br/>
            <h3>{deck.type}</h3>
            <br/>
            <div>{deck?.cardList?.map((card) => <p>{card.name}</p>)}</div>
            {/* const cardNameList = []
                for card of deck?.cardList {
                    cardNameList.push(<p>{card.name}</p>)
                }
                return cardNameList */}
            <br/>
            <h5>{deck.price}€</h5>
            <input type="number" />
            <IconButton>
                <AddShoppingCart />
            </IconButton>
        </div>
    )
}

export default DeckInfoPage;

/* se riesco faccio la dispatch qua */



