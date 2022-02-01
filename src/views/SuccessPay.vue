<template>
  <div style="text-align: center">
    <h2>Thank You!</h2>
    <h2>You have Succesfully paid USD {{ totalAmount }}</h2>
    <h3>You can start learning now!</h3>
    <div style="width: 200px; text-align center">
      <el-button @click="goToMyCourses()" class="btn purple">
        Go to My Courses
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      totalAmount: 0.0,
    };
  },
  methods: {
    goToMyCourses() {
    }
  },
  mounted() {},
});
</script>

<style scoped>
</style>