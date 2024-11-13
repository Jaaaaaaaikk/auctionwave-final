<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-2/5 max-w-4xl p-6">
      <!-- Modal Header -->
      <div class="flex flex-col   border-gray-400 pb-1">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-semibold truncate">{{ auction?.name || 'N/A' }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Auctioneer Info -->
        <div class="flex items-center  mb-4">
          <img v-if="auction?.auctioneer_profile_image && auction.auctioneer_profile_image.length > 0"
            :src="auction.auctioneer_profile_image" class="w-6 h-6 rounded-full mr-2" loading="lazy" />
          <img v-else src="/images/default-profile-image.png" class="w-6 h-6 rounded-full mr-2" alt="No Image Available"
            loading="lazy" />
          <span class="text-gray-600 text-sm hover:underline hover:cursor-pointer">{{ auction.auctioneer_name ||
            'No Name' }}</span>
        </div>
      </div>

      <div class="flex flex-wrap">
        <!-- Sidebar -->
        <div class="w-full pr-4 mb-6 sm:mb-0 text-sm">


          <h3 class="text-gray-600 mb-2">
            Bidding Type: <span class="font-bold">{{ auction.bidding_type }}</span>
          </h3>

          <p class="text-gray-600 mb-2 truncate">
            Location: <span class="font-bold">{{ auction?.location || 'Not specified Location' }}</span>
          </p>

          <p class="text-gray-600 mb-2 truncate" v-if="auction.bidding_type === 'Lowest-type'">
            Starting Bid: <span class="font-bold">₱{{ formatNumber(auction.starting_bid) || 'N/A' }}</span>
          </p>

          <div class="text-gray-500 dark:text-white mb-2">
            <span class=" text-gray-500 flex "> Rarity: <p :class="{
              ' text-blue-400': auction.rarity === 'Common',
              ' text-purple-800': auction.rarity === 'Uncommon',
              ' text-red-800': auction.rarity === 'Rare',

            }" class="ml-1 font-bold rounded-lg">
                {{ auction.rarity }}
              </p></span>
          </div>

          <div class="mb-2">
            <p class="text-gray-600">Categories</p>
            <div class="flex flex-wrap mt-1">
              <span v-for="(category, index) in auction.categories" :key="index"
                class="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                <span class="font-bold">{{ category }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Bidders Participated Section -->
        <hr class="w-full my-4">

        <div class="w-full sm:w-1/2  my-2" v-if="auction.bidding_type === 'Lowest-type'">
          <h3 class="flex text-xl text-center font-semibold ">Participated Bidders</h3>
          <div v-if="bidders.length === 0" class="mb-2">
            <span class="text-gray-600 text-sm flex pr-10 ml-1 mt-2">No participated bidders yet.
            </span>
          </div>
          <!-- Eye Icon (Viewers Count) -->
          <div v-for="bidder in bidders" :key="bidder.user_id" class="mb-2">
            <span class="text-gray-600 text-sm flex mt-1">{{ bidder.full_name }}
              <span v-if="isCurrentUser(bidder.user_id)" class="text-teal-500 pr-10 ml-1">(YOU)</span>
            </span>
          </div>
        </div>
        <div class="w-full sm:w-1/2  my-2" v-else-if="auction.bidding_type === 'Offer-type'">
          <h3 class="flex text-xl text-center font-semibold ">Participated Bidders</h3>
          <div v-if="topComments.length === 0" class="mb-2">
            <span class="text-gray-600 text-sm flex pr-10 ml-1 mt-2">No participated bidders yet.
            </span>
          </div>
          <!-- Eye Icon (Viewers Count) -->
          <div v-for="comment in topComments" :key="comment.user_id" class="mb-2 text-gray-600">
            <span class="text-gray-600 text-sm flex mt-1">{{ comment.full_name }}
              <span v-if="isCurrentUser(comment.user_id)" class="text-custom-bluegreen pr-10 ml-1">(YOU)</span>
            </span>
          </div>
        </div>


      </div>
      <hr class="w-full my-4">
      <div class="modal-footer mt-4 font-semibold flex justify-between items-center ">
        <div class="flex items-center space-x-2">
          <img src="/images/viewers-count-image.png" alt="Viewers Count" class="w-5 h-5 text-gray-600" />
          <p class="text-gray-600 text-sm font-bold">{{ viewersCount || 0 }}</p>
        </div>

        <button
          class="bg-custom-bluegreen rounded-md hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-teal-500 text-white px-4 py-2"
          @click="joinAuction">
          {{ buttonLabel }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps({
  auction: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits();
const router = useRouter();
const currentUserId = ref(null);
const bidders = ref([]);
const viewersCount = ref({});
const topComments = ref([]); // New state variable for top comments

const formatNumber = (value) => {
  return new Intl.NumberFormat().format(value);
};

const closeModal = () => {
  emit('close');
};

const joinAuction = async () => {
  const auctionId = props.auction.uuid;
  console.log('UUID', auctionId);

  try {
    await axios.post('/api/auctions/bidder-join-auction', { auctionId });
    router.replace({
      path: '/bidder/bidder-auction',
      query: { id: auctionId },
    });
    closeModal();
    emit('refreshRecommendedAuctions');
  } catch (error) {
    console.error('Failed to join or continue bidding in auction:', error);
  }
};

const fetchViewersCount = async () => {
  const listingId = props.auction.listing_id;
  if (listingId) {
    try {
      const { data } = await axios.get(`/api/auctions/get-viewers-count`, { params: { listing_id: listingId } });
      viewersCount.value = data.viewer_count;
    } catch (error) {
      console.error("Failed to fetch viewers count:", error);
    }
  }
};

const isCurrentUser = (bidderId) => {
  return bidderId === currentUserId.value;
};

const buttonLabel = computed(() => {
  if (props.auction.bidding_type === 'Lowest-type') {
    return bidders.value?.some(bidder => isCurrentUser(bidder.user_id)) ? 'Continue Bidding' : 'Join Auction';
  } else if (props.auction.bidding_type === 'Offer-type') {
    return topComments.value?.some(comment => isCurrentUser(comment.user_id)) ? 'Continue Bidding' : 'Join Auction';
  }
  return 'Join Auction'; // Default return in case bidding_type is not recognized
});

const fetchBidders = async () => {
  const listingId = props.auction.listing_id;
  if (!listingId) {
    console.error('No listing ID available');
    return;
  }

  try {
    if (props.auction.bidding_type === 'Lowest-type') {
      const { data } = await axios.get(`/api/auctions/fill-in-bidder-participants`, { params: { id: listingId } });
      bidders.value = data.bidderAuctionModal;
      currentUserId.value = data.currentUserId;
      console.log('Fetched bidders for lowest-type:', bidders.value);
    } else if (props.auction.bidding_type === 'Offer-type') {
      const { data } = await axios.get(`/api/auctions/fill-in-offer-participants`, { params: { id: listingId } });
      topComments.value = data.offers2;
      currentUserId.value = data.currentUserId;
      console.log('Fetched top comments for offer-type:', topComments.value);
    } else {
      console.warn('Unhandled bidding type:', props.auction.bidding_type);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};


onMounted(() => {
  fetchBidders();
  fetchViewersCount();
});
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Category tag styling */
.bg-tag {
  background-color: #e2e8f0;
  /* Tailwind gray-200 */
  color: #4a5568;
  /* Tailwind gray-700 */
  border-radius: 9999px;
  /* Full rounding */
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
