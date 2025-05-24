<template>
  <!-- <q-page class="q-ml-md q-mt-md border text-primary" id="terminal-page"> -->
  <vue-resizable>
    <div
      id="terminal"
      ref="terminal"
      @mousedown="startDrag"
      :style="{
        position: 'absolute',
        top: pos.y + 'px',
        left: pos.x + 'px',
        cursor: 'move',
        border: '1px solid black',
      }"
    >
      <LineInput @getCommand="enterCommand" />
      <div id="output"></div>
    </div>
  </vue-resizable>
  <!-- </q-page> -->
</template>

<script setup>
import { ref, onMounted, createVNode, render } from 'vue'
import LineInput from '/src/components/LineInput.vue'
import HelpOutput from '/src/components/commands/HelpOutput.vue'
import TextOutput from '/src/components/commands/TextOutput.vue'
import { useRouter } from 'vue-router'

const pos = ref({ x: 100, y: 100 }) // Initial position
const dragging = ref(false)
const offset = ref({ x: 0, y: 0 })
const terminal = ref(null)
const router = useRouter()

let outputContainer = null

onMounted(() => {
  outputContainer = document.getElementById('output')

  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
})

function startDrag(e) {
  dragging.value = true
  offset.value = {
    x: e.clientX - pos.value.x,
    y: e.clientY - pos.value.y,
  }
}

function drag(e) {
  if (dragging.value) {
    pos.value = {
      x: e.clientX - offset.value.x,
      y: e.clientY - offset.value.y,
    }
  }
}

function stopDrag() {
  dragging.value = false
}

const enterCommand = (command) => {
  console.log('Entered command:', command)
  if (command.trim() == 'help') {
    appendNewElement(outputContainer, 'div', HelpOutput)
  } else if (command.trim() == 'whois') {
    appendNewElement(outputContainer, 'div', TextOutput, {
      text: "Hi! I am Maxine Nicole B. Bernales, ang that's my tomboy ng Ateneo Avenue",
    })
  } else if (command.trim() == 'clear') {
    router.go()
  } else if (command.trim() == 'maxine') {
    appendNewElement(outputContainer, 'div', TextOutput, {
      text: 'Did somebody call me??!!!',
    })
  } else {
    appendNewElement(outputContainer, 'div', TextOutput, {
      text: `The command "${command}" is not found!`,
    })
  }

  appendNewElement(outputContainer, 'div', LineInput, {
    onGetCommand: enterCommand,
  })
}

const appendNewElement = (container, element_type, component, args = {}) => {
  const mountPoint = document.createElement('div')
  container.appendChild(mountPoint)

  const vnode = createVNode(component, args)
  render(vnode, mountPoint)
}
</script>
