const {detectCardBrand} = require('./src/index.js');
const tests = {
  '4111111111111111': 'Visa',
  '5500000000000004': 'MasterCard',
  '2221000000000009': 'MasterCard',
  '340000000000009': 'American Express',
  '6011000000000004': 'Discover',
  '6062000000000000': 'Hipercard',
  '201400000000000': 'EnRoute',
  '30000000000004': 'Diners Club',
  '3528000000000000': 'JCB',
  '8699000000000000': 'Voyager',
  '5078000000000000': 'Aura',
};

for (const num in tests) {
  const expect = tests[num];
  const got = detectCardBrand(num);
  console.log(num, '=>', got, got === expect ? 'OK' : `WRONG (expected ${expect})`);
}
