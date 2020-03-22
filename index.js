const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');


const PORT = process.env.PORT || 5000;

// Set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const m = "Haaha gootemm";

// Set HB Routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: m
    });
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log('Server listening on Port '+PORT));