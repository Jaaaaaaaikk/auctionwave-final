<template>
    <div class="flex-1 px-2 py-3">
        <!--Top Icons-->
        <div class="h-10 flex items-center">
            <!-- Check All and Filter Messages -->
            <div class="relative flex items-center ml-3 space-x-0.5">
                <input @change="toggleCheckAll" type="checkbox" v-model="checkAll" class="focus:ring-0" />
                <button @click="toggleFilterMessages">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
                <div v-if="filterMessages"
                    class="bg-gray-200 shadow-2xl absolute left-0 top-6 w-32 py-2 text-gray-900 rounded z-10">
                    <button v-for="option in filterOptions" :key="option" @click="applyFilter(option)"
                        class="w-full text-sm font-semibold py-1 hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-custom-bluegreen">
                        {{ option }}
                    </button>
                </div>
            </div>
            <!-- Inbox Actions: Mark Read/Unread, Spam, Trash -->
            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
            <div class="flex items-center ml-2 space-x-2">
                <button title="Mark As Read" @click="markAsReadMessageUsingCheckbox" class="action-button">Mark as
                    Read</button>
                <button title="Mark As Unread" @click="markAsUnreadMessageUsingCheckbox" class="action-button">Mark as
                    Unread</button>
                <button title="Report Spam" @click="spamMessageUsingCheckbox" class="action-button">Spam</button>
                <button title="Move to Trash" @click="trashMessageUsingCheckbox" class="action-button">Trash</button>
            </div>
        </div>

        <!-- Inbox Messages List -->
        <div class="flex-1 px-2 py-3 bg-gray-100">
            <ul>
                <span v-if="inboxStore.messages.length === 0" class="text-center px-2">No Messages.</span>
                <li v-else v-for="(message, index) in inboxStore.messages" :key="message.message_id"
                    @mouseenter="setMessageHover(message.message_id, true)"
                    @mouseleave="setMessageHover(message.message_id, false)"
                    :class="[{ 'bg-yellow-100': !message.is_read, 'bg-white': message.is_read }, 'message-item']">

                    <input @click.stop type="checkbox" v-model="selectedMessages" :value="message.message_id"
                        class="focus:ring-0 border-2 border-gray-400" />
                    <div class="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
                        <div class="flex items-center ml-4">
                            <span class="w-56 pr-2 truncate mx-4">From: {{ message.sender_name }}</span>
                            <span class="w-64 truncate mx-4">{{ message.subject }}</span>
                            <span class="mx-4">-</span>
                            <span class="w-96 text-gray-600 text-sm truncate mx-4">{{ message.message }}</span>
                        </div>
                        <div class="w-32 flex items-center justify-end">
                            <span v-if="!hoverStates[message.message_id]" class="text-sm text-gray-500">{{
                                formatDate(message.created_at) }}</span>
                            <div v-else class="flex items-center space-x-2">
                                <button title="Mark As Read" @click="markAsRead(message.message_id)"
                                    class="action-icon">Read</button>
                                <button title="Mark As Unread" @click="markAsUnread(message.message_id)"
                                    class="action-icon">Unread</button>
                                <button title="Report Spam" @click="spamMessage(message.message_id)"
                                    class="action-icon">Spam</button>
                                <button title="Move to Trash" @click="trashMessage(message.message_id)"
                                    class="action-icon">Trash</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useInboxStore } from '@/stores/inbox-store';
import { useInboxSocketStore } from '@/stores/socketStore';
import { toast } from "vue3-toastify";

const inboxStore = useInboxStore();
const hoverStates = ref({});
const filterMessages = ref(false);
const filterOptions = ref(["Unread", "Starred", "Important"]);
const selectedMessages = ref([]);
const checkAll = ref(false);
const socketStore = useInboxSocketStore();

const toggleCheckAll = () => {
    selectedMessages.value = checkAll.value ? inboxStore.messages.map(m => m.message_id) : [];
};

// Mark message actions
const markAsRead = async (messageId) => inboxStore.markAsRead(messageId);
const markAsReadMessageUsingCheckbox = async () => {
    await Promise.all(selectedMessages.value.map(id => inboxStore.markAsRead(id)));
    selectedMessages.value = [];
};

const markAsUnread = async (messageId) => inboxStore.markAsUnread(messageId);
const markAsUnreadMessageUsingCheckbox = async () => {
    await Promise.all(selectedMessages.value.map(id => inboxStore.markAsUnread(id)));
    selectedMessages.value = [];
};

// Spam, Trash actions
const spamMessage = async (messageId) => await inboxStore.spamMessage(messageId);
const spamMessageUsingCheckbox = async () => {
    await Promise.all(selectedMessages.value.map(id => inboxStore.spamMessage(id)));
    selectedMessages.value = [];
};

const trashMessage = async (messageId) => await inboxStore.trashMessage(messageId);
const trashMessageUsingCheckbox = async () => {
    await Promise.all(selectedMessages.value.map(id => inboxStore.trashMessage(id)));
    selectedMessages.value = [];
};

const applyFilter = (filter) => { filterMessages.value = false; /* Implement filter logic here */ };
const toggleFilterMessages = () => { filterMessages.value = !filterMessages.value; };
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};
const setMessageHover = (messageId, isHovered) => { hoverStates.value[messageId] = isHovered; };

onMounted(async () => {
    // Fetch initial inbox messages
    await inboxStore.fetchInbox();

});

</script>

<style scoped>
/* Add any additional styling */
.message-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
}

.action-button {
    color: #4b5563;
    /* Equivalent to text-gray-700 */
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    /* Equivalent to border-gray-300 */
    border-radius: 0.5rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s, color 0.2s;
}

.action-button:hover {
    background-color: #2c7a7b;
    /* Equivalent to custom-bluegreen */
    color: white;
}

.action-icon {
    color: #6b7280;
    /* Equivalent to text-gray-500 */
    transition: color 0.2s;
}

.action-icon:hover {
    color: #2c7a7b;
    /* Equivalent to custom-bluegreen */
}
</style>
