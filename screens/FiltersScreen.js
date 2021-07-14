import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';


const FilterSwitch = props =>{
	return(
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch 
				value={props.state} 
				onValueChange={props.onChange}
				trackColor={{true: Colors.primaryColor}}
				thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
			/>
		</View>
	);
	
};

const FiltersScreen = props =>{
	const { navigation } = props;


	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegeterian, setIsVegeterian] = useState(false);

	const dispatch = useDispatch();

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,	
			vegeterian: isVegeterian,		
			vegan: isVegan,			
		};
		console.log(appliedFilters);
		dispatch(setFilters(appliedFilters));
	}, [isGlutenFree, isLactoseFree, isVegan, isVegeterian, dispatch]);

	useEffect(() => {
		navigation.setParams({save: saveFilters});
	}, [saveFilters]);

	return(
		<View style={styles.screen}>
			<Text style={styles.title}>Dostupni filteri za pretragu</Text>
			<FilterSwitch 
				label='Bez glutena' 
				state={isGlutenFree} 
				onChange={newValue => setIsGlutenFree(newValue)} 
			/>
			<FilterSwitch 
				label='Bez laktoze' 
				state={isLactoseFree} 
				onChange={newValue => setIsLactoseFree(newValue)} 
			/>
			<FilterSwitch 
				label='Za Vegane' 
				state={isVegan} 
				onChange={newValue => setIsVegan(newValue)} 
			/>
			<FilterSwitch 
				label='Za Vegetarijance' 
				state={isVegeterian} 
				onChange={newValue => setIsVegeterian(newValue)} 
			/>
		</View>
	);
};

const styles=StyleSheet.create({
	screen:{
		flex:1,		
		alignItems: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center'
	}
})

FiltersScreen.navigationOptions = (navData) => {
	return{
		title: 'Pretraga',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent = {HeaderButton} >
				<Item 
					title='Menu' 
					iconName='ios-menu' 
					onPress = {() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent = {HeaderButton}>
				<Item 
					title='Save'
					iconName='ios-save'
					onPress = {navData.navigation.getParam('save')}
				/>
			</HeaderButtons>
		)
	};
	
}

export default FiltersScreen;