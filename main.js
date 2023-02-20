const exchangeRates = {
    USD: {
      CHF: 0.92,
      UAH: 36.94
    },
    CHF: {
      USD: 1.08,
      UAH: 39.99
    },
    UAH: {
      USD: 0.027,
      CHF: 0.025
    }
  };
  
  function convertCurrency(amount, fromCurrency, toCurrency) {
    // Replace commas with periods
    amount = amount.replace(',', '.');
  
    // Parse the input amount as a number
    const numericAmount = parseFloat(amount);
  
    // Check if the numericAmount is not a number or is NaN
    if (isNaN(numericAmount)) {
      throw new Error('Invalid amount');
    }
  
    // Check if the fromCurrency and toCurrency are valid
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      throw new Error('Invalid currency');
    }
  
    // Convert the currency
    const exchangeRate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = numericAmount * exchangeRate;
  
    // Round the converted amount to 2 decimal places
    return Math.round(convertedAmount * 100) / 100;
  }
  
// Wait for the HTML document to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and input fields
    const form = document.querySelector('form');
    const amountInput = document.querySelector('#amount');
    const fromCurrencyInput = document.querySelector('#from-currency');
    const toCurrencyInput = document.querySelector('#to-currency');
    const resultOutput = document.querySelector('#result');
  
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the input values from the form
      const amount = amountInput.value;
      const fromCurrency = fromCurrencyInput.value;
      const toCurrency = toCurrencyInput.value;
  
      // Convert the currency
      try {
        const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        resultOutput.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } catch (error) {
        resultOutput.textContent = error.message;
      }
    }
  
    // Add an event listener to the form for the form submission
    form.addEventListener('submit', handleFormSubmit);
  });
  