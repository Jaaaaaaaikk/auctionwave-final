<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 modal-background">
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-semibold mb-4">Notification From: {{ sender }}</h2>
            <div class="relative">
            </div>
            <span class="w-full p-2 mb-4 border rounded">Date: {{ formatDate(date) }}</span>
            <textarea class="w-full h-32 p-2 border border-gray-300 rounded mt-4" disabled>{{ message }}</textarea>
            <div class="flex justify-end mt-4 space-x-2">
                <button @click="$emit('closeAddMessageModal')"
                    class="bg-gray-300 hover:bg-custom-bluegreen hover:bg-opacity-40 hover:text-black text-white py-2 px-4 rounded">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['sender', 'date', 'message']);

const to = ref('');
const emit = defineEmits();

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

</script>

<style scoped>
/* Add any additional styling you might want */
</style>