import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
	ScrollView,
} from 'react-native';

import CourseItem from '../components/CourseItem'

function HomeScreen(props) {
	return (
		<View style={{flex:1, flexDirection:'column'}}>
			<View style={{flex:.05}}>
				<Text>
					My Courses:
				</Text>
			</View>
			<ScrollView style={{backgroundColor:'yellow', flex:1}}>
				<CourseItem courseInfo={{
					title: 'CPSC 320',
					description: 'A fun course. A fun course. A fun course. A fun course. A fun course. A fun course. A fun course. A fun course. ',
					starCount: 5,
					median: 72,
					iqr: 20,

				}}/>
				<CourseItem courseInfo={{
					title: 'LING 100',
					description: 'A bad course',
					starCount: 2,
					median: 50,
					iqr: 20,

				}}/>
			</ScrollView>
		</View>
	
	);
}

export default HomeScreen;