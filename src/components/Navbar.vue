<template>
  <div id="nav">
    <!-- start logo -->
    <el-row :gutter="20" justify="space-around">
      <Drawer />
      <div class="logo-area" @click="goToHome">
        <img src="@/assets/logo_final_purple.png" alt="Wedemy" class="mylogo" />
      </div>
      <!-- end logo -->

      <!-- start dropdown -->
      <div class="full-only category">
        <el-dropdown>
          <span class="el-dropdown-link">
            Categories
            <arrow-down style="width: 1em" />
          </span>
          <!-- START DROPDOWN LIST -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in categories" :key="item.id" @click="goToCategory(item.category)">
                {{ item.category }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- end dropdown -->

      <!-- START SEARCH BAR -->
      <div id="searchBar">
        <form @submit.prevent="handleSearch">
          <el-input
            :prefix-icon="Search"
            native-type="search"
            clearable
            maxlength="40"
            v-model="searchItem"
            placeholder="What do you want to learn?"
          >
          </el-input>
        </form>
      </div>
      <!-- end searchbar -->

      <!-- START CART ICON -->
      <div class="cartIcon">
        <router-link to="/cart" title="Cart">
          <el-badge v-if="store.cartCount > 0" :value="store.cartCount" class="itemCart">
            <shopping-cart style="width: 2em" />
          </el-badge>
          <shopping-cart v-else style="width: 2em" title="Cart" />
        </router-link>
      </div>

      <!-- IF NOT LOGGED IN -->
      <div class="full-only nav-btns" v-if="!store.loggedIn">
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
          <el-avatar :size="36" style="cursor: pointer" :src="attachAvatarLink(store.fullname)" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>
                {{ store.fullname }}
              </el-dropdown-item>
              <el-dropdown-item divided />
              <!-- NAV BAR DROPDOWN -->
              <el-dropdown-item v-for="item in navMenuList" :key="item.id" @click="router.push(item.url)">
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

<script lang="ts" setup>
import { ElNotification } from "element-plus";
import { ShoppingCart, Search, ArrowDown } from "@element-plus/icons-vue";

import Drawer from "./Drawer.vue";
import navMenuList from "@/navmenu.json";
import type { PropType } from "vue";
import { ref } from "vue";
import { useStudentStore } from "@/stores";
import { useRouter } from "vue-router";
import type { CategoryDto } from "@/interfaces/custom";

const store = useStudentStore();

defineProps({
  //from App.vue
  categories: {
    type: Array as PropType<CategoryDto[]>,
    required: true
  }
});

const searchItem = ref("");
const router = useRouter();

const attachAvatarLink = (username: string) => {
  //d4dae1d9-20d0-47fc-9fc7-2eabbd190852
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURI(username)}`;
};

const goToHome = () => {
  router.replace({ path: "/", force: true });
};

function handleSearch() {
  if (!searchItem.value.trim().length) return;
  if (searchItem.value.trim().length < 3) {
    return ElNotification({
      title: "Error",
      type: "error",
      duration: 2000,
      message: "Query too short"
    });
  }
  router.push({
    name: "SearchResults",
    query: { q: encodeURI(searchItem.value.trim()) },
    force: true
  });
}

const logout = async () => {
  await store.logoutUser();
  await store.getLoginStatus();
  window.location.replace("/");
};
function goToCategory(name: string) {
  router.push(`/category/${name}`);
}
</script>

<style scoped>
.logo-area {
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

.shorty {
  display: block;
  color: red;
  font-size: small;
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
  .logo-area {
    transform: scale(0.7);
    margin-left: 0;
    transition: all ease-in 0.5s;
  }
}
</style>
