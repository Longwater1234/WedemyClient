<template>
  <h3 class="cart-header">Your Profile</h3>
  <div class="main-view" style="height: 70vh">
    <!-- START HEADER -->
    <div class="profile-header">
      <el-avatar
        :size="100"
        shape="square"
        :src="attachAvatarLink(store.state.username)"
      />
      <p class="username">{{ store.state.username }}</p>
      <div class="joined">Joined 2021-05-11</div>
    </div>
    <!-- END OF HEADER -->


  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  inject: ["store"],
  data() {
    document.title = "My Profile | Wedemy";
    return {
      activeTab: "first",
      isLoading: false,
    };
  },
  methods: {
    attachAvatarLink(username: string) {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
  },
});
</script>

<style>
.main-view {
  text-align: center;
  justify-content: center;
}

.cart-header {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: black;
  color: white;
  margin-top: 0;
  top: 0;
  padding: 2% 10%;
}

.joined {
  font-size: 12px;
}

.username {
  font-size: 1.5em;
  margin: 0.5em auto;
}

.second-form {
  width: 40% !important;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }
  .cart-header {
    padding: 5% 10%;
    height: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .second-form {
    width: 90% !important;
  }
}
</style>