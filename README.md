# WedemyClient

(Frontend Repo). Clone of Udemy, built using Vue 3 + Typescript + Element Plus + Injector/Provider API (No Vuex!). This
App is also integrated with PayPal and CreditCard checkout (both powered by **Braintree Payments**).

## Backend Repo

The backend is a separate Java Springboot application [available here](https://github.com/Longwater1234/WedemyServer).

## [Live Demo](https://wedemy.up.railway.app/)

The Demo uses Sandbox (Test) Mode of Braintree Payments. No actual money will be deducted on Checkout. You may use TEST
credit-card numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java).
Also, this Demo serves embedded Content from YouTube with "no-cookie" option, which means tracking is disabled ✅.

### Test Accounts

If you don't want to Register, You can still play around the live demo using any of these Test accounts:
<table>
    <tr>
        <th>email</th>
        <th>pass (Dont ignore the "!")</th>
    </tr>
    <tr>
        <td>anna@example.com</td>
        <td><code>anna_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>bob@example.com</td>
        <td><code>bob_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>coco@example.com</td>
        <td><code>coco_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>damian@example.com</td>
        <td><code>damian_qwerty9876!</code></td>
    </tr>
    <tr>
        <td>eric@example.com</td>
        <td><code>eric_qwerty9876!</code></td>
    </tr> 
    <tr>
        <td>fiona@example.com</td>
        <td><code>fiona_qwerty9876!</code></td>
    </tr>
</table>

## Main `npm` Libraries used

- [Element Plus UI Framework](https://element-plus.org/en-US/)
- [Braintree Payments for Web](https://www.npmjs.com/package/braintree-web-drop-in)
- [Vue-CLI](https://www.npmjs.com/package/@vue/cli)

## Required 3rd party Services

- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for Google Login)
- [Braintree](https://developer.paypal.com/braintree/docs) Developer Account (for payments handling)
- (OPTIONAL) Free PayPal Business Account
- For Braintree tutorials and examples, please see
  the [official docs for JS](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
- IMPORTANT ⚠: Remember to create an `.env` file at root folder and fill in appropriate values (see _.env.sample_)

## Pull Requests & Contributions

Code Contributions and pull requests are welcome! Perhaps ADMIN and INSTRUCTOR companion web apps. Dark Mode, maybe? For
more TODO's for this project, see list [.TODO/wedemy_front.md](.TODO/wedemy_front.md)
