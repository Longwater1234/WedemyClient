<template>
  <div>
    <div @click="launch = true" class="drawer">
      <img src="@/assets/menu.png" alt="More" class="hamburger" />
    </div>
    <el-drawer
      title="More"
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
        <span>{{ store.state.username }}</span>
        <div>
          <el-row> My Account</el-row>
          <el-row> My Wishlist</el-row>
          <el-row> My Courses</el-row>
          <el-row> Billing History</el-row>
          <el-row> Logout</el-row>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Drawer",
  inject: ["store"],
  data() {
    return {
      launch: false,
    };
  },
  methods: {
    attachAvatarLink: (username: string) => {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
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
.hamburger {
  width: 100%;
  height: 100%;
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