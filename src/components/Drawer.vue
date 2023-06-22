<template>
  <div>
    <div @click="launch = true" class="drawer">
      <img src="@/assets/menu.png" alt="More" class="hamburger" />
    </div>
    <el-drawer v-model="launch" direction="ltr" size="60%" class="demo-drawer" ref="drawer">
      <div class="auth-buttons" v-if="!store.getIsLoggedIn">
        <router-link to="/login">
          <el-button class="btn purple">Log in</el-button>
        </router-link>
        &nbsp; &nbsp;
        <router-link to="/signup">
          <el-button class="btn white">Sign up</el-button>
        </router-link>
      </div>

      <div style="margin: 1em" v-else>
        <el-avatar :src="attachAvatarLink(store.fullname)" :size="36"> </el-avatar>
        <span style="margin-left: 10px">{{ store.fullname }}</span>
        <div style="margin-top: 2em">
          <el-row v-for="item in navMenuList" :key="item.id" @click="router.push(item.url)">
            {{ item.title }}
            <el-divider />
          </el-row>
          <el-row @click="logout()">Logout</el-row>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navMenuList from "../navmenu.json";
import { useStudentStore } from "@/stores";
import { useRouter } from "vue-router";

const store = useStudentStore();

const launch = ref(false);
const router = useRouter();

const attachAvatarLink = (username: string) => {
  return `https://avatars.dicebear.com/api/initials/${username}.svg`;
};

const logout = async () => {
  await store.logoutUser();
  await store.getLoginStatus();
  window.location.replace("/");
};
</script>

<style scoped>
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
