<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h3 class="cart-header">My Profile</h3>
  <div class="main-view" style="height: 80vh" v-loading="isLoading">
    <!-- START HEADER -->
    <div class="profile-header">
      <el-avatar :size="100" :src="attachAvatarLink(store.fullname)" />
      <p class="username">
        {{ userInfo.fullname }}
        <el-icon class="myEdit" @click="showEditDialog()"><Edit /></el-icon>
      </p>
      <div class="joined">{{ userInfo.email }}</div>
    </div>
    <!-- END OF HEADER -->

    <div class="summary">
      <hr />
      <el-row :gutter="5" justify="space-around">
        <el-col v-for="item in summaryList" :key="item.title" :span="4">
          <div class="my-title">{{ toLower(item.title) }}</div>
          <div class="myvalue">{{ item.value }}</div>
          <div class="my-sub">{{ item.subtitle }}</div>
        </el-col>
      </el-row>
      <hr />
    </div>
    <!-- END OF SUMMARY -->

    <!-- START OF RECENT COURSES -->
    <div class="recently">
      <h3 class="serif-head">Your Recent Courses</h3>
      <div class="recentBox" v-if="courseList.length > 0">
        <div class="recentSingle" v-for="item in courseList" :key="item.id" @click="goToCourse(item.courseId)">
          {{ item.title }}
          <el-progress class="myprogress" :percentage="item.progress" />
        </div>
        <div @click="goToLearning()" class="recentSingle linky" v-if="courseList.length > 2">View All</div>
      </div>
      <div v-else class="nodata">No data</div>
    </div>

    <!-- START OF CERTIFICATES -->
    <div class="recently">
      <h3 class="serif-head">Your Certificates</h3>
      <div class="nodata">(TODO: Needs a cloud storage service like AWS S3 or similar)</div>
    </div>

    <!-- EDIT PROFILE DIALOG -->
    <el-dialog v-model="dialogShow" title="Update your Profile" width="40%">
      <el-form :model="userInfo" @submit.prevent="updateProfile" size="default">
        <el-form-item label="Your name">
          <el-input v-model="userInfo.fullname" type="text" maxlength="70" style="width: 60% !important" />
        </el-form-item>
        <el-button type="primary" :loading="formLoading" native-type="submit"> Submit </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import EnrollService from "@/service/EnrollService";
import ProfileService from "@/service/ProfileService";
import type { User } from "@/interfaces/wedemy";
import { ElMessage } from "element-plus";
import { Edit } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import type { EnrollmentDto, Summary } from "@/interfaces/custom";
import { useRouter } from "vue-router";
import { useStudentStore } from "@/stores";
import { handleApiError } from "@/util/http_util";

const router = useRouter();
const store = useStudentStore();

const isLoading = ref(true);
const formLoading = ref(false);
const dialogShow = ref(false);
const summaryList = ref<Summary[]>([]);
const courseList = ref<EnrollmentDto[]>([]);
const userInfo: Partial<User> = reactive({});

function attachAvatarLink(username: string) {
  return `https://avatars.dicebear.com/api/initials/${username}.svg`;
}
function getProfileInfo() {
  ProfileService.getUserDetails().then(res => Object.assign(userInfo, res.data));
  ProfileService.getUserSummary().then(res => (summaryList.value = res.data));
}

function toLower(item?: string) {
  return String(item).toLowerCase();
}

function getUserProgress() {
  EnrollService.getMySummary()
    .then(res => (courseList.value = res.data))
    .catch(err => ElMessage.error(err.message))
    .finally(() => (isLoading.value = false));
}
function goToLearning() {
  router.push("/account/learning");
}

function showEditDialog() {
  dialogShow.value = !dialogShow.value;
}

function updateProfile() {
  formLoading.value = true;
  ProfileService.updateMine(userInfo)
    .then(res => {
      Object.assign(userInfo, res.data);
      dialogShow.value = false;
      store.getLoginStatus();
      ElMessage.success("Your profile has been updated!");
    })
    .catch(err => handleApiError(err));
}

function goToCourse(id: number) {
  router.push({ name: "ResumeCourse", params: { courseId: id } });
}

onMounted(() => {
  document.title = "My Profile | Wedemy";
  getProfileInfo();
  getUserProgress();
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

.myEdit {
  color: var(--primary);
  cursor: pointer;
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

.my-title {
  font-size: 1em;
  font-variant: small-caps;
}

.my-sub {
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
  margin: 2em auto;
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
    padding: 0 2%;
  }

  .second-form {
    width: 90% !important;
  }

  .summary {
    width: 90%;
    margin: 0 auto;
  }

  .my-sub {
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
