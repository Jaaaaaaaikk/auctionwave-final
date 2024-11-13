  <template>
    <div class="p-6 bg-custom-blue2 dark:bg-gray-900 min-h-screen">
      <!-- Header Section -->
      <nav
        class="fixed top-0 left-0 right-0  flex items-center justify-between  bg-white shadow py-3 -md mb-6 ml-16 z-10">
        <!-- Logo and Company Name -->
        <NuxtLink v-if="!isAuctioneerDashboard" to="/auctioneer/auctioneerdashboard"
          class="flex justify-start space-x-3 rtl:space-x-reverse mr-8">
          <img src="/public/images/logo-no-text.jpg" class="h-12" alt="Logo" />
        </NuxtLink>

        <!-- Notification and Profile Icons -->

        <div class="flex items-center w-full">
          <div class="flex space-x-4 items-center flex-grow  justify-end">
            <!--Inbox Icon-->
            <div class="relative mx-1 hover:text-green-500">
              <button @click="toggleInboxDropdown"
                class="flex items-center py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent cursor-pointer"
                aria-expanded="false">
                <svg height="28px" width="28px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"
                  class="fill-current text-[#005262] hover:text-green-500">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <polygon class="st0" points="512,295.199 445.92,226.559 512,169.6" fill="currentColor"></polygon>
                      <polygon class="st0" points="66.16,226.559 0,295.279 0,169.6" fill="currentColor"></polygon>
                      <path class="st0"
                        d="M512,357.6v63.199c0,15.281-12.4,27.682-27.68,27.682H27.68c-15.281,0-27.68-12.4-27.68-27.682V357.6 l98.959-102.721L212,352.238c11.76,10.082,27.359,15.682,44,15.682c16.641,0,32.32-5.6,44.08-15.682l112.959-97.359L512,357.6z"
                        fill="currentColor"></path>
                      <path class="st0"
                        d="M512,91.119v27.68l-241.442,208c-7.76,6.72-21.359,6.72-29.119,0L0,118.799v-27.68 c0-15.279,12.398-27.6,27.68-27.6H484.32C499.6,63.519,512,75.84,512,91.119z"
                        fill="currentColor"></path>
                    </g>
                  </g>
                </svg>
                <span v-if="inboxStore.unreadCount > 0"
                  class="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full text-xs text-white"> {{
                    inboxStore.unreadCount }}</span>
              </button>
              <div v-if="inboxDropdownOpen"
                class="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm-light shadow-black dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-48 overflow-y-auto no-scrollbar">
                  <li v-for="message in inboxStore.messages" :key="message.message_id" :class="{
                    'bg-yellow-100': !message.is_read,
                    'bg-gray-100': message.is_read,
                    'block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white': true
                  }" role="button" tabindex="0">
                    From: {{ message.sender_name }} - {{ message.message }} - {{ formatDate(message.created_at) }}
                  </li>
                  <li v-if="inboxStore.messages.length === 0">
                    <p class="block px-4 py-2 text-gray-500">No Messages.</p>
                  </li>
                </ul>
                <!-- Fixed buttons for 'See All' and 'Mark All as Read' -->
                <div class="flex flex-col px-4 py-2 border-t space-y-2">
                  <div class="flex justify-between">
                    <button @click="addMessage = true" class="flex items-center text-gray-700 hover:text-green-500">
                      <svg class="w-8 h-8 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-xs">Compose Message</span>
                    </button>
                    <button @click="markAllMessagesAsRead"
                      class="flex items-center w-full text-gray-700 hover:text-green-500">
                      <svg class="w-8 h-8 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-xs">Mark All as Read</span>
                    </button>
                  </div>
                  <AddMessageModal v-if="addMessage" @closeAddMessageModal="addMessage = false" />
                </div>
              </div>
            </div>

            <!--Notification Bell-->
            <div class="relative">
              <button @click="toggleNotificationDropdown"
                class="flex items-center py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent cursor-pointer"
                aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 fill-current text-[#005262] hover:text-green-500">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="style=fill">
                      <g id="notification-bell">
                        <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.802 19.8317C15.4184 19.7699 15.8349 20.4242 15.5437 20.9539C15.3385 21.3271 15.0493 21.6529 14.7029 21.9197C14.3496 22.1918 13.9397 22.4006 13.5 22.5408C13.0601 22.6812 12.593 22.7522 12.1242 22.7522C11.6554 22.7522 11.1883 22.6812 10.7484 22.5408C10.3087 22.4006 9.89883 22.1918 9.54556 21.9197C9.1991 21.6529 8.90988 21.3271 8.70472 20.9539C8.41354 20.4242 8.83002 19.7699 9.44644 19.8317C9.63869 19.851 11.1433 19.9981 12.1242 19.9981C13.1051 19.9981 14.6097 19.851 14.802 19.8317Z">
                        </path>
                        <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                          d="M8.52901 2.08755C10.7932 1.00445 13.4465 0.967602 15.7423 1.98737L15.9475 2.07851C18.3532 3.14707 19.8934 5.4622 19.8934 8.0096L19.8934 9.27297C19.8934 10.2885 20.1236 11.2918 20.5681 12.213L20.8335 12.7632C22.0525 15.29 20.465 18.2435 17.6156 18.7498L17.455 18.7783C13.93 19.4046 10.3154 19.4046 6.79044 18.7783C3.90274 18.2653 2.37502 15.1943 3.77239 12.7115L3.99943 12.3082C4.55987 11.3124 4.85335 10.1981 4.85335 9.06596L4.85335 7.79233C4.85335 5.3744 6.27704 3.16478 8.52901 2.08755Z">
                        </path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span v-if="notificationsStore.unreadCount > 0"
                  class="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full text-xs text-white"> {{
                    notificationsStore.unreadCount }}</span>
              </button>
              <div v-if="notificationDropdownOpen"
                class="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm-light shadow-black dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-48 overflow-y-auto no-scrollbar">
                  <li v-for="notification in notificationsStore.notifications" :key="notification.notification_id"
                    :class="{
                      'bg-yellow-100': !notification.is_read,
                      'bg-gray-100': notification.is_read,
                      'block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white': true
                    }" @click="viewAuction(notification)" role="button" tabindex="0"
                    @keypress.enter="viewAuction(notification)">
                    From: {{ notification.sender_full_name }} - {{ notification.message }} - {{
                      formatDate(notification.created_at)
                    }}
                  </li>
                  <li v-if="notificationsStore.notifications.length === 0">
                    <p class="block px-4 py-2 text-gray-500">No notifications</p>
                  </li>
                </ul>
                <!-- Fixed buttons for 'See All' and 'Mark All as Read' -->
                <div class="flex justify-between items-center px-4 py-2 border-t">
                  <button @click="markAllNotificationsAsRead"
                    class="flex items-center text-gray-700 hover:text-green-500">
                    <svg class="w-8 h-8 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-xs">Mark All As Read</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Profile Icon -->
            <div class="relative pr-8">
              <button @click="toggleProfileDropdown"
                class="flex items-center py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent cursor-pointer"
                aria-expanded="false">
                <img :src="userStore.userProfileImage" class="w-10 h-10 rounded-full object-cover" alt="Profile Icon" />
              </button>
              <div v-if="profileDropdownOpen"
                class="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700 shadow-sm-light shadow-black">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button @click="viewProfile"
                      class="flex items-center px-4 py-2 w-full hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" />
                      </svg>
                      View Profile
                    </button>
                  </li>
                  <li>
                    <button @click="logout"
                      class="flex items-center px-4 py-2 w-full hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6-10V5a3 3 0 00-6 0v1" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Section -->
      <div class="pt-16">
        <slot />
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from '@/stores/user-profile-image';
import { useNotificationStore } from '@/stores/notification-store';
import { useInboxStore } from '@/stores/inbox-store';
import AddMessageModal from "~/components/add-message-modal.vue";
import { useInboxSocketStore } from '@/stores/socketStore';
import { toast } from 'vue3-toastify';

const inboxDropdownOpen = ref(false);
const notificationDropdownOpen = ref(false);
const profileDropdownOpen = ref(false);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const notificationsStore = useNotificationStore();
const inboxStore = useInboxStore();
const addMessage = ref(false);
const socketStore = useInboxSocketStore();
const isAuctioneerDashboard = ref(true);

const updateRouteCheck = () => {
  isAuctioneerDashboard.value =
    route.path === "/auctioneer/auctioneerdashboard" ||
    route.path === "/auctioneer/auctioneer-manage-auction" ||
    route.path === "/auctioneer/auctioneerprofile";
};

watch(route, updateRouteCheck);

const toggleInboxDropdown = async () => {
  inboxDropdownOpen.value = !inboxDropdownOpen.value;
  profileDropdownOpen.value = false;
  notificationDropdownOpen.value = false;
};

const toggleNotificationDropdown = async () => {
  notificationDropdownOpen.value = !notificationDropdownOpen.value;
  profileDropdownOpen.value = false;
  inboxDropdownOpen.value = false;
};


const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value;
  notificationDropdownOpen.value = false;
  inboxDropdownOpen.value = false;
};

const markAllMessagesAsRead = () => {
  inboxStore.markAllAsRead()
}

const markAllNotificationsAsRead = () => {
  notificationsStore.markAllAsRead()
}

function viewProfile() {
  profileDropdownOpen.value = false;
  router.replace("/auctioneer/auctioneerprofile");
}

const viewAuction = async (notification) => {
  try {
    router.push({ path: '/auctioneer/auctioneer-manage-auction', query: { id: notification.auction_uuid } });
  } catch (error) {
    console.error("failed to view the auction:", error);
  }
};

const logout = async () => {
  try {
    await axios.post("/api/logout");

    localStorage.removeItem("user_profile_picture");

    // Disconnect the WebSocket
    socketStore.disconnectSocket();

    // Redirect to login page or homepage
    router.replace("/homepage");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed. Please try again.");
  }
};

const handleIncomingMessage = (newMessage) => {
  console.log('Received message in inbox:', newMessage);
  inboxStore.messages.unshift(newMessage); // Update messages list
  inboxStore.unreadCount = newMessage.unreadCount;

  toast(`New message from ${newMessage.senderId}: ${newMessage.subject}`, {
    type: 'info',
    autoClose: 3000,
    position: 'top-right',
  });
};

const handleIncomingBidNotification = (newBidNotificationMessage) => {
  console.log('Received new notification message in BidderNavbar:', newBidNotificationMessage);
  notificationsStore.notifications.unshift(newBidNotificationMessage.notification);

  // Update unread count if necessary
  notificationsStore.unreadCount = newBidNotificationMessage.notification.unreadCount;

  // Display a toast notification
  toast(`New notification from ${newBidNotificationMessage.notification.sender_full_name}: ${newBidNotificationMessage.notification.message}`, {
    type: 'info',
    autoClose: 3000,
    position: 'top-right',
  });
};

const handleIncomingOfferNotification = (newOfferNotificationMessage) => {
  console.log('Received new notification message in BidderNavbar:', newOfferNotificationMessage);
  notificationsStore.notifications.unshift(newOfferNotificationMessage.notification);


  // Update unread count if necessary
  notificationsStore.unreadCount = newOfferNotificationMessage.notification.unreadCount;

  // Display a toast notification
  toast(`New notification from ${newOfferNotificationMessage.notification.sender_full_name}: ${newOfferNotificationMessage.notification.message}`, {
    type: 'info',
    autoClose: 3000,
    position: 'top-right',
  });
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(async () => {
  updateRouteCheck();
  userStore.initializeProfileImage(); // Initialize from localStorage
  await Promise.all([notificationsStore.fetchNotifications(), inboxStore.fetchInbox()]);

  if (!socketStore.socket) {
    socketStore.connectSocket();
  }
  // Listen for incoming messages specifically for this user
  socketStore.socket.on('message-channel', handleIncomingMessage);
  socketStore.socket.on('bid-channel', handleIncomingBidNotification);
  socketStore.socket.on('offer-channel', handleIncomingOfferNotification);
});

onBeforeUnmount(() => {
  if (socketStore.socket) {
    socketStore.socket.off('message-channel', handleIncomingMessage);
    socketStore.socket.off('bid-channel', handleIncomingBidNotification);
    socketStore.socket.off('offer-channel', handleIncomingOfferNotification);
  }
  socketStore.disconnectSocket();
});
</script>

<style scoped>
.no-scrollbar {
  overflow-x: hidden;
  /* Prevent horizontal scrollbar */
}
</style>
