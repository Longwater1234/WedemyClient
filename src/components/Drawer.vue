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
        v-if="!state.getters.isLoggedIn"
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
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "Drawer",
  data() {
    return {
      drawer: false,
      search: "",
    };
  },
  methods: {
    handleSearch() {
      //FIXME: add search logic here
    },
    showDrawer(){
      this.drawer = !this.drawer
    }
  },
};
</script>

<style>
.phone-only {
  text-align: center;
}
</style>