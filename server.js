const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/widgets');
app.set('view engine', 'hbs');



app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;

	console.log(log);

	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('unable to append to server.log');
		}
	});
	next();
});

/*
app.use((request, response, next) => {
	response.render('maintenance.hbs');
});
*/


app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('capitalizeMe', (text) => {
	return text.toUpperCase();
});



app.get('/', (request, response) => {
	response.render('home.hbs', {
		headTitle: 'Home page',
		pageTitle: 'Welcome to home page',
		welcomeMessage: 'Helllo world!'
	});
});



app.get('/about', (request, response) => {
	response.render('about.hbs', {
		headTitle: 'About page',
		pageTitle: 'Welcome to about page'
	});
});



app.get('/bad', (request, response) => {
	response.send({
		error: 'Oops... something went wrong'
	});
});



app.listen(3000, () => {
	//console.log('server is up on port 3000');
});