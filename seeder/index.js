const faker = require("faker")
const axios = require("axios")

const generateDeck = () => {
    /* name: { type: String, unique: true },
    type: String,
    cardNumber: Number,
    price: Number, */
    const name = faker.name.findName()
    const type = faker.commerce.productName()
    const cardNumber = faker.datatype.number()
    const price = faker.commerce.price()
    const deck = { name, type, cardNumber, price }
    console.log(deck)
    return deck
}

const main = async () => {
    for (let index = 0; index < 10; index++) {
        const deck = generateDeck()
        await axios.post("http://localhost:8080/deck", { name: deck.name, type: deck.type, cardNumber: deck.cardNumber, price: deck.price })
    }
}

main()