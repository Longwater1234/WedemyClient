# WedemyClient

Clone of Udemy, built using Vue 3 + Typescript + Element Plus + Injector/Provider API (No Vuex!). All pages and components have been built with Options API, despite Vue 3. This App is also integrated with PayPal and CreditCard checkout (both powered by **Braintree**).

## Live Demo (coming soon)
The Demo uses Sandbox (Test) Mode of Braintree Payments. No actual money will be deducted on Checkout. You may use test credit-card numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java).

## Main `npm` Libraries used

- Axios
- Typescript
- [Element Plus UI Framework](https://element-plus.org/en-US/)
- validator.js
- [Braintree Web Drop-in ](https://www.npmjs.com/package/braintree-web-drop-in)

## External services used
- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for _Sign In With Google_)
- [Braintree](https://developer.paypal.com/braintree/docs) / PayPal Developer Account (for payments handling)
- IMPORTANT ⚠: Remember to create an `.env` file and fill in values appropriately (see _.env.sample_)
- Also, remember to specify *SERVER_ROOT_URL* inside `.env`, which points to your backend.
