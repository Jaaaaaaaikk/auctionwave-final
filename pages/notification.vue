<template>
    <!-- Dynamically load the navbar layout based on user type -->
    <NuxtLayout :name="navbarLayout">
        <h1 class="flex text-xl mb-10 m-5">Notifications</h1>
        <div class="bg-gray-100 mx-4 rounded-lg">
            <div class="flex-1 px-8 py-3">
                <div class="h-10 flex items-center">
                    <div class="flex items-center">
                        <div class="relative flex items-center ml-3 space-x-0.5">
                            <!-- Checkbox for selecting all -->
                            <input @change="toggleCheckAll" type="checkbox" v-model="checkAll" class="focus:ring-0" />

                            <!-- Button to toggle dropdown -->
                            <button @click="toggleFilterMessages">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>

                            <!-- Dropdown menu -->
                            <div v-if="filterMessages"
                                class="bg-gray-200 shadow-2xl absolute left-0 top-6 w-32 py-2 text-gray-900 rounded z-10">
                                <button v-for="option in filterOptions" :key="option" @click="applyFilter(option)"
                                    class="w-full text-sm font-semibold py-1 hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-custom-bluegreen    ">
                                    {{ option }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <span class="bg-gray-300 h-6 w-[.5px] mx-2"></span>
                    <!--navbar icons svg outside of the message-->
                    <div class="flex items-center ml-2">
                        <div class="flex items-center space-x-2">
                            <button title="Mark As Read" @click="markAsReadNotificationUsingCheckbox"
                                class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-custom-bluegreen hover:text-white transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76">
                                    </path>
                                </svg>
                            </button>
                            <button title="Mark As Unread" @click="markAsUnreadNotificationUsingCheckbox"
                                class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-custom-bluegreen hover:text-white transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                    </path>
                                </svg>
                            </button>
                            <button title="Delete" @click="deleteNotificationUsingCheckbox"
                                class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-custom-bluegreen hover:text-white transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                            <button title="Delete" @click="viewNotification = true"
                                class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-custom-bluegreen hover:text-white transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>

                        <div class="flex items-center space-x-2">
                            <button title="Archive"
                                class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-custom-bluegreen hover:text-white transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ul>
                <li v-if="notificationsStore.notifications.length === 0" class="text-center">
                    <p>No notifications yet.</p>
                </li>
                <li v-else class="flex flex-col border-y hover:bg-gray-200 px-8 py-4"
                    v-for="(notification, index) in notificationsStore.notifications"
                    :key="notification.notification_id"
                    @mouseenter="setMessageHover(notification.notification_id, true)"
                    @mouseleave="setMessageHover(notification.notification_id, false)"
                    :class="{ 'bg-yellow-100': notification.is_read === 0, 'bg-white': notification.is_read === 1 }">
                    <div class="relative w-full item-center flex justify-between py-2 my-1 cursor-pointer ml-2 space-x-0.5"
                        @click="getClickHandler(notification)">
                        <div class="flex justify-between">
                            <div class="flex items-center mr-4 ml-1 space-x-2">
                                <!--checkbox for each message-->
                                <input @click.stop type="checkbox" v-model="selectedMessages"
                                    :value="notification.notification_id" class="focus:ring-0" />
                            </div>
                            <!-- Message Info -->
                            <span class="w-56 pr-2 truncate">
                                <span>From: </span>
                                {{ notification.sender_full_name }}</span>
                            <span class="w-96 text-gray-600 text-sm truncate">
                                - {{ notification.message }}
                            </span>
                        </div>

                        <div class="w-32 flex items-center justify-end">
                            <div v-if="hoverStates[notification.notification_id]" class="flex items-center space-x-2">
                                <button title="Mark As Read" @click.stop
                                    @click="markAsRead(notification.notification_id)"
                                    class="text-gray-500 hover:text-custom-bluegreen h-5 w-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76">
                                        </path>
                                    </svg>
                                </button>
                                <!-- Mark as Unread Button -->
                                <button title="Mark As Unread" @click.stop
                                    @click="markAsUnread(notification.notification_id)">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="text-gray-500 hover:text-custom-bluegreen h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </button>
                                <!-- Delete Button -->
                                <button title="Delete" @click.stop
                                    @click="deleteNotification(notification.notification_id)">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="text-gray-500 hover:text-custom-bluegreen h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                            <span v-if="!hoverStates[notification.notification_id]" class="text-sm text-gray-500">
                                {{ formatDate(notification.created_at) }}
                            </span>
                        </div>
                    </div>
                    <ViewNotificationModal v-if="viewNotification" @closeAddMessageModal="viewNotification = false"
                        :message="currentNotification.message" :date="currentNotification.date"
                        :sender="currentNotification.sender" />
                </li>
            </ul>
        </div>
    </NuxtLayout>
    <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useNotificationStore } from '@/stores/notification-store';
import ViewNotificationModal from "~/components/view-notification-modal.vue";

const viewNotification = ref(false);
const router = useRouter();
const route = useRoute();
const userType = route.query.userType;
const navbarLayout = ref('');
const notificationsStore = useNotificationStore();
const checkAll = ref(false);
const selectedMessages = ref([]);
const filterMessages = ref(false);
const filterOptions = ref(["Unread", "Starred", "Important"]);
const hoverStates = ref({});
const currentNotification = ref({
    sender: '',
    date: '',
    message: ''
});

const getClickHandler = (notification) => {
    if (notification.sender_full_name.includes("AuctionWave System")) {
        openNotificationModal(notification);
        currentNotification.value = {
            sender: notification.sender_full_name || "AuctionWave System",
            date: notification.created_at,
            message: notification.message,
        };
    } else {
        viewAuction(notification);
    }
};

const openNotificationModal = (notification) => {
    viewNotification.value = true;
    // Pass notification data to the modal here (e.g., sender, date, and message)
};

const viewAuction = async (notification) => {
    const auctionId = notification.auction_uuid;

    if (userType === 'Auctioneer') {
        // Redirect for auctioneer
        router.push({ path: '/auctioneer/auctioneer-manage-auction', query: { id: auctionId } });
        await notificationsStore.markAsRead(notification.notification_id);
    } else if (userType === 'Bidder') {
        try {
            // Mark notification as read immediately
            await notificationsStore.markAsRead(notification.notification_id);

            // Attempt to join the auction directly without checking participation
            await axios.post('/api/auctions/bidder-join-auction', { auctionId });

            // Navigate to the bidder auction page
            router.push({
                path: '/bidder/bidder-auction',
                query: { id: auctionId },
            });
        } catch (error) {
            console.error('Failed to join or continue bidding in auction:', error);
        }
    }
};


// Format date
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Toggle the "Select All" checkbox
const toggleCheckAll = () => {
    if (checkAll.value) {
        // Select all notifications
        selectedMessages.value = notificationsStore.notifications.map(notification => notification.notification_id);
    } else {
        // Clear selected messages
        selectedMessages.value = [];
    }
};

const markAsRead = async (notificationId) => {
    await notificationsStore.markAsRead(notificationId);
};

const markAsReadNotificationUsingCheckbox = async () => {
    for (const notificationId of selectedMessages.value) {
        await notificationsStore.markAsRead(notificationId);
    }
    selectedMessages.value = [];
};

const markAsUnread = async (notificationId) => {
    await notificationsStore.markAsUnread(notificationId);
};

const markAsUnreadNotificationUsingCheckbox = async () => {
    for (const notificationId of selectedMessages.value) {
        await notificationsStore.markAsUnread(notificationId);
    }
    selectedMessages.value = [];
};

const deleteNotification = (notificationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    if (confirmDelete) {
        notificationsStore.deleteNotification(notificationId);
    }
};

const deleteNotificationUsingCheckbox = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    if (confirmDelete) {
        for (const notificationId of selectedMessages.value) {
            await notificationsStore.deleteNotification(notificationId);
        }
        selectedMessages.value = [];
    }
};


const setMessageHover = (notificationId, isHovered) => {
    hoverStates.value[notificationId] = isHovered;
};

// Apply filter to notifications
const applyFilter = (filter) => {
    console.log(`Applying filter: ${filter}`);
};

// Toggle filter menu visibility
const toggleFilterMessages = () => {
    filterMessages.value = !filterMessages.value;
};

// Set navbar layout based on user type
onMounted(() => {
    if (userType === 'Bidder') {
        navbarLayout.value = 'biddernavbar';
    } else {
        navbarLayout.value = 'auctioneernavbar';
    }

    // Fetch notifications after setting the navbar layout
    notificationsStore.fetchNotifications();

    const intervalId = setInterval(() => {
        notificationsStore.fetchNotifications();
    }, 30000); // call the fetchNotification again every 30 seconds.

    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });

});
</script>

<style scoped>
.container {
    max-width: 800px;
}

/* Table Row Background Colors */
.bg-gray-100 {
    background-color: #f7fafc;
}

.bg-yellow-100 {
    background-color: #fef3c7;
    /* Highlight color for unread notifications */
}

/* Styling for table */
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    /* Add border for table readability */
}

thead {
    background-color: #f1f1f1;
}

/* Action Buttons Style */
.btn-action {
    background-color: #f1f5f9;
    border: 2px solid #1c1c1e;
    border-radius: 0.375rem;
    /* Rounded border */
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
}

.btn-action:hover {
    background-color: #e5e7eb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Hover shadow */
}

.tooltip {
    position: relative;
    display: inline-block;
    text-align: center;
}

.tooltip .tooltip-text {
    visibility: hidden;
    width: 100px;
    background-color: darkslategray;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -50px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
</style>
