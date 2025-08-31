<template>
  <div class="review-card">
    <div class="row">
      <div>
        <el-avatar :size="30" :src="attachAvatarLink(props.review?.fullname)" />
      </div>
      <div>{{ props.review?.fullname }}</div>
      <div>
        <el-rate :model-value="props.review?.rating" disabled style="margin-top: -0.5em" />
      </div>
    </div>
    <div class="row">
      {{ props.review?.content }}
    </div>
    <div class="row grey">
      Updated: &nbsp;
      {{ getPrettyDate() }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from "vue";
import type { ReviewDto } from "@/interfaces/custom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const props = defineProps({
  review: {
    type: Object as PropType<ReviewDto>
  }
});

/**
 * Format the review creation date
 *
 * @return relative time passed
 */
function getPrettyDate(): string {
  return dayjs(String(props.review?.updatedAt)).fromNow();
}

const attachAvatarLink = (username?: string): string => {
  if (!username) return "";
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURI(username)}`;
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
