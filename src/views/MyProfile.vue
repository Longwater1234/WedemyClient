<template>
  <h3 class="cart-header">My Profile</h3>
  <div class="main-view" style="height: 70vh" v-loading="isLoading">
    <!-- START HEADER -->
    <div class="profile-header">
      <el-avatar :size="100" :src="attachAvatarLink(store.state.username)" />
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
    <!-- END OF SUMMARY -->

    <!-- START OF RECENT COURSES -->
    <div class="recently">
      <h3 class="serif-head">Your Recent Courses</h3>
      <div class="recentBox" v-if="courseList.length > 0">
        <div class="recentSingle" v-for="item in courseList" :key="item.id">
          {{ item.title }}
          <el-progress class="myprogress" :percentage="item.progress" />
        </div>
        <div @click="goToLearning()" class="recentSingle linky">View All</div>
      </div>
      <div v-else class="nodata">No data</div>
    </div>

    <!-- START OF CERTIFICATES -->
    <div class="recently">
      <h3 class="serif-head">Your Certificates</h3>
      <div class="nodata">No data</div>
    </div>
  </div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import ProfileService from "@/services/ProfileService";
import { User } from "@/types";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  inject: ["store"],
  data() {
    document.title = "My Profile | Wedemy";
    return {
      activeTab: "first",
      isLoading: true,
      summaryList: [],
      courseList: [],
      userInfo: {} as User,
    };
  },
  methods: {
    attachAvatarLink(username: string) {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
    getProfileInfo() {
      ProfileService.getUserDetails().then((res) => (this.userInfo = res.data));
      ProfileService.getUserSummary().then(
        (res) => (this.summaryList = res.data)
      );
    },
    toLower(item: string) {
      return item.toLowerCase();
    },
    getUserProgress() {
      EnrollService.getMySummary()
        .then((res) => (this.courseList = res.data))
        .catch((err) => ElMessage.error(err.message))
        .finally(() => (this.isLoading = false));
    },
    goToLearning() {
      this.$router.push("/account/learning");
    },
    viewAllOwned() {
      //TODO go to all my courses
    },
  },
  mounted() {
    this.getProfileInfo();
    this.getUserProgress();
  },
});
</script>

<style scoped>
.main-view {
  text-align: center;
  justify-content: center;
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
.myprogress {
  width: 8em;
  margin-top: 1em;
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

.titleprogress {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.viewAll button {
  color: var(--primary) !important;
}

.recently {
  width: 70%;
  text-align: left;
  margin: 0 auto;
}

.recentBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 95%;
}

.recentSingle {
  width: 10em;
  font-weight: 700;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  text-align: left;
  align-items: baseline;
  padding: 1.5em;
  margin: 1em;
  border-radius: 1em;
}

.recentSingle:hover {
  background-color: rgb(202, 202, 202);
  cursor: pointer;
  border: white solid 1px;
}

.recentSingle.linky {
  color: var(--primary) !important;
  width: 7em !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (max-width: 770px) {
  .main-view {
    padding: 0 2% 0 2%;
  }

  .second-form {
    width: 90% !important;
  }

  .summary {
    width: 90%;
    margin: 0 auto;
  }

  .mysub {
    font-size: 12px;
  }

  .myvalue {
    font-size: 1.5em;
  }

  .titleprogress {
    width: 90%;
  }

  .recently {
    width: 100%;
    margin-left: 1em;
    text-align: left;
  }

  .recentBox {
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  .recentSingle {
    width: 200px !important;
  }
}
</style>