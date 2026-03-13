/**
 * Detects a credit card brand ("bandeira") based on known IIN ranges.
 *
 * This function is based on the common prefixes shown in `assets/base.png`.
 *
 * @param {string|number} input - Credit card number (may include spaces/dashes)
 * @returns {string|null} The card brand name (e.g., "Visa", "MasterCard") or null if unknown
 */
function detectCardBrand(input) {
  const cc = String(input).replace(/\D/g, '');
  if (!cc) return null;

  const startsWith = (prefix) => cc.startsWith(prefix);
  const prefix2 = cc.slice(0, 2);
  const prefix3 = cc.slice(0, 3);
  const prefix4 = cc.slice(0, 4);

  // Visa: starts with 4
  if (startsWith('4')) return 'Visa';

  // MasterCard: 51-55 or 2221-2720
  const p2 = parseInt(prefix2, 10);
  const p4 = parseInt(prefix4, 10);
  if ((p2 >= 51 && p2 <= 55) || (p4 >= 2221 && p4 <= 2720)) return 'MasterCard';

  // American Express: 34 or 37
  if (prefix2 === '34' || prefix2 === '37') return 'American Express';

  // Discover: 6011, 65, or 644-649
  const p3 = parseInt(prefix3, 10);
  if (
    prefix4 === '6011' ||
    prefix2 === '65' ||
    (p3 >= 644 && p3 <= 649)
  ) {
    return 'Discover';
  }

  // Hipercard: usually starts with 6062
  if (prefix4 === '6062') return 'Hipercard';

  // Elo: common prefixes (not exhaustive)
  const eloPrefixes = [
    '4011',
    '4312',
    '4389',
    '4514',
    '4576',
    '5041',
    '5066',
    '5067',
    '509',
    '6277',
    '6362',
    '6363',
    '650',
    '651',
    '655',
  ];
  if (eloPrefixes.some((p) => startsWith(p))) return 'Elo';

  return null;
}

/**
 * Validates a credit card number using the Luhn algorithm.
 *
 * @param {string|number} input - Credit card number (may include spaces/dashes)
 * @returns {boolean} True if the number is valid according to Luhn, otherwise false.
 */
function isValidCardNumber(input) {
  const cc = String(input).replace(/\D/g, '');
  if (cc.length < 12) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cc.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(cc[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Validates the card number and returns both validation state and detected brand.
 *
 * @param {string|number} input - Credit card number (may include spaces/dashes)
 * @returns {{valid: boolean, brand: string|null, number: string}}
 */
function validateCard(input) {
  const number = String(input).replace(/\D/g, '');
  return {
    valid: isValidCardNumber(number),
    brand: detectCardBrand(number),
    number,
  };
}

// Exports for Node/CommonJS environments (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    detectCardBrand,
    isValidCardNumber,
    validateCard,
  };
}

// If this file is run directly (e.g. `node src/index.js`), prompt the user for a card number and validate it.
if (typeof require !== 'undefined' && require.main === module) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question('Enter a credit card number: ', (answer) => {
    const result = validateCard(answer);
    console.log('Result:', result);
    rl.close();
  });
}
