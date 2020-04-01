const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


// bodyParser
app.use(bodyParser.urlencoded({extended: false}));



//API key: pk_4fd99a1853cb4ad08ee4b64ada73457c
function callAPI(finAPI, tick) {
	request('https://cloud.iexapis.com/stable/stock/' + tick + '/quote?token=pk_4fd99a1853cb4ad08ee4b64ada73457c', {json: true}, (err, res, body) => {
	if (err) {
		return console.log(err); 
	};
	//console.log(body);
	if (res.statusCode ==200) {
		//console.log(body);
		finAPI(body);
		};
	}); 	
};




// Set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set HB index GET Routes
app.get('/', function (req, res) {
    callAPI(function(doneAPI) {
    		res.render('home', {
    		info: doneAPI
    	}); 	
    }, "amzn");
});

// Set HB index POST Routes
// callAPI(function, req.body.stock_tick); -->what it is
app.post('/', function (req, res) {
    callAPI(function(doneAPI) {
    		//postout = req.body.stock_tick;
    		res.render('home', {
    		info: doneAPI,
    	}); 	
    }, req.body.stock_tick);
});

app.get('/about.html', function (req, res) {
    res.render('about', {
    	stuff: "Mitroonnnn...."
    }); 
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log('Server listening on Port '+PORT));