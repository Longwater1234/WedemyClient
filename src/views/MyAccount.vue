<template>
  <h3 class="cart-header">Your Profile</h3>
  <div class="main-view" style="height: 70vh">
    <!-- START HEADER -->
    <div class="profile-header">
      <el-avatar :size="100" :src="attachAvatarLink()" />
      <p class="username">{{ store.state.username }}</p>
      <div class="joined">davisinyo@gmail.com</div>
    </div>
    <!-- END OF HEADER -->

    <div class="summary">
      <!-- <el-divider style="height: 2em; color: black" /> -->
      <hr />
      <el-row :gutter="50" justify="center">
        <el-col v-for="item in 3" :key="item" span="12">
          <div class="owned">8</div>
          <div>courses</div>
        </el-col>
      </el-row>
      <hr />
    </div>
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
    // attachAvatarLink(username: string) {
    //   return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    // },
    attachAvatarLink() {
      return `https://i.pinimg.com/236x/8b/27/62/8b2762de1333e52a114fe2be5e3cac60.jpg`;
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
  font-size: 14px;
}

.username {
  font-size: 1.5em;
  margin: 0.5em auto;
}

.summary {
  width: 70%;
  margin: 0 auto;
}

.owned {
  font-size: 2em;
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

  .summary {
    width: 80%;
    margin: 0 auto;
  }
}
</style>