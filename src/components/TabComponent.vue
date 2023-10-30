<template>
  <div>
    <ul class="nav nav-underline " id="myTabs" role="tablist">
      <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
        <span
          class="nav-link cursor-pointer"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
          data-bs-toggle="tab"

          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          {{ tab.label }}
        </span>
      </li>
    </ul>
    <div class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :id="'tab' + index"
        class="tab-pane"
        :class="{ active: activeTab === index }"
        role="tabpanel"
      >
        <slot v-if="activeTab == 0" :name="tab.label">
          <BusLinesComponent />
        </slot>
        <slot v-if="activeTab == 1" :name="'Stops'">
          <StopsComponent />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BusLinesComponent from "./BusLinesComponent.vue"
import StopsComponent from "./StopsComponent.vue"
export default defineComponent({
  props: {
    tabs: Array,
  },
  data() {
    return {
      activeTab: 0,
    };
  },

  components: {
    BusLinesComponent,
    StopsComponent
  }
});
</script>

<style>
/* Custom CSS for the underline effect */

.nav-link.active {
  border: none;
  border-bottom: 2px solid #007bff; /* Change the color as desired */
}
.nav-underline {
  background-color: #fff;
 
}
.nav-item {
  padding: 5px 0;
}
.cursor-pointer {
  cursor: pointer;
}
</style>