<template>
  <NuxtLayout name="auctioneernavbar">
    <NuxtLayout name="auctioneersidebar"></NuxtLayout>
    <div class="bg-white py-6 my-4 sm:py-8 lg:py-12 w-3/5 mx-auto rounded-md">
      <div class="mx-auto max-w-screen-lg px-4 md:px-8">
        <!-- Breadcrumb -->
        <nav class="flex  pb-16 text-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
              <NuxtLink to="/auctioneer/auctioneerdashboard"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Dashboard
              </NuxtLink>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 9 4-4-4-4" />
                </svg>
                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{{ auction.name
                  }}</span>
              </div>
            </li>
          </ol>
        </nav>
        <div class="mb-2 md:mb-3">
          <h2 class="text-2xl font-semibold text-gray-800 lg:text-3xl">{{ auction.name }}</h2>
        </div>


        <div class="grid gap-8 md:grid-cols-3">
          <!-- images - start -->
          <div class="space-y-4 w-full col-span-2">
            <div class="relative overflow-hidden rounded-lg bg-gray-100 border">
              <img v-if="auction.image_url" :src="auction.image_url" loading="lazy" alt="Auction Image Preview"
                class="h-full w-full object-cover object-center" />
              <img v-else src="public/images/no-image.jpg" alt="No Image Available"
                class="h-full w-full object-cover object-center" />
            </div>
            <div class="mt-10 md:mt-16 lg:mt-20">

              <div class="mb-3 text-lg font-semibold text-gray-800">Auction Request Caption</div>
              <p v-if="!auction.caption" class="text-gray-500">No Request Caption Provided.</p>
              <p class="mb-3 text-lg  text-gray-500">{{ auction.caption }}</p>

              <div class="mb-3 text-lg font-semibold text-gray-800">Auction Request Description</div>
              <p v-if="!auction.description" class="text-gray-500">No Request Description Provided.</p>
              <p class="text-gray-500">
                {{ auction.description }}<br /><br />
              </p>
            </div>


          </div>
          <div class="">
            <div class=" items-center mb-4">
              <!-- <a href="#" class=" text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">47 participants</a> -->
              <p class="font-semibold text-lg">Bidding Type</p>
              <div class=" flex items-center ">
                <p class="text-gray-500">{{ auction.bidding_type }}</p>
              </div>
            </div>
            <div v-if="auction.bidding_type === 'Lowest-type'" class=" items-center mb-4">

              <p class="font-semibold text-lg">Starting Bid</p>
              <div class=" flex items-center ">
                <p class="text-gray-500">₱{{ formatNumber(auction.starting_bid) }}</p>
              </div>
            </div>
            <div v-if="auction.bidding_type === 'Lowest-type'" class=" items-center mb-4">

              <p class="font-semibold text-lg">Cashbond</p>
              <div class=" flex items-center ">
                <p class="text-gray-500">₱{{ formatNumber(auction.cashbond_amount) }}</p>
              </div>
            </div>
            <div class=" items-center mb-4">

              <p class="font-semibold text-lg">Location</p>
              <div class=" flex items-center ">
                <p class="text-gray-500">{{ auction.location }}</p>
              </div>
            </div>
            <div class=" items-center mb-4">

              <p class="font-semibold text-lg">Rarity</p>
              <div class=" flex items-center ">
                <p class="text-gray-500">{{ auction.rarity }}</p>
              </div>
            </div>
            <div class=" items-center mb-4">

              <p class="font-semibold text-lg">Status</p>
              <div class=" flex items-center ">
                <p class="text-gray-500">{{ auction.status }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2.5 my-7">
          <button @click="confirmEmailBlast" :disabled="isEmailBlastSent"
            class="inline-block flex-1 rounded-lg bg-custom-bluegreen px-8 py-3 text-center text-sm font-semibold text-white outline-none  transition duration-100 hover:bg-green-500 focus-visible:ring  sm:flex-none md:text-base"
            :class="{ 'opacity-50 cursor-not-allowed': isEmailBlastSent }">
            {{ isEmailBlastSent ? "Email Blast Sent Already" : "Email Blast" }}
          </button>

          <div class="relative">
            <svg @click="toggleTooltip"
              class="w-6 h-6 cursor-pointer text-blue-500 hover:text-blue-400 transition duration-200 ease-in-out"
              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 7C11.45 7 11 7.45 11 8V11C11 11.55 11.45 12 12 12C12.55 12 13 11.55 13 11V8C13 7.45 12.55 7 12 7ZM12 13C11.45 13 11 13.45 11 14C11 14.55 11.45 15 12 15C12.55 15 13 14.55 13 14C13 13.45 12.55 13 12 13Z"
                fill="currentColor" />
            </svg>

            <!-- Tooltip Popup -->
            <div v-if="isTooltipVisible" @click="toggleTooltip"
              class="absolute left-0 top-8 bg-gray-200 text-black p-2 rounded-lg shadow-lg z-10 w-60">
              <p class="text-sm">Click the "Email Blast" button to notify all participants about the auction. Ensure
                that you've completed the payment process first.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-if="auction.bidding_type === 'Lowest-type'"
      class="bg-white py-6sm:py-8 lg:py-12 w-3/5 mx-auto rounded-md mb-44 ">
      <div class="mx-auto max-w-screen-lg px-4 md:px-8 pb-4">
        <h1 class="text-3xl font-semibold mb-2">Bidders Participated</h1>
      </div>
      <div v-if="bidders.length === 0" class="text-gray-500 mb-2 text-center">
        No participated bidders yet.
      </div>
      <div v-else v-for="bidder in bidders" :key="bidder.user_id"
        class="flex flex-wrap items-center border-b gap-y-4 py-5   border-gray-300 px-6 mx-auto w-5/6 lg md:px-8 border">
        <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Bidder Name:</dt>
          <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" class="hover:underline">{{ bidder.bidder_name }}</a>
          </dd>
        </dl>
        <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Current Bid:</dt>
          <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" class="hover:underline">₱{{ formatNumber(bidder.bid_amount) }}</a>
          </dd>
        </dl>
      </div>
    </div>

    <div v-if="auction.bidding_type === 'Offer-type'"
      class="bg-white py-6sm:py-8 lg:py-1 w-3/5 mx-auto rounded-md mb-44 ">
      <section class="w-full rounded-lg p-4 mt-8">
        <h3 class="font-os text-2xl font-bold mb-10 border-b pb-2">Pending </h3>

        <span v-if="pendingComments.length === 0" class="text-gray-500 mb-2 text-center">
          No pending offers.
        </span>
        <!-- Offer Block 1 -->
        <div v-else v-for="pendingOffer in pendingComments.slice(0, offersToShow)" :key="pendingOffer.offer_id"
          class="flex mt-4 ">
          <!-- User's Profile Image -->
          <div class="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center">
            <img class="h-12 w-12 rounded-full object-cover"
              :src="pendingOffer.userImageUrl || '/images/default-profile-image.png'" alt="User Image" />
          </div>

          <!-- Comment Details -->
          <div class="ml-3">
            <div class="font-medium text-gray-900">{{ pendingOffer.full_name }}</div>
            <div class="text-gray-600 text-sm">Posted on {{ formatDate(pendingOffer.offer_time) }}</div>
            <div class="mt-2 text-gray-900 max-w-3xl break-words bg-gray-200 p-4 rounded-lg">{{ pendingOffer.comment }}
            </div>
            <div v-if="pendingOffer.commentImages && pendingOffer.commentImages.length > 0" class="text-center">
              <div class="flex flex-wrap gap-2 mt-2">
                <div v-for="(image, idx) in pendingOffer.commentImages" :key="idx" class="w-64 h-64 border rounded-lg">
                  <img @click="openImageModal(image)" :src="image" alt="Offer Image"
                    class="w-full h-full object-cover rounded cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div class="ml-4 flex flex-col justify-between items-end">
            <div class=" text-center text-gray-800 px-3 rounded-lg text-sm">

              <!-- Review Status -->
              <p :class="{
                'bg-yellow-200 text-yellow-800': pendingOffer.review_status === 'Offer Pending',
                'bg-green-200 text-green-800': pendingOffer.review_status === 'Accepted Offer',
                'bg-red-200 text-red-800': pendingOffer.review_status === 'Offer Discarded',
                'bg-purple-200 text-purple-800': pendingOffer.review_status === 'Provide More'
              }" class=" text-sm py-1 px-3 rounded-lg">
                {{ pendingOffer.review_status }}
              </p>
            </div>

          </div>
          <div class=" flex flex-col justify-between items-end">
            <div @click="toggleDropdown(pendingOffer.offer_id)"
              class="bg-custom-bluegreen text-center text-white hover:bg-green-500 py-1 px-3 rounded-lg text-sm cursor-pointer">
              <strong>
                <svg height="20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M11.7 14C10.623 14 9.74999 13.1046 9.74999 12C9.74999 10.8954 10.623 10 11.7 10C12.7769 10 13.65 10.8954 13.65 12C13.65 12.5304 13.4445 13.0391 13.0789 13.4142C12.7132 13.7893 12.2172 14 11.7 14Z"
                      stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.8841 16.063V14.721C16.8841 14.3887 17.0128 14.07 17.2419 13.835L18.1672 12.886C18.6443 12.3967 18.6443 11.6033 18.1672 11.114L17.2419 10.165C17.0128 9.93001 16.8841 9.61131 16.8841 9.27899V7.93599C16.8841 7.24398 16.3371 6.68299 15.6624 6.68299H14.353C14.029 6.68299 13.7182 6.55097 13.4891 6.31599L12.5638 5.36699C12.0867 4.87767 11.3132 4.87767 10.8361 5.36699L9.91087 6.31599C9.68176 6.55097 9.37102 6.68299 9.04702 6.68299H7.73759C7.41341 6.68299 7.10253 6.81514 6.87339 7.05034C6.64425 7.28554 6.51566 7.6045 6.51592 7.93699V9.27899C6.51591 9.61131 6.3872 9.93001 6.15809 10.165L5.23282 11.114C4.75573 11.6033 4.75573 12.3967 5.23282 12.886L6.15809 13.835C6.3872 14.07 6.51591 14.3887 6.51592 14.721V16.063C6.51592 16.755 7.06288 17.316 7.73759 17.316H9.04702C9.37102 17.316 9.68176 17.448 9.91087 17.683L10.8361 18.632C11.3132 19.1213 12.0867 19.1213 12.5638 18.632L13.4891 17.683C13.7182 17.448 14.029 17.316 14.353 17.316H15.6614C15.9856 17.3163 16.2966 17.1844 16.5259 16.9493C16.7552 16.7143 16.8841 16.3955 16.8841 16.063Z"
                      stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
                </svg>
              </strong>
            </div>
            <div v-if="isDropdownOpen[pendingOffer.offer_id]"
              class="absolute mt-8 bg-white shadow-md drop-shadow text-center text-gray-800 py-1 px-3 rounded-lg text-sm">
              <!-- Discard Offer Button -->
              <div @click="updateOfferStatus(pendingOffer.offer_id, 'Discard Offer')"
                class="flex items-center justify-center px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white space-x-1 cursor-pointer">
                <!-- Trash Icon for Discard -->
                <svg class="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 6h18M9 6V4h6v2M6 6v14a2 2 0 002 2h8a2 2 0 002-2V6H6z" stroke="#ffffff" stroke-width="2" />
                </svg>
                <span class="text-sm">Discard Offer</span>
              </div>
              <!-- Accept Offer Button -->
              <div @click="updateOfferStatus(pendingOffer.offer_id, 'Accept Offer')"
                class="flex items-center justify-center px-2 py-1 rounded bg-green-500 hover:bg-green-700 text-white space-x-1 cursor-pointer mt-2">
                <!-- Checkmark Icon for Accept -->
                <svg class="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <span class="text-sm">Accept Offer</span>
              </div>
              <!-- Provide More Button -->
              <div @click="updateOfferStatus(pendingOffer.offer_id, 'Provide More')"
                class="flex items-center justify-center px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white space-x-1 cursor-pointer mt-2">
                <!-- Plus Icon for Provide More -->
                <svg class="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 4v16M4 12h16" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <span class="text-sm">Provide More</span>
              </div>
            </div>
          </div>

        </div>
        <!-- Horizontal Separator -->
        <hr class="my-8 border-gray-300" />

        <!-- See More Button -->
        <div v-if="offersToShow < topComments.length" class="text-center mt-4">
          <button @click="loadMoreOffers" class="bg-custom-bluegreen text-white py-2 px-4 rounded hover:bg-blue-600">
            See More
          </button>
        </div>

        <!-- Modal to display the clicked image -->
        <div v-if="isPictureViewModalOpen" @click="closeModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="relative">
            <img :src="modalImageSrc" alt="Large View" class="max-w-4xl max-h-[70vh] object-contain" />
            <!-- Close button -->
            <button @click="closeModal"
              class="absolute top-0 right-0 bg-gray-900 text-white rounded-full p-2 cursor-pointer">
              x
            </button>
          </div>
        </div>
      </section>
      <!-- Comment Section -->
      <section class="w-full rounded-lg p-4 mt-8">
        <h3 class="font-os text-2xl font-bold mb-10 border-b pb-2">Recent Offers </h3>

        <span v-if="topComments.length === 0" class="text-gray-500 mb-2 text-center">
          No recent offers.
        </span>
        <!-- Offer Block 1 -->
        <div v-for="offer in topComments.slice(0, offersToShow)" :key="offer.offer_id" class="flex mt-4">
          <!-- User's Profile Image -->
          <div class="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center">
            <img class="h-12 w-12 rounded-full object-cover"
              :src="offer.userImageUrl || '/images/default-profile-image.png'" alt="User Image" />
          </div>

          <!-- Comment Details -->
          <div class="ml-3">
            <div class="font-medium text-gray-900">{{ offer.full_name }}</div>
            <div class="text-gray-600 text-sm">Posted on {{ formatDate(offer.offer_time) }}</div>
            <div class="mt-2 text-gray-900 max-w-3xl bg-gray-200 rounded-lg p-4 break-words">{{ offer.comment }}</div>
            <div v-if="offer.commentImages && offer.commentImages.length > 0" class="text-center">
              <div class="flex flex-wrap gap-2 mt-2">
                <div v-for="(image, idx) in offer.commentImages" :key="idx" class="w-64 h-64 border rounded-lg">
                  <img @click="openImageModal(image)" :src="image" alt="Offer Image"
                    class="w-full h-full object-cover rounded cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <!-- Status Section -->
          <div class="ml-4 flex flex-col justify-between items-end">
            <div class=" text-center text-gray-800 px-3 rounded-lg text-sm">
              <!-- <strong>Status</strong> -->

              <!-- Review Status -->
              <p :class="{
                'bg-yellow-200 text-yellow-800': offer.review_status === 'Offer Pending',
                'bg-green-200 text-green-800': offer.review_status === 'Accepted Offer',
                'bg-red-200 text-red-800': offer.review_status === 'Offer Discarded',
                'bg-purple-200 text-purple-800': offer.review_status === 'Provide More'
              }" class=" text-sm py-1 px-3 rounded-lg">
                {{ offer.review_status }}
              </p>
            </div>

          </div>


        </div>
        <!-- Horizontal Separator -->
        <hr class="my-8 border-gray-300" />

        <!-- See More Button -->
        <div v-if="offersToShow < topComments.length" class="text-center mt-4">
          <button @click="loadMoreOffers" class="bg-custom-bluegreen text-white py-2 px-4 rounded hover:bg-blue-600">
            See More
          </button>
        </div>

        <!-- Modal to display the clicked image -->
        <div v-if="isPictureViewModalOpen" @click="closeModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="relative">
            <img :src="modalImageSrc" alt="Large View" class="max-w-4xl max-h-[70vh] object-contain" />
            <!-- Close button -->
            <button @click="closeModal"
              class="absolute top-0 right-0 bg-gray-900 text-white rounded-full p-2 cursor-pointer">
              x
            </button>
          </div>
        </div>
      </section>
      <div v-if="isPaymentModalOpen">
        <transition name="modal-fade">
          <div
            class="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50">
            <div class="relative w-full max-w-md px-4 h-full md:h-auto">
              <!-- Modal content -->
              <div class="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div class="flex justify-end p-2">
                  <button type="button" @click="closePaymentModal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg class="w-5 h-5" fill="curren tColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <div class="px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 text-center">
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-5">Email Blast Payment</h3>
                  <p class="text-gray-600 mb-5">Choose Your Payment Method.</p>
                  <div id="paypal-button-container"></div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>


  </NuxtLayout>
  <NuxtLayout name="footer"></NuxtLayout>
</template>


<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { toast } from "vue3-toastify";
import { useInboxSocketStore } from '@/stores/socketStore';
import { usePaypalStore } from '~/stores/paypalStore';

const emit = defineEmits();
const paypalStore = usePaypalStore();
const route = useRoute();
const auction = ref({});
const isEmailBlastSent = ref(false);
const bidders = ref([]);
const topComments = ref([]);
const pendingComments = ref([]);
const socketStore = useInboxSocketStore();
const offersToShow = ref(3);
const isPictureViewModalOpen = ref(false);
const modalImageSrc = ref('');
const paypalButtonsRendered = ref(false);
const isPaymentModalOpen = ref(false);
const isTooltipVisible = ref(false);
const isDropdownOpen = ref({});

const toggleDropdown = (offerId) => {
  isDropdownOpen.value[offerId] = !isDropdownOpen.value[offerId];
};

const formatNumber = (value) => {
  return new Intl.NumberFormat().format(value);
};

// Toggle tooltip visibility
const toggleTooltip = () => {
  isTooltipVisible.value = !isTooltipVisible.value;
};

// Function to load more offers
const loadMoreOffers = () => {
  offersToShow.value += 3; // Show 3 more offers when the button is clicked
};

const updateOfferStatus = async (offerId, action) => {
  try {
    await axios.post('/api/auctions/change-offer-status', { offerId, action });
    toast.success(`Offer status updated to "${action}"`);
    fetchAuctionDetails();
  } catch (error) {
    console.error("Failed to update offer status:", error);
    toast.error("Failed to update offer status.");
  }
};

const fetchAuctionDetails = async () => {
  try {
    const { data } = await axios.get(`/api/auctions/${route.query.id}`);
    console.log('Data for FetchAuctionDetails', data);
    auction.value = data;

    fetchBidders(auction.value.id);
    fetchPendingOffers(auction.value.id);
    if (data.email_blast_paid === 1) {
      isEmailBlastSent.value = true;
    }
  } catch (error) {
    console.error("Failed to fetch auction details:", error);
  }
};

const fetchBidders = async (listingId) => {
  console.log('auction.listing_id', listingId);
  if (listingId && auction.value.bidding_type === 'Lowest-type') { // Corrected access here
    try {
      const { data } = await axios.get(`/api/auctions/fill-in-bidder-participants?id=${listingId}`);
      bidders.value = data.bidders;
      console.log('fetch bidder in bidder-auction', data);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  } else if (listingId && auction.value.bidding_type === 'Offer-type') { // Corrected access here
    try {
      const { data } = await axios.get(`/api/auctions/fill-in-offer-participants?id=${listingId}`);
      topComments.value = data.offers; // Store the fetched top comments
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  } else {
    console.error('No listing ID available');
  }
};

const fetchPendingOffers = async (listingId) => {
  try {
    const { data } = await axios.get(`/api/auctions/pending-offers?id=${listingId}`);
    pendingComments.value = data.offers;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const sendEmailBlast = async () => {
  try {

    const emailBlastResponse = await axios.post('/api/notifications/email-blast', { auctionUuid: route.query.id });

    const notificationDetails = emailBlastResponse.data.results;

    // Emit notifications for each bidder
    notificationDetails.forEach(notification => {
      socketStore.socket.emit('notification-message', {
        recipientId: notification.bidderId,
        notification: {
          location: notification.notificationDetails.location_id,
          sender_full_name: notification.notificationDetails.sender_full_name,
          auction_name: notification.notificationDetails.auction_name,
          listing_id: notification.notificationDetails.listing_id,
          message: notification.notificationDetails.message,
          is_read: notification.notificationDetails.is_read,
          created_at: notification.notificationDetails.created_at,
          unreadCount: notification.unreadCount
        }
      });
    });

    toast.success("Email blast sent successfully!");
    fetchAuctionDetails();
  } catch (error) {
    console.error("Failed to send email blast:", error);
    toast.error("Failed to send email blast.");
  }
};

// Function to open the modal with the clicked image's source
const openImageModal = (imageSrc) => {
  modalImageSrc.value = imageSrc;
  isPictureViewModalOpen.value = true;
};

// Function to close the modal
const closeModal = () => {
  isPictureViewModalOpen.value = false;
  modalImageSrc.value = '';  // Reset the modal image source
};

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true // 12-hour format with AM/PM
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const confirmEmailBlast = () => {
  if (window.confirm("This feature requires a payment, proceed?")) {
    if (auction.value.status === 'Auction Ended' || auction.value.status === 'Transaction Ended') {
      toast.error('You cannot use this feature as the auction has already ended.');
      return;
    }
    isPaymentModalOpen.value = true; // Open the modal
    loadPaypalSdkAndRenderButton(); // Load PayPal SDK and render buttons
  }
};

// Function to close the payment modal
const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
  paypalButtonsRendered.value = false; // Reset button rendering state when modal is closed
};

// Function to load PayPal SDK and render the buttons
const loadPaypalSdkAndRenderButton = async () => {
  if (paypalButtonsRendered.value) return; // Avoid re-rendering buttons if they already exist

  // Load PayPal SDK if it hasn't been loaded yet
  if (!paypalStore.isPaypalLoaded) {
    await paypalStore.loadPaypalSdk(); // Load PayPal SDK if not already loaded
  }

  // Ensure modal content is fully rendered
  nextTick(() => {
    renderPaypalButtons(); // After DOM updates, render PayPal buttons
  });
};

// Function to render PayPal buttons after SDK is loaded
const renderPaypalButtons = () => {
  const container = document.getElementById("paypal-button-container");
  if (container && !paypalButtonsRendered.value) {
    window.paypal.Buttons({
      createOrder: async () => {
        try {
          // Create an order on the server
          const orderResponse = await axios.post('/api/paypal/create-payment', {
            items: [
              {
                name: 'Email Blast',
                description: 'Payment for notifying all bidders',
                amount: '150.00'
              }
            ]
          });

          // Return the orderID for PayPal to use
          return orderResponse.data.id; // 'id' is the PayPal `orderID`
        } catch (error) {
          console.error('Error creating order:', error);
        }
      },

      onApprove: async (data) => {
        try {
          // Capture the order on the server using the approved orderID
          const captureResponse = await axios.post('/api/paypal/capture-payment', {
            orderID: data.orderID
          }, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (captureResponse.data.status === 'COMPLETED') {
            toast.success('Payment successful!');
            sendEmailBlast();
            isEmailBlastSent.value = true;
            closePaymentModal();
          } else {
            toast.warn('Payment failed or was not completed.');
          }
        } catch (error) {
          console.error('Error capturing payment:', error);
        }
      },

      onCancel: () => {
        toast.info('Payment was cancelled.');
      },
    }).render('#paypal-button-container');
    paypalButtonsRendered.value = true;
  }
};

const handleIncomingBidNotification = (newBidNotificationMessage) => {
  console.log('Received new notification message in BidderNavbar:', newBidNotificationMessage);
  bidders.value.unshift(newBidNotificationMessage.notification);
};

onMounted(async () => {
  fetchAuctionDetails();
  if (!paypalStore.isPaypalLoaded) {
    await paypalStore.loadPaypalSdk(); // Load PayPal SDK if not already loaded
  }

  if (!socketStore.socket) {
    socketStore.connectSocket();
  }
  socketStore.socket.on('bid-channel', handleIncomingBidNotification);
});

onBeforeUnmount(() => {
  if (socketStore.socket) {
    socketStore.socket.off('bid-channel', handleIncomingBidNotification);
  }
  socketStore.disconnectSocket();
});
</script>

<style scoped>
/* Optional: add some styling for the disabled button */
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>