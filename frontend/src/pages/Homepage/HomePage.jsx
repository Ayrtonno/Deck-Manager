import React from "react"
import Card from "@material-ui/core/Card";
import { useState, useEffect } from "react"
import axios from "axios"

import classes from "./HomePage.module.css"
import { CardContent } from "@material-ui/core";

const HomePage = () => {
    const [newDecks, setNewDecks] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/deck", { params: { limit: 5 } }).then((response) => {
            setNewDecks(response.data.docs)
        })
    }, [])
    const [offer, setOffer] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/deck", { params: { limit: 5, price: "asc" } }).then((response) => {
            setOffer(response.data.docs)
        })
    }, [])
    const [popularDecks, setPopularDecks] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/popular-decks").then((response) =>
            setPopularDecks(response.data))
    }, [])
    /* useEffect(() => {
        const deckNames = []
        for (let index = 0; index < newDecks.length; index++) {
            const element = newDecks[index];
            deckNames.push(element.name)
        }
        console.log(deckNames)
    }, [newDecks]) */
    return (
        <div className={classes.quadratone}>
            <Card>
                <CardContent>
                    New Decks
                    {newDecks.map((newDeck) => <p>{newDeck.name}</p>)}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    Latest Offers
                    {offer.map((offer) => <p>{offer.name}</p>)}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    Popular Decks
                    {popularDecks.map((popularDeck) => <p>{popularDeck.name}</p>)}
                </CardContent>
            </Card>
        </div>
    );
};

export default HomePage;