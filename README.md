<h1>
<div align="center"><img src="src/assets/logo_final_purple.png" alt="wedemy-logo"/> </div>
<div>WedemyClient</div>
</h1>

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-20.x-blue.svg)
[![Package - vue](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/vue?color=blue)](https://www.npmjs.com/package/vue)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://www.npmjs.com/package/vite)
[![License: MIT](https://img.shields.io/github/license/Longwater1234/WedemyClient)](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE)
[![Package - typescript](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/dev/typescript?color=blue)](https://www.npmjs.com/package/typescript)

(Frontend Repo). Clone of Udemy, PWA (progressive web app) built using Vue 3, Vite, Typescript, Pinia, and Element Plus.
At checkout, payments are securely handled by **Braintree Payments** (owned by PayPal), which also supports cards, Apple
Pay, GooglePay, Venmo and many other methods. This project implements Credit-Card and PayPal Checkout only. This is the
Student-facing web app -- does NOT include Instructor or Admin panel. Users may log in with either email/password or
with Google.

### Disclaimer ⚠

> Wedemy is an open-source project developed for learning purposes only. It is NOT associated with or endorsed
> by Udemy, Inc. Any resemblance to Udemy or its services is purely inspirational.

## Backend Repo

The backend for the Demo is a separate Java Springboot
application [available here](https://github.com/Longwater1234/WedemyServer) with API Docs. However, you may use any
server framework or language you like with this project.

## Install

```sh
# Requires node 20.x or higher
npm install
```

## Usage

In local development, the app runs on port 5173 by default. You can change it in [vite.config.ts](vite.config.ts).
Create an `.env` file at project root directory and fill in appropriate values (see `.env.sample`).

```sh
npm run dev
```

For production, run `npm run build`, then follow official Vite guide
on [deployment](https://vitejs.dev/guide/static-deploy.html), depending on your hosting of choice. Remember to set ENV
variables on your target Cloud platform.

## [Live Demo](https://wedemy.up.railway.app/)

PLEASE READ: The Demo uses Sandbox (Dev) Mode of Braintree Payments. **No actual money will be deducted on Checkout**.
You **should** use test credit-card
numbers [listed here](https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/java). Also, this
Demo serves embedded video from YouTube (just for simplicity).

### Test Accounts for Demo

If you don't want to Register, you can still play around the live demo using any of the Test accounts. Visit the login
page and click **Login with Test Account** button.

## Required 3rd party Services

- [Google OAuth Credentials](https://console.developers.google.com/apis/credentials) (for Google Login)
- [Braintree Developer](https://developer.paypal.com/braintree/docs) Account (for payments handling)
- (OPTIONAL) Free PayPal Business Account.

## Resources - learn more

- [Vite](https://vitejs.dev/guide/) - official Guide
- [Braintree Payments docs](https://developer.paypal.com/braintree/docs/guides/drop-in/setup-and-integration/javascript/v3)
- [Google Login docs](https://developers.google.com/identity/gsi/web/guides/overview) - latest version for Web
- [Element Plus](https://element-plus.org/en-US/) - UI framework for VueJS.
- [Pinia docs](https://pinia.vuejs.org/) - modern store for Vue (replacing VueX)
- [Vue DevTools](https://devtools.vuejs.org/guide/installation.html) -✨ plugin for all major Browsers
- [sql-to-ts](https://rmp135.github.io/sql-ts/) -✨ quick Db Schema (SQL) --> TS Interface generator

## Pull Requests & Contributions

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com//Longwater1234/WedemyClient/issues). For more TODO's for this
project, see list in [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 License

&copy; 2022 Davis Tibbz
This project is [MIT](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE) licensed.

### Credits

- Logo by author (@Longwater1234). [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1) License.
- Homepage banner image: [Avi Richards, Unsplash](https://unsplash.com/@avirichards)
- Demo video content: all creators listed on "Credits" webpage.
- Web font used: [Fira Sans](https://fonts.google.com/specimen/Fira%20Sans)
