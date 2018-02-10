import _ from 'lodash';
import validation from './validation';

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

export const INGREDIENT_ACTIONS = {
  add: 'ADD',
  remove: 'REMOVE'
};

export const updateIngredientCount = (count, action) => {
  // add or remove ingredient keeping
  // min 0 and max 5
  return action === INGREDIENT_ACTIONS.add ?
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

export const stringifyIngredients = (ingredients) => {
  const output = _.map(ingredients, (count, name) => {
    return `${name} (${count})`;
  });
  return output.join(', ');
}

export const getOrderForm = () => {
  const getFormInput = (label, elementType, elementConfig, defaultValue, validation) => {
    return {
      label,
      elementType,
      elementConfig,
      value: defaultValue || '',
      validation: validation || { valid: true }
    };
  }

  const getTextInputConfig = (type, placeholder) => {
    return { type, placeholder };
  }

  const getSelectOptions = (values) => {
    const output = values.map((option) => {
      let display = option;
      display = `${display[0].toUpperCase()}${display.slice(1)}`;
      return { value: option, displayValue: `${display}` };
    });
    return {
      options: [
        ...output
      ]
    };
  }

  return {
    name: getFormInput('Name', 'input', getTextInputConfig('text', 'Your name'), '', validation['name']),
    street: getFormInput('Street', 'input', getTextInputConfig('text', 'Street address'), '', validation['street']),
    zip: getFormInput('Zip', 'input', getTextInputConfig('text', 'ZIP code'), '', validation['zip']),
    country: getFormInput('Country', 'input', getTextInputConfig('text', 'Country'), 'United States', validation['country']),
    email: getFormInput('Email', 'input', getTextInputConfig('text', 'Your email'), '', validation['email']),
    deliveryMethod: getFormInput('Delivery Method', 'select', getSelectOptions(['fastest', 'cheapest']), 'fastest', validation['deliveryMethod'])
  }
}
