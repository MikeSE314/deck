let mongoose = require("mongoose")

let url = process.env.MONGO_CONNECTION_STRING

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    if(err) console.error(err)
})

module.exports = mongoose
