import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {CATEGORIES} from '../data/receptiKategorije';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props =>{	

	const catId = props.navigation.getParam('categoryId');

	const aveableMeals = useSelector(state => state.meals.filteredMeals);

	const displayedMeals = aveableMeals.filter(
		meal => meal.categoryIds.indexOf(catId)>=0		
	); 

	if (displayedMeals === 0){
		return (
	      <View style={styles.content}>
	        <DefaultText>Nemate obroka! Proverite filtere!</DefaultText>
	      </View>
	    );
	};
	
	return <MealList listData = {displayedMeals} navigation = {props.navigation} />
	
};

CategoryMealsScreen.navigationOptions = navigationData => {
	const catId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

	return{
		title: selectedCategory.title,
	}		
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default CategoryMealsScreen;