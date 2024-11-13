<template>
    <aside id="default-sidebar"
        class="fixed top-0 left-0 z-0 w-72  transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-full px-6 py-20 overflow-y-auto z-0  bg-custom-blue2 dark:bg-gray-800 ">
            <ul class="space-y-2 font-medium ">
                <li>
                    <NuxtLink to="/bidder/bidderdashboard">
                        <div class="flex items-center pl-2 py-4 text-gray-900 rounded-lg dark:text-white
                        hover:bg-custom-bluegreen hover:bg-opacity-25 dark:hover:bg-gray-700 group">
                            <svg height="20" width="20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512" fill="#000000"
                                class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900">
                                <g>
                                    <path style="fill:#CDCED1;"
                                        d="M256,48.552c-141.383,0-256,114.617-256,256c0,60.054,20.736,115.235,55.358,158.897h401.284 C491.264,419.787,512,364.606,512,304.552C512,163.169,397.383,48.552,256,48.552">
                                    </path>
                                    <path style="fill:#C6421E;"
                                        d="M240.517,272.808c-14.027,6.85-22.837,22.722-18.882,40.06c2.913,12.765,13.286,23.128,26.041,26.041 c17.346,3.964,33.218-4.855,40.068-18.882c10.152-20.78,19.465-41.966,31.364-61.802l25.167-41.949l-41.949,25.167C282.492,253.343,261.306,262.647,240.517,272.808">
                                    </path>
                                    <g>
                                        <path style="fill:#3F3F3F;"
                                            d="M59.797,384.487c-1.836-4.511-6.991-6.7-11.511-4.846L15.8,392.882 c2.039,5.535,4.193,11.026,6.603,16.375l32.547-13.259C59.462,394.153,61.633,389.007,59.797,384.487">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M79.448,304.552c0-4.873-3.955-8.828-8.828-8.828h-70.4C0.124,298.664,0,301.594,0,304.552 c0,2.975,0.282,5.879,0.38,8.828h70.241C75.494,313.379,79.448,309.425,79.448,304.552">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M60.737,222.34c1.889-4.493-0.212-9.675-4.705-11.564l-32.397-13.639 c-2.472,5.323-4.767,10.743-6.868,16.26l32.406,13.656c1.121,0.468,2.286,0.689,3.425,0.689 C56.041,227.743,59.316,225.713,60.737,222.34">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M68.888,129.923l24.823,24.823c1.721,1.721,3.981,2.578,6.241,2.578 c2.251,0,4.511-0.856,6.241-2.578c3.443-3.452,3.443-9.039,0-12.491L81.37,117.44C77.071,121.457,72.904,125.624,68.888,129.923">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M164.556,103.504c1.395,3.425,4.696,5.5,8.183,5.5c1.103,0,2.233-0.212,3.328-0.653 c4.511-1.845,6.682-6.991,4.846-11.511L167.619,64.23c-5.544,2.039-10.964,4.317-16.322,6.727L164.556,103.504z">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M256,128c4.873,0,8.828-3.955,8.828-8.828v-70.4c-2.94-0.097-5.87-0.221-8.828-0.221 c-2.957,0-5.888,0.124-8.828,0.221v70.4C247.172,124.045,251.127,128,256,128">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M338.211,109.289c1.121,0.477,2.278,0.697,3.425,0.697c3.443,0,6.718-2.03,8.139-5.402 l13.639-32.397c-5.323-2.472-10.743-4.767-16.26-6.868l-13.656,32.406C331.608,102.227,333.718,107.4,338.211,109.289">
                                        </path>
                                        <path style="fill:#3F3F3F;"
                                            d="M430.629,117.44l-24.823,24.823c-3.443,3.443-3.443,9.031,0,12.482 c1.73,1.721,3.99,2.586,6.25,2.586c2.251,0,4.511-0.865,6.241-2.586l24.814-24.823 C439.095,125.623,434.928,121.456,430.629,117.44">
                                        </path>
                                    </g>
                                    <g>
                                        <path style="fill:#C6421E;"
                                            d="M463.711,229.462l32.618-13.286c-2.048-5.553-4.326-10.973-6.735-16.331l-32.547,13.259 c-4.511,1.845-6.682,6.991-4.846,11.511c1.395,3.425,4.705,5.5,8.183,5.5C461.496,230.115,462.617,229.903,463.711,229.462">
                                        </path>
                                        <path style="fill:#C6421E;"
                                            d="M512,304.552c0-2.957-0.124-5.888-0.221-8.828h-70.4c-4.873,0-8.828,3.955-8.828,8.828 s3.955,8.828,8.828,8.828h70.241C511.717,310.431,512,307.527,512,304.552">
                                        </path>
                                        <path style="fill:#C6421E;"
                                            d="M495.089,395.642l-32.265-13.586c-4.502-1.889-9.666,0.212-11.564,4.705 c-1.889,4.493,0.221,9.675,4.705,11.564l32.335,13.621C490.772,406.615,492.979,401.159,495.089,395.642">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                        </div>

                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/bidder/bidding-activity">

                        <div class="flex items-center pl-2 py-4 text-gray-900 rounded-lg dark:text-white
                        hover:bg-custom-bluegreen hover:bg-opacity-25 dark:hover:bg-gray-700 group">
                            <svg viewBox="0 0 1024 1024" class="w-6 h-6" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z"
                                        fill="#3688FF"></path>
                                    <path
                                        d="M640 682.7c-9.6 0-19.3-3.2-27.3-9.9l-128-106.7c-9.7-8.1-15.4-20.1-15.4-32.8V384c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v129.4l112.6 93.9c18.1 15.1 20.5 42 5.5 60.1-8.5 10-20.6 15.3-32.8 15.3z"
                                        fill="#5F6379"></path>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Bidding Activities</span>
                        </div>

                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#">

                        <div
                            class="flex items-center pl-2 py-4  text-gray-900 rounded-lg dark:text-white hover:bg-custom-bluegreen hover:bg-opacity-25 dark:hover:bg-gray-700 group">
                            <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                fill="#000000" width="24" height="24">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M860.48 259.52a22.72 22.72 0 0 0 22.656-22.656V152c0-17.6-14.4-32-32-32h-640c-17.6 0-32 14.4-32 32v768c0 17.6 14.4 32 32 32h640c17.6 0 32-14.4 32-32v-250.432h-0.064l0.064-0.448a22.656 22.656 0 0 0-45.312 0l0.064 0.448h-0.064V501.12a22.656 22.656 0 0 0 45.312 0V323.52h-0.064a22.592 22.592 0 0 0-45.248 0h-0.064V236.864a22.784 22.784 0 0 0 22.72 22.656z"
                                        fill=""></path>
                                    <path
                                        d="M837.824 903.616a6.4 6.4 0 0 1-6.4 6.4H230.848a6.4 6.4 0 0 1-6.4-6.4V170.432a6.4 6.4 0 0 1 6.4-6.4h600.576a6.4 6.4 0 0 1 6.4 6.4v733.184z"
                                        fill="#FFFF00"></path>
                                    <path
                                        d="M285.248 520.576a16 16 0 0 1-32 0V249.152a16 16 0 0 1 32 0v271.424zM285.248 655.552a16 16 0 0 1-32 0v-62.976a16 16 0 0 1 32 0v62.976z"
                                        fill="#FFFFFF"></path>
                                    <path
                                        d="M328.704 357.44c0 8.832 7.168 16 16 16h283.968a16 16 0 0 0 0-32H344.704a16.064 16.064 0 0 0-16 16zM690.688 341.44a16 16 0 0 0 0 32h36.032a16 16 0 0 0 0-32h-36.032z"
                                        fill="#BABA00"></path>
                                    <path
                                        d="M328.704 485.12c0 8.832 7.168 16 16 16h381.952a16 16 0 0 0 0-32H344.704a16 16 0 0 0-16 16zM328.704 612.736c0 8.768 7.168 16 16 16h381.952a16 16 0 1 0 0-32H344.704a16 16 0 0 0-16 16z"
                                        fill="#BABA00"></path>
                                    <path
                                        d="M392.448 141.568c0 12.288-10.112 22.4-22.4 22.4h-0.512a22.528 22.528 0 0 1-22.4-22.4V74.752c0-12.288 10.112-22.4 22.4-22.4h0.512c12.288 0 22.4 10.112 22.4 22.4v66.816zM715.136 141.568c0 12.288-10.112 22.4-22.4 22.4h-0.512a22.528 22.528 0 0 1-22.464-22.4V74.752c0-12.288 10.048-22.4 22.464-22.4h0.512c12.224 0 22.4 10.112 22.4 22.4v66.816z"
                                        fill=""></path>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Transaction History</span>
                        </div>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/bidder/bidderleaderboards">

                        <div
                            class="flex items-center pl-2 py-4  text-gray-900 rounded-lg dark:text-white hover:bg-custom-bluegreen hover:bg-opacity-25 dark:hover:bg-gray-700 group">
                            <svg version="1.1" id="_x36_" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"
                                fill="#000000" class="flex-shrink-0 w-5 h-5 ml-0.5 mr-0.5 ">
                                <g>
                                    <path style="fill:#F8CE72;"
                                        d="M480.928,399.689V162.177C498.525,159.334,512,144.189,512,125.782 c0-20.433-16.56-36.993-36.985-36.993c-20.44,0-37,16.56-37,36.993c0,11.684,5.523,21.982,13.987,28.755l-65.783,82.222 L275.312,90.566c16.517-7.398,28.038-23.943,28.038-43.218C303.35,21.201,282.156,0,256.003,0 c-26.155,0-47.349,21.201-47.349,47.347c0,19.275,11.52,35.82,28.038,43.218l-110.91,146.193l-65.776-82.222 c8.461-6.773,13.987-17.071,13.987-28.755c0-20.433-16.563-36.993-37.003-36.993C16.56,88.789,0,105.349,0,125.782 c0,18.407,13.479,33.552,31.079,36.396v237.512C17.062,400.471,5.92,411.978,5.92,426.177c0,14.719,11.919,26.638,26.641,26.638 h60.67h139.09h247.128c14.712,0,26.638-11.919,26.638-26.638C506.087,411.97,494.936,400.471,480.928,399.689z">
                                    </path>
                                    <g>
                                        <polygon style="fill:#F9F7BE;"
                                            points="256.003,65.108 125.782,236.759 31.079,118.383 31.079,423.214 256.003,423.214 ">
                                        </polygon>
                                        <polygon style="fill:#F9EB97;"
                                            points="256.003,65.108 386.219,236.759 480.928,118.383 480.928,423.214 256.003,423.214 ">
                                        </polygon>
                                    </g>
                                    <path style="fill:#F5C351;"
                                        d="M506.087,426.177c0,14.719-11.926,26.638-26.638,26.638H32.562 c-14.723,0-26.641-11.919-26.641-26.638l0,0c0-14.711,11.919-26.637,26.641-26.637h446.887 C494.161,399.54,506.087,411.466,506.087,426.177L506.087,426.177z">
                                    </path>
                                    <rect x="93.231" y="399.54" style="fill:#F8CE72;" width="139.09" height="53.275">
                                    </rect>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap ">Leaderboards</span>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
            <div v-if="isBidderDashboard">
                <div class="my-4 ">
                    <hr class="h-px bg-gray-300  border-0 dark:bg-gray-700 ">
                </div>
                <div class="flex justify-between items-center p-2">
                    <p class="font-medium">Bidding Type</p>
                    <button @click="clearAuctionType"
                        class="text-sm font-medium text-custom-bluegreen hover:text-custom-bluegreen-dark hover:underline">
                        Clear All
                    </button>
                </div>
                <ul class="font-light p-2">
                    <li class="flex items-center mb-4" v-for="type in biddingTypes" :key="type">
                        <input :id="type" type="radio" name="auction-type" :value="type"
                            v-model="auctionStore.selectedBiddingType"
                            class="w-4 h-4 text-custom-bluegreen bg-gray-100 border-gray-300 focus:ring-custom-bluegreen dark:focus:ring-blue-600 dark:ring-offset-custom-bluegreen focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label :for="type" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ type
                            }}</label>
                    </li>
                </ul>
                <div>
                    <hr class="h-px bg-gray-300  border-0 dark:bg-gray-700">
                </div>
                <div class="flex justify-between items-center p-2">
                    <p class="font-medium">Rarity</p>
                    <button @click="clearAuctionRarity"
                        class="text-sm font-medium text-custom-bluegreen hover:text-custom-bluegreen-dark hover:underline">
                        Clear All
                    </button>
                </div>
                <ul class="font-light p-2">
                    <li v-for="rarity in rarities" :key="rarity" class="flex items-center pb-2">
                        <input :id="rarity" type="radio" :value="rarity" name="auction-rarity"
                            v-model="auctionStore.selectedRarity"
                            class="w-4 h-4 text-custom-bluegreen bg-gray-100 border-gray-300 focus:ring-custom-bluegreen dark:focus:ring-blue-600 dark:ring-offset-custom-bluegreen focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label :for="rarity" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ rarity
                            }}</label>
                    </li>
                </ul>
            </div>
        </div>
    </aside>


</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useAuctionFilterStore } from "@/stores/fetch-auction-bidder-dashboard";
import { useRoute } from "vue-router";

const rarities = ref(['Common', 'Uncommon', 'Rare']);
const biddingTypes = ref(["Lowest-Type", "Offer-Type"]);
const auctionStore = useAuctionFilterStore();
const isBidderDashboard = ref(true);
const route = useRoute();

const updateRouteCheck = () => {
    isBidderDashboard.value = route.path === "/bidder/bidderdashboard";
};

watch(route, updateRouteCheck);


const clearAuctionType = () => auctionStore.clearBiddingType();
const clearAuctionRarity = () => auctionStore.clearRarity();

onMounted(() => {
    updateRouteCheck();
});
</script>

<style scoped>
/* Add any specific styles for the sidebar here */
</style>