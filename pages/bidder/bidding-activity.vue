<template>
    <NuxtLayout name="biddernavbar">
        <NuxtLayout name="biddersidebar"></NuxtLayout>
        <section class="bg-custom-blue2  antialiased dark:bg-gray-900 md:py-7">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div class="mx-auto max-w-5xl">
                    <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My bids</h2>

                        <div class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <div>
                                <select id="order-type" v-model="selectedBidStatus" @change="resetBidStatus"
                                    class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-custom-bluegreen focus:ring-custom-bluegreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-custom-bluegreen dark:focus:ring-custom-bluegreen">
                                    <option value="">All</option>
                                    <option v-for="bidStatus in bidStatusMap" :key="bidStatus" :value="bidStatus">{{
                                        bidStatus }}</option>
                                </select>
                            </div>

                            <div>
                                <select id="order-type" v-model="selectedOfferStatus" @change="resetOfferStatus"
                                    class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-custom-bluegreen focus:ring-custom-bluegreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-custom-bluegreen dark:focus:ring-custom-bluegreen">
                                    <option value="">All</option>
                                    <option v-for="offerStatus in offerStatusMap" :key="offerStatus"
                                        :value="offerStatus">{{ offerStatus }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flow-root sm:mt-8">
                        <div class="divide-y divide-gray-300 dark:divide-gray-700">
                            <div v-for="auction in filteredAuctions" :key="auction.listing_id"
                                class="flex flex-wrap items-center gap-y-4 py-6">
                                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Auction Name:
                                    </dt>
                                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                        <span class="hover:underline cursor-pointer">{{ auction.auction_name }}</span>
                                    </dd>
                                </dl>

                                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{
                                        formatDate(auction.latest_time) }}
                                    </dd>
                                </dl>

                                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                    <dd :class="getStatusClass(auction.status)"
                                        class="me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium">
                                        <svg v-if="auction.status === 'Cashbond Pending' || auction.status === 'Transaction Pending' || auction.status === 'Offer Pending'"
                                            class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                        </svg>
                                        <svg v-if="auction.status === 'Active'" class="me-1 h-3 w-3" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M10.293 15.293a1 1 0 0 1 0-1.414L13.586 12H3a1 1 0 1 1 0-2h10.586l-3.293-3.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z" />
                                        </svg>
                                        <svg v-if="auction.status === 'Completed' || auction.status === 'Offer Accepted'"
                                            class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                        </svg>
                                        <svg v-if="auction.status === 'Outbid' || auction.status === 'Offer Discarded'"
                                            class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                        {{ auction.status }}
                                    </dd>
                                </dl>

                                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Bidding Type:
                                    </dt>
                                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{
                                        auction.bidding_type }}</dd>
                                </dl>

                                <div
                                    class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">

                                    <a href="#"
                                        class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-custom-bluegreen text-white px-3 py-2 text-sm font-medium  hover:bg-green-500 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View
                                        details</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav class="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                        <div class="my-20 mx-auto flex justify-center">
                            <div class="inline-flex -space-x-px text-sm">
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-gray-700">
                                    Previous
                                </button>

                                <span v-for="page in totalPages" :key="page" :class="{
                                    'flex items-center justify-center px-3 h-8 text-custom-bluegreen border border-gray-300 bg-green-50 hover:bg-blue-100 hover:text-blue-700': currentPage === page,
                                    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700': currentPage !== page
                                }" @click="goToPage(page)">
                                    {{ page }}
                                </span>

                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-gray-700">
                                    Next
                                </button>
                            </div>

                        </div>

                    </nav>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const currentPage = ref(1);
const numberOfAuctions = ref(10);
const totalPages = ref(0);
const selectedBidStatus = ref("");
const selectedOfferStatus = ref("");
const auctions = ref([]);
const isFiltered = ref(false);

// Define the bid status and offer status arrays as reactive refs
const bidStatusMap = ref([
    "Active",
    "Outbid",
    "Won",
    "Cashbond Pending",
    "Transaction Pending",
    "Completed"
]);

const offerStatusMap = ref([
    "Offer Pending",
    "Offer Accepted",
    "Offer Discarded",
    "Provide More"
]);

const resetBidStatus = () => {
    selectedOfferStatus.value = "";
    currentPage.value = 1;
    isFiltered.value = true;
    fetchActivityAuctions();
};

const resetOfferStatus = () => {
    selectedBidStatus.value = "";
    currentPage.value = 1;
    isFiltered.value = true;
    fetchActivityAuctions();
};

// Fetch auctions with pagination parameters
const fetchActivityAuctions = async () => {
    try {
        const { data } = await axios.get("/api/auctions/display-bidding-activities", {
            params: { page: currentPage.value, numberOfAuctions: numberOfAuctions.value, selectedBidStatus: selectedBidStatus.value, selectedOfferStatus: selectedOfferStatus.value, }
        });
        console.log("Fetched data:", data);
        auctions.value = data.auctions;
        totalPages.value = data.totalPages;

    } catch (error) {
        console.error("Failed to fetch auctions:", error);
    }
};

// Computed filtered results
const filteredAuctions = computed(() => {
    console.log("Filtered Auctions:", auctions.value);
    if (!isFiltered.value) return auctions.value;
    return auctions.value.filter((auction) => {
        const matchesAuctionStatus = !selectedBidStatus.value || auction.status === selectedBidStatus.value;
        const matchesPaymentStatus = !selectedOfferStatus.value || auction.review_status === selectedOfferStatus.value;
        return matchesAuctionStatus && matchesPaymentStatus;
    });
});

watch([filteredAuctions, currentPage], () => {
    // If currentPage exceeds totalPages after filtering, adjust it to totalPages
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;  // Ensure currentPage stays within totalPages
    }
});

const getStatusClass = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'Active':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Completed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Outbid':
        case 'Offer Discarded':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

// Pagination controls
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
        fetchAuctions();
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
        fetchAuctions();
    }
};

const goToPage = (page) => {
    if (page !== currentPage.value) {
        currentPage.value = page;
        fetchAuctions();
    }
};

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
    fetchActivityAuctions();
});
</script>