<template>
  <div>
    <h1>Add New Objectives</h1>
    <div>
      <button class="submitBtn" @click="handleFlush" type="submit" :disabled="isLoading">
        Flush to Server
      </button>
    </div>
    <form action="" @submit.prevent="addEntry">
      <div style="width: 30%"></div>
      <ul>
        <li v-for="(item, index) in objArr" :key="index">
          {{ item }}
        </li>
      </ul>
      <div>
        <label for="">Course Id: </label>
        <br />
        <input
          type="number"
          v-model="courseId"
          placeholder="course id"
          required
          min="10010"
        />
      </div>
      <div>
        <label for="">Objective:</label>
        <br />
        <input
          class="myInput"
          type="text"
          maxlength="200"
          required
          v-model.trim="objective"
        />
        <button :size="20">
          <circle-plus-filled style="width: 2em" />
        </button>
      </div>
      <br />
    </form>
  </div>
</template>

<script lang="ts">
import axiosconfig from "@/axiosconfig";
import { CirclePlusFilled } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Objectives",
  data() {
    document.title = "Add Course Objectives | Wedemy";
    return {
      courseId: 0,
      objective: "",
      isLoading: false,
      objArr: new Array<string>(),
    };
  },
  components: {
    CirclePlusFilled,
  },
  methods: {
    handleFlush() {
      const self = this;
      const payLoad = {
        courseId: self.courseId,
        objectives: self.objArr,
      };
      console.log(JSON.stringify(self.objArr));
      self.isLoading = true;
      axiosconfig
        .post("/objectives/add", payLoad)
        .then((res) => {
          ElMessage.success(res.data.message);
        })
        .catch((err) => {
          ElMessage.error(err.message);
        })
        .finally(() => {
          self.objArr = [];
          self.objective = "";
          self.isLoading = false;
        });
    },
    addEntry() {
      this.objArr.push(this.objective);
      this.objective = "";
    },
  },
});
</script>

<style>
.submitBtn {
  height: 40px;
  background-color: yellow;
}

.myInput {
  width: 40%;
  height: 2em;
}
</style>