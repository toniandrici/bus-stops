<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="mt-3 p-3" style="background-color: #fff;">
                    <h6>Select Bus Line</h6>
                    <div @click="(event) => switchBusLine(event)" class="d-flex justify-content-start flex-wrap mb-5">
                        <button type="button" :data-value="index"
                            :class="{ 'button-selected': selectedBusline == busLine.line }"
                            v-for="(busLine, index) in getData" :key="index" class="btn btn-primary m-1">
                            {{ busLine.line }}
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <div class="row mt-3">
            <div class="col-12 col-lg-6 mb-3">
                <PlaceholderComponent :data="getBusLine.children" :title="`Bus Line: ${getBusLine.line}`" type="stop"
                    @onSelected="displayTimes" />
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <PlaceholderComponent :data="getTimes.children" :title="`Bus Stop: ${getTimes.stop}`" type="time" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue';
import PlaceholderComponent from "./common/PlaceholderComponent.vue";

export default defineComponent({
    computed: {
        ...mapGetters([
            "getData",
            "getBusLine",
            "getTimes",
            "setBusStops"
        ]),

    },
    data() {
        return {
            selectedBusline: null,
            busStops: [],
            busTimes: [],

        }
    },
    methods: {
        ...mapActions({
            displaySelectedBus: 'displaySelectedBus',
            displaySelectedTimes: 'displaySelectedTimes'
        }),
        async switchBusLine(ev: MouseEvent) {
            const target = ev.target as HTMLElement;
            if (target.dataset && target.dataset.value) {
                const value = target.dataset.value;
                this.selectedBusline = this.getData[value].line;
                await this.displaySelectedBus(value);
            }
        },
        async displayTimes(idx: number) {
            await this.displaySelectedTimes(this.getBusLine.children[idx]);
        }

    },

    components: {
        PlaceholderComponent
    }
})

</script>
<style>
.button-selected {
    background-color: #2e3e6e !important;
}
</style>