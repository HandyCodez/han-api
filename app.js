const express = require('express')
const bodyParser = require("body-parser");
require('dotenv').config()
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ROUTES WITH GLOB
var glob = require('glob')

glob.sync('./routes/**/*.js').forEach(function (file) {
    require(file)(app)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
