const express = require("express")
var cors = require("cors")
const app = express()

app.use(cors({
    origins: ['http://localhost', 'https://mentara.xyz', 'https://mentor.mentara.xyz', 'https://mentara-mentee.vercel.app/signup', 'https://admin.mentara.xyz']
}));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(3001, () => console.log("Server ready on port 3001."));