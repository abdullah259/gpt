
<template>
    <rect :x="x" :y="y" :width="width" :height="height" :fill="color" />
</template>

<script lang="ts">
export default {
    props: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        color: String
    }
}
</script>

<style scoped>
/* Add any specific styles for the paddle here */
</style>
