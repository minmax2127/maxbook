<template>
  <p v-for="(command, index) in commandList" :key="index" class="q-ml-md">
    {{ command.name }} - {{ command.description }}
  </p>
</template>

<script setup>
import commands from '/src/data/commands.js'
import { ref } from 'vue'
const commandList = ref(commands)

console.log(commands)
</script>
