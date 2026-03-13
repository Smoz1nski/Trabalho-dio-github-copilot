# Validador de Cartão de Crédito (Luhn + Bandeira)

Projeto simples em JavaScript para:
- ✅ validar números de cartão com o **algoritmo de Luhn**
- 🏷️ identificar a **bandeira** (Visa, MasterCard, Elo, Amex, Discover, Hipercard)

---

## 🚀 Uso (CLI)

Execute e informe o número do cartão quando solicitado:

```bash
node src/index.js
```

Exemplo de saída:

```
Enter a credit card number: 4111 1111 1111 1111
Result: { valid: true, brand: 'Visa', number: '4111111111111111' }
```

---

## 🧩 API disponível

- `validateCard(input)` → `{ valid, brand, number }`
- `isValidCardNumber(input)` → `true | false`
- `detectCardBrand(input)` → `string | null`

Exemplo:

```js
const { validateCard } = require('./src/index');
console.log(validateCard('4111 1111 1111 1111'));
```

---

## 📄 Licença
MIT.
