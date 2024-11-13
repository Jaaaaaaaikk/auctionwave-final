<template>
  <NuxtLayout name="biddernavbar">
    <client-only>
      <div class="min-h-screen bg-custom-white w-full mt-16">
        <NuxtLayout name="biddersidebar"></NuxtLayout>
        <div class="bg-white w-3/5 mx-auto px-12 py-12 rounded-lg flex items-start relative">

          <!-- Breadcrumbs Section -->
          <nav
            class="absolute top-4 left-4 pt-2 pb-2 text-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
            <ol class="flex space-x-2">
              <li class="inline-flex items-center">
                <NuxtLink to="/bidder/bidderdashboard"
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
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">View Profile</span>
                </div>
              </li>
            </ol>
          </nav>

          <!-- Profile Image Section -->
          <div class="mr-6 mt-10 relative">
            <img class="w-48 rounded-full ring-4 ring-blue-500"
              :src="userStore.userProfileImage || '/images/default-profile-image.png'" alt="Profile Picture"
              loading="lazy" />
            <div class="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" @click="profile_modal = true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8h4l1-2h8l1 2h4a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V10a2 2 0 012-2zm7 3a3 3 0 106 0 3 3 0 00-6 0z" />
              </svg>
              <profileModal v-if="profile_modal" @close="handleModalClose" @image-uploaded="fetchProfile" />
            </div>
          </div>

          <!-- Profile Info Section -->
          <div class="w-full">
            <div class="flex justify-end mb-4">
              <div>
                <button @click="toggleModal" class="bg-blue-500 px-3 py-1 rounded-3xl text-white focus:outline-none">
                  Edit
                </button>
              </div>
            </div>

            <!-- Display Profile Fields -->
            <div class="grid grid-cols-2 gap-2 mb-4">
              <div class="font-medium">Full Name:</div>
              <div>{{ profile.firstName }} {{ profile.middleName }} {{ profile.lastName }}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="font-medium">Email:</div>
              <div>{{ profile.email }}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="font-medium">Location:</div>
              <div>{{ profile.location }}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="font-medium">Categories:</div>
              <div>
                <span v-for="(category, index) in profile.categories" :key="index"
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {{ category }}
                </span>
              </div>
            </div>
            <div class="mb-4 p-10">
              <div class="font-medium">About:</div>
              <div class="font-normal my-4 p-4 h-full w-full border-2 rounded-xl" readonly>{{ profile.about }}</div>
            </div>
          </div>
        </div>

        <!-- Edit Profile Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
          <!-- Modal Backdrop -->
          <div @click="closeModalOnOutsideClick" class="fixed inset-0 bg-gray-500 opacity-75"></div>

          <!-- Modal Content -->
          <div ref="modalContent" class="bg-white rounded-lg shadow-xl z-50 w-full max-w-lg px-6 py-8 mx-4 relative">
            <h3 class="text-lg text-center leading-6 font-medium text-gray-900 mb-4">Edit Profile</h3>

            <!-- First Name Field -->
            <div class="mb-4">
              <label class="block font-medium">First Name:</label>
              <input v-model="editProfile.firstName" type="text" class="w-full border border-gray-300 p-2 rounded-lg"
                required />
            </div>

            <!-- Middle Name Field (Optional) -->
            <div class="mb-4">
              <label class="block font-medium">Middle Name (optional):</label>
              <input v-model="editProfile.middleName" type="text" class="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="No middle name provided" />
            </div>

            <!-- Last Name Field -->
            <div class="mb-4">
              <label class="block font-medium">Last Name:</label>
              <input v-model="editProfile.lastName" type="text" class="w-full border border-gray-300 p-2 rounded-lg"
                required />
            </div>

            <!-- Email Field (read-only) -->
            <div class="mb-4">
              <label class="block font-medium">Email:</label>
              <input v-model="editProfile.email" type="email"
                class="w-full border border-gray-300 p-2 rounded-lg bg-gray-200 cursor-not-allowed" readonly />
            </div>

            <!-- Location Field -->
            <div class="mb-4 relative">
              <input type="text" v-model="editProfile.location" placeholder="City Location"
                class="bg-gray-50 border-2 appearance-none text-gray-900 sm:text-sm rounded-md focus:ring-custom-bluegreen focus:border-custom-bluegreen block w-full p-2 pr-10"
                readonly required />
              <span class="absolute inset-y-0 right-3 flex items-center">
                <svg class="w-8 h-10 text-custom-bluegreen cursor-pointer hover:text-green-500" fill="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="toggleMap">
                  <path fill-rule="evenodd"
                    d="M12 2a7 7 0 00-7 7c0 4.418 7 13 7 13s7-8.582 7-13a7 7 0 00-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z"
                    clip-rule="evenodd"></path>
                </svg>
                <!-- Leaflet Map Modal -->
                <CityMap v-if="showMap" @citySelected="setCity" />
              </span>
            </div>
            <div class="mb-4">
              <select v-model="selectedCategory" @change="addCategory"
                class="bg-gray-50 border-2 text-gray-900 sm:text-sm rounded-lg focus:ring-custom-bluegreen focus:border-custom-bluegreen block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Select Category" required>
                <option value="" disabled>Select Category</option>
                <option v-for="category in availableCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Selected Categories Display -->
            <div class="mb-5">
              <span v-for="category in editProfile.categories" :key="category"
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ category }}
                <button type="button" @click="removeCategory(category)" class="text-red-500 ml-1">
                  x
                </button>
              </span>
            </div>
            <div class="mb-4">
              <label class="block font-medium">About:</label>
              <textarea v-model="editProfile.about" rows="4"
                class="w-full border border-gray-300 p-2 rounded-lg"></textarea>
            </div>

            <!-- Save and Cancel Buttons -->
            <div class="flex justify-end mt-6">
              <button @click="saveProfileChanges" :disabled="!hasChanges()"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Save Changes</button>
              <button @click="toggleModal" class="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </NuxtLayout>
  <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import profileModal from "~/components/change-profile-picture-modal.vue";
import { useUserStore } from '@/stores/user-profile-image';
import CityMap from '~/components/city-map.vue';

const profile = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  location_id: "",
  location: "",
  categories: [],
  about: "",
});

const editProfile = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  location_id: "",
  location: "",
  categories: [],
  about: "",
});

// Initial categories available for selection
const allAvailableCategories = [
  "Art",
  "Electronics",
  "Collectibles",
  "Furniture",
  "Real Estate",
  "Jewelry & Watches",
  "Vehicles",
  "Sports Memorabilia",
  "Home Appliances",
  "Books",
  "Antiques",
  "Music Instruments",
  "Manuscripts",
  "Tickets",
  "Vintage",
  "Coins",
  "Pet Supplies",
  "DIY Materials",
];

const selectedCity = ref({ name: '', id: '' });
const showMap = ref(false)
const availableCategories = ref([...allAvailableCategories]);
const profile_modal = ref(false);
const showModal = ref(false);
const userStore = useUserStore();
const modalContent = ref(null);
const selectedCategory = ref("");


const setCity = (city) => {
  editProfile.value.location = city.name;
  editProfile.value.location_id = city.id; // Update location with the selected city name
  showMap.value = false; // Close the map modal after selection
};

watch(selectedCity, (newCity) => {
  editProfile.value.location_id = newCity.id;
});

const toggleMap = () => {
  showMap.value = !showMap.value;
};

// Fetch user's profile data
const fetchProfile = async () => {
  try {
    const response = await axios.get("/api/bidderprofile");
    profile.value = response.data.profile;
    editProfile.value = JSON.parse(JSON.stringify(response.data.profile));
    filterAvailableCategories();
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
};

// Check if there are any changes between the profile and the edited profile
const hasChanges = () => {
  return (
    editProfile.value.firstName !== profile.value.firstName ||
    editProfile.value.middleName !== profile.value.middleName ||
    editProfile.value.lastName !== profile.value.lastName ||
    editProfile.value.location !== profile.value.location ||
    editProfile.value.location_id !== profile.value.location_id ||
    editProfile.value.about !== profile.value.about ||
    JSON.stringify(editProfile.value.categories) !== JSON.stringify(profile.value.categories)
  );
};

// Save changes to the profile
const saveProfileChanges = async () => {
  if (!hasChanges()) {
    alert("No changes detected!");
    return;
  }

  try {
    const profileChanges = {};

    // Include middle name even if it is blank (intentional removal)
    profileChanges.middleName = editProfile.value.middleName !== undefined ? editProfile.value.middleName : "";

    // Only add changed fields
    if (editProfile.value.firstName !== profile.value.firstName) {
      profileChanges.firstName = editProfile.value.firstName;
    }
    if (editProfile.value.lastName !== profile.value.lastName) {
      profileChanges.lastName = editProfile.value.lastName;
    }
    if (editProfile.value.location_id !== profile.value.location_id) {
      profileChanges.location_id = editProfile.value.location_id;
    }
    if (editProfile.value.about !== profile.value.about) {
      profileChanges.about = editProfile.value.about;
    }
    if (editProfile.value.categories.length > 0) {
      profileChanges.categories = editProfile.value.categories; // Send categories regardless
    }

    await axios.put("/api/update-bidder-profile-information", profileChanges);
    // Update the displayed profile after saving
    profile.value = {
      ...editProfile.value,
      fullname: `${editProfile.value.firstName} ${editProfile.value.middleName} ${editProfile.value.lastName}`.trim()
    };
    showModal.value = false; // Close modal
  } catch (error) {
    console.error("Error saving profile:", error.message);
  }
};


// Toggle modal visibility
const toggleModal = () => {
  showModal.value = !showModal.value;
  if (showModal.value) {
    // Initialize editProfile with a deep copy of profile data
    editProfile.value = {
      firstName: profile.value.firstName,
      middleName: profile.value.middleName,
      lastName: profile.value.lastName,
      email: profile.value.email,
      location: profile.value.location,
      location_id: profile.value.location_id,
      categories: [...profile.value.categories],
      about: profile.value.about,
    };
    selectedCategory.value = ""; // Reset selected category
    filterAvailableCategories(); // Ensure available categories are reset when opening
  }
};


// Close modal on outside click
const closeModalOnOutsideClick = (event) => {
  if (modalContent.value && !modalContent.value.contains(event.target)) {
    toggleModal();
  }
};

// Filter available categories based on selected ones
const filterAvailableCategories = () => {
  availableCategories.value = allAvailableCategories.filter(
    (category) => !editProfile.value.categories.includes(category)
  );
};

// Add category to the edit profile
const addCategory = () => {
  if (selectedCategory.value && !editProfile.value.categories.includes(selectedCategory.value)) {
    editProfile.value.categories.push(selectedCategory.value);
    selectedCategory.value = ""; // Clear the selection after adding
    filterAvailableCategories(); // Update available categories after adding
  }
};

// Remove category from the edit profile
const removeCategory = (category) => {
  editProfile.value.categories = editProfile.value.categories.filter((cat) => cat !== category);
  filterAvailableCategories(); // Update available categories after removing
};

const handleModalClose = () => {
  profile_modal.value = false;
  fetchProfile();
};

// Fetch profile on component mount
onMounted(async () => {
  userStore.initializeProfileImage(); // Initialize from localStorage
  await Promise.all([fetchProfile()]);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
