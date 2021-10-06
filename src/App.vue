<template id="app">
  <Navbar v-if="!this.$route.meta.hideNavbar" />
  <router-view />
  <Footer v-if="!this.$route.meta.hideNavbar" />
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import store from "./store";
import { defineComponent } from "@vue/runtime-core";
import axiosconfig from "./axiosconfig";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    store.getAuthStatusServer().catch((error) => {
      console.error("AUTH_ERROR", error);
    });
    axiosconfig.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
  },
});
</script>


<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Public Sans", system-ui, sans-serif;
}

:root {
  --accent1: #6fb650;
  --accent2: #95a1b8;
  --background: #f4f4f4;
  --dark: #26222b;
  --border: #cfcfcf;
}

body {
  /* background-color: #535353; */
  background-color: var(--background);
}

#app {
  font-family: "Public Sans", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #262a34;
  min-height: 100vh;
  max-width: 100vw;
  /* margin-bottom: 90px; */
}

.wrapper {
  min-height: 91vh;
  margin-bottom: 90px;
}
.top-margin {
  margin-top: 24px;
}

/* this is basically like container in bootstrap */
.main-view {
  padding: 0 10% 0 10%;
}
/* button properties for navbar */
.btn {
  padding: 1%;
  height: 40px;
  width: 100px;
  outline: none;
  border-radius: 8px;
  font-weight: 600;
  border: 0;
}
.btn-auto {
  width: auto;
}
.btn:hover,
.login-btn:hover {
  cursor: pointer;
  border: 0;
}

/* button colors */
.btn-accent {
  background-color: var(--accent1);
}
.btn-accent:hover {
  background-color: #619f46;
}
.btn-accent2 {
  /* background-color: #939bb1; */
  background-color: #95a1b8;
}
.btn-accent2:hover {
  background-color: #70798a;
}
.btn-accent-outline {
  border: 0;

  background-color: #dbedd3;
}
.btn-accent-outline:hover {
  background-color: #f0fff0;
  border: 2px solid #6fb650;
}

/* login or signup pages */
.login-view {
  padding: 0 40% 0 39%;
  margin-top: 4%;
  text-align: center;
}

/* button for login and signup */
.login-btn {
  height: 40px;
  width: 7em;
  color: white;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: 0;
}
.none {
  text-decoration: none;
}
.flex {
  display: flex;
}

/* card */
.card {
  /* width: 25%; */
  /* width: 10px; */
  transition: ease-in-out 0.3s;
  overflow: hidden;
}
.card-card {
  width: 25%;
}
.card:hover {
  cursor: pointer;
  box-shadow: 70px 70px 70px grey;
}
.card-title {
  font-size: 19px;
  font-weight: 600;
}
.card-author {
  color: #636362;
  font-size: 14px;
}

/* .el-message el-message--error {
  font-family: "Public Sans", system-ui, sans-serif;
} */

/* product images in a catalog */
.product-img {
  /* width: 100%; */
  height: 160px;
  /* height: 1%; */
  transition: ease-in-out 0.6s;
}
.product-img:hover {
  transform: scale(1.2);
}

.phone-only {
  display: none;
}

.server-error {
  color: red;
}

@media only screen and (max-width: 600px) {
  .btn {
    width: 80px;
  }

  .phone-only {
    display: block;
  }
  .login-view {
    padding: 5px;
  }
  .main-view {
    padding: 0 2% 0 2%;
  }
  .product-img {
    width: 100%;
    height: 200px;
  }
}
</style>
