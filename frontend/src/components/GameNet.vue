<template>
    <!-- The net can be a series of small rectangles, so you might loop through them in the future if needed -->
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
/* Add any specific styles for the net here */
</style>
