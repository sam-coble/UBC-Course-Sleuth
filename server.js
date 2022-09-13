const { Expo } = require( 'expo-server-sdk' );
const {readFileSync, writeFileSync} = require('fs');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const fetch = require('node-fetch'); 

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

let data = {};
let dataHasChanged = false;


app.post('/addCourse', urlEncodedParser, (req, res) => {
	dataHasChanged = true;
	const {token, dept, course, sections} = req.body;
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



const dataPath = './data.json';
function saveData() {
	writeFileSync(dataPath, JSON.stringify(data), {encoding:'utf8'});
}
async function loadData() {
	data = JSON.parse(readFileSync(dataPath, {encoding:'utf8', flag:'r'}));
}




async function checkerFunc () {
	if (dataHasChanged) {
		saveData();
	}

	sectionsToCheck = {};
	Object.keys(data).forEach(user => {
		data[user].forEach(course => {
			course.sections.forEach(section => {
				if (!sectionsToCheck.hasOwnProperty(course.dept + course.course + section)) {
					sectionsToCheck[course.dept + course.course + section] = [];
				}
				sectionsToCheck[course.dept + course.course + section].push(user);
			});
		});
	});

	const openSections = {};

	for (section of Object.keys(sectionsToCheck)) {
		const url = 
				'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=' +
				section.slice(0,4) +
				'&course=' +
				section.slice(4,7) +
				'&section=' +
				section.slice(7,10);
		const res = await fetch(url);
		const text = await res.text();
		const generalSeatRE = /General Seats Remaining:.*<strong>\d+</
			const matches = text.match(generalSeatRE);
			if (matches.length == 0)
				throw 'bad site';
			if (matches.length != 1) 
				throw "too many matches";

			const numberRE = />\d+</;
			const numberMatches = matches[0].match(numberRE);
			const match = numberMatches[numberMatches.length - 1];
			const remainingGeneralSeats = parseInt(match.slice(1,-1));
			if (remainingGeneralSeats != 0) {
				openSections[section] = sectionsToCheck[section];
			}
	}


	notificationsToSend = [];

	if (Object.keys(openSections).length != 0) {
		Object.keys(openSections).forEach(section => {
			openSections[section].forEach(user => {
				notificationsToSend.push({token: user, body: `SECTION ${section} IS OPEN!`, data: {}});
			});
		});
		console.log('NOTIFICATIONS TO SEND: ', notificationsToSend);
		sendPushNotifications(notificationsToSend);
	}

}

// const checker = setInterval(checkerFunc, 60000);

app.listen(process.env.PORT || 3000, () => console.log(`App Available`));

loadData();
checkerFunc();

function sendPushNotifications(notifications) {
	// console.log('NOTIFICATIONS', notifications);
	// console.log('NOTIFICATION', notifications[0]);
	// Create a new Expo SDK client
	// optionally providing an access token if you have enabled push security
	let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

	// Create the messages that you want to send to clients
	let messages = [];
	notifications.forEach((notification) => {
		// Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

		// Check that all your push tokens appear to be valid Expo push tokens

		if (!Expo.isExpoPushToken(notification.token)) {
			console.error(`Push token ${notification.token} is not a valid Expo push token`);
			return;
		}

		// Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
		messages.push({
			to: notification.token,
			sound: 'default',
			body: notification.body,
			data: notification.data,
		})
	});

	// The Expo push notification service accepts batches of notifications so
	// that you don't need to send 1000 requests to send 1000 notifications. We
	// recommend you batch your notifications to reduce the number of requests
	// and to compress them (notifications with similar content will get
	// compressed).
	let chunks = expo.chunkPushNotifications(messages);
	let tickets = [];
	(async () => {
		// Send the chunks to the Expo push notification service. There are
		// different strategies you could use. A simple one is to send one chunk at a
		// time, which nicely spreads the load out over time:
		for (let chunk of chunks) {
			try {
				let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				console.log(ticketChunk);
				tickets.push(...ticketChunk);
				// NOTE: If a ticket contains an error code in ticket.details.error, you
				// must handle it appropriately. The error codes are listed in the Expo
				// documentation:
				// https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
			} catch (error) {
				console.error(error);
			}
		}
	})();
}


// // Later, after the Expo push notification service has delivered the
// // notifications to Apple or Google (usually quickly, but allow the the service
// // up to 30 minutes when under load), a "receipt" for each notification is
// // created. The receipts will be available for at least a day; stale receipts
// // are deleted.
// //
// // The ID of each receipt is sent back in the response "ticket" for each
// // notification. In summary, sending a notification produces a ticket, which
// // contains a receipt ID you later use to get the receipt.
// //
// // The receipts may contain error codes to which you must respond. In
// // particular, Apple or Google may block apps that continue to send
// // notifications to devices that have blocked notifications or have uninstalled
// // your app. Expo does not control this policy and sends back the feedback from
// // Apple and Google so you can handle it appropriately.
// let receiptIds = [];
// for (let ticket of tickets) {
//   // NOTE: Not all tickets have IDs; for example, tickets for notifications
//   // that could not be enqueued will have error information and no receipt ID.
//   if (ticket.id) {
//     receiptIds.push(ticket.id);
//   }
// }

// let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
// (async () => {
//   // Like sending notifications, there are different strategies you could use
//   // to retrieve batches of receipts from the Expo service.
//   for (let chunk of receiptIdChunks) {
//     try {
//       let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
//       console.log(receipts);

//       // The receipts specify whether Apple or Google successfully received the
//       // notification and information about an error, if one occurred.
//       for (let receiptId in receipts) {
//         let { status, message, details } = receipts[receiptId];
//         if (status === 'ok') {
//           continue;
//         } else if (status === 'error') {
//           console.error(
//             `There was an error sending a notification: ${message}`
//           );
//           if (details && details.error) {
//             // The error codes are listed in the Expo documentation:
//             // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
//             // You must handle the errors appropriately.
//             console.error(`The error code is ${details.error}`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// })();