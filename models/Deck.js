// models/Deck.js

let db = require("../db_connector")

let cardSchema = new db.Schema({
  code: String,
  cost: String,
  title: String,
  suit: String,
  front_image: String,
  back_image: String,
  description: String
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