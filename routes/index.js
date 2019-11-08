const express = require('express')
const router = express.Router()


const shared_deck_base = [
    {
        id: 1,
        suit: "bird",
        title: "Ambush!",
        cost: [],
        description: "_You may ambush in any clearing_ \\ At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.",
        front_src: "images/cards/shared_deck/cards-000001.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 2,
        suit: "bird",
        title: "Ambush!",
        cost: [],
        description: "_You may ambush in any clearing_ \\ At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.",
        front_src: "images/cards/shared_deck/cards-000002.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 3,
        suit: "bird",
        title: "Birdy Bindle",
        cost: ["mouse"],
        description: "[[bag]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000003.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 4,
        suit: "bird",
        title: "Armorers",
        cost: ["fox"],
        description: "In battle, may discard this to ignore all rolled hits taken.",
        front_src: "images/cards/shared_deck/cards-000004.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 5,
        suit: "bird",
        title: "Armorers",
        cost: ["fox"],
        description: "In battle, may discard this to ignore all rolled hits taken.",
        front_src: "images/cards/shared_deck/cards-000005.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 6,
        suit: "bird",
        title: "Woodland Runners",
        cost: ["rabbit"],
        description: "[[boot]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000006.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 7,
        suit: "bird",
        title: "Arms Trader",
        cost: ["fox", "fox"],
        description: "[[sword]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000007.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 8,
        suit: "bird",
        title: "Crossbow",
        cost: ["fox"],
        description: "[[crossbow]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000008.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 9,
        suit: "bird",
        title: "Sappers",
        cost: ["mouse"],
        description: "In battle as defender, may discard this to deal an extra hit.",
        front_src: "images/cards/shared_deck/cards-000009.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 10,
        suit: "bird",
        title: "Sappers",
        cost: ["mouse"],
        description: "In battle as defender, may discard this to deal an extra hit.",
        front_src: "images/cards/shared_deck/cards-000010.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 11,
        suit: "bird",
        title: "Brutal Tactics",
        cost: ["fox", "fox"],
        description: "In battle as attacker, may deal an extra hit, but defender scores one point.",
        front_src: "images/cards/shared_deck/cards-000011.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 12,
        suit: "bird",
        title: "Brutal Tactics",
        cost: ["fox", "fox"],
        description: "In battle as attacker, may deal an extra hit, but defender scores one point.",
        front_src: "images/cards/shared_deck/cards-000012.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 13,
        suit: "bird",
        title: "Royal Claim",
        cost: ["any", "any", "any", "any"],
        description: "In Birdsong, may discard this to score one point per clearing you rule.",
        front_src: "images/cards/shared_deck/cards-000013.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 14,
        suit: "bird",
        title: "Dominance",
        cost: [],
        description: "If spent for suit, make available. _If you have at least 10 points, play during Daylight and remove your score marker._ You win the game if you rule two opposite corners at the start of your Birdsong. _In games of four or more, as Vagabond, you may form a coalition._",
        front_src: "images/cards/shared_deck/cards-000053.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },

    {
        id: 15,
        suit: "fox",
        title: "Ambush!",
        cost: [],
        description: "_You may only ambush in a fox clearing_ \\ At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays mathing ambush.",
        front_src: "images/cards/shared_deck/cards-000014.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 16,
        suit: "fox",
        title: "Gently Used Knapsack",
        cost: ["mouse"],
        description: "[[bag]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000015.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 17,
        suit: "fox",
        title: "Root Tea",
        cost: ["mouse"],
        description: "[[teapot]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000016.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 18,
        suit: "fox",
        title: "Travel Gear",
        cost: ["rabbit"],
        description: "[[boot]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000017.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 19,
        suit: "fox",
        title: "Protection Racket",
        cost: ["rabbit", "rabbit"],
        description: "[[coins]], [[+3]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000018.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 20,
        suit: "fox",
        title: "Foxfolk Steel",
        cost: ["fox", "fox"],
        description: "[[sword]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000019.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 21,
        suit: "fox",
        title: "Anvil",
        cost: ["fox"],
        description: "[[hammer]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000020.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 22,
        suit: "fox",
        title: "Stand and Deliver!",
        cost: ["mouse", "mouse", "mouse"],
        description: "In Birdsong, may take a random card from another player. That player scores one point.",
        front_src: "images/cards/shared_deck/cards-000021.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 23,
        suit: "fox",
        title: "Stand and Deliver!",
        cost: ["mouse", "mouse", "mouse"],
        description: "In Birdsong, may take a random card from another player. That player scores one point.",
        front_src: "images/cards/shared_deck/cards-000022.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 24,
        suit: "fox",
        title: "Tax Collector",
        cost: ["fox", "mouse", "rabbit"],
        description: "Once in Daylight, may remove one of your warriors to draw a card.",
        front_src: "images/cards/shared_deck/cards-000023.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 25,
        suit: "fox",
        title: "Tax Collector",
        cost: ["fox", "mouse", "rabbit"],
        description: "Once in Daylight, may remove one of your warriors to draw a card.",
        front_src: "images/cards/shared_deck/cards-000024.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 26,
        suit: "fox",
        title: "Tax Collector",
        cost: ["fox", "mouse", "rabbit"],
        description: "Once in Daylight, may remove one of your warriors to draw a card.",
        front_src: "images/cards/shared_deck/cards-000025.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 27,
        suit: "fox",
        title: "Favor of the Foxes",
        cost: ["fox", "fox", "fox"],
        description: "Remove all enemy pieces in fox clerings, then discard.",
        front_src: "images/cards/shared_deck/cards-000026.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 28,
        suit: "fox",
        title: "Dominance",
        cost: [],
        description: "If spent for suit, make available. _If you have at least 10 points, play during Daylight and remove your score marker._ You win the game if you rule three fox clearings at the start of your Birdsong. _In games of four or more, as Vagabond, you may form a coalition._",
        front_src: "images/cards/shared_deck/cards-000054.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },

    {
        id: 29,
        suit: "rabbit",
        title: "Ambush!",
        cost: [],
        description: "_You may only ambush in a rabbit clearing_ \\ At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays mathing ambush.",
        front_src: "images/cards/shared_deck/cards-000027.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 30,
        suit: "rabbit",
        title: "Smuggler's Trail",
        cost: ["mouse"],
        description: "[[bag]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000028.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 31,
        suit: "rabbit",
        title: "Root Tea",
        cost: ["mouse"],
        description: "[[teapot]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000029.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 32,
        suit: "rabbit",
        title: "A Visit to Friends",
        cost: ["rabbit"],
        description: "[[boot]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000030.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 33,
        suit: "rabbit",
        title: "Bake Sale",
        cost: ["rabbit", "rabbit"],
        description: "[[coins]], [[+3]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000031.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 34,
        suit: "rabbit",
        title: "Command Warren",
        cost: ["rabbit", "rabbit"],
        description: "At start of Daylight, may initiate a battle.",
        front_src: "images/cards/shared_deck/cards-000032.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 35,
        suit: "rabbit",
        title: "Command Warren",
        cost: ["rabbit", "rabbit"],
        description: "At start of Daylight, may initiate a battle.",
        front_src: "images/cards/shared_deck/cards-000033.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 36,
        suit: "rabbit",
        title: "Better Burrow Bank",
        cost: ["rabbit", "rabbit"],
        description: "At start of Birdsong, you and another player draw a card.",
        front_src: "images/cards/shared_deck/cards-000034.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 37,
        suit: "rabbit",
        title: "Better Burrow Bank",
        cost: ["rabbit", "rabbit"],
        description: "At start of Birdsong, you and another player draw a card.",
        front_src: "images/cards/shared_deck/cards-000035.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 38,
        suit: "rabbit",
        title: "Cobbler",
        cost: ["rabbit", "rabbit"],
        description: "At start of Evening, may take a move.",
        front_src: "images/cards/shared_deck/cards-000037.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 39,
        suit: "rabbit",
        title: "Favor of the Rabbits",
        cost: ["rabbit", "rabbit", "rabbit"],
        description: "Remove all enemy pieces in rabbit clearings, then discard.",
        front_src: "images/cards/shared_deck/cards-000038.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 40,
        suit: "rabbit",
        title: "Dominance",
        cost: [],
        description: "If spent for suit, make available. _If you have at least 10 points, play during Daylight and remove your score marker._ You win the game if you rule three rabbit clearings at the start of your Birdsong. _In games of four or more, as Vagabond, you may form a coalition._",
        front_src: "images/cards/shared_deck/cards-000055.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },

    {
        id: 41,
        suit: "mouse",
        title: "Ambush!",
        cost: [],
        description: "_You may only ambush in a mouse clearing_ \\ At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays mathing ambush.",
        front_src: "images/cards/shared_deck/cards-000039.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 42,
        suit: "mouse",
        title: "Mouse-in-a-Sack",
        cost: ["mouse"],
        description: "[[bag]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000040.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 43,
        suit: "mouse",
        title: "Root Tea",
        cost: ["mouse"],
        description: "[[teapot]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000041.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 44,
        suit: "mouse",
        title: "Travel Gear",
        cost: ["Rabbit"],
        description: "[[boot]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000042.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 45,
        suit: "mouse",
        title: "Investments",
        cost: ["rabbit", "rabbit"],
        description: "[[coins]], [[+3]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000043.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 46,
        suit: "mouse",
        title: "Sword",
        cost: ["fox", "fox"],
        description: "[[sword]], [[+2]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000044.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 47,
        suit: "mouse",
        title: "Crossbow",
        cost: ["fox"],
        description: "[[crossbow]], [[+1]] Then discard.",
        front_src: "images/cards/shared_deck/cards-000045.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 48,
        suit: "mouse",
        title: "Scouting Party",
        cost: ["mouse", "mouse"],
        description: "As attacker in battle, you are not affected by ambush cards.",
        front_src: "images/cards/shared_deck/cards-000046.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 49,
        suit: "mouse",
        title: "Scouting Party",
        cost: ["mouse", "mouse"],
        description: "As attacker in battle, you are not affected by ambush cards.",
        front_src: "images/cards/shared_deck/cards-000047.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 50,
        suit: "mouse",
        title: "Codebreakers",
        cost: ["mouse"],
        description: "Once in Daylight, may look at another player's hand.",
        front_src: "images/cards/shared_deck/cards-000048.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 51,
        suit: "mouse",
        title: "Codebreakers",
        cost: ["mouse"],
        description: "Once in Daylight, may look at another player's hand.",
        front_src: "images/cards/shared_deck/cards-000049.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 52,
        suit: "mouse",
        title: "Favor of the Mice",
        cost: ["mouse", "mouse", "mouse"],
        description: "Remove all enemy pieces in mouse clearings, then discard.",
        front_src: "images/cards/shared_deck/cards-000050.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
    {
        id: 53,
        suit: "mouse",
        title: "Dominance",
        cost: [],
        description: "If spent for suit, make available. _If you have at least 10 points, play during Daylight and remove your score marker._ You win the game if you rule three mouse clarings at the start of your Birdsong. _In games of four or more, as Vagabond, you may form a coalition._",
        front_src: "images/cards/shared_deck/cards-000052.png",
        back_src: "images/cards/shared_deck/backs-000001.png"
    },
]

let hands = []

let shared_deck = shared_deck_base.slice()

let discarded_shared_deck = []

function reshuffle() {
    shared_deck = discarded_shared_deck.slice()
    discarded_shared_deck = []
}

function get_hand(id) {
    for (let i = 0; i < hands.length; i++) {
        if (hands[i].id === id) {
            return hands[i]
        }
    }
    return null
}

function draw_shared_card() {
    if (shared_deck.length === 0) {
        reshuffle()
    }
    if (shared_deck.length === 0) {
        return null
    }
    let selection = Math.floor(Math.random() * shared_deck.length)
    let card = shared_deck[selection]
    shared_deck.splice(selection, 1)
    return card
}

router.get('/draw/:id', (req, res) => {
    let id = req.params.id
    let new_card = draw_shared_card()
    if (new_card === null) {
        res.send({msg: "no cards left"})
        return
    }
    get_hand(id).cards.push(new_card)
    res.send({msg: "drawn"})
})

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/new_user/:id', (req, res) => {
    let id = req.params.id
    if (get_hand(id) != null) {
        res.send({msg: "hand taken"})
        return
    }
    hand = {
        id: id,
        cards: []
    }
    hands.push(hand)
    res.send({msg: "good"})
})

router.get('/hand/:id', (req, res) => {
    let id = req.params.id
    res.send(JSON.stringify(get_hand(id)))
})

router.get('/discard/:id/:cardId', (req, res) => {
    let id = req.params.id
    let cardId = req.params.cardId
    let hand = get_hand(id)
    for (let i = 0; i < hand.cards.length; i++) {
        if (hand.cards[i].id == cardId) {
            discarded_shared_deck.push(hand.cards[i])
            hand.cards.splice(i, 1)
            res.send({msg: "discarded"})
            return
        }
    }
    res.send({msg: "nothing discarded"})
})

router.get('/other_hands/:id', (req, res) => {
    let id = req.params.id
    let h = hands.filter(hand => hand.id != id).map(hand => hand.cards.length)
    res.send({hands: h})
})

module.exports = router

