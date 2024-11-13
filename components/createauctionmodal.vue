<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div class="relative p-4 w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <header class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Create Auction</h1>
          <button type="button" @click="$emit('close')"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </header>

        <!-- Modal body -->
        <section class="p-4 md:p-5">
          <form @submit.prevent="createAuction" class=" gap-4 mb-4 ">
            <!-- Left Section - Auction Details -->
            <div class="col-span-2 mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Auction
                Name</label>
              <input v-model="auctionData.name" id="name" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-custom-bluegreen focus:border-custom-bluegreen dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter a descriptive title for your auction request (e.g. Seeking 3-Bedroom Apartment in City Center)."
                required />
            </div>


            <!-- Auction Request Caption Field -->
            <div class="col-span-2 mb-4">
              <label for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Auction
                Request Caption</label>
              <textarea v-model="auctionData.caption" id="caption" rows="2"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-custom-bluegreen focus:border-custom-bluegreen dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Provide a short, catchy title for your auction request (e.g., 3-Bedroom Condo in Downtown)."></textarea>
            </div>

            <!-- Auction Request Description Field -->
            <div class="col-span-2 mb-4">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Auction
                Request Description</label>
              <textarea v-model="auctionData.description" id="description" rows="2"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-custom-bluegreen focus:border-custom-bluegreen dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe your needs in detail (e.g., Looking for a 3-bedroom condo in downtown, near public transport, with modern amenities and priced under ₱500,000)."></textarea>
            </div>

            <div class="flex gap-4 mb-5">
              <div class="w-66 flex flex-col">
                <label for="biddingType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bidding
                  Type</label>
                <select v-model="auctionData.biddingType" id="biddingType"
                  class="focus:ring-custom-bluegreen focus:border-custom-bluegreen bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required>
                  <option value="" disabled>Bidding Type</option>
                  <option value="Lowest-type">Lowest-type</option>
                  <option value="Offer-type">Offer-type</option>
                </select>
              </div>



              <div class=" w-66 flex flex-col">
                <label for="rarity" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rarity</label>
                <select v-model="auctionData.rarity" id="rarity"
                  class=" focus:ring-custom-bluegreen focus:border-custom-bluegreen bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option value="" disabled>Select Rarity</option>
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                </select>
              </div>

              <div v-if="auctionData.biddingType === 'Lowest-type'" class="w-66 flex flex-col">
                <label for="startingBid" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting
                  Bid</label>
                <div class="relative">
                  <span
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 dark:text-white">₱</span>
                  <input v-model.number="auctionData.startingBid" id="startingBid" type="text" step="1" min="0"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-8 focus:ring-custom-bluegreen focus:border-custom-bluegreen dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0" required @input="formatStartingBid" />
                </div>
              </div>

              <div v-if="auctionData.biddingType === 'Lowest-type'" class="w-66 flex flex-col">
                <label for="duration_hours"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration
                  (hours)</label>
                <input v-model.number="auctionData.duration_hours" id="duration_hours" type="number" step="1" min="1"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-custom-bluegreen focus:border-custom-bluegreen dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Duration in hours" required />
              </div>

              <div v-if="auctionData.biddingType && auctionData.rarity" class=" w-66 flex flex-col">
                <label for="rarity" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cashbond
                  Amount</label>
                <select v-model="auctionData.cashbondAmount" id="rarity"
                  class=" focus:ring-custom-bluegreen focus:border-custom-bluegreen bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option value="" disabled>Select Amount</option>
                  <option v-for="amount in presetAmounts" :key="amount" :value="amount">
                    {{ amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                  </option>
                </select>
              </div>
            </div>


            <div class=" gap-2 mb-5">
              <div class="flex-1 flex flex-col">
                <label for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <div class="flex flex-wrap">
                  <ul
                    class="flex flex-row flex-wrap text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li v-for="(name, id) in categoryMap" :key="id"
                      class="flex items-center border-r last:border-0 dark:border-gray-600 w-1/2 sm:w-1/3 md:w-1/6">
                      <!-- Adjusted item width -->
                      <div class="flex items-center px-2 py-1">
                        <input type="checkbox" :id="'category-' + id" :checked="auctionData.categories.includes(id)"
                          @change="handleCategoryChange(id, $event.target.checked)"
                          class="w-4 h-4 text-custom-bluegreen bg-gray-100 border-gray-300 rounded focus:ring-custom-bluegreen dark:focus:ring-custom-bluegreen dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label :for="'category-' + id"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {{ name }}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <!-- Centered Image Upload Section with Preview -->
            <div class="flex justify-center col-span-2 mb-4">
              <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div v-if="auctionData.image" class="flex flex-col items-center justify-center pt-5 pb-6">
                  <!-- Image Preview Section -->
                  <img :src="auctionData.image" alt="Image Preview" class="max-h-24 object-contain mb-2 p-2" />
                  <p class="text-xs text-gray-500 dark:text-gray-400">Click to upload a new image</p>
                </div>

                <!-- Default Upload Icon and Text when no image is selected -->
                <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                </div>

                <input id="dropzone-file" type="file" class="hidden" accept="image/*" @change="onImageChange" />
              </label>
            </div>



            <div class="flex justify-end col-span-2">
              <button type="submit"
                class="text-white inline-flex items-center bg-custom-bluegreen hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"></path>
                </svg>
                Add Auction
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

// Define your form data as reactive properties
const auctionData = ref({
  name: "",
  location_id: 0,
  location_name: "",
  caption: '',
  description: "",
  startingBid: 0,
  biddingType: "",
  duration_hours: null,
  categories: [], // Stores selected category IDs
  rarity: "",
  cashbondAmount: 0,
  image: null,
});
auctionData.cashbondAmount
const isLoading = ref(false);
const emit = defineEmits();
const selectedCategory = ref("");
const categoryMap = ref({
  1: "Art",
  2: "Electronics",
  3: "Collectibles",
  4: "Furniture",
  5: "Real Estate",
  6: "Jewelry & Watches",
  7: "Vehicles",
  8: "Sports Memorabilia",
  9: "Home Appliances",
  10: "Books",
  11: "Antiques",
  12: "Music Instruments",
  13: "Manuscripts",
  14: "Tickets",
  15: "Vintage",
  16: "Coins",
  17: "Pet Supplies",
  18: "DIY Materials",
});
const errorMessage = ref("");
const router = useRouter();

const formatStartingBid = (event) => {
  let value = event.target.value;

  // Remove any non-digit characters except for commas
  value = value.replace(/[^0-9.]/g, '');

  // Add commas for thousand separators
  if (value) {
    value = Number(value).toLocaleString(); // Convert number and add commas
  }

  auctionData.value.startingBid = value; // Update the auction data with formatted value
};

// Define preset amounts based on rarity for cashbond 
const presetAmounts = computed(() => {
  const rarity = auctionData.value.rarity;
  let minCashbond = 0;
  let maxCashbond = 0;
  let increment = 10; // Default increment for common items
  let startCashbond = 0;

  if (rarity === 'Rare') {
    minCashbond = 2501;
    maxCashbond = 5000;
    increment = 90; // First increment for rare items
    startCashbond = 2510; // Start from 2510 for rare items
  } else if (rarity === 'Uncommon') {
    minCashbond = 501;
    maxCashbond = 2500;
    increment = 90; // First increment for uncommon items
    startCashbond = 510; // Start from 510 for uncommon items
  } else {
    minCashbond = 250;
    maxCashbond = 500;
    increment = 10; // Increment for common items
    startCashbond = 250; // Start from 250 for common items
  }

  let amounts = [];
  let isFirstIncrement = true;

  for (let i = startCashbond; i <= maxCashbond;) {
    amounts.push(i);

    if (isFirstIncrement) {
      i += increment;
      isFirstIncrement = false;
    } else {
      i += 100;
    }
  }

  // Convert all numbers to strings for template rendering
  return amounts.map(amount => amount.toString());
});





// Watch for changes in the rarity selection and update cashbondAmount options
watch(() => auctionData.value.rarity, () => {
  // Optionally clear the selected amount when rarity changes
  auctionData.value.cashbondAmount = null;
});

const onImageChange = async (event) => {
  const file = event.target.files[0];

  if (file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image (JPG, PNG, GIF).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    // Read the file as base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      auctionData.value.image = reader.result; // Set base64 string to auctionData
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }
};


const fetchLocation = async () => {

  try {
    const response = await axios.post('/api/get-locationid-by-name');

    console.log("API Response:", response.data);

    if (response.data.location_id) {
      auctionData.value.location_id = response.data.location_id;
      auctionData.value.location_name = response.data.locationName;
    } else {
      console.error("Location ID not found for:", userLocation);
      errorMessage.value = "Location ID not found. Please check the location name.";
    }
  } catch (error) {
    console.error("Error fetching location ID:", error);
    errorMessage.value = "Error fetching location ID. Please try again.";
  }
};



const createAuction = async () => {
  isLoading.value = true; // Start loading
  try {
    // Log the auction data for debugging
    console.log("Auction data being sent:", {
      name: auctionData.value.name,
      location_id: auctionData.value.location_id,
      caption: auctionData.value.caption,
      description: auctionData.value.description,
      starting_bid: auctionData.value.startingBid,
      bidding_type: auctionData.value.biddingType,
      duration_hours: auctionData.value.biddingType === 'Lowest-type' ? auctionData.value.duration_hours : null,
      rarity: auctionData.value.rarity,
      cashbond_amount: auctionData.value.cashbondAmount,
      categories: auctionData.value.categories, // Ensure this is an array of IDs
      image: auctionData.value.image // Ensure the image URL is included
    });

    const response = await axios.post(
      "/api/auctions/create-auction",
      {
        name: auctionData.value.name,
        location_id: auctionData.value.location_id,
        caption: auctionData.value.caption,
        description: auctionData.value.description,
        starting_bid: auctionData.value.startingBid,
        bidding_type: auctionData.value.biddingType,
        duration_hours: auctionData.value.biddingType === 'Lowest-type' ? auctionData.value.duration_hours : null,
        rarity: auctionData.value.rarity,
        cashbond_amount: auctionData.value.cashbondAmount,
        categories: auctionData.value.categories, // Send category IDs to the backend
        image: auctionData.value.image // Include the image URL
      }
    );

    const responseData = response.data;
    if (responseData.status === 201) {
      toast.success(responseData.json.message);
      emit("close");
      router.replace("/auctioneer/auctioneerdashboard");
    } else if (responseData.json && responseData.json.message) {
      toast.error(responseData.json.message);
    }
  } catch (error) {
    console.error("Error creating auction:", error); // Log the error for debugging
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
  finally {
    isLoading.value = false; // Stop loading
  }
};

const handleCategoryChange = (categoryId, isChecked) => {
  if (isChecked) {
    // Add the category ID if it is checked
    if (!auctionData.value.categories.includes(categoryId)) {
      auctionData.value.categories.push(categoryId);
    }
  } else {
    // Remove the category ID if it is unchecked
    auctionData.value.categories = auctionData.value.categories.filter(id => id !== categoryId);
  }
};

onMounted(() => {
  fetchLocation();
});
</script>

<style scoped>
.form-input {
  @apply border rounded-lg p-2 w-full;
}

.form-select {
  @apply border rounded-lg p-2 w-full;
}
</style>
