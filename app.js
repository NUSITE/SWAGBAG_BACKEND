const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3200;

const app = express();


app.get('/', (req, res, next) => {
    res.json({"message": "Thotakura kattamma is watching"});
});



app.listen(PORT, () => {
    console.log('Thotakura kattamma is watching');
})