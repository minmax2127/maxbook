<template>
  <q-page id="main-page">
    <DraggableBox bgColor="#ffffff33" />
    <PopUp />
  </q-page>
</template>

<style>
#main-page {
  background-image: url('/src/assets/images/macBG.png');
  padding: 0;
}
</style>

<script setup>
import DraggableBox from '/src/components/DraggableBox.vue'
</script>
