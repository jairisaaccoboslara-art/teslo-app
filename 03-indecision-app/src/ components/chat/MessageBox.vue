<template>
  <div class="bg-white p-4 flex items-center">
    <input
      type="text"
      placeholder="Haz tu pregunta..."
      class="flex-1 border rounded-full px-4 py-2 focus:outline-none"
      v-model="message"
      @keypress.enter="sendMessage"
    />
    <button
      class="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
      @click="sendMessage"
    >
     
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits<{
  sendMessage: [text: string];
}>();

const message = ref('');

const sendMessage = () => {
  if (!message.value) return;

  emits('sendMessage', message.value);

  message.value = '';
};
</script>