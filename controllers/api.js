const express = require("express")
const router = express.Router()
const Deck = require("../models/Deck")

function choose(choices) {
  if (choices.length == 0) return null
  let index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

CARDS = [
  { code: '01', cost: '',     title: 'Ambush!',              suit: 'bird',   front_image: `${process.env.HOST}/img/card-01.png`, back_image: `${process.env.HOST}/img/back-01.png`, description: 'You may ambush in any clearing. At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.' },
  { code: '02', cost: '',     title: 'Ambush!',              suit: 'bird',   front_image: `${process.env.HOST}/img/card-02.png`, back_image: `${process.env.HOST}/img/back-02.png`, description: 'You may ambush in any clearing. At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.' },
  { code: '03', cost: 'M',    title: 'Birdy Bindle',         suit: 'bird',   front_image: `${process.env.HOST}/img/card-03.png`, back_image: `${process.env.HOST}/img/back-03.png`, description: '{{sack}}, {{1}} Then discard.' },
  { code: '04', cost: 'F',    title: 'Armorers',             suit: 'bird',   front_image: `${process.env.HOST}/img/card-04.png`, back_image: `${process.env.HOST}/img/back-04.png`, description: 'In battle, may discard this to ignore all rolled hits taken.' },
  { code: '05', cost: 'F',    title: 'Armorers',             suit: 'bird',   front_image: `${process.env.HOST}/img/card-05.png`, back_image: `${process.env.HOST}/img/back-05.png`, description: 'In battle, may discard this to ignore all rolled hits taken.' },
  { code: '06', cost: 'R',    title: 'Woodland Runners',     suit: 'bird',   front_image: `${process.env.HOST}/img/card-06.png`, back_image: `${process.env.HOST}/img/back-06.png`, description: '{{boot}}, {{1}} Then discard.' },
  { code: '07', cost: 'FF',   title: 'Arms Trader',          suit: 'bird',   front_image: `${process.env.HOST}/img/card-07.png`, back_image: `${process.env.HOST}/img/back-07.png`, description: '{{sword}}, {{2}} Then discard.' },
  { code: '08', cost: 'F',    title: 'Crossbow',             suit: 'bird',   front_image: `${process.env.HOST}/img/card-08.png`, back_image: `${process.env.HOST}/img/back-08.png`, description: '{{crossbow}}, {{1}} Then discard.' },
  { code: '09', cost: 'M',    title: 'Sappers',              suit: 'bird',   front_image: `${process.env.HOST}/img/card-09.png`, back_image: `${process.env.HOST}/img/back-09.png`, description: 'In battle as defender, may discard this to deal an extra hit.' },
  { code: '10', cost: 'M',    title: 'Sappers',              suit: 'bird',   front_image: `${process.env.HOST}/img/card-10.png`, back_image: `${process.env.HOST}/img/back-10.png`, description: 'In battle as defender, may discard this to deal an extra hit.' },
  { code: '11', cost: 'FF',   title: 'Brutal Tactics',       suit: 'bird',   front_image: `${process.env.HOST}/img/card-11.png`, back_image: `${process.env.HOST}/img/back-11.png`, description: 'In battle as attacker, may deal an extra hit, but defender scores one point.' },
  { code: '12', cost: 'FF',   title: 'Brutal Tactics',       suit: 'bird',   front_image: `${process.env.HOST}/img/card-12.png`, back_image: `${process.env.HOST}/img/back-12.png`, description: 'In battle as attacker, may deal an extra hit, but defender scores one point.' },
  { code: '13', cost: 'AAAA', title: 'Royal Claim',          suit: 'bird',   front_image: `${process.env.HOST}/img/card-13.png`, back_image: `${process.env.HOST}/img/back-13.png`, description: 'In Birdsong, may discard this to score one point per clearing you rule.' },
  { code: '14', cost: '',     title: 'Ambush!',              suit: 'fox',    front_image: `${process.env.HOST}/img/card-14.png`, back_image: `${process.env.HOST}/img/back-14.png`, description: 'You may only ambush in a fox clearing. At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.' },
  { code: '15', cost: 'M',    title: 'Knapsack',             suit: 'fox',    front_image: `${process.env.HOST}/img/card-15.png`, back_image: `${process.env.HOST}/img/back-15.png`, description: '{{knapsack}}, {{1}} Then discard.' },
  { code: '16', cost: 'M',    title: 'Root Tea',             suit: 'fox',    front_image: `${process.env.HOST}/img/card-16.png`, back_image: `${process.env.HOST}/img/back-16.png`, description: '{{tea}}, {{2}} Then discard.' },
  { code: '17', cost: 'R',    title: 'Travel Gear',          suit: 'fox',    front_image: `${process.env.HOST}/img/card-17.png`, back_image: `${process.env.HOST}/img/back-17.png`, description: '{{boot}}, {{1}} Then discard.' },
  { code: '18', cost: 'RR',   title: 'Protection Racket',    suit: 'fox',    front_image: `${process.env.HOST}/img/card-18.png`, back_image: `${process.env.HOST}/img/back-18.png`, description: '{{coin}}, {{3}} Then discard.' },
  { code: '19', cost: 'FF',   title: 'Foxfolk Steel',        suit: 'fox',    front_image: `${process.env.HOST}/img/card-19.png`, back_image: `${process.env.HOST}/img/back-19.png`, description: '{{sword}}, {{2}} Then discard.' },
  { code: '20', cost: 'F',    title: 'Anvil',                suit: 'fox',    front_image: `${process.env.HOST}/img/card-20.png`, back_image: `${process.env.HOST}/img/back-20.png`, description: '{{hammer}}, {{2}} Then discard.' },
  { code: '21', cost: 'MMM',  title: 'Stand and Deliver!',   suit: 'fox',    front_image: `${process.env.HOST}/img/card-21.png`, back_image: `${process.env.HOST}/img/back-21.png`, description: 'In Birdsong, may take a random card from another player. That player scores one point.' },
  { code: '22', cost: 'MMM',  title: 'Stand and Deliver!',   suit: 'fox',    front_image: `${process.env.HOST}/img/card-22.png`, back_image: `${process.env.HOST}/img/back-22.png`, description: 'In Birdsong, may take a random card from another player. That player scores one point.' },
  { code: '23', cost: 'RFM',  title: 'Tax Collector',        suit: 'fox',    front_image: `${process.env.HOST}/img/card-23.png`, back_image: `${process.env.HOST}/img/back-23.png`, description: 'Once in Daylight, may remove one of your warriors to draw a card.' },
  { code: '24', cost: 'RFM',  title: 'Tax Collector',        suit: 'fox',    front_image: `${process.env.HOST}/img/card-24.png`, back_image: `${process.env.HOST}/img/back-24.png`, description: 'Once in Daylight, may remove one of your warriors to draw a card.' },
  { code: '25', cost: 'RFM',  title: 'Tax Collector',        suit: 'fox',    front_image: `${process.env.HOST}/img/card-25.png`, back_image: `${process.env.HOST}/img/back-25.png`, description: 'Once in Daylight, may remove one of your warriors to draw a card.' },
  { code: '26', cost: 'FFF',  title: 'Favor of the Foxes',   suit: 'fox',    front_image: `${process.env.HOST}/img/card-26.png`, back_image: `${process.env.HOST}/img/back-26.png`, description: 'Remove all enemy pieces in fox clearings, then discard.' },
  { code: '27', cost: '',     title: 'Ambush!',              suit: 'rabbit', front_image: `${process.env.HOST}/img/card-27.png`, back_image: `${process.env.HOST}/img/back-27.png`, description: 'You may only ambush in a rabbit clearing. At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.' },
  { code: '28', cost: 'M',    title: "Smuggler's Trail",     suit: 'rabbit', front_image: `${process.env.HOST}/img/card-28.png`, back_image: `${process.env.HOST}/img/back-28.png`, description: '{{knapsack}}, {{1}} Then discard.' },
  { code: '29', cost: 'M',    title: 'Root Tea',             suit: 'rabbit', front_image: `${process.env.HOST}/img/card-29.png`, back_image: `${process.env.HOST}/img/back-29.png`, description: '{{tea}}, {{2}} Then discard.' },
  { code: '30', cost: 'R',    title: 'A Visit to Friends',   suit: 'rabbit', front_image: `${process.env.HOST}/img/card-30.png`, back_image: `${process.env.HOST}/img/back-30.png`, description: '{{boot}}, {{1}} Then discard.' },
  { code: '31', cost: 'RR',   title: 'Bake Sale',            suit: 'rabbit', front_image: `${process.env.HOST}/img/card-31.png`, back_image: `${process.env.HOST}/img/back-31.png`, description: '{{coin}}, {{3}} Then discard.' },
  { code: '32', cost: 'RR',   title: 'Command Warren',       suit: 'rabbit', front_image: `${process.env.HOST}/img/card-32.png`, back_image: `${process.env.HOST}/img/back-32.png`, description: 'At start of Daylight, may initiate a battle.' },
  { code: '33', cost: 'RR',   title: 'Command Warren',       suit: 'rabbit', front_image: `${process.env.HOST}/img/card-33.png`, back_image: `${process.env.HOST}/img/back-33.png`, description: 'At start of Daylight, may initiate a battle.' },
  { code: '34', cost: 'RR',   title: 'Better Burrow Bank',   suit: 'rabbit', front_image: `${process.env.HOST}/img/card-34.png`, back_image: `${process.env.HOST}/img/back-34.png`, description: 'At start of Birdsong, you and another player draw a card.' },
  { code: '35', cost: 'RR',   title: 'Better Burrow Bank',   suit: 'rabbit', front_image: `${process.env.HOST}/img/card-35.png`, back_image: `${process.env.HOST}/img/back-35.png`, description: 'At start of Birdsong, you and another player draw a card.' },
  { code: '36', cost: 'RR',   title: 'Cobbler',              suit: 'rabbit', front_image: `${process.env.HOST}/img/card-36.png`, back_image: `${process.env.HOST}/img/back-36.png`, description: 'At start of Evening, may take a move.' },
  { code: '37', cost: 'RR',   title: 'Cobbler',              suit: 'rabbit', front_image: `${process.env.HOST}/img/card-37.png`, back_image: `${process.env.HOST}/img/back-37.png`, description: 'At start of Evening, may take a move.' },
  { code: '38', cost: 'RRR',  title: 'Favor of the Rabbits', suit: 'rabbit', front_image: `${process.env.HOST}/img/card-38.png`, back_image: `${process.env.HOST}/img/back-38.png`, description: 'Remove all enemy pieces in rabbit clearings, then discard.' },
  { code: '39', cost: '',     title: 'Ambush!',              suit: 'mouse',  front_image: `${process.env.HOST}/img/card-39.png`, back_image: `${process.env.HOST}/img/back-39.png`, description: 'You may only ambush in a mouse clearing. At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.' },
  { code: '40', cost: 'M',    title: 'Mouse-in-a-Sack',      suit: 'mouse',  front_image: `${process.env.HOST}/img/card-40.png`, back_image: `${process.env.HOST}/img/back-40.png`, description: '{{knapsack}}, {{1}} Then discard.' },
  { code: '41', cost: 'M',    title: 'Root Tea',             suit: 'mouse',  front_image: `${process.env.HOST}/img/card-41.png`, back_image: `${process.env.HOST}/img/back-41.png`, description: '{{tea}}, {{2}} Then discard.' },
  { code: '42', cost: 'R',    title: 'Travel Gear',          suit: 'mouse',  front_image: `${process.env.HOST}/img/card-42.png`, back_image: `${process.env.HOST}/img/back-42.png`, description: '{{boot}}, {{1}} Then discard.' },
  { code: '43', cost: 'RR',   title: 'Investments',          suit: 'mouse',  front_image: `${process.env.HOST}/img/card-43.png`, back_image: `${process.env.HOST}/img/back-43.png`, description: '{{coin}}, {{3}} Then discard.' },
  { code: '44', cost: 'FF',   title: 'Sword',                suit: 'mouse',  front_image: `${process.env.HOST}/img/card-44.png`, back_image: `${process.env.HOST}/img/back-44.png`, description: '{{sword}}, {{2}} Then discard.' },
  { code: '45', cost: 'F',    title: 'Crossbow',             suit: 'mouse',  front_image: `${process.env.HOST}/img/card-45.png`, back_image: `${process.env.HOST}/img/back-45.png`, description: '{{crossbow}}, {{1}} Then discard.' },
  { code: '46', cost: 'MM',   title: 'Scouting Party',       suit: 'mouse',  front_image: `${process.env.HOST}/img/card-46.png`, back_image: `${process.env.HOST}/img/back-46.png`, description: 'As attacker in battle, you are not affected by ambush cards.' },
  { code: '47', cost: 'MM',   title: 'Scouting Party',       suit: 'mouse',  front_image: `${process.env.HOST}/img/card-47.png`, back_image: `${process.env.HOST}/img/back-47.png`, description: 'As attacker in battle, you are not affected by ambush cards.' },
  { code: '48', cost: 'M',    title: 'Codebreakers',         suit: 'mouse',  front_image: `${process.env.HOST}/img/card-48.png`, back_image: `${process.env.HOST}/img/back-48.png`, description: "Once in Daylight, may look at another player's hand." },
  { code: '49', cost: 'M',    title: 'Codebreakers',         suit: 'mouse',  front_image: `${process.env.HOST}/img/card-49.png`, back_image: `${process.env.HOST}/img/back-49.png`, description: "Once in Daylight, may look at another player's hand." },
  { code: '50', cost: 'MMM',  title: 'Favor of the Mice',    suit: 'mouse',  front_image: `${process.env.HOST}/img/card-50.png`, back_image: `${process.env.HOST}/img/back-50.png`, description: 'Remove all enemy pieces in mouse clearings, then discard.' },
  { code: '51', cost: '',     title: 'Dominance',            suit: 'rabbit', front_image: `${process.env.HOST}/img/card-51.png`, back_image: `${process.env.HOST}/img/back-51.png`, description: 'If spent for suit, make available. You win the game if you rule three rabbit clearings at the start of your Birdsong. In games of four or more, as Vagabond, you may form a coalition.' },
  { code: '52', cost: '',     title: 'Dominance',            suit: 'mouse',  front_image: `${process.env.HOST}/img/card-52.png`, back_image: `${process.env.HOST}/img/back-52.png`, description: 'If spent for suit, make available. You win the game if you rule three mouse clearings at the start of your Birdsong. In games of four or more, as Vagabond, you may form a coalition.' },
  { code: '53', cost: '',     title: 'Dominance',            suit: 'bird',   front_image: `${process.env.HOST}/img/card-53.png`, back_image: `${process.env.HOST}/img/back-53.png`, description: 'If spent for suit, make available. You win the game if you rule two opposite corners at the start of your Birdsong. In games of four or more, as Vagabond, you may form a coalition.' },
  { code: '54', cost: '',     title: 'Dominance',            suit: 'fox',    front_image: `${process.env.HOST}/img/card-54.png`, back_image: `${process.env.HOST}/img/back-54.png`, description: 'If spent for suit, make available. You win the game if you rule three fox clearings at the start of your Birdsong. In games of four or more, as Vagabond, you may form a coalition.' },
  { code: '55', cost: '',     title: 'Spy',                  suit: 'rabbit', front_image: `${process.env.HOST}/img/card-55.png`, back_image: `${process.env.HOST}/img/back-55.png`, description: 'May play at no cost. In Daylight, reveal an order. Then, if not discarded, you may swap any two orders. If the spy reveals a rabbit card, discard the spy, making it available.' },
  { code: '56', cost: '',     title: 'Spy',                  suit: 'mouse',  front_image: `${process.env.HOST}/img/card-56.png`, back_image: `${process.env.HOST}/img/back-56.png`, description: 'May play at no cost. In Daylight, reveal an order. Then, if not discarded, you may swap any two orders. If the spy reveals a mouse card, discard the spy, making it available.' },
  { code: '57', cost: '',     title: 'Spy',                  suit: 'bird',   front_image: `${process.env.HOST}/img/card-57.png`, back_image: `${process.env.HOST}/img/back-57.png`, description: 'May play at no cost. In Daylight, reveal an order. Then, if not discarded, you may swap any two orders. If the spy reveals a bird card, discard the spy, making it available.' },
  { code: '58', cost: '',     title: 'Spy',                  suit: 'fox',    front_image: `${process.env.HOST}/img/card-58.png`, back_image: `${process.env.HOST}/img/back-58.png`, description: 'May play at no cost. In Daylight, reveal an order. Then, if not discarded, you may swap any two orders. If the spy reveals a fox card, discard the spy, making it available.' },
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

router.get("/deck/:id/pile/:name/add/:card/", async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id)
    if (!deck) return res.sendStatus(404)
    let pile = deck.piles.find(pile => pile.name == req.params.name)
    if (!pile) {
      pile = { name: req.params.name, cards: [] }
      deck.piles.push(pile)
    }
    deck.piles.forEach(pile => {
      pile.cards = pile.cards.filter(card => card.code != req.params.card)
    })
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
