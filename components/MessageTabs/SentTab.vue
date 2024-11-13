<template>
    <div class="flex-1 px-2 py-3">
        <h1 class="text-center my-4">
            <strong>SENT TAB</strong>
        </h1>
        <div class="bg-gray-100 mb-6">
            <ul>
                <span v-if="messages.length === 0" class="text-center px-2">No Sent
                    Messages.</span>

                <li v-else v-for="(message, index) in messages" :key="message.message_id"
                    @mouseenter="setMessageHover(message.message_id, true)"
                    @mouseleave="setMessageHover(message.message_id, false)"
                    class="flex items-center border-y hover:bg-gray-200 px-2">
                    <div class="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
                        <div class="flex items-center ml-4">
                            <!-- Message Info -->
                            <span class="w-56 pr-2 truncate mx-4">To: {{ message.recipient_name }}</span>
                            <span class="w-64 truncate mx-4">{{ message.subject }}</span>
                            <span class="mx-4">-</span>
                            <span class="w-96 text-gray-600 text-sm truncate mx-4">{{ message.message }}</span>
                        </div>
                        <div class="w-32 flex items-center justify-end">
                            <div v-if="hoverStates[message.message_id]" class="flex items-center space-x-2">
                                <!-- Delete Button -->
                                <button title="Delete" @click="deleteMessage(message.message_id)">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="text-gray-500 hover:text-custom-bluegreen h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                            <span v-if="!hoverStates[message.message_id]" class="text-sm text-gray-500">{{
                                formatDate(message.created_at) }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const messages = ref([]);
const hoverStates = ref({});


const fetchUserSent = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1800));
        const response = await axios.get('/api/messages/fetch-message-user-sent');
        messages.value = response.data.messages;
    } catch (error) {
        console.error('Error fetching sent messages:', error);
    }
}


// Optional: Define methods for delete and mark as unread
const deleteMessage = async (messageId) => {
    // Implement delete message logic here
    console.log(`Delete message with ID: ${messageId}`);
};

const setMessageHover = (messageId, isHovered) => {
    hoverStates.value[messageId] = isHovered;
};

// Utility function to format the date
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
    fetchUserSent();
});
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>
