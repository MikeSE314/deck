let bodyParser = require("body-parser")
let cookieParser = require("cookie-parser")
let createError = require("http-errors")
let express = require("express")
let logger = require("morgan")
let path = require("path")
let session = require("express-session")
var cors = require('cors')

let indexRouter = require("./controllers/index.js")
let apiRouter = require("./controllers/api.js")

let app = express()

app.use(cors())

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", indexRouter)
app.use("/api", apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  // console.error(err)
  res.render("error", {error: err.status || 500})
})

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   )
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
//     return res.status(200).json({})
//   }
//   next()
// })

// module.exports = app

let http = require("http")

// app.set("port", port)

let server = http.createServer(app)
let io = require("socket.io").listen(server)

io.on("connection", (socket) => {
  socket.on("find_deck", (data) => {
    io.emit("find_deck", data)
  })
  socket.on("share_deck", (data) => {
    io.emit("share_deck", data)
  })
})



module.exports = server
