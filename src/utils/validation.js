import {} from 'lodash';

const isRequired = (requiredValue) => {
  return requiredValue.trim() !== '';
}

const isAmerica = (americaOrNothing) => {
  return americaOrNothing === 'America' || americaOrNothing === 'United States';
}

const isEmail = (email) => {
  // ripped this off from Stack Overflow
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export default {
  name: { rule: isRequired, invalidMessage: 'Name is required', valid: true },
  street: { rule: isRequired, invalidMessage: 'Address is required', valid: true },
  zip: { rule: isRequired, invalidMessage: 'Zip is required', valid: true },
  country: { rule: isAmerica, invalidMessage: 'Country is required, and must be "America"', valid: true },
  email: { rule: isEmail, invalidMessage: 'Email is required, and must be valid address', valid: true },
  deliveryMethod: { rule: isRequired, invalidMessage: 'Delivery Method is required', valid: true }
}