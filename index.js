import express from "express";
const app = express();
import MainRouter from "./src/routes/index.js"
import bodyParser from "body-parser";


//integrating bodyparser!
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next()
})

app.use('/qrmastaryV1', MainRouter)

app.use('*', (req, res, next) => {
    return res.status(404).json({ message: "Bad request" })
})

app.listen(8080, (succ, fail) => {
    if (fail) console.log('fails to start the server')
    console.log("server started successfully")
})