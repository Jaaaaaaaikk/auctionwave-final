<template>
    <div class="flex-1 px-2 py-3">
        <h1 class="text-center my-4">
            <strong>ARCHIVE TAB</strong>
        </h1>
        <div class="bg-gray-100 mb-6">
            <ul>
                <li class="flex items-center border-y hover:bg-gray-200 px-2">
                    <input type="checkbox" class="focus:ring-0 border-2 border-gray-400" />
                    <div class="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
                        <div class="flex items-center ml-4">
                            <!-- Message Info -->
                            <span class="w-56 pr-2 truncate">Sender Name </span>
                            <span class="w-64 truncate">Subject</span>
                            <span class="mx-1">-</span>
                            <span class="w-96 text-gray-600 text-sm truncate">
                                This is the Message Sample
                            </span>
                        </div>
                        <div class="w-32 flex items-center justify-end">
                            <div v-if="hoverStates" class="flex items-center space-x-2">
                                <!-- Delete Button -->
                                <button title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="text-gray-500 hover:text-custom-bluegreen h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                                <!-- Mark as Unread Button -->
                                <button title="Mark As Unread">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="text-gray-500 hover:text-custom-bluegreen h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                            <span v-if="!hoverStates" class="text-sm text-gray-500">3:05 PM</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const hoverStates = ref({});

</script>

<style scoped></style>