<template>
  <div class="position-relative ratio ratio-4x3 rounded-3 overflow-auto" style="background-color: #fff;"
    :class="{ 'multiple-dashed-border-box': !data }">
    <div v-if="!data" class="d-flex justify-content-center align-items-center">{{ defaultMessage }}</div>
    <div v-else class="">
      <ul  class="list-group list-group-flush relative mt-10">
        <li class="title ">{{ title }}</li>
        <li class="subtitle ">{{ getTypeLabel(type) }} </li>
        <li v-for="(item, index) in data" :key="index" :class="{ 'text-primary': selectedIdx == index }"
          class="list-group-item cursor-pointer" @click="clickHandler(index)">
          {{ getPropertyValue(item, type) || item }}
        </li>
      </ul>
  </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    data: Array,
    type: {
      type: String,
      default: ''
    },
    title: String,
    isSearch: Boolean
  },
  data() {
    return {
      defaultMessage: "Please select the bus line first",
      selectedIdx: null as number | null,
    }
  },
  methods: {
    clickHandler(index: number) {
      this.selectedIdx = index;
      if (this.type === 'stop') this.$emit('onSelected', index);
    },
    getTypeLabel(type: string): string {
      // Add labels for specific types here
      switch (type) {
        case 'stop':
          return 'Bus Stops';
        case 'time':
          return 'Time';
        default:
          return '';
      }
    },
    getPropertyValue(item: any, type: string): any {
      if (type && type in item) {
        return item[type];
      }
      return item;
    },
  },
});
</script>
<style scoped>
.multiple-dashed-border-box {
  background-image: repeating-linear-gradient(0deg, #9a9da4, #9a9da4 21px, transparent 21px, transparent 31px, #9a9da4 31px), repeating-linear-gradient(90deg, #9a9da4, #9a9da4 21px, transparent 21px, transparent 31px, #9a9da4 31px), repeating-linear-gradient(180deg, #9a9da4, #9a9da4 21px, transparent 21px, transparent 31px, #9a9da4 31px), repeating-linear-gradient(270deg, #9a9da4, #9a9da4 21px, transparent 21px, transparent 31px, #9a9da4 31px);
  background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
}

.cursor-pointer {
  cursor: pointer;
}
.title {
  font-weight: bold;
  padding-left: 15px;
}
.subtitle {
  font-weight: bold;
  padding-left: 15px;
}
</style>