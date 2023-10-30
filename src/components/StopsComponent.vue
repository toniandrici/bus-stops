<template>
    <div class="row mt-3">
        <div class="col-12">
            <SearchComponent @onInputUpdate="inputUpdate"/>
        </div>
        <div  class="col-12">
            <PlaceholderComponent :data="allStops" :title="`Bus Stops`" />
        </div>
    </div>
</template>
<script lang="ts">

import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import PlaceholderComponent from "./common/PlaceholderComponent.vue";
import SearchComponent from './common/SearchComponent.vue';

export default defineComponent({
    computed: {
        ...mapGetters([
            "getBusStops"
        ]),

    },
    data() {

        return {
            allStops:  [] ,
            inputValue: ""
        }
    },
    components: {
        PlaceholderComponent,
        SearchComponent
    },
    created() {
        this.allStops = this.getBusStops;
    },
    methods: {
        inputUpdate(newVal:string) {
            this.allStops = this.getBusStops.filter((el:string) => el.includes(newVal))
        }
    }

})
</script>