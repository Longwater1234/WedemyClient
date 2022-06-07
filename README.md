# WedemyClient

(Frontend Repo). Clone of Udemy, built using Vue 3 + Typescript + Element Plus + Injector/Provider API (No Vuex!). Almost
all components have been built with Options API. This App is also integrated with PayPal and CreditCard checkout (both
powered by **Braintree Payments**). The Backend is a Java Springboot application.

## Live Demo (coming soon)

The Demo uses Sandbox (Test) Mode of Braintree Payments. No actual money will be deducted on Checkout. You may use test
credit-card numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java). Also, this demo serves
embedded Content from YouTube with "no-cookie" option, which means tracking is disabled.

## Main `npm` Libraries used

- Axios
- Typescript
- [Element Plus UI Framework](https://element-plus.org/en-US/)
- [Braintree Web Drop-in](https://www.npmjs.com/package/braintree-web-drop-in)

## Required 3rd party Services
 
- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for Google Login)
- [Braintree](https://developer.paypal.com/braintree/docs) Developer Account (for payments handling)
- (OPTIONAL) Free PayPal Business Account
- For Braintree tutorials and examples, please see
  the [official docs](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
- IMPORTANT ⚠: Remember to create an `.env` file at root folder and fill in appropriate values (see _.env.sample_)

## Pull Requests & Contributions

This app still has much potential. Several missing features: Admin Panel, Instructor Dashboard etc. Code Contributions and pull requests are welcome!
