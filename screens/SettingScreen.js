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
} from 'react-native';


function SettingsScreen(props) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Settings Screen</Text>
		</View>
		
	);
}

export default SettingScreen;