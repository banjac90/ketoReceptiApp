import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Platform, Text } from 'react-native';
import Colors from '../constants/Colors';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';


const defaultStackNavOptions = {
	defaultNavigationOptions: {
		headerStyle:{
			backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
		headerTitileStyle: {
			fontFamily: 'open-sans-bold'
		},
		headerBackTitleStyle:{
			fontFamily: 'open-sans'
		}
	}
};

const MealsNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	CategoryMeals:{
	 	screen: CategoryMealsScreen,	 	
	},
	MealDetail: MealDetailScreen
}, defaultStackNavOptions);

const FavoritesNavigator = createStackNavigator({
	Favorites: FavoritesScreen,
	MealDetail: MealDetailScreen
}, defaultStackNavOptions); 

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator, 
		navigationOptions: {
			tabBarLabel: 'Obroci',
			tabBarIcon: (tabInfo) =>{
				return( 
					<Ionicons 
						name='ios-star'
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Obroci</Text> : 'Obroci'

		}
	},
	Favorites: {
		screen: FavoritesNavigator,
		navigationOptions:{
			tabBarLabel: 'Omiljeno',
			tabBarIcon: (tabInfo) =>{
				return( 
					<Ionicons 
						name='ios-star'
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Omiljeno</Text> : 'Omiljeno'
		}
	}
};

const MealsFavTabNavigator = Platform.OS === 'android' 
	? createMaterialBottomTabNavigator(	tabScreenConfig, {
		activeColor: 'white',
		shifting: true,
		//uses bottom code if shifting is false
		barStyle: {
			backgroundColor: Colors.primaryColor
		}
	}) 
	: createBottomTabNavigator(	tabScreenConfig, {
		tabBarOptions: {
			labelStyle:{
				fontFamily: 'open-sans'
			},
			activeTintColor: Colors.accentColor
		}
	});

	const FiltersNavigator = createStackNavigator({
		Filters: FiltersScreen
	}, defaultStackNavOptions);

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions:{
				drawerLabel: 'Početna'
			}
		},
		Filters:{ 
			screen: FiltersNavigator,
			navigationOptions:{
				drawerLabel: 'Filteri'
			}
		}
	}, 
	{
		contentOptions:{
			activeTintColor: Colors.accentColor,
			labelStyle:{
				fontFamily: 'open-sans-bold'
			}
		}
	}
);


export default createAppContainer(MainNavigator);