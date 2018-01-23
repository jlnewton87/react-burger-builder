import _ from 'lodash';

const INGREDIENT_PRICES = {
  base: 4,
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
};

const PROPER_NAMES = {
  salad: 'Salad',
  bacon: 'Bacon',
  cheese: 'Cheese',
  meat: 'Meat'
}

export const ACTIONS = {
  add: 'ADD',
  remove: 'REMOVE'
};

export const updateIngredientCount = (count, action) => {
  // add or remove ingredient keeping
  // min 0 and max 5
  return action === ACTIONS.add ?
    count === 5 ? 5 : count + 1 :
    count === 0 ? 0 : count - 1;
}

export const getPrice = (ingredients) => {
  // updates price based on ingredient list
  return INGREDIENT_PRICES.base + _.reduce(ingredients, (output, count, name) => {
    return output += INGREDIENT_PRICES[name] * count;
  }, 0);
}

export const ingredientResult = (ingredients, price, canCheckout) => {
  // used to hash result as input to `setState`
  return {
    ingredients,
    totalPrice: price,
    canCheckout
  };
}

export const getTotalIngredientCount = (ingredients) => {
  // just getting the total number
  // of ingredients currently selected
  return _.reduce(ingredients, (out, count, ing) => {
    return out += count;
  }, 0);
}

export const getCanCheckout = (ingredients) => {
  // can't checkout if all you're buying is a bun!
  return getTotalIngredientCount(ingredients) > 0;
}

export const ingredientSummary = (ingName, ingCount) => {
  return `${PROPER_NAMES[ingName]} @$${INGREDIENT_PRICES[ingName]}/each X ${ingCount}`; // Salad @$.50/each X 2
}