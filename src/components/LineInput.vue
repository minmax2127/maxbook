<template>
  <div id="line" class="flex align-end q-gutter-md">
    <p>{{ props.laptopName }}</p>
    <div v-if="isInput">
      <input
        ref="inputRef"
        class="full-width"
        type="text"
        style="flex"
        v-model="command"
        @keydown.enter="handleEnter"
      />
    </div>
    <div v-else>
      <p>{{ command }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  laptopName: {
    type: String,
    default: 'intruder@Intruder-MaxBook-Pro ~ % ',
  },
})

const isInput = ref(true)
const emit = defineEmits(['getCommand'])
const command = ref('')
const inputRef = ref(null)

onMounted(async () => {
  if (isInput.value) {
    await nextTick()
    inputRef.value?.focus()
  }
})

const handleEnter = () => {
  emit('getCommand', command.value)
  isInput.value = false
}
</script>
