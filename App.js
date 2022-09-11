import { StatusBar } from 'expo-status-bar';

import React, {
	component,
	useState,
	useEffect,
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Button,
} from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Home from './screens/Home';


const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "transparent"
	}
}

const App = () => {

	// initial set to -1 as n/a
	const [seatsRemaining, setSeatsRemaining] = useState(-1)

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
	}, []);


	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator screenOptions={{ headerShown: false}}
			initialRouteName="Home">
				<Stack.Screen name="Home" component={Home} />
				
			</Stack.Navigator>
		</NavigationContainer>
		// <View style={styles.container}>
		// 	<Text>Welcome to UBC Course Sleuth!!!</Text>
		//	<Text> ( name in progress :) ) </Text>
		//	<Button onPress={getCourseStatus} title="Update status of Ling 170 001" />
		//	<Text> There are {seatsRemaining} seats remaining! </Text>
		//	<StatusBar style="auto" />
		// </View>
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

export default App;