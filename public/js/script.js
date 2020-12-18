let app = new Vue({
  el: "#app",

  // data
  data: {
    HOST: "http://192.168.1.3",
    shared_deck: undefined,
    hand: undefined,
    cards: [{ title: "No cards yet" }],
    log: ["test"],

  },

  // methods
  methods: {

    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },

    loadLocal() {
      this.shared_deck = JSON.parse(localStorage.getItem("shared_deck")) || undefined
      this.hand = localStorage.getItem("hand") || this.uuidv4()
      if (this.hand && this.shared_deck) this.hand_pile = this.getPile(this.hand)
      if (this.shared_deck) this.draw_pile = this.getPile('draw')
    },

    saveLocal() {
      if (this.shared_deck) localStorage.setItem("shared_deck", JSON.stringify(this.shared_deck))
      if (this.hand) localStorage.setItem("hand", this.hand)
    },

    setHand() {
      this.hand = this.uuidv4()
    },

    choose(choices) {
      if (choices.length == 0) return null
      let index = Math.floor(Math.random() * choices.length)
      return choices[index]
    },

    async getDeck(deck_id) {
      url = `/api/deck/${deck_id}/`
      fetch(url).then(response => {
        if (!response.ok) throw Error(`Couldn't get deck with id ${deck_id}`)
        return response.json()
      }).then(json => {
        this.shared_deck = json
        if (this.hand) this.hand_pile = this.getPile(this.hand)
        this.draw_pile = this.getPile('draw')
        this.saveLocal()
      })
    },

    getPile(pile_name) {
      if (!this.shared_deck) return undefined
      return this.shared_deck.piles.find(pile => pile.name === pile_name) || []
    },

    async makeDeck() {
      url = `/api/deck/new/`
      fetch(url).then(response => {
        if (!response.ok) throw Error(`Couldn't make new deck`)
        return response.json()
      }).then(json => {
        this.shared_deck = json
        if (this.hand) this.hand_pile = this.getPile(this.hand)
        this.draw_pile = this.getPile('draw')
        this.shareDeck()
        this.saveLocal()
      })
    },

    async draw() {
      let randCard = this.choose(this.draw_pile.cards)
      let url = `/api/deck/${this.shared_deck._id}/pile/${this.hand}/add/${randCard.code}/`
      fetch(url).then(response => {
        if (!response.ok) throw Error(`Couldn't draw card`)
        this.shareDeck()
      })
    },

    // socket methods
    onFindDeck(data) {
      if (this.shared_deck) {
        socket.emit("share_deck", this.shared_deck._id)
      }
    },

    onShareDeck(data) {
      this.getDeck(data)
    },

    findDeck() {
      socket.emit("find_deck")
    },

    findMaybe() {
      if (!this.shared_deck) this.findDeck()
    },

    logger(data) {
      this.log.push(JSON.stringify(data))
    },

    shareDeck() {
      socket.emit("share_deck", this.shared_deck._id)
    },


  },
  // mounted
  mounted() {
    this.loadLocal()
    if (!this.shared_deck) {
      this.findDeck()
    }
  },

})

// socket setup
let socket = io.connect("/")

socket.on("find_deck", (data) => {
  app.onFindDeck(data)
})

socket.on("share_deck", (data) => {
  app.onShareDeck(data)
})

app.findMaybe()