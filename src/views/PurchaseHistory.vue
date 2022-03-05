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

    <!-- DETAILS DIALOG -->
    <el-dialog id="myDialog" v-model="dialogVisible" title="Courses" draggable>
      <!-- dialog body -->
      <div v-for="item in courseList" :key="item.id">
        <div class="courseRow">
          <div>{{ item.title }}</div>
          <div>${{ item.price }}</div>
        </div>
      </div>
      <!-- dialog footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >Done</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- TABLE START -->
    <div class="salesList" v-if="sales.length > 0" v-loading="isLoading">
      <el-table id="myTable" :data="sales" stripe style="width: 100%">
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
        <el-table-column min-width="200px" label="USD">
          <template #default="scope">
            <!-- DETAILS -->
            <el-button
              size="small"
              @click="handleView(scope.row.transactionId)"
            >
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
import { Course, Sale } from "@/types";
import { InfoFilled, Document } from "@element-plus/icons";
import { TableColumnCtx } from "element-plus/lib/el-table/src/table-column/defaults";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    document.title = "Purchase History | Wedemy";

    let isLoading = ref(true);
    let dialogVisible = ref(false);
    let sales = ref<Sale[]>([]);
    let courseList = ref<Course[]>([]);
    let serverError = ref("");
    let courseLoading = ref(false);

    const fetchMyPurchaseHistory = () => {
      EnrollService.getPurchaseHistory()
        .then((res) => (sales.value = res.data))
        .catch((err) => (serverError.value = err.message))
        .finally(() => (isLoading.value = false));
    };

    const fetchItemsByTransactionId = (id: string) => {
      courseLoading.value = true;
      EnrollService.getItemsByTransactionId(id)
        .then((res) => (courseList.value = res.data))
        .catch((err) => (serverError.value = err.message))
        .finally(() => (courseLoading.value = false));
    };

    /** format date */
    const formatter = (row: Sale, column: TableColumnCtx<Sale>) => {
      return new Date(row.createdAt).toDateString();
    };

    const handleView = (transactionId: string) => {
      dialogVisible.value = true;
      fetchItemsByTransactionId(transactionId);
    };

    onMounted(() => {
      fetchMyPurchaseHistory();
    });

    return {
      sales,
      courseList,
      isLoading,
      courseLoading,
      dialogVisible,
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
.salesList {
  align-self: flex-start;
  width: 80% !important;
  border: none !important;
  margin: unset;
}

.courseRow {
  display: flex;
  flex-direction: row;
  line-height: 50px;
  justify-content: space-between;
}

.el-dialog, #myDialog {
  width: 30% !important;
}

@media screen and (max-width: 600px) {
  #myTable > div > div {
    display: block;
    max-width: 100px !important;
    overflow: hidden !important;
  }

  .main-body {
    width: 100% !important;
  }

  .courseRow {
    display: flex;
    flex-direction: column;
    line-height: 30px;
    margin-bottom: 50px;
    flex-wrap: wrap;
  }

  .el-dialog, #myDialog {
    width: 80% !important;
  }
}
</style>