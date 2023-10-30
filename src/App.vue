<template>
  <div class="container">
    <div class="row">
        <div class="col-12">
            <h3 class="title">Timetable</h3>
        <TabComponent :tabs="tabs">
          <template v-slot:default="slotProps">
            <div v-if="slotProps.tab">
              <content />
            </div>
          </template>
        </TabComponent>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import {  mapActions } from 'vuex';

import { defineComponent } from 'vue';
import TabComponent from "./components/TabComponent.vue";
import BusLinesComponent from './components/BusLinesComponent.vue';
import StopsComponent from './components/StopsComponent.vue';


export default defineComponent({
    methods: {
        ...mapActions({
            fetchData: 'fetchData',
        }),
    },
 data() {
  return {
    tabs: [
        { label: 'Lines', content: BusLinesComponent  },
        { label: 'Stops', content: StopsComponent },
      ],
  }
 },
    created() {
     this.fetchData();
  },
  components: {
    TabComponent,
  },
});
</script>
<style >
body {
    background-color: #f1f2f7 !important;
}
.title {
  margin: 20px 0;
}
</style>