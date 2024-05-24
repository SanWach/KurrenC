document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const amountInput = document.querySelector('#amount');
  const fromCurrencyInput = document.querySelector('#from-currency');
  const toCurrencyInput = document.querySelector('#to-currency');
  const resultOutput = document.querySelector('#result');

  // Fetch and populate currency options
  fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => {
          populateCurrencyDropdowns(data);
      });

  function populateCurrencyDropdowns(data) {
      const entries = Object.entries(data);
      entries.forEach(([code, name]) => {
          const optionFrom = document.createElement('option');
          optionFrom.textContent = `${name} (${code})`;
          optionFrom.value = code;
          fromCurrencyInput.appendChild(optionFrom);

          const optionTo = document.createElement('option');
          optionTo.textContent = `${name} (${code})`;
          optionTo.value = code;
          toCurrencyInput.appendChild(optionTo);
      });
  }

  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      const amount = amountInput.value;
      const fromCurrency = fromCurrencyInput.value;
      const toCurrency = toCurrencyInput.value;

      convertCurrency(amount, fromCurrency, toCurrency);
  });

  function convertCurrency(amount, fromCurrency, toCurrency) {
      const endpoint = `https://api.frankfurter.app/latest?amount=${encodeURIComponent(amount)}&from=${encodeURIComponent(fromCurrency)}&to=${encodeURIComponent(toCurrency)}`;
      fetch(endpoint)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  throw new Error(data.error);
              }
              const rate = data.rates[toCurrency];
              const convertedAmount = rate * amount;
              resultOutput.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
          })
          .catch(error => {
              resultOutput.textContent = `Error: ${error.message}`;
          });
  }
});
