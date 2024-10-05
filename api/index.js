const express = require("express")
var cors = require("cors")
const app = express()

require('dotenv').config();


app.use(cors({
    origins: ['http://localhost', 'https://mentara.xyz', 'https://mentor.mentara.xyz', 'https://mentara-mentee.vercel.app/signup', 'https://admin.mentara.xyz','https://compass.mentara.xyz']
}));

const authRoutes = require('../routes/auth')
const menteeRoutes = require('../routes/mentee')
const taskRoutes = require('../routes/task')
const appRoutes = require('../routes/application')
const editorRoutes = require('../routes/editor')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send("Local test"));
app.use('/login',authRoutes);
app.use('/mentee',menteeRoutes);
app.use('/task',taskRoutes);
app.use('/application',appRoutes);
app.use('/editor', editorRoutes);



app.listen(3001, () => console.log("Server ready on port 3001."));