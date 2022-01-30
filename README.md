# WedemyClient

Clone of Udemy, built using Vue 3 + Typescript + Element Plus + Injector/Provide API (No Vuex!). I decided to **NOT** to
use Composition API, despite being on Vue 3. All components are built with in Options API. Also, PayPal and CreditCard checkout (powered by **Braintree**) 
have been integrated.

## Main `npm` Libraries used

- Axios
- [Element Plus UI Framework](https://element-plus.org/en-US/)
- validator.js
- Prettier
- Braintree Web Drop-in [https://www.npmjs.com/package/braintree-web-drop-in]

## External services used
- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for _Sign In With Google_)
- [Braintree](https://developer.paypal.com/braintree/docs) / PayPal Developer Account (for payments handling)
