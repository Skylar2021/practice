import express from 'express'
import cors from 'cors'
// import { route as createRoute } from './route/route.js'
import {route} from './route/route.js'
// import Controller from './controller/control.js'
// import { User } from './model/db.user.js'
import session from 'express-session'


const app = express()
const port = 8080
let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions))


app.use(session({
  secret: "key",
  store: new session.MemoryStore(),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 36000000,
    httpOnly: true,
    path: "/",
    name: "crudCookies",
    // secure: true
  }
}))

// app.use(function (req, res, next) {
//   console.log("req.session")
//   console.log(req.session)
// })

// app.get('/', (req, res) => {
//   res.json({message:"Hello World!"})
// })

// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
const service = new User()
const controller = new Controller(service)
const route = createRoute(controller)
app.use(route)
*/
app.use(route())


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// console.log(session)
/*
[Function: session] {
  Store: [Function: Store],
  Cookie: [Function: Cookie],
  Session: [Function: Session],
  MemoryStore: [Function: MemoryStore]
}
*/
