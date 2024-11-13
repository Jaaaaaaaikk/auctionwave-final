<template>
  <!-- Dynamically load the navbar layout based on user type -->
  <NuxtLayout :name="navbarLayout">
    <div class="min-h-screen w-full bg-custom-white-green shadow-xl rounded-lg flex overflow-x-auto">
      <div class=" min-h-screen w-64 bg-white px-1 py-2">
        <div class="h-16 flex items-center">
          <button @click="addMessage = true"
            class="w-48 mx-auto bg-custom-bluegreen hover:bg-custom-bluegreen hover:bg-opacity-80 flex items-center justify-center text-gray-100 py-2 rounded space-x-2 transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
            <span>Compose</span>
          </button>
          <AddMessageModal v-if="addMessage" @closeAddMessageModal="addMessage = false" />
        </div>
        <div class="px-2 pt-2  pb-8 border-r border-gray-300">

          <ul class="space-y-2">
            <!--Inbox Tab-->
            <li>
              <button @click="activeTab = 'inbox'"
                :class="{ 'bg-custom-bluegreen bg-opacity-25 text-custom-bluegreen': activeTab === 'inbox' }"
                class="hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-custom-bluegreen flex items-center text-gray-700 py-1.5 px-4 rounded space-x-2 cursor-pointer">
                <span class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4">
                    </path>
                  </svg>
                  <span>Inbox</span>
                </span>
                <span
                  class="bg-custom-bluegreen bg-opacity-80 text-gray-100 font-bold px-2 py-0.5 text-xs rounded-lg">3</span>
              </button>
            </li>
            <!--Sent Tab-->
            <li>
              <button @click="activeTab = 'sent'"
                :class="{ 'bg-custom-bluegreen bg-opacity-25 text-custom-bluegreen': activeTab === 'sent' }"
                class="hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-custom-bluegreen flex items-center text-gray-700 py-1.5 px-4 rounded space-x-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
                  </path>
                </svg>
                <span>Sent</span>
              </button>
            </li>
            <!--Spam Tab-->
            <li>
              <button @click="activeTab = 'spam'"
                :class="{ 'bg-custom-bluegreen bg-opacity-25 text-custom-bluegreen': activeTab === 'spam' }"
                class="hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-custom-bluegreen flex items-center text-gray-700 py-1.5 px-4 rounded space-x-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                  </path>
                </svg>
                <span>Spam</span>
              </button>
            </li>
            <!--Trash Tab-->
            <li>
              <button @click="activeTab = 'trash'"
                :class="{ 'bg-custom-bluegreen bg-opacity-25 text-custom-bluegreen': activeTab === 'trash' }"
                class="hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-custom-bluegreen flex items-center text-gray-700 py-1.5 px-4 rounded space-x-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
                <span>Trash</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <InboxTab v-show="activeTab === 'inbox'" />
      <SentTab v-show="activeTab === 'sent'" />
      <SpamTab v-show="activeTab === 'spam'" />
      <TrashTab v-show="activeTab === 'trash'" />
    </div>
    <!-- Load universal footer -->
  </NuxtLayout>

  <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AddMessageModal from "~/components/add-message-modal.vue";
import InboxTab from '~/components/MessageTabs/InboxTab.vue';
import SentTab from '~/components/MessageTabs/SentTab.vue';
import SpamTab from '~/components/MessageTabs/SpamTab.vue';
import TrashTab from '~/components/MessageTabs/TrashTab.vue';

const addMessage = ref(false);
const activeTab = ref('inbox');
const router = useRouter();
const route = useRoute();
const userType = route.query.userType;
const navbarLayout = ref('');

// Set navbar layout based on user type
onMounted(() => {
  if (userType === 'Bidder') {
    navbarLayout.value = 'biddernavbar';
  } else {
    navbarLayout.value = 'auctioneernavbar';
  }

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
