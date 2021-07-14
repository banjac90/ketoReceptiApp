import React from 'react';
import { 
	StyleSheet, 
	View, 
	FlatList,		
} from 'react-native';	

import { useSelector } from 'react-redux';

import MealItem from './MealItem'	

const MealList = props =>{
	const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

	const renderMealItem = itemData =>{
		const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);

		return (			
			<MealItem 
				title={itemData.item.title} 
				duration={itemData.item.duration} 
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onSelectMeal={()=>{
					props.navigation.navigate({
						routeName: 'MealDetail',
						params:{
							mealId: itemData.item.id,
							mealTitile: itemData.item.title,
							isFav: isFavorite
						}
					})
				}}
			/>
		)
	}

	return(
		<View style={styles.screen}>
			<FlatList 
				data={props.listData} 
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
				style={styles.MealList}
			/>
		</View>
	);
};

const styles=StyleSheet.create({
	screen:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	MealList: {
		width: '95%'
	}
});

export default MealList;