import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
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
	FlatList,
} from 'react-native';


export default function SearchScreen(props) {
	return (
		<View style={styles.viewStyles}>
			<SearchBar 
				round
				searchIcon={{ size: 24 }}
				onChangeText={text => this.SearchFilterFunction(text)}
				onClear={text => this.SearchFilterFunction('')}
				placeholder="Type Here..."
				value={this.state.search} 
			/>
			<FlatList
				data={this.state.dataSource}
				ItemSeparatorComponent={this.ListViewItemSeparator}
				//Item Separator View
				renderItem={({ item }) => (
				// Single Comes here which will be repeatative for the FlatListItems
				<Text style={styles.textStyle}>{item.title}</Text>
				)}
				enableEmptySections={true}
				style={{ marginTop: 10 }}
				keyExtractor={(item, index) => index.toString()}
	        />

		</View>
	);
}



