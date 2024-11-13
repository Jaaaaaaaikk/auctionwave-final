<template>
  <transition name="modal-width">
    <div class="bg-white rounded-lg shadow relative dark:bg-gray-700 justify-center">
      <form class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 pt-8">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Create your <p
            class="text-custom-bluegreen2 font-bold">AuctionWave</p> account</h3>

        <!-- Firstname, Middlename, Lastname -->
        <div class="grid grid-cols-3 gap-4">
          <div class="w-full px-2 mb-4 sm:mb-0">
            <div class="relative z-0 w-full group">
              <input v-model="form.firstname" id="firstname" type="text"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
              <label for="firstname"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                First Name</label>
            </div>
          </div>
          <div class="w-full px-2 mb-4 sm:mb-0">
            <div class="relative z-0 w-full group">
              <input v-model="form.middlename" id="middlename" type="text"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " />
              <label for="middlename"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Middle Name</label>
            </div>
          </div>
          <div class="w-full px-2">
            <div class="relative z-0 w-full group">
              <input v-model="form.lastname" id="lastname" type="text"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
              <label for="lastname"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last Name</label>
            </div>
          </div>
        </div>

        <!-- Email Address -->
        <div class="w-full px-2 mb-4 sm:mb-0">
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="form.email" id="email" type="email"
              class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required />
            <label for="email"
              class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address</label>
            <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
          </div>
        </div>

        <!-- City Location with Map Icon -->
        <div class="w-full px-2 mb-4 sm:mb-0 relative">
          <input type="text" v-model="selectedCity.name" placeholder="City Location"
            class="bg-gray-50 border-2 appearance-none text-gray-900 sm:text-sm rounded-md focus:ring-custom-bluegreen focus:border-custom-bluegreen block w-full p-2 pr-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            readonly required>
          <span class="absolute inset-y-0 right-3 flex items-center">
            <svg class="w-8 h-10 text-custom-bluegreen cursor-pointer hover:text-green-500" fill="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="toggleMap">
              <path fill-rule="evenodd"
                d="M12 2a7 7 0 00-7 7c0 4.418 7 13 7 13s7-8.582 7-13a7 7 0 00-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z"
                clip-rule="evenodd"></path>
            </svg>
            <CityMap v-if="showMap" @citySelected="setCity" />
          </span>
        </div>

        <!-- Password and Confirm Password -->
        <div class="grid grid-cols-2 gap-4">
          <div class="w-full px-2 mb-4 sm:mb-0">
            <div class="relative z-0 w-full group">
              <input v-model="form.password" id="password" type="password"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required autocomplete="off" />
              <label for="password"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password</label>
            </div>
          </div>
          <div class="w-full px-2">
            <div class="relative z-0 w-full group">
              <input v-model="form.confirmPassword" id="confirmPassword" type="password"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required autocomplete="off" />
              <label for="confirmPassword"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Confirm Password</label>
            </div>
          </div>
        </div>

        <!-- User Type (Combobox) -->
        <div class="w-full px-2 mb-4 sm:mb-0 relative">
          <label for="usertype" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">User
            Type</label>
          <select v-model="form.userType" id="userType" @change="handleUserTypeChange"
            class="bg-gray-50 border-2 text-gray-900 sm:text-sm rounded-lg focus:ring-custom-bluegreen focus:border-custom-bluegreen block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required>
            <option disabled>Select User Type</option>
            <option value="Bidder">Bidder</option>
            <option value="Auctioneer">Auctioneer</option>
          </select>
        </div>

        <!-- Categories (Combobox) -->
        <div v-if="form.userType === 'Bidder'" class="w-full px-2 relative">
          <select v-model="selectedCategory" @change="addCategory"
            class="bg-gray-50 border-2 text-gray-900 sm:text-sm rounded-lg focus:ring-custom-bluegreen focus:border-custom-bluegreen block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Select Category" required>
            <option value="" disabled>Select Category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Selected Categories Display -->
        <div v-if="form.userType === 'Bidder'" class="mb-5">
          <span v-for="category in form.categories" :key="category"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {{ category }}
            <button type="button" @click="removeCategory(category)" class="text-red-500 ml-1">
              x
            </button>
          </span>
        </div>

        <!-- Add Terms and Conditions Checkbox -->
        <div class="flex items-center px-2">
          <input type="checkbox" id="agreeTnC" v-model="form.agreeTnC" class="mr-2" required />
          <label for="agreeTnC" class="text-gray-700 dark:text-gray-300 text-sm">
            I agree to the
            <span class="text-blue-500 hover:underline cursor-pointer" @click="showTnCModal = true">
              Terms and Conditions
            </span>
          </label>
        </div>

        <button type="button" @click="toggleOtpModal"
          class="w-full text-white bg-custom-bluegreen hover:bg-green-500 focus:ring-4 focus:ring-custom-bluegreen font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Next</button>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account? <button class="text-blue-700 hover:underline dark:text-blue-500"
            @click="$emit('close-signup')">Sign in</button>
        </div>
      </form>

      <!-- Terms and Conditions Modal -->
      <transition name="fade">
        <div v-if="showTnCModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 class="text-xl font-semibold mb-4">Terms and Conditions</h2>
            <div class="overflow-y-auto max-h-60 text-sm text-gray-700">
              <p>
                1. By using this platform, you agree to comply with these terms and conditions. Our role is as a
                middleman
                or facilitator for auctions and transactions between users. We do not guarantee the quality or delivery
                of items nor are responsible for disputes arising between users.
              </p>
              <br>
              <p>
                2. Users must provide accurate and up-to-date information. Users are responsible for safeguarding their
                account details and maintaining the confidentiality of their login credentials.
              </p>
              <br>
              <p>
                3. The platform is only a facilitator and is not involved in the actual transaction or exchange of goods
                or
                services. Any transaction disputes arising outside the platform are the responsibility of the involved
                parties. The platform will only mediate according to its policies as stated herein.
              </p>
              <br>
              <p>
                4. To participate in certain auctions, bidders may be required to deposit a refundable cash bond. The
                cash
                bond may be retained in cases where a dispute arises and cannot be resolved or if the user fails to
                adhere to agreed-upon terms within the platform.
              </p>
              <br>
              <p>
                5. Disputes between users must be resolved by mutual agreement. If a dispute cannot be resolved within a
                set timeframe, the platform may automatically handle the cash bond per its policies but assumes no
                liability beyond platform involvement.
              </p>
              <br>
              <p>
                6. By signing up and using the platform, users agree to these terms, acknowledge that their
                participation
                in transactions is at their own risk, and understand that the platform assumes no liability for disputes
                arising outside its framework.
              </p>
            </div>
            <div class="flex justify-end mt-4">
              <button @click="showTnCModal = false"
                class="w-full text-white bg-custom-bluegreen hover:bg-green-500 focus:ring-4 focus:ring-custom-bluegreen font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>

      <OtpModal v-if="showOtpModal" @close_otp_modal="showOtpModal = false" @show-signin="showSigninModalHandler"
        :form="form" />
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import CityMap from '~/components/city-map.vue';
import OtpModal from '~/components/otp-modal.vue';

const emit = defineEmits();
const showMap = ref(false)
const showOtpModal = ref(false)
const selectedCity = ref({ name: '', id: '' });
const selectedCategory = ref("");
const emailError = ref("");
const showTnCModal = ref(false);

const form = ref({
  firstname: "",
  middlename: "",
  lastname: "",
  location_id: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: "",
  categories: [], // Array to store selected categories for bidders
  agreeTnC: false,
});

const categories = ref([
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
]);

// Watch for email changes and validate in email address field
watch(() => form.value.email, async (newEmail) => {
  if (newEmail) {
    try {
      const response = await axios.post("/api/validate-email-signup", { email: newEmail });
      if (!response.data.success) {
        emailError.value = response.data.message;
      } else {
        emailError.value = "";
      }
    } catch (error) {
      emailError.value = "An error occurred while checking the email.";
    }
  } else {
    emailError.value = "";
  }
});

const showSigninModalHandler = () => {
  emit('close-signup'); // Emit event to show Signin modal from SigninModal.vue
  showOtpModal.value = false; // Close OTP modal
};

// Watch for changes in selectedCity and update location_id in form
watch(selectedCity, (newCity) => {
  form.value.location_id = newCity.id;
});

// Function to handle form validation
const validateForm = () => {
  const requiredFields = ['firstname', 'lastname', 'email', 'password', 'confirmPassword', 'userType'];

  // Check if all required fields are filled
  for (const field of requiredFields) {
    if (!form.value[field]) {
      toast.warning(`Please fill in your ${field.replace(/([A-Z])/g, ' $1')}.`);
      return false;
    }
  }

  // Check email domain
  const emailRegex = /^[\w-.]+@gmail\.com$/;
  if (!emailRegex.test(form.value.email)) {
    toast.warning("Please use a valid @gmail.com email address.");
    return false;
  }

  if (emailError.value) {
    toast.warning("Email address is already in use.");
    return false;
  }

  // Ensure a city is selected
  if (!selectedCity.value.name) {
    toast.warning("Please select a city.");
    return false;
  }

  // Check if passwords match
  if (form.value.password !== form.value.confirmPassword) {
    toast.warning("Passwords do not match");
    return false;
  }

  // Check for User Type selection
  if (!form.value.userType) {
    toast.warning("Please select a User Type.");
    return false;
  }

  // Check for at least one category if the user type is "Bidder"
  if (form.value.userType === 'Bidder' && form.value.categories.length === 0) {
    toast.warning("Please select at least one category.");
    return false;
  }

  // Ensure T&C checkbox is checked
  if (!form.value.agreeTnC) {
    toast.warning("Please agree to the Terms and Conditions.");
    return false;
  }

  return true; // if All validations passed then return true.
};


const toggleOtpModal = async () => {
  if (validateForm()) {
    try {
      // Call API to generate OTP
      const response = await axios.post('/api/generate-otp', { email: form.value.email });
      console.log(response);

      if (response.data.status === 400) {
        showOtpModal.value = true;
      } else if (response.data.status === 200) {
        toast.info(response.data.json.message);
        showOtpModal.value = true; // Open the OTP modal if OTP generation is successful
      } else {
        toast.error(response.data.json.message || 'Failed to generate OTP.');
      }
    } catch (error) {
      // Handle any errors in OTP generation
      toast.error(`Error generating OTP: ${error.response?.data?.json?.message || error.message}`);
    }
  }
};


const setCity = (city) => {
  selectedCity.value = { name: city.name, id: city.id }; // Store both name and ID
  showMap.value = false; // Close the map modal after city selection
};

const toggleMap = () => {
  showMap.value = !showMap.value;
};


const handleUserTypeChange = () => {
  if (form.value.userType !== "Bidder") {
    form.value.categories = [];
  }
};


// Function to handle adding category to form
const addCategory = () => {
  if (
    selectedCategory.value &&
    !form.value.categories.includes(selectedCategory.value)
  ) {
    form.value.categories.push(selectedCategory.value);
    selectedCategory.value = "";
  }
};

// Function to handle removing category from form
const removeCategory = (category) => {
  form.value.categories = form.value.categories.filter(
    (cat) => cat !== category,
  );
};
</script>

<style scoped>
.modal-width-enter-active,
.modal-width-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.modal-width-enter,
.modal-width-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Transition for modal background */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
