const fetch = require('node-fetch'); 
const {writeFileSync, readFileSync} = require('fs');

const outfile = './courses.json'


async function getDepts() {
	const root_url = 'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea'

	// const root_res = await fetch(root_url);
	// const root_text = await root_res.text();

	const root_text = readFileSync('./misc/root.html', {encoding: 'utf8'});

	const dept_re = /<a href="?\/cs\/courseschedule\?pname=subjarea&amp;tname=subj-department&amp;dept=\w{4}"?>\w{4}<\/a>/gi
	// const dept_re = /dept=amne"?>amne/gi

	const matches = root_text.match(dept_re)
	console.log(matches.length);
	if (matches == null) return;
	const codes = matches.map(match => match.slice(-8,-4));

	writeFileSync(outfile, JSON.stringify(codes), {encoding: 'utf8'})
}



// getDepts();

// test
(async () => {
	const url = 'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=320&section=101'
	const res = await fetch(url);
	const text = await res.text();
	console.log(text);
})();


// json -> txt
// (() => {
// 	const data = JSON.parse(readFileSync('courses.json', {encoding:'utf8'})).join('\n');
// 	writeFileSync('courses.txt', data, {encoding:'utf8'})
// })();