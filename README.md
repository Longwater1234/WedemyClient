# WedemyClient

Clone of Udemy, built using Vue 3 + Typescript + Element Plus + Injector/Provide API (No Vuex!). All pages and components have been built with Options API, despite Vue 3. The app has also PayPal and CreditCard checkout integrated (powered by **Braintree**).

## Main `npm` Libraries used

- Axios
- [Element Plus UI Framework](https://element-plus.org/en-US/)
- validator.js
- Braintree Web Drop-in [https://www.npmjs.com/package/braintree-web-drop-in]

## External services used
- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for _Sign In With Google_)
- [Braintree](https://developer.paypal.com/braintree/docs) / PayPal Developer Account (for payments handling)
- IMPORTANT ⚠: Make sure you obtain the API Client keys from both services above and store them in `.env` file (see `.env.sample`)
- Remember to add .env to .gitignore
