# WedemyClient

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-16.x-blue.svg)
[![Package - vue](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/vue?color=blue)](https://www.npmjs.com/package/vue)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://www.npmjs.com/package/vite)
[![License: MIT](https://img.shields.io/github/license/Longwater1234/WedemyClient)](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE)
[![Package - typescript](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/dev/typescript?color=blue)](https://www.npmjs.com/package/typescript)

(Frontend PRODUCTION Repo). Clone of Udemy, PWA (progressive web app) built using Vue 3, Vite, Typescript, Pinia, and Element Plus.
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

## 📝 License

&copy; 2022 Davis Tibbz
This project is [MIT](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE) licensed.

### Credits

- Homepage banner image: [Avi Richards, Unsplash](https://unsplash.com/@avirichards)
