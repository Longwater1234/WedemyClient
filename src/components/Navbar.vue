<template>
  <div id="nav">
    <!-- start logo -->
    <el-row :gutter="20" justify="space-around">
      <Drawer />
      <div class="logoArea" @click="goHome()">
        <img src="@/assets/logo_final_purple.png" alt="Wedemy" class="mylogo" />
      </div>

      <!-- end logo -->

      <!-- start dropdown -->
      <div class="full-only category">
        <el-dropdown>
          <span class="el-dropdown-link">
            Categories
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- START DROPDOWN LIST -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in categories"
                :key="item.id"
                @click="goToCategory(item.category)"
              >
                {{ item.category }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- end dropdown -->

      <!-- start search bar -->
      <div id="searchBar">
        <form @submit.prevent="handleSearch">
          <el-input
            prefix-icon="el-icon-search"
            type="text"
            clearable
            maxlength="40"
            v-model="search"
            placeholder="What do you want to learn?"
          >
          </el-input>
        </form>
      </div>
      <!-- end searchbar -->

      <!-- start cart icon -->
      <div class="cartIcon">
        <router-link to="/cart" title="Cart">
          <el-badge
            v-if="store.getters.getCartCount > 0"
            :value="store.getters.getCartCount"
            class="itemCart"
          >
            <shopping-cart style="width: 2em" />
          </el-badge>
          <shopping-cart v-else style="width: 2em" title="Cart" />
        </router-link>
      </div>

      <!-- IF NOT LOGGED IN -->
      <div class="full-only nav-btns" v-if="!store.getters.isLoggedIn">
        <router-link to="/login">
          <el-button class="btn purple">Log in</el-button>
        </router-link>
        &nbsp; &nbsp;
        <router-link to="/signup">
          <el-button class="btn white">Sign up</el-button>
        </router-link>
      </div>

      <!-- ELSE -->
      <div class="full-only" v-else>
        <el-dropdown>
          <el-avatar :size="36" :src="attachAvatarLink(store.state.username)">
          </el-avatar>
          <span class="el-dropdown-link" style="font-size: 16px"> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>
                {{ store.state.username }}
              </el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
              <!-- NAV BAR DROPDOWN -->
              <el-dropdown-item
                v-for="item in navMenuList"
                :key="item.id"
                @click="goTo(item.url)"
              >
                {{ item.title }}
              </el-dropdown-item>
              <el-dropdown-item @click="logout()">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import AuthService from "@/services/AuthService";
import store from "@/store";
import { defineComponent } from "@vue/runtime-core";
import { ElMessage, ElNotification } from "element-plus";
import { ShoppingCart } from "@element-plus/icons";
import Drawer from "./Drawer.vue";
import navMenuList from "@/navmenu.json";

export default defineComponent({
  name: "Navbar",
  inject: ["store"],
  components: {
    ShoppingCart,
    Drawer,
  },
  props: {
    //from App.vue
    categories: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      search: "",
      color: "black",
      navMenuList,
    };
  },
  methods: {
    attachAvatarLink: (username: string) => {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
    handleSearch() {
      if (!this.search.trim().length) return;
      if (this.search.trim().length < 4) {
        return ElNotification({
          title: "Error",
          type: "error",
          duration: 2000,
          message: "Query too short",
        });
      }
      this.$router.push({
        name: "SearchResults",
        query: { q: encodeURI(this.search.trim()) },
        force: true,
      });
    },
    goTo(url: string) {
      this.$router.push(url);
    },
    logout: async () => {
      try {
        await AuthService.logoutUser();
        await store.getAuthStatusServer();
        window.location.replace("/");
      } catch (error: any) {
        ElMessage.error(error.message);
      }
    },
    goToCategory(name: string) {
      this.$router.push(`/category/${name}`);
    },
    goHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style>
.logoArea {
  cursor: pointer;
  width: 10em;
  /* margin-left: -5em; */
  height: 100%;
}

.mylogo {
  width: 100%;
  height: 100%;
}

.el-dropdown-link {
  font-size: 14px;
  cursor: pointer;
}

.category {
  margin-top: 0.5em;
  width: 10%;
}

.nav-btns {
  display: flex;
  margin-right: 1em;
  flex-direction: row;
}

.cartIcon {
  width: 10%;
  float: right;
  display: flex;
  height: 100%;
}

#searchBar {
  width: 30%;
}

#nav {
  margin-top: 0;
  right: 0;
  left: 0;
  padding: 0.25em;
  /* box-shadow: grey 1px 1px 1px 1px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
}

.itemCart {
  margin-top: 0.5em;
}

@media screen and (max-width: 830px) {
  #searchBar {
    display: none;
  }
}

@media screen and (max-width: 770px) {
  .full-only {
    display: none;
  }
  .logoArea {
    transform: scale(0.7);
    margin-left: 0;
    transition: all ease-in 0.5s;
  }
}
</style>
