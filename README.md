# WedemyClient

(Frontend Repo). Clone of Udemy, built using Vue 3 + Typescript + Element Plus + Injector/Provider API (No Vuex!).
This App is also integrated with PayPal and CreditCard checkout (both powered by **Braintree Payments**). Default PORT 8080.

### Backend Repo

The server app is a Java Springboot application [available here](https://github.com/Longwater1234/WedemyServer).

## [Live Demo](https://wedemy.onrender.com)

The Demo uses Sandbox (Test) Mode of Braintree Payments. No actual money will be deducted on Checkout. You may use test
credit-card numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java).
Also, this demo serves embedded Content from YouTube with "no-cookie" option, which means tracking is disabled.

## Main `npm` Libraries used

- [Element Plus UI Framework](https://element-plus.org/en-US/)
- [Braintree Web Drop-in](https://www.npmjs.com/package/braintree-web-drop-in)
- Vue-YouTube-iFrame

## Required 3rd party Services

- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for Google Login)
- [Braintree](https://developer.paypal.com/braintree/docs) Developer Account (for payments handling)
- (OPTIONAL) Free PayPal Business Account
- For Braintree tutorials and examples, please see
  the [official docs for JS](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
- IMPORTANT ⚠: Remember to create an `.env` file at root folder and fill in appropriate values (see _.env.sample_)

## Pull Requests & Contributions

Code Contributions and pull requests are welcome! Perhaps ADMIN and INSTRUCTOR companion web apps. Dark Mode, maybe? For more TODO's
for this project, see list [.TODO/wedemy_front.md](.TODO/wedemy_front.md)
