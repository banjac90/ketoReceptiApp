
import { MEALS } from '../../data/receptiKategorije';
import { TOGGLE_FAVORITE, SET_FILTERES } from '../actions/meals';


const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
	switch(action.type){
		case TOGGLE_FAVORITE:
			const exsistingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
			if (exsistingIndex >= 0){
				const updatedFavMeals = [...state.favoriteMeals];
				updatedFavMeals.splice(exsistingIndex, 1);
				return { ...state, favoriteMeals: updatedFavMeals};
			}else{
				const meal = state.meals.find(meal => meal.id === action.mealId);
				return { ...state, favoriteMeals: state.favoriteMeals.concat(meal)};
			}
		case SET_FILTERES:
			const appliedFilteres = action.filters;
			const updatedFilteredMeals = state.meals.filter(meal => {
				if (appliedFilteres.glutenFree && !meal.isGlutenFree){					
					return false;
				}
				if (appliedFilteres.lactoseFree && !meal.isLactoseFree){
					return false;
				}
				if (appliedFilteres.vegeterian && !meal.isVegeterian){
					return false;
				}
				if (appliedFilteres.vegan && !meal.isVegan){
					return false;
				}
				return true;
			});			
			return { ...state, filteredMeals: updatedFilteredMeals };
		default: 
			return state;

	}
	
};

export default mealsReducer;