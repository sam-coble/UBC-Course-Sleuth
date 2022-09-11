import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, {
	Component,
	useState,
	useEffect,
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Button,
} from 'react-native';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

	// initial set to -1 as n/a
	const [seatsRemaining, setSeatsRemaining] = useState(-1);

	// notification token
	const [expoPushToken, setExpoPushToken] = useState('dne');

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

	}, []);

	async function getCourseStatus() {
		try {
			// ling 170 001 course info page for example
			// const url = 'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=LING&course=170&section=001';
			const deptCode = 'LING';
			const courseCode = '170';
			const sectionCode = '001';
			const url = 
				'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=' +
				deptCode +
				'&course=' +
				courseCode +
				'&section=' +
				sectionCode;

			// get html content from url
			const res = await fetch(url);
			// convert html response to plain text
			const text = await res.text();

			// console.log(url, text.split('\n')[30]);

			// use regex to isolate remaining seats
			const generalSeatRE = /General Seats Remaining:.*<strong>\d+</
			const matches = text.match(generalSeatRE);
			if (matches.length == 0)
				throw 'bad site';
			if (matches.length != 1) 
				throw "too many matches";

			const numberRE = />\d+</;
			const numberMatches = matches[0].match(numberRE);
			const match = numberMatches[numberMatches.length - 1];
			// last character of the string
			const remainingGeneralSeats = parseInt(match.slice(1,-1));


			// console.log('matches', numberMatches);


			setSeatsRemaining(remainingGeneralSeats);

		} catch (e) {
			console.log(e);
		}
	}


	useEffect(() => {
		// code to run on mount
		getCourseStatus();

		return () => {
			// code to run on cleanup

		}
	}, []);

	return (
		<View style={styles.container}>
			<Text>Welcome to UBC Course Sleuth!!!</Text>
			<Text> ( name in progress :) ) </Text>
			<Button onPress={getCourseStatus} title="Update status of Ling 170 001" />
			<Text> There are {seatsRemaining} seats remaining! </Text>
			<Text> Notification token: {expoPushToken}</Text>
			<StatusBar style="auto" />
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}