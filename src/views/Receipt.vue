<template>
  <!-- THIS PAGE HAS BEEN DISABLED -->
  <!-- IT IS TOO DAMN EXPENSIVE TO RENDER THE RECIEPT -->

  <el-card id="containerBox" v-loading.fullscreen.lock="isLoading">
    <el-row>
      <el-col :span="10">
        <p id="recieptNo">Reciept #: {{ recieptObject.recieptNo }}</p>
      </el-col>
      <el-col :span="13" :style="{ textAlign: 'right' }">
        <el-button @click="printReciept">
          <printer style="width: 1em" /> Print
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" :style="{ marginTop: '3em' }">
      <el-col :span="12">
        <img
          id="logo1"
          src="@/assets/logo_final_purple.png"
          alt="Wedemy"
          class="mylogo"
        />
      </el-col>
      <el-col :span="11" :style="{ textAlign: 'right' }">
        <h2 class="serif-head">Reciept</h2>
        <p>Purchase Date: {{ formatDate(recieptObject.paidAt) }}</p>
        <p>Payment Method: {{ recieptObject.paymentMethod }}</p>
        <p>Sale #: {{ recieptObject.transactionNo }}</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10">
        <h2>Provided by:</h2>
        <div>{{ recieptObject.merchantName }}</div>
        <div>123rd Street</div>
        <div>Planet Earth</div>
      </el-col>

      <el-col :span="13" :style="{ textAlign: 'right' }">
        <h2>Sold to:</h2>
        <div>{{ recieptObject.customerName }}</div>
        <div>{{ recieptObject.customerEmail }}</div>
      </el-col>
    </el-row>

    <!-- TABLE START -->
    <div class="tableStart">
      <el-table
        :data="recieptObject.orderItems"
        :table-layout="auto"
        show-summary
        sum-text="Total"
        style="width: 100%"
      >
        <el-table-column prop="title" label="Item" width="320" />
        <el-table-column prop="price" label="Unit Price (USD)" width="250" />
        <el-table-column prop="" label="Quantity" width="250">
          <template #default>
            <p>1</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script lang="ts">
import EnrollService from "@/services/EnrollService";
import { Printer } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    document.title = "Reciept | Wedemy";
    return {
      transactionId: "",
      isLoading: true,
      recieptObject: {
        customerName: "",
        customerEmail: "",
        paidAt: "",
        transactionNo: "",
        merchantName: "Wedemy Inc.",
        totalPaid: 0.0,
        transactionStatus: "SETTLED",
        currency: "USD",
        paymentMethod: "",
        recieptNo: "",
        orderItems: [],
      },
    };
  },
  methods: {
    formatDate(date: string) {
      return new Date(date).toDateString();
    },
    printReciept() {
      window.print();
    },
  },
  mounted() {
    let { id } = this.$route.params;
    this.transactionId = id ? id.toString() : "";
    EnrollService.getReciept(this.transactionId)
      .then((res) => (this.recieptObject = res.data))
      .catch((error) => ElMessage.error(error.message))
      .finally(() => (this.isLoading = false));
  },
  components: {
    Printer,
  },
});
</script>

<style>
#containerBox {
  margin: 0 auto;
  /* border: 1px solid black; */
  font-size: 0.9rem;
  display: flex;
  width: 70%;
  flex-direction: column;
}
#logo1 {
  width: 18em;
  height: auto;
}

.tableStart {
  /* margin-top: 5em; */
  margin: 5em auto;
  align-self: center;
  align-items: center;
  width: 100vw;
}

#recieptNo {
  font-size: small;
  font-family: monospace;
}

@media screen and (max-width: 770px) {
  #containerBox {
    width: 90%;
  }
}
</style>