<template>
  <div class="main-body" style="height: 80vh">
    <h2 class="serif-head">Purchase History</h2>

    <el-alert
      v-if="serverError"
      :title="serverError"
      type="error"
      :closable="false"
    >
    </el-alert>

    <!-- TABLE START -->
    <div class="course-box" v-if="sales.length > 0" v-loading="isLoading">
      <el-table :data="sales" stripe style="width: 100%">
        <el-table-column
          prop="transactionId"
          label="Transaction ID"
          width="180"
        />
        <el-table-column
          prop="createdAt"
          label="Date"
          :formatter="formatter"
          width="180"
        />
        <el-table-column prop="totalPaid" label="Total Paid (USD)" />
        <el-table-column prop="paymentMethod" label="Payment Method" />
        <el-table-column prop="numOfItems" label="Items Bought" />
        <el-table-column min-width="200px" label="">
          <template #default="scope">
            <!-- DETAILS -->
            <el-button size="small" @click="handleView(scope.$index)">
              <info-filled style="width: 1em" /> Details
            </el-button>
            <!-- RECIEPT -->
            <el-button size="small">
              <document style="width: 1em" /> Receipt
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- TABLE END -->
  </div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { Sale } from "@/types";
import { InfoFilled, Document } from "@element-plus/icons";
import { TableColumnCtx } from "element-plus/lib/el-table/src/table-column/defaults";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    document.title = "Purchase History | Wedemy";

    let isLoading = ref(true);
    let sales = ref<Sale[]>([]);
    let serverError = ref("");

    const fetchMyPurchaseHistory = () => {
      EnrollService.getAllOwnedItems()
        .then((res) => (sales.value = res.data))
        .catch((err) => (serverError.value = err.message))
        .finally(() => (isLoading.value = false));
    };

    /** format date */
    const formatter = (row: Sale, column: TableColumnCtx<Sale>) => {
      return new Date(row.createdAt).toDateString();
    };

    const handleView = (index: any, row: any) => {
      console.log(index);
    };

    onMounted(() => {
      fetchMyPurchaseHistory();
    });

    return {
      sales,
      isLoading,
      serverError,
      formatter,
      handleView,
    };
  },
  components: {
    InfoFilled,
    Document,
  },
});
</script>

<style>
.course-box {
  align-self: flex-start;
  width: 80% !important;
  border: none !important;
  margin: unset;
}
</style>