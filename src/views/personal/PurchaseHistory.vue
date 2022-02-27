<template>
  <div>
    <h3>Purchase History</h3>
  </div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      key: "value",
    };
  },
  methods: {
    fetchMyPurchaseHistory() {
      EnrollService.getAllOwnedItems()
        .then((res) => console.log(res.data))
        .catch((err) => ElMessage.error(err.message));
    },
  },
  mounted() {
    this.fetchMyPurchaseHistory()
  },
});
</script>

<style scoped>
</style>