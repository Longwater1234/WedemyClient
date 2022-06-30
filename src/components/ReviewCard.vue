<template>
  <div class="review-card">
    <div class="row">
      <div>
        <el-avatar :size="30" :src="attachAvatarLink(review.fullname)" />
      </div>
      <div>{{ review.fullname }}</div>
      <div>
        <el-rate v-model="review.rating" disabled style="margin-top: -0.5em" />
      </div>
    </div>
    <div class="row">
      {{ review.content }}
    </div>
    <div class="row grey">
      <Timeago :datetime="review.createdAt" />
    </div>
  </div>
</template>

<script>
import { StarFilled } from "@element-plus/icons-vue";
import { Timeago } from "vue2-timeago";

export default {
  data() {
    return {};
  },
  props: {
    review: {
      type: Object,
      default: {},
    },
  },
  components: {
    StarFilled,
    Timeago,
  },
  methods: {
    /** format date */
    formatDate: (row) => {
      return new Date(row).toDateString();
    },

    attachAvatarLink: (username) => {
      return `https://avatars.dicebear.com/api/initials/${username}.svg`;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  margin: 0.5em 0;
  justify-content: flex-start;
}

.row div {
  margin-right: 0.5em !important;
}

.review-card {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-top: rgba(0, 0, 0, 0.2) solid 1px;
  border-bottom: rgba(0, 0, 0, 0.2) solid 1px;
  padding: 0.5em 0;
}

.grey {
  color: gray;
}

.mystar {
  width: 1em;
  color: #ffa500;
}
</style>