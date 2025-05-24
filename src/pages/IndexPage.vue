<template>
  <q-page class="">
    <TerminalWindow :key="componentKey" />
    <!-- <button @click="forceRerender">MAXINE NICOLE</button>
    <PopUp /> -->
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import TerminalWindow from 'src/components/TerminalWindow.vue'
// import PopUp from 'src/components/windows/PopUp.vue'

const componentKey = ref(0)

// const forceRerender = () => {
//   componentKey.value += 1
// }

// import PopUp from 'src/components/windows/PopUp.vue'
</script>
