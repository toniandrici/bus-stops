<template>
    <div class="w-100" style="background-color: #fff;">
        <div class="input-group w-50">
            <input type="text" class="form-control" v-model="inputValue" placeholder="Search">
            <button class="btn btn-secondary" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg></button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            inputValue: ""
        }
    },
    watch: {
        inputValue(newVal) {
            this.$emit('onInputUpdate', newVal);
        }
    }
})
</script>