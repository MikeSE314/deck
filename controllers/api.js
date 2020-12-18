const express = require("express")
const router = express.Router()
const Deck = require("../models/Deck")

function choose(choices) {
  if (choices.length == 0) return null
  let index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

const SHARED_DECK = require("../util/shared_deck").cards

/* Create a new deck */
router.get("/deck/new/", async (req, res) => {
  try {
    let deck = new Deck()
    deck.piles = [{ name: "draw", cards: SHARED_DECK }]
    deck.coll = SHARED_DECK
    await deck.save()
    res.status(201).send(deck)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Create a new deck of a certain kind. Not implemented. */
/* TODO: implement */
router.get("/deck/new/:kind", async (req, res) => {
  try {
    let deck = new Deck()
    deck.piles = [{ name: "draw", cards: SHARED_DECK }]
    deck.coll = SHARED_DECK
    await deck.save()
    res.status(201).send(deck)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Read all decks */
router.get("/deck/", async (req, res) => {
  try {
    let decks = await Deck.find()
    res.send(decks)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Read deck :id */
router.get("/deck/:id/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    res.send(deck)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Read all piles from deck :id */
router.get("/deck/:id/pile/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    res.send(deck.piles)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Read pile :name from deck :id */
router.get("/deck/:id/pile/:name/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    let pile = deck.piles.find(pile => pile.name == req.params.name)
    if (!pile) {
      pile = { name: req.params.name, cards: [] }
      deck.piles.push(pile)
      await deck.save()
    }
    res.send(pile)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Return a random card from pile :name in deck :id */
router.get("/deck/:id/pile/:name/draw/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    let pile = deck.piles.find(pile => pile.name == req.params.name)
    if (!pile) {
      pile = { name: req.params.name, cards: [] }
      deck.piles.push(pile)
      await deck.save()
    }
    res.send(choose(pile.cards))
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Add card :card to pile :name in deck :id */
router.get("/deck/:id/pile/:name/add/:card/", async (req, res) => {
  try {
    // find the deck
    let deck = await Deck.findById(req.params.id)
    // if no deck, 404
    if (!deck) return res.sendStatus(404)
    // find the pile
    let pile = deck.piles.find(pile => pile.name == req.params.name)
    if (!pile) {
      // if no pile, make one
      pile = { name: req.params.name, cards: [] }
      // add to deck
      deck.piles.push({ name: req.params.name, cards: [] })
      // save pile to db
      pile = (await deck.save()).piles.find(pile => pile.name == req.params.name)
    }
    // remove the card from any other pile
    deck.piles.forEach(pile => { pile.cards = pile.cards.filter(card => card.code != req.params.card) })
    // add the card to the new pile
    pile.cards.push(deck.coll.find(card => card.code == req.params.card))
    // save to db
    await deck.save()
    // send the pile
    res.send(pile)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Remove card :card from pile :name in deck :id */
router.get("/deck/:id/pile/:name/remove/:card/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    let pile = deck.piles.find(pile => pile.name == req.params.name)
    if (!pile) {
      pile = { name: req.params.name, cards: [] }
      deck.piles.push(pile)
    }
    pile.cards = pile.cards.filter(card => card.code != req.params.card)
    await deck.save()
    res.send(pile)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

/* Delete deck :id */
router.get("/deck/:id/delete", async (req, res) => {
  try {
    let deck = await Deck.findByIdAndRemove(req.params.id)
    if (!deck) return res.sendStatus(404)
    res.send("deleted")
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

module.exports = router
