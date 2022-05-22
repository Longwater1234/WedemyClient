<template>
  <Navbar :categories="categories" v-if="!this.$route.meta.hideNavbar" />
  <router-view />
  <!-- <Footer v-if="!this.$route.meta.hideNavbar" /> -->
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import store from "@/store";
import { defineComponent } from "@vue/runtime-core";
import CourseService from "./services/CourseService";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    fetchCartCount() {
      store.getCartCountServer().then(() => {});
    },
  },
  mounted() {
    store.getAuthStatusServer().then((loggedIn) => {
      if (loggedIn) this.fetchCartCount();
    });
    CourseService.getAllCategories().then(
      (res) => (this.categories = res.data)
    );
  },
});
</script>

<style>
* {
  font-family: "Fira Sans", system-ui, sans-serif;
}
:root {
  --primary: #5943be;
  --secondary: #3b2b83;
  --background: #ffff;
  --el-rate-text-color: var(--background);
  --dark: #0000;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background);
  max-height: 100vh;
  width: auto;
}

.btn {
  width: 100%;
  height: 3em !important;
}

.btn.purple {
  background-color: var(--primary);
  font-weight: 700;
  color: white;
}

.btn.purple:hover {
  background-color: var(--secondary);
  color: white;
}

.btn.white {
  background-color: aliceblue;
  font-weight: 700;
  color: var(--primary);
}

.main-view {
  padding: 0 10% 0 10%;
}

.server-error {
  color: red;
}

a {
  text-decoration: none;
}

.product-img {
  aspect-ratio: 16/9;
  height: 10em;
  transition: ease-in-out 0.6s;
}
.product-img:hover {
  transform: scale(1.2);
}

.card-title {
  font-size: 20px;
  font-weight: 700;
}
.card-author {
  color: #636362;
  font-size: 14px;
}

.nodata {
  display: flex;
  margin: 3em auto;
  flex-direction: row;
  justify-content: center;
  color: grey;
}

.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: #1c1d1f;
  color: white;
  margin-top: 0;
  height: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  padding: 2% 10%;
}

.noblue {
  color: black !important;
}

@media only screen and (max-width: 600px) {
  .product-img {
    aspect-ratio: 16/9;
    height: 10em;
  }

  .main-body {
    width: 100% !important;
  }

  .cart-header {
    padding: 5% 10%;
    height: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>