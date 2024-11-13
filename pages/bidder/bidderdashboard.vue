<template>
    <NuxtLayout name="biddernavbar">
        <div class="flex w-full">
            <NuxtLayout name="biddersidebar"></NuxtLayout>
            <div class="flex-grow bg-custom-blue2 mx-auto justify-center">
                <h2 class="text-2xl font-semibold mb-4 justify-center ml-96"></h2>

                <div v-if="paginatedListings.length === 0" class="text-center py-4 text-red-500">No auctions available.
                </div>
                <client-only>
                    <div class="flex justify-center mx-95">
                        <div class="flex flex-wrap mx-auto justify-center">
                            <div v-for="listing in paginatedListings" :key="listing.listing_id"
                                @click="openModal(listing)"
                                class="cursor-pointer bg-white border relative border-gray-200 rounded-lg shadow-md m-2 transition-transform hover:scale-105 w-64">

                                <img v-if="listing.image_urls.length > 0" :src="listing.image_urls[0]"
                                    alt="Auction Image" class="object-cover w-full h-52 rounded-t-lg" loading="lazy" />
                                <img v-else src="/public/images/no-image.jpg" alt="No Image Available"
                                    class="object-cover w-full h-32 rounded-t-lg" loading="lazy" />

                                <div class="p-2 pb-12">
                                    <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-white">
                                        {{ listing.name }}
                                    </h5>
                                    <div class="mt-1 flex flex-wrap">
                                        <span v-if="listing.categories.length === 0" class="text-sm text-gray-500">No
                                            categories</span>
                                        <span v-for="(category, index) in listing.categories" :key="index"
                                            class="bg-gray-200 text-gray-700 text-xs font-semibold mr-1 mb-1 px-1 py-0.5 rounded">
                                            {{ category }}
                                        </span>
                                    </div>
                                    <p class="text-gray-500 dark:text-white mt-1 text-xs"
                                        v-if="listing.bidding_type === 'Lowest-type'">
                                        Starting Bid: <span class="font-bold text-black">₱ {{ listing.starting_bid
                                            }}</span>
                                    </p>
                                    <p class="text-gray-500 dark:text-white mt-1 text-xs">
                                        Bidding Type: <span class="font-bold text-black">{{ listing.bidding_type
                                            }}</span>
                                    </p>
                                    <div class="text-gray-500 dark:text-white mt-1 text-xs">
                                        <span class=" text-gray-500 flex "> Rarity: <p :class="{
                                            ' text-blue-400': listing.rarity === 'Common',
                                            ' text-purple-800': listing.rarity === 'Uncommon',
                                            ' text-red-800': listing.rarity === 'Rare',

                                        }" class="ml-1 text-xs font-bold rounded-lg">
                                                {{ listing.rarity }}
                                            </p></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="paginatedListings.length > 0" class="my-20 mx-auto flex justify-center">
                        <div class="inline-flex -space-x-px text-sm">
                            <button @click="firstPage" :disabled="currentPage === 1"
                                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                                << </button>

                                    <div v-for="page in totalPages" :key="page">
                                        <button @click="changePage(page)" :disabled="currentPage === page" :class="{
                                            'flex items-center justify-center px-3 h-8 text-custom-bluegreen border border-gray-300 bg-green-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': currentPage === page,
                                            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !== page
                                        }">
                                            {{ page }}
                                        </button>
                                    </div>

                                    <button @click="lastPage" :disabled="currentPage === totalPages"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                                        >>
                                    </button>
                        </div>
                    </div>

                    <!-- Most Visited Auctions Sidebar (Right) -->
                    <div class="w-1/6 p-4 rounded-lg fixed right-0 top-0 mt-17 min-h-screen overflow-y-auto">
                        <h3 class="text-xl text-gray-500 font-semibold mb-4">Top Visited Auctions</h3>

                        <!-- Display message if there are no auctions -->
                        <div v-if="mostVisitedAuctions.length === 0" class="text-center py-4 text-gray-500">
                            No most visited auctions available yet.
                        </div>

                        <!-- Most Visited Auctions Display -->
                        <ul v-else>
                            <li v-for="(mostVisit, index) in mostVisitedAuctions" :key="mostVisit.listing_id"
                                class="mb-4">
                                <div class="bg-white p-3 rounded-lg shadow flex items-center space-x-4">
                                    <div
                                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-custom-bluegreen bg-transparent text-purple-blue-500">
                                        <span class="text-base font-bold leading-7 text-custom-bluegreen2">{{ index + 1
                                            }}</span>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-base text-gray-900">{{ mostVisit.name }}</h4>
                                        <div class="mt-1 flex flex-wrap">
                                            <span v-if="mostVisit.categories.length === 0"
                                                class="text-sm text-gray-500">No categories</span>
                                            <span v-for="(category, index) in mostVisit.categories" :key="index"
                                                class="bg-gray-200 text-gray-700 text-xs font-semibold mr-1 mb-1 px-1 py-0.5 rounded">
                                                {{ category }}
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-600">
                                            <span class="font-semibold">Bidding Type:</span> {{ mostVisit.bidding_type
                                            }}
                                        </p>
                                        <p class="text-sm text-gray-600">
                                            <span class="font-semibold">Location:</span> {{ mostVisit.location }}
                                        </p>
                                        <button @click="openModal(mostVisit)"
                                            class="bg-custom-bluegreen border-custom-bluegreen rounded-md hover:bg-green-500 text-white px-2 py-1 text-xs mt-2">
                                            View Auction
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </client-only>
                <ViewAuctionModal v-if="showModal" :auction="selectedAuction" @close="closeModal" />
            </div>
        </div>
    </NuxtLayout>
    <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import ViewAuctionModal from "~/components/viewauctionmodal.vue";
import { useAuctionFilterStore } from '@/stores/fetch-auction-bidder-dashboard';

const filterStore = useAuctionFilterStore();
const pageSize = ref(12);
const currentPage = ref(1);
const totalPages = ref(0);
const totalListings = ref(0);
const selectedBiddingType = ref(filterStore.selectedBiddingType);
const selectedRarity = ref(filterStore.selectedRarity);
const searchAuction = ref(filterStore.searchTerm);
const showModal = ref(false);
const selectedAuction = ref(null);
const listings = ref([]);
const mostVisitedAuctions = ref([]);

// Function to fetch visited auctions
const fetchMostVisitedAuctions = async () => {
    try {
        const response = await axios.get("/api/auctions/most-visited-auctions");
        mostVisitedAuctions.value = response.data.allData
    } catch (error) {
        console.error("Failed to fetch most visited auctions:", error);
    }
};

// Function to fetch auction listings
const fetchListings = async () => {
    try {
        const params = {
            biddingType: selectedBiddingType.value,
            rarity: selectedRarity.value,
            search: searchAuction.value,
            page: currentPage.value,
            pageSize: pageSize.value,
        };
        const response = await axios.get(`/api/auctions/display-auction-bidder-dashboard`, { params });
        listings.value = response.data.listings;
        totalListings.value = response.data.totalListings;
        totalPages.value = response.data.totalPages;

        if (listings.value.length === 0) {
            currentPage.value = 1;  // Reset to first page if no listings
        }

    } catch (error) {
        console.error("Failed to fetch auction listings:", error);
    }
};

// Watch for changes in the filter store and fetch listings accordingly
watch(() => filterStore.selectedBiddingType, (newValue) => {
    selectedBiddingType.value = newValue;
    currentPage.value = 1; // Reset to first page
    fetchListings();
});

watch(() => filterStore.selectedRarity, (newValue) => {
    selectedRarity.value = newValue;
    currentPage.value = 1; // Reset to first page
    fetchListings();
});

watch(() => filterStore.searchTerm, (newValue) => {
    searchAuction.value = newValue;
    currentPage.value = 1; // Reset to first page
    fetchListings();
});

// Computed property for paginated listings
const paginatedListings = computed(() => listings.value);

const changePage = (page) => {
    currentPage.value = page;
    fetchListings(); // Fetch listings for the new page
};

const firstPage = () => {
    if (currentPage.value > 1) {
        currentPage.value = 1;
        fetchListings();
    }
};

const lastPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value = totalPages.value;
        fetchListings();
    }
};

const openModal = (auction) => {
    selectedAuction.value = auction;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedAuction.value = null;
};


onMounted(async () => {
    await Promise.all([fetchListings(), fetchMostVisitedAuctions()]);
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
