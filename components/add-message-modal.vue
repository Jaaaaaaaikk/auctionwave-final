<template>
    <div class="fixed inset-0 flex items-center justify-center shadow-lg">
        <div class="absolute bottom-0 right-0 mr-14 rounded-t-lg shadow-2xl bg-white">
            <div class="bg-custom-bluegreen hover rounded-t-lg h-10 flex justify-between items-center mb-2">
                <h2 class="text-sm text-white pl-2 pt-4 font-semibold mb-4">Compose a New Message</h2>
                <div>
                    <!-- Close Button -->
                    <button @click="$emit('closeAddMessageModal')"
                        class="hover:bg-custom-white-green hover:bg-opacity-50 text-white p-1 mr-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                            stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="p-2">
                <div class="relative">
                    <input v-model="to" @input="debouncedSearchUsers" placeholder="To: name or email..."
                        class="w-full p-2 mb-2 border rounded" required autocomplete="off" />
                    <ul v-if="filteredUsers.length"
                        class="absolute bg-white border border-gray-300 rounded shadow-lg w-full mt-1">
                        <li v-for="user in filteredUsers" :key="user.email" @click="selectUser(user)"
                            class="p-2 hover:bg-gray-200 cursor-pointer">
                            <strong>{{ user.firstname }} {{ user.lastname }}</strong>
                        </li>
                    </ul>
                </div>

                <input v-model="subject" placeholder="Subject:" class="w-full p-2 mb-2 border rounded" />

                <textarea v-model="message" class="w-full h-32 p-2 border border-gray-300 rounded"
                    placeholder="Write your message here..."></textarea>
                <div class="rounded-t-lg h-15 flex justify-start p-2 mb-2">
                    <button @click="sendMessage"
                        class="bg-custom-bluegreen hover:bg-opacity-40 hover:text-black text-white py-0.5 px-4 rounded">
                        Send
                    </button>
                    <button class="custom-upload pl-2" @click="triggerFileUpload">
                        <svg class="hover:text-custom-bluegreen w-6 h-6 text-gray-800 dark:text-black"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
                        </svg>
                        <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*"
                            class="hidden" />
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useInboxSocketStore } from '@/stores/socketStore';

const to = ref('');
const emit = defineEmits();
const subject = ref('');
const message = ref('');
const filteredUsers = ref([]);
const selectedUser = ref(null); // Store selected user object
const socketStore = useInboxSocketStore();
const fileInput = ref(null);

// Trigger hidden file input
const triggerFileUpload = () => {
    fileInput.value?.click();
};

// Handle image upload with validation and preview
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];

        // Validate file type
        if (!validTypes.includes(file.type)) {
            alert("Please upload an image in PNG, JPG, JPEG, or GIF format.");
            return;
        }

        // Create a local URL for the image preview
        setTimeout(() => {
            const localImageUrl = URL.createObjectURL(file);
            uploadedImage.value = localImageUrl;
        }, 0); // Defer to avoid blocking the event handler
    }
};

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Function to search users based on the input in the "To" field
const searchUsers = async () => {
    if (to.value.length < 1) {
        filteredUsers.value = [];
        return;
    }

    try {
        const response = await axios.get('/api/messages/search-user-suggestion', {
            params: { q: to.value }
        });
        filteredUsers.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const debouncedSearchUsers = debounce(searchUsers, 300);

const selectUser = (user) => {
    to.value = `${user.firstname} ${user.lastname}`;
    selectedUser.value = user; // Store the selected user
    filteredUsers.value = [];
};

// Function to send the message
const sendMessage = async () => {
    if (!selectedUser.value) {
        alert('Please select a valid recipient from the suggestions.');
        return;
    }

    if (!subject.value.trim()) {
        alert('Subject cannot be empty.');
        return;
    }

    if (!message.value.trim()) {
        alert('Message cannot be empty.');
        return;
    }



    try {
        const response = await axios.post('/api/messages/compose-message', {
            recipientId: selectedUser.value.user_id, // Assuming user_id is available in the selected user object
            subject: subject.value,
            messageBody: message.value
        });

        // Emit the message to the server with the recipient's ID
        socketStore.socket.emit('send-message', {
            recipientId: selectedUser.value.user_id, // Targeted recipient ID
            message: {
                senderId: response.data.sender_id,
                sender_name: response.data.sender_name,
                subject: subject.value,
                message: message.value,
                created_at: response.data.created_at,
                unreadCount: response.data.unreadCount,
            }
        });

        console.log('Message sent:', response.data);

        to.value = '';
        subject.value = '';
        message.value = '';
        selectedUser.value = null; // Clear the selected user
        filteredUsers.value = [];
        emit('closeAddMessageModal')
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
    }
};
</script>

<style scoped>
/* Add any additional styling you might want */
</style>
