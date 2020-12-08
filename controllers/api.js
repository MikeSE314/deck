const express = require("express")
const router = express.Router()
const Deck = require("../models/Deck")

CARDS = [
  { code: "AS", image: `${process.env.HOST}/static/img/AS.png` },
  { code: "1S", image: `${process.env.HOST}/static/img/1S.png` },
  { code: "AC", image: `${process.env.HOST}/static/img/AC.png` },
]

router.get("/deck/new/", async (req, res) => {
  try {
    let deck = new Deck()
    deck.piles = [{ name: "draw", cards: CARDS }]
    await deck.save()
    res.status(201).send(deck)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

router.get("/deck/", async (req, res) => {
  try {
    let decks = await Deck.find()
    res.send(decks)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

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

router.get("/deck/:id/pile/:name/add/:card/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    let pile = deck.piles.find(pile => pile.name == req.params.name)
    if (!pile) {
      pile = { name: req.params.name, cards: [] }
      deck.piles.push(pile)
    }
    if (!pile.cards.some(card => card.code == req.params.card)) {
      pile.cards.push(CARDS.find(card => card.code == req.params.card))
    }
    await deck.save()
    res.send(pile)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

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

module.exports = router
