import React from "react"
import { useParams } from "react-router";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useGetDeckByInfoQuery } from "../../store/api/deckApi";


const DeckInfoPage = () => {

    // estraggo dalla rotta un oggetto con chiavi i parametri specificati nella rotta e valori i valori. 
    const { deckId } = useParams()

    // qui risolviamo l'endpoint getDeckByInfo
    const {data: deck} = useGetDeckByInfoQuery(deckId)

    /* NOME al centro 
    TIPO poco sotto e meno grosso
    CARD LIST 
    PREZZO con accanto freccettine counter per scegliere quanti aggiurne al CART 
     */
    return (
        <div>
            <h1>{deck?.name}</h1>
            <br/>
            <h3>{deck?.type}</h3>
            <br/>
            <div>{deck?.cardList?.map((card) => <p>{card.name}</p>)}</div>
            {/* const cardNameList = []
                for card of deck?.cardList {
                    cardNameList.push(<p>{card.name}</p>)
                }
                return cardNameList */}
            <br/>
            <h5>{deck?.price}€</h5>
            <input type="number" />
            <IconButton>
                <AddShoppingCart />
            </IconButton>
        </div>
    )
}

export default DeckInfoPage;

/* se riesco faccio la dispatch qua */



