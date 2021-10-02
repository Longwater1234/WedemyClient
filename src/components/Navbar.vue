<template>
  <el-row type="flex" justify="space-between" class="nav">
    <Drawer/>

    <!-- logo -->
    <div class="nav-icon">
      <router-link to="/">
        <img
            src="../images/android-chrome-512x512.png"
            class="icon"
            style="margin-top: 3px"
            alt="Logo"/>
        <img src="../images/WedemyLogo.png" alt="Home" class="logo"/>
      </router-link>
    </div>

    <!-- category dropdown -->
    <div
        class="main-only"
        :style="{ marginTop: '13px', textDecoration: 'none', marginLeft: '5%' }"
    >
      <el-dropdown>
        <span class="el-dropdown-link">
          Categories
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/category">
              <el-dropdown-item>Development</el-dropdown-item>
            </router-link>
            <el-dropdown-item>Finance</el-dropdown-item>
            <el-dropdown-item>Design</el-dropdown-item>
            <el-dropdown-item>Health</el-dropdown-item>
            <el-dropdown-item>Videography</el-dropdown-item>
            <el-dropdown-item>Real estate</el-dropdown-item>
            <el-dropdown-item>Music</el-dropdown-item>
            <el-dropdown-item>Office</el-dropdown-item>
            <el-dropdown-item>IT &amp; Software</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- search bar -->
    <div class="demo-input-suffix main-only" style="width: 40%">
      <form @submit.prevent="handleSearch">
        <el-input
            placeholder="What do you want to learn?"
            prefix-icon="el-icon-search"
            class="main-only"
            maxlength="20"
            v-model="search"
            clearable
        >
        </el-input>
      </form>
    </div>

    <!-- cart icon if signed in -->
    <div
        v-if="store.getters.isLoggedIn"
        style="margin-top: 6px"
        class="main-only"
    >
      <el-badge :value="store.getters.getCartCount" class="item">
        <router-link to="/cart">
          <font-awesome-icon
              :icon="['fas', 'shopping-cart']"
              size="lg"
              class="cart"
          />
        </router-link>
      </el-badge>
    </div>

    <!-- log in/ sign up buttons -->
    <!-- show buttons if NOT logged in -->
    <div v-if="!store.getters.isLoggedIn">
      <router-link to="/login" class="none main-only">
        <button class="btn btn-accent">Log In</button>
      </router-link>

      <router-link to="/signup" class="none main-only">
        <button class="btn btn-accent-outline" style="margin-left: 0.75em">
          Sign Up
        </button>
      </router-link>
    </div>

    <!-- START DROPDOWN + AVATAR (if logged IN) -->
    <div
        class="main-only"
        v-else
        :style="{ textDecoration: 'none', display: 'flex' }"
    >
      <el-dropdown>
        <el-avatar
            :size="36"
            style="margin-top: 1px"
            :src="attachAvatarLink(store.state.username)"
        >
        </el-avatar>
        <span class="el-dropdown-link" style="font-size: 16px"> </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>
              {{ store.state.username }}
            </el-dropdown-item>
            <el-dropdown-item divided>My Account</el-dropdown-item>
            <el-dropdown-item @click="logout()">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-row>
</template>

<script lang="ts">
import AuthService from "@/services/AuthService";
import store from "@/store";
import {defineComponent} from "@vue/runtime-core";
import Drawer from "./Drawer.vue";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "Navbar",
  components: {
    Drawer,
  },
  inject: ["store"],
  data() {
    return {
      search: ""
    };
  },
  methods: {
    attachAvatarLink: (username: string) => {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
    handleSearch() {
      //TODO add search logic here
    },
    logout: async () => {
      try {
        await AuthService.logoutUser();
        store.setLogout();
        window.location.reload();
      } catch (error) {
        ElMessage.error(error.message)
      }
    },
  },
});
</script>

<style>
.nav {
  border-top: 9px solid;
  border-top-color: #00ff29;
  padding: 9px 2% 9px 2%;
  position: sticky;
  /* border-image: linear-gradient(90deg, #102610 0%, #00ff29 100%); */
  border-bottom: 1px solid black;
  text-decoration: none;
  box-shadow: 0 1px 3px grey;
}

.icon {
  width: 34px;
  height: 34px;
}

.nav-icon:hover,
.cart:hover {
  transform: scale(1.1);
  color: var(--accent1);
  transition: ease-in-out 0.3s;
}

input {
  padding: 13px 13px 13px 10%;
  border: 1px solid grey;
  border-radius: 28px;
  /* height: 1px; */
  width: 500px;
  background-color: inherit;
  color: black;
  outline: none;
}

input::placeholder {
  color: grey;
}

.input-sidebar {
  width: 250px;
}

.cart {
  height: 34px;
  color: black;
}

.btn-sidebar {
  width: 120px;
  padding: 6%;
  height: 20px;
}

.display {
  display: none;
}

.nav-link {
  margin-top: 14px;
  padding: 0;
  /* height: 36px; */
  /* width: 0; */
}

.categories {
  border: 0;
  outline: none;
  /* background-color: aqua; */
}

.phone-only {
  display: none;
}

@media only screen and (max-width: 600px) {
  .logo,
  .main-only,
  i {
    display: none;
  }

  .textlogo {
    position: absolute;
    display: none;
  }

  .phone-only {
    display: block;
  }

  .display {
    display: block;
  }

  .icon {
    margin-top: -10%;
    margin-left: -89%;
  }
}
</style>