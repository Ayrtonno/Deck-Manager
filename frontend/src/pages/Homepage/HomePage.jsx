import React from "react"
import Card from "@material-ui/core/Card";
import { useState, useEffect } from "react"
import axios from "axios"

import classes from "./HomePage.module.css"
import { CardContent, CardHeader, List, ListItem, ListItemText } from "@material-ui/core";

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
                <CardHeader title="New Decks" subheader="The newest decks fresh out of your church!" />
                <CardContent>
                    <List>
                        {newDecks.map((newDeck) => (
                            <ListItem>
                                <ListItemText primary={newDeck.name} />
                            </ListItem>
                        ))}
                    </List>

                </CardContent>
            </Card>

            <Card>
                <CardHeader title="Offers" subheader="The cheapest decks on sale!" />
                <CardContent>
                    <List>
                        {offer.map((offer) => (
                            <ListItem>
                                <ListItemText primary={offer.name} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>

            </Card>

            <Card>
                <CardHeader title="Popular Decks" subheader="The most selled decks ever!" />
                <CardContent>
                    <List>
                        {popularDecks.map((popularDeck) => (
                            <ListItem>
                                <ListItemText primary={popularDeck.name} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

        </div>
    );
};

export default HomePage;