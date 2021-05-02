const faker = require("faker")
const axios = require("axios")
const cardTypes = ["Fire", "Water", "Earth", "Air", "Holy", "Unholy", "Undead", "Ritual"]

const generateCard = () => {
    const name = faker.name.firstName()
    const type = faker.random.arrayElement(cardTypes)
    const energy = faker.datatype.number({ min: 1, max: 20 })
    const atk = faker.datatype.number({ min: 0, max: 30 })
    const def = faker.datatype.number({ min: 0, max: 30 })
    const card = { name, type, energy, atk, def }
    return card
}


const generateDeck = () => {
    /* name: { type: String, unique: true },
    type: String,
    cardNumber: Number,
    price: Number, */
    const name = faker.name.findName()
    const type = faker.commerce.productName()
    const price = faker.commerce.price()
    const deck = { name, type, price }
    return deck
}

const main = async () => {
    for (let index = 0; index < 10; index++) {
        const deck = generateDeck()
        const response = await axios.post("http://localhost:8080/deck", { name: deck.name, type: deck.type, cardNumber: deck.cardNumber, price: deck.price })
        console.log(response)
        const deckId = response.data._id
        for (let index = 0; index < 20; index++) {
            const card = generateCard()
            await axios.post(`http://localhost:8080/deck/${deckId}/card`, card)
        }
        // { name: deck.name, type: deck.type, cardNumber: deck.cardNumber, price: deck.price } potevo lasciarlo cime deck, avendogli assegnato la costante sopra//
    }
}

main()
