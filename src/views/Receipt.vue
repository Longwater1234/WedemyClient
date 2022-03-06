<template>
  <div v-loading.fullscreen.lock="isLoading">
    <h2>Reciept</h2>
  </div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    document.title = "Reciept | Wedemy";
    return {
      transactionId: "",
      isLoading: true,
    };
  },
  methods: {},
  mounted() {
    let { id } = this.$route.params;
    this.transactionId = id ? id.toString() : "";
    EnrollService.getReciept(this.transactionId)
      .catch((error) => ElMessage.error(error.message))
      .finally(() => (this.isLoading = false));
  },
});
</script>

<style scoped>
</style>