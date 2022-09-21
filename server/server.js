const { Expo } = require( 'expo-server-sdk' );
const {readFileSync, writeFileSync} = require('fs');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const fetch = require('node-fetch'); 

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

let data = {};
let dataHasChanged = false;
const dataPath = './data.json';


app.post('/addCourse', urlEncodedParser, (req, res) => {
	dataHasChanged = true;
	
	data[token].push({dept, course, sections});
	res.status(200).end();
});

app.post('/registerUser', urlEncodedParser, (req, res) => {
	dataHasChanged = true;
	data[req.body.token] = [];
	res.status(200).end();
});

app.post('/deregisterUser', urlEncodedParser, (req, res) => {
	dataHasChanged = true;
	delete data[req.body.token];
	res.status(200).end();
});

app.post('/removeCourse', urlEncodedParser, (req, res) => {
	dataHasChanged = true;
	const {token, dept, course, sections} = req.body;
	data[token].filter(e => e.dept != dept && e.course != course);
	res.status(200).end();
});
app.post('/changeSections', urlEncodedParser, (req, res) => {
	dataHasChanged = true;
	const {token, dept, course, sections} = req.body;
	data[token].find(e => e.dept == dept && e.course == course).sections = sections;
	res.status(200).end();
});
app.post('/searchCourses', urlEncodedParser, (req, res) => {
	const {search} = req.body;

	res.status(200).header('Content-Type', 'application/json').send({
		
	});
});




// const checker = setInterval(checkerFunc, 60000);

app.listen(process.env.PORT || 3000, () => console.log(`App Available`));

loadData();
// checkerFunc();
