const express = require('express');
const session = require('express-session');
const index = require('./routes/index.js');
const app = express();
const port = process.env.PORT || 4000;


app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'kemungkinanenkripsi',
    resave: false,
    saveUninitialized: true
  }))

app.use('/', index);

app.listen(port, () => {
    console.log('APP START ON:', port);
})