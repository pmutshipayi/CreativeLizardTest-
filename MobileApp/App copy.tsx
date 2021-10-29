import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SchoolModel } from './src/models/model';
import HomeScreen from './src/screens/home.screen';


export type Param = {
	Home: {},
	Detail: {
		school: SchoolModel
	}
}

export default function App() {

	
	const Stack = createStackNavigator<Param>();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
