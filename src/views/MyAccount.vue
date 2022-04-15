<template>
  <h3 class="cart-header">Your Profile</h3>
  <div class="main-view" style="height: 70vh" v-loading="false">
    <!-- START HEADER -->
    <div class="profile-header">
      <el-avatar :size="100" :src="attachAvatarLink()" />
      <!-- <p class="username">{{ store.state.username }}</p> -->
      <p class="username">{{ userInfo.fullname }}</p>
      <div class="joined">{{ userInfo.email }}</div>
    </div>
    <!-- END OF HEADER -->

    <div class="summary">
      <hr />
      <el-row :gutter="5" justify="space-around">
        <el-col v-for="item in summaryList" :key="item.title" :span="4">
          <div class="mytitle">{{ toLower(item.title) }}</div>
          <div class="myvalue">{{ item.value }}</div>
          <div class="mysub">{{ item.subtitle }}</div>
        </el-col>
      </el-row>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import ProfileService from "@/services/ProfileService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  inject: ["store"],
  data() {
    document.title = "My Profile | Wedemy";
    return {
      activeTab: "first",
      isLoading: false,
      summaryList: [],
      userInfo: {},
    };
  },
  methods: {
    // attachAvatarLink(username: string) {
    //   return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    // },
    getProfileInfo() {
      ProfileService.getUserDetails().then((res) => (this.userInfo = res.data));
    },
    toLower(item: string) {
      return item.toLowerCase();
    },
    attachAvatarLink() {
      return `https://i.pinimg.com/236x/8b/27/62/8b2762de1333e52a114fe2be5e3cac60.jpg`;
    },
  },
  mounted() {
    ProfileService.getUserSummary().then(
      (res) => (this.summaryList = res.data)
    );
    this.getProfileInfo();
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

.myvalue {
  font-size: 2em;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.mytitle {
  font-size: 1em;
  font-variant: small-caps;
}

.mysub {
  font-size: 1em;
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
    width: 90%;
    margin: 0 auto;
  }
}
</style>