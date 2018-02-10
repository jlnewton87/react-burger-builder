import actions from './actions';
import { cloneDeep as clone } from 'lodash';

const initialState = {
  burger: {
    ingredients: {},
    price: 4
  }
};

const updateStateIngredients = (state, ingredients) => {
  state.burger.ingredients = ingredients;
  return state;
}

const updateStateBurger = (state, burger) => {
  state.burger = burger;
  return state;
}

export default (state = initialState, action) => {
  let stateClone = clone(state);
  switch (action.type) {
    case actions.UPDATE_INGREDIENTS:
      return updateStateIngredients(stateClone, action.value);
    case actions.UPDATE_BURGER:
      return updateStateBurger(stateClone, action.value);
    default:
      return state;
  }
}