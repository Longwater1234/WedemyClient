# WedemyClient

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-16.x-blue.svg)
[![Package - vue](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/vue?color=blue)](https://www.npmjs.com/package/vue)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://www.npmjs.com/package/vite)
[![License: MIT](https://img.shields.io/github/license/Longwater1234/WedemyClient)](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE)
[![Package - typescript](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/dev/typescript?color=blue)](https://www.npmjs.com/package/typescript)

(Frontend Repo). Clone of Udemy, PWA (progressive web app) built using Vue 3, Vite, Typescript, Pinia, and Element Plus.
At checkout, payments are securely handled by **Braintree Payments** (owned by PayPal), which also supports cards, Apple
Pay, GooglePay, Venmo and many other methods. This project implements Credit-Card and PayPal Checkout only, in _Sandbox_
(DEV) mode. Users may authenticate with simple username and password, or with Google.

### Disclaimer ⚠

> Wedemy is an open-source project developed for learning purposes only. It is NOT associated with or endorsed
> by Udemy, Inc. Any resemblance to Udemy or its services is purely inspirational. Please note that Wedemy does not
> offer any certifications or guarantees similar to those provided by Udemy Inc.

## Backend Repo

The backend for the Demo is a separate Java Springboot
application [available here](https://github.com/Longwater1234/WedemyServer).
However, you may use any Backend framework or language you like with this project.

## Install

```sh
# Requires node 16.x or higher
npm install
```

## Usage

In local development, the app runs on port 5173 by default. You can change it in [vite.config.ts](vite.config.ts)

```sh
npm run dev
```

For production, run `npm run build`, then follow official Vite guide
on [deployment](https://vitejs.dev/guide/static-deploy.html), depending on your hosting of choice.

## [Live Demo](https://wedemy.up.railway.app/) - updated 2023 Jan

PLEASE READ: The Demo uses Sandbox (Dev) Mode of Braintree Payments. **No actual money will be deducted on Checkout**.
You
**should** use test credit-card
numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java). Also, this
demo serves embedded video from YouTube (for simplicity).

### Test Accounts for Demo

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

## Required 3rd party Services

- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for Google Login)
- [Braintree Developer](https://developer.paypal.com/braintree/docs) Account (for payments handling)
- (OPTIONAL) Free PayPal Business Account.
- IMPORTANT ⚠: Remember to create an `.env` file at root folder and fill in appropriate values (see _.env.sample_)

### 📕 Resources - learn more

- [Vite](https://vitejs.dev/guide/) - official Guide
- [Braintree Payments docs](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
- [Google Login docs](https://developers.google.com/identity/gsi/web/guides/overview) - latest version
- [Element Plus](https://element-plus.org/en-US/) - UI framework for Vue.
- [Pinia docs](https://pinia.vuejs.org/) - modern store for Vue, replacing VueX.
- [sql-to-ts](https://rmp135.github.io/sql-ts/) - Useful DbSchema (SQL) to TS Interface convertor

## Pull Requests & Contributions

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com//Longwater1234/WedemyClient/issues). For more TODO's for this
project, see list in [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 License

&copy; 2022 Davis Tibbz
This project is [MIT](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE) licensed.

### Credits

- Homepage banner image: [Avi Richards, Unsplash](https://unsplash.com/@avirichards)
