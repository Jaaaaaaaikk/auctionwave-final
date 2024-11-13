<template>
  <transition name="modal-fade">

    <div
      class="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50">
      <div class="relative w-full max-w-md px-4 h-96 sm:h-auto ">
        <!-- Modal content -->
        <div class="bg-white rounded-lg shadow relative dark:bg-gray-700 ">
          <div class="flex justify-end p-2">
            <button type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              @click="$emit('close')">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <form class="space-y-6 px-4 lg:px-8 pb-4 sm:pb-6 xl:pb-8" @submit.prevent="login">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to <p
                class="text-custom-bluegreen2 font-bold">AuctionWave</p>
            </h3>
            <div class="relative z-0 w-full mb-5 group">
              <input v-model="email" id="email" type="email"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
              <label for="email"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email address
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input v-model="password" id="password" type="password"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded-md border-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required autocomplete="off" />
              <label for="password"
                class="peer-focus:font-medium pl-2 left-1 bg-white absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            <div v-if="errorMessage" class="text-red-500 text-center mb-4">
              {{ errorMessage }}
            </div>

            <div class="flex justify-between">
              <div class="flex items-start">
                <div class="items-center h-5 hidden lg:inline-block">
                  <input id="remember" type="checkbox"
                    class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-custom-bluegreen h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-custom-bluegreen">
                </div>
                <div class="text-sm ml-3 hidden lg:inline-block">
                  <label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500 hidden lg:inline-block">
                Forgot Password?
              </a>
            </div>
            <button type="submit"
              class="w-full text-white bg-custom-bluegreen border border-custom-bluegreen hover:border-green-500 hover:bg-green-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login
            </button>

            <div class="text-center lg:hidden">
              <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot Password?</a>
            </div>
            <button type="submit"
              class="lg:hidden w-full text-custom-bluegreen border border-custom-bluegreen bg-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              @click="toggleSignupModal">Create
              account</button>
          </form>

          <div
            class="text-sm font-medium text-gray-500 dark:text-gray-300 space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 hidden lg:block">
            Not registered?
            <button class="text-blue-700 hover:underline dark:text-blue-500" @click="toggleSignupModal">
              Create account
            </button>
          </div>
        </div>
      </div>
      <div class="modal-container">
        <SignupModal v-if="showSignupModal" @close-signup="handleSignupClose" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import SignupModal from "~/components/signupmodal.vue";

const emit = defineEmits();
const showSignupModal = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");

const login = async () => {
  try {
    const response = await axios.post("/api/login", {
      email: email.value,
      password: password.value,
    });

    const { user_profile_picture, user } = response.data;

    localStorage.setItem('user_profile_picture', user_profile_picture);

    // Redirect based on userType
    if (user.userType === "Bidder") {
      router.replace("/bidder/bidderdashboard");
    } else if (user.userType === "Auctioneer") {
      router.replace("/auctioneer/auctioneerdashboard");
    } else {
      toast.error("Invalid user type");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message;
      toast.error(errorMessage.value);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

const toggleSignupModal = () => {
  showSignupModal.value = true;
};

const handleSignupClose = () => {
  showSignupModal.value = false;
};

</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 1s;
}

.modal-fade-enter,
.modal-fade-leave-to

/* .modal-fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  /* Increase the z-index to overlap the signin modal */
}
</style>
