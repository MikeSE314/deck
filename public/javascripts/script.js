let app = new Vue({
    el: "#app",
    data: {
        cards: [],
        hands: [],
        id: "",
        focused: false,
        focus_card: undefined,
        back_src: ""
    },
    methods: {
        getItems() {
            let url = "./hand/" + this.id
            fetch(url).then(response => {
                return response.json()
            }).then(json => {
                this.cards = json.cards
                if (this.back_src === "") {
                    this.back_src = this.cards[0].back_src
                }
            })
            this.getHands()
        },
        getHands() {
            let url = "./other_hands/" + this.id
            fetch(url).then(response => {
                return response.json()
            }).then(json => {
                this.hands = json.hands
            })
        },
        setUp() {
            this.id = window.localStorage.getItem("id")
            let need_to_draw = false
            if (this.id === null) {
                this.id = Math.floor(Math.random() * 10000000)
                window.localStorage.setItem("id", this.id)
                need_to_draw = true
            }
            let url = "./new_user/" + this.id
            fetch(url).then(response => {
                return response.json()
            }).then(json => {
                console.log(json)
                if (json.msg != "hand taken") {
                    console.log("not taken")
                    this.draw()
                    this.draw()
                    this.draw()
                } else {
                    console.log("hand taken")
                }
            })
        },
        draw() {
            let url = "./draw/" + this.id
            fetch(url).then(response => {
                return response.json()
            }).then(json => {
                this.getItems()
            })
        },
        focus(card) {
            this.focus_card = card
            this.focused = true
        },
        unfocus() {
            this.focused = false
        },
        discard() {
            let url = "./discard/" + this.id + "/" + this.focus_card.id
            this.focused = false
            fetch(url).then(response => {
                return response.json()
            }).then(json => {
                this.getItems()
            })
        },
        autoload() {
            this.getItems()
            setTimeout(this.autoload, 5000)
        }
    },
    computed: {
        other_hands() {
            return this.hands.map(hand => {
                h = []
                for (let i = 0; i < hand; i++) {
                    h.push("")
                }
            })
        }
    },
    created: function() {
        this.setUp()
        this.autoload()
    }
})
