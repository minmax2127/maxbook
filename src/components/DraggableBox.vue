<template>
  <vue-draggable-resizable
    class="window overflow-hidden"
    :x="initialX"
    :y="initialY"
    :w="width"
    :h="height"
    :parent="true"
    :style="`display: flex; align-items: start; background: ${props.bgColor}`"
    :drag-cancel="'.cancel'"
    :drag-handle="'.handle'"
    :handles="['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']"
    :draggable="isDraggable"
    :resizable="isResizable"
  >
    <!-- handle -->
    <div
      class="handle full-width flex justify-end items-center cursor-pointer"
      :style="`outline: none; height: 2.7vh; border: none; padding: 0 0.75rem; background-color: ${props.handleColor}`"
    >
      <!-- red, yellow, blue button -->
      <div id="window-buttons" class="flex q-gutter-sm">
        <button id="red" class="window-button bg-red" @click="closeWindow()"></button>
        <button id="yellow" class="window-button bg-yellow" @click="minimizeWindow()"></button>
        <button id="green" class="window-button bg-green" @click="maximizeWindow()"></button>
      </div>
    </div>

    <!-- the actual data inside -->

    <div class="cancel" style="width: 100%; margin-top: 2.7vh">
      <!-- <div id="text" :style="`color: ${fontColor}`">Hello</div> -->
    </div>
  </vue-draggable-resizable>
</template>

<script setup>
// takes props
const props = defineProps({
  bgColor: {
    type: String,
    default: '#ffffff33',
  },
  handleColor: {
    type: String,
    default: '#ffffff80',
  },
  fontColor: {
    type: String,
    default: '00000080',
  },
})

// import necessary libraries
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/style.css'

// initialize variables
const isDraggable = ref(true)
const isResizable = ref(true)

const width = ref(0)
const height = ref(0)
const initialX = ref(50)
const initialY = ref(50)

// Store scale factors so we can recalculate properly on resize
const widthRatio = ref(0.6)
const heightRatio = ref(0.6)

// calculates proper size depending on screen size
const applyResponsiveSize = () => {
  width.value = window.innerWidth * widthRatio.value
  height.value = window.innerHeight * heightRatio.value
}

// sets size of the window
const changeWindowSize = (w, h) => {
  widthRatio.value = w
  heightRatio.value = h
  applyResponsiveSize()
}

// 3 Buttons

// red
const closeWindow = () => {
  alert('close window')
}

// yellow
const minimizeWindow = () => {
  changeWindowSize(0, 0) // example minimized size
}

// green
const maximizeWindow = () => {
  changeWindowSize(1, 1)
  initialX.value = 25
  initialY.value = 25
}

// setup of component
onMounted(() => {
  changeWindowSize(0.6, 0.6)
  window.addEventListener('resize', applyResponsiveSize)
})

onBeforeUnmount(() => {
  changeWindowSize(0.3, 0.3)
  window.removeEventListener('resize', applyResponsiveSize)
})
</script>

<style>
.window {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  transition:
    width 0.2s ease,
    height 0.2s ease;
}

.window-button {
  width: 0.7vw;
  aspect-ratio: 1;
  /* height: 0.7vh; */
  border-radius: 100px;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>

<!-- SOURCES
Vue-draggable-resizable: https://codesandbox.io/p/sandbox/vue-draggable-resizable-disable-drag-resize-forked-stpguk?file=%2Fsrc%2FApp.vue%3A1%2C1-60%2C1

-->
