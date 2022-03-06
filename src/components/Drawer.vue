<template>
  <div>
    <div @click="launch = true" class="drawer">
      <img src="@/assets/menu.png" alt="More" class="hamburger" />
    </div>
    <el-drawer
      v-model="launch"
      direction="ltr"
      size="60%"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="auth-buttons" v-if="!store.getters.isLoggedIn">
        <router-link to="/login">
          <el-button class="btn purple">Log in</el-button>
        </router-link>
        &nbsp; &nbsp;
        <router-link to="/signup">
          <el-button class="btn white">Sign up</el-button>
        </router-link>
      </div>

      <div style="margin: 1em" v-else>
        <el-avatar :src="attachAvatarLink(store.state.username)" :size="36">
        </el-avatar>
        <span style="margin-left: 10px">{{ store.state.username }}</span>
        <div style="margin-top: 2em">
          <el-row
            v-for="item in navMenuList"
            :key="item.id"
            @click="goTo(item.url)"
          >
            {{ item.title }}
            <el-divider />
          </el-row>
          <el-row @click="logout()">Logout</el-row>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import AuthService from "@/services/AuthService";
import store from "@/store";
import { defineComponent } from "vue";
import navMenuList from "@/navmenu.json";

export default defineComponent({
  name: "Drawer",
  inject: ["store"],
  data() {
    return {
      launch: false,
      navMenuList,
    };
  },
  methods: {
    attachAvatarLink: (username: string) => {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
    logout: async () => {
      await AuthService.logoutUser();
      await store.getAuthStatusServer();
      window.location.replace("/");
    },
    goTo(url: string) {
      this.$router.push(url);
    },
  },
});
</script>

<style>
.drawer {
  width: 30px;
  height: 30px;
  margin-top: 0.25em;
}

.drawer-item:hover {
  background-color: rgb(197, 197, 197);
}

.hamburger {
  width: 100%;
  height: 100%;
}
.sidename {
  color: rgb(61, 61, 61);
  margin: 0 10px;
}
.auth-buttons {
  width: 70%;
  margin: 0 auto;
  text-align: center;
}

@media screen and (min-width: 780px) {
  .drawer {
    display: none;
  }
}
</style>