import React, { useEffect, useCallback } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Button, 
	ScrollView,
	Image 
} from 'react-native';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props =>{
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailScreen = props =>{

	const avaiableMeals = useSelector(state => state.meals.meals);
	const mealId = props.navigation.getParam('mealId');
	const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
	
	const selectedMeal = avaiableMeals.find(meal => meal.id === mealId);

	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(() =>{
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	useEffect(() => {
		//props.navigation.setParams({mealTitle: selectedMeal.title});
		props.navigation.setParams({toggleFav: toggleFavoriteHandler});
	}, [toggleFavoriteHandler]);
	

	useEffect(() => {
		props.navigation.setParams({isFav: currentMealIsFavorite});
	}, [currentMealIsFavorite]);	

	return(
		<ScrollView>
			<Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>

			<Text style={styles.naslov}>Sastojci</Text>
			{selectedMeal.ingredients.map(ingrediant =>(
				<ListItem key={ingrediant}>{ingrediant}</ListItem>				
			))}
			<Text style={styles.naslov}>Priprema</Text>
			{selectedMeal.steps.map(step =>(
				<ListItem key={step}>{step}</ListItem>				
			))}
			<Text style={styles.naslov}>Nutritivne vrednosti</Text>
			{selectedMeal.nutrition.map(step =>(
				<ListItem key={step}>{step}</ListItem>				
			))}				
		</ScrollView>

	);
};

MealDetailScreen.navigationOptions = (navigationData) =>{	

	const mealTitle = navigationData.navigation.getParam('mealTitle');	
	const toggleFavorite = navigationData.navigation.getParam('toggleFav');
	const isFavorite = navigationData.navigation.getParam('isFav');
	return{
		title: mealTitle,
		headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}> 
								<Item 
									title='Favorite' 
									iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
									onPress={toggleFavorite}
								/>
							</HeaderButtons>
	}; 	

};

const styles=StyleSheet.create({
	image:{
		width: '100%',
		height: 200
	},
	details:{
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	naslov: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	listItem:{
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});

export default MealDetailScreen;