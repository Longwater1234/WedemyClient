<template>
  <!-- <Drawer /> -->
  <!-- button for sideview, only shows on smaller screens -->
  <div class="phone-only">
    <el-button @click="showDrawer()" type="primary" class="phone-only">
      <i class="el-icon-s-unfold phone-only"></i>
    </el-button>
  </div>

  <!-- the sideview -->
  <el-drawer
    size="70%"
    title="More"
    v-model="drawer"
    :with-header="false"
    direction="ltr"
  >
    <!-- side searchbar -->
    <div style="padding: 16px; margin-top: 15px">
      <form @submit.prevent="handleSearch">
        <el-input
          placeholder="Search anything"
          prefix-icon="el-icon-search"
          class="main-only"
          maxlength="20"
          required
          v-model.trim="search"
          clearable
        >
        </el-input>
      </form>

      <!-- if NOT logged in -->
      <el-row
        v-if="!store.getters.isLoggedIn"
        type="flex"
        justify="space-around"
        style="margin-top: 10px"
      >
        <router-link to="/login" class="none">
          <button class="btn btn-accent">Log In</button>
        </router-link>

        <router-link to="/signup" class="none">
          <button class="btn btn-accent-outline">Sign Up</button>
        </router-link>
      </el-row>

      <!--  ELSE SHOW NAME + SIDE_MENU LIST-->
      <div class="sideMenu" v-else>
        <el-row class="sideList"
          >Logged in as: &nbsp;
          <strong>{{ store.state.username }}</strong>
        </el-row>
        <el-row class="sideList">More Items</el-row>
        <el-row class="sideList">Here below</el-row>
        <el-row class="sideList">And another</el-row>
        <el-row>
          <el-button type="danger" @click="logout()">Logout</el-button>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import AuthService from "@/services/AuthService";
import store from "@/store";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Drawer",
  inject: ["store"],
  data() {
    return {
      drawer: false,
      search: "",
      isLoading: false,
    };
  },
  methods: {
    handleSearch() {
      //FIXME: add search logic here
    },
    showDrawer() {
      this.drawer = !this.drawer;
    },
    logout: async () => {
      try {
        await AuthService.logoutUser();
        await store.getAuthStatusServer();
        window.location.reload();
      } catch (error: any) {
        ElMessage.error(error.message);
      }
    },
  },
});
</script>

<style>
.phone-only {
  text-align: center;
}

.sideList {
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: rgba(0, 0, 0, 0.5) 1px solid;
  height: 30px;
}
</style>