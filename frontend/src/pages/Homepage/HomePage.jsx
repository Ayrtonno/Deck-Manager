import React from "react"
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router"

import classes from "./HomePage.module.css"
import { CardContent, CardHeader, List, ListItem, ListItemText } from "@material-ui/core";
import { useGetDeckListQuery, useGetDeckListByPopularQuery, useGetDeckListByPriceQuery } from "../../store/api/deckApi";

const HomePage = () => {
    //nelle graffe ho 3 informazioni: data, quindi la risposta
    //error, quindi se c'è stato un errore, 
    //isLoading, se sta caricando
    const {data: newDecks, error, isLoading} = useGetDeckListQuery(5)

    const {data: offer} = useGetDeckListByPriceQuery({limit: 5, sort: "asc"})
    
    const {data: popularDecks} = useGetDeckListByPopularQuery()

    /* useEffect(() => {
        const deckNames = []
        for (let index = 0; index < newDecks.length; index++) {
            const element = newDecks[index];
            deckNames.push(element.name)
        }
        console.log(deckNames)
    }, [newDecks]) */

    const history = useHistory()

    const goToDeckInfo = (deckId) => { history.push(`/deck-info/${deckId}`)}
    
    return (
        <div className={classes.quadratone}>
            <Card>
                <CardHeader title="New Decks" subheader="The newest decks fresh out of your church!" />
                <CardContent>
                    <List>
                        {newDecks?.docs?.map((newDeck) => (
                            <ListItem button onClick= {() => goToDeckInfo(newDeck.id)}> 
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
                        {offer?.docs?.map((offer) => (
                            <ListItem button onClick= {() => goToDeckInfo(offer.id)}> 
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
                        {popularDecks?.docs?.map((popularDeck) => (
                            <ListItem button onClick= {() => goToDeckInfo(popularDeck.id)}> 
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

