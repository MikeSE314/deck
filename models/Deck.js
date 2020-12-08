// models/Deck.js

let db = require("../db_connector")

let cardSchema = new db.Schema({
  code: String,
  image: String
})

let pileSchema = new db.Schema({
  name: String,
  cards: [ cardSchema ]
})

let deckSchema = new db.Schema({
  piles: [ pileSchema ]
}, {
  collection: "Deck"
})

let Deck = db.model("Deck", deckSchema)

module.exports = Deck