const express = require("express");
const path = require("path");
require('dotenv').config();
const cors = require("cors")



const {appInit} = require('./routes/configRout')
require('./db/connectDB');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));


appInit(app);

const port = process.env.PORT || 3004;

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("server is running on port " + port);
})


