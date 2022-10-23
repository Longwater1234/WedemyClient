<!-- Copyright (c) 2022. Davis Tibbz. Github: https://github.com/longwater1234. MIT License  -->
<template>
  <h3 class="cart-header">My Purchase History</h3>
  <div class="main-view" style="height: 70vh">
    <el-alert
      v-if="serverError"
      :title="serverError"
      type="error"
      :closable="false"
    >
    </el-alert>
    
    <div class="mobile-only">
      <small>Scroll horizontally to view more columns</small>
    </div>

    <!-- DETAILS DIALOG -->
    <el-dialog v-model="dialogVisible" title="Items" draggable>
      <!-- dialog body -->
      <div v-for="item in courseList" :key="item.id">
        <div class="courseRow">
          <div>{{ item.title }}</div>
          <div>${{ item.price }}</div>
        </div>
      </div>
      <!-- dialog footer -->
      <template #footer>
        <el-button type="primary" @click="dialogVisible = false">
          Done
        </el-button>
      </template>
    </el-dialog>
    <!-- END OF DIALOG -->

    <!-- TABLE START -->

    <div class="salesList" v-if="sales.length > 0" v-loading="isLoading">
      <el-table id="myTable" :data="sales" stripe style="width: 100%">
        <el-table-column
          prop="transactionId"
          label="Transcation ID"
          width="180"
        />
        <el-table-column
          prop="createdAt"
          label="Date"
          :formatter="formatter"
          width="180"
        />
        <el-table-column
          prop="totalPaid"
          min-width="150px"
          label="Total Paid (USD)"
        />
        <el-table-column
          prop="paymentMethod"
          min-width="150px"
          label="Payment Method"
        />
        <el-table-column
          prop="numOfItems"
          min-width="150px"
          label="Items Bought"
        />
        <el-table-column min-width="100px" label="">
          <template #default="scope">
            <!-- VIEW DETAILS -->
            <el-button
              size="small"
              @click="handleView(scope.row.transactionId)"
            >
              <info-filled style="width: 1em" /> Details
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- TABLE END -->

    <!-- if nothing in PurchaseHistory  -->
    <div v-else class="empty-view">
      <el-empty description="You haven't bought anything yet!"></el-empty>
      <router-link to="/">
        <el-button plain class="btn purple" style="width: 15em">
          Keep shopping
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { Course, Sale } from "@/types";
import { InfoFilled } from "@element-plus/icons-vue";
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
        .then((res) => (sales.value = res.data.content))
        .catch((err) => (serverError.value = err.message))
        .finally(() => (isLoading.value = false));
    };

    /** format date */
    const formatter = (row: Sale) => {
      return new Date(row.createdAt).toDateString();
    };

    /** fetch specific transaction by ID */
    const handleView = (id: string) => {
      dialogVisible.value = true;
      courseLoading.value = true;
      EnrollService.getItemsByTransactionId(id)
        .then((res) => (courseList.value = res.data.content))
        .catch((err) => (serverError.value = err.message))
        .finally(() => (courseLoading.value = false));
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
  },
});
</script>

<style scoped>
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

.el-dialog {
  width: 30% !important;
}

.link-receipt {
  text-decoration: none !important;
  margin-left: 1em;
}

.empty-view {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

@media screen and (max-width: 600px) {
  #myTable > div > div {
    display: block;
    /* max-width: 100px !important; */
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

  .el-dialog {
    width: 80% !important;
  }
}
</style>