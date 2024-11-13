<template>
    <!-- Overlay for form -->
    <div class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <!-- Form section -->
        <div class="bg-white w-1/4 p-6 rounded-lg shadow-md relative">
            <!-- Close button -->
            <button class="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
                @click="$emit('close-signin-admin')">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>

            <form @submit.prevent="login">
                <div class="text-center text-3xl font-bold px-5 text-custom-bluegreen my-14">Sign in as Admin</div>
                <!-- Error message -->
                <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>

                <!-- Email input -->
                <div class="flex justify-center mt-4">
                    <input v-model="email" type="text" id="email" name="email"
                        class="border p-2 w-5/6 rounded-lg h-14 focus:outline-none focus:border-custom-bluegreen focus:ring-1 focus:ring-custom-bluegreen"
                        placeholder="Email Address">
                </div>

                <!-- Password input -->
                <div class="flex justify-center mt-4">
                    <input v-model="password" type="password" id="password" name="password"
                        class="border p-2 w-5/6 rounded-lg h-14 focus:outline-none focus:border-custom-bluegreen focus:ring-1 focus:ring-custom-bluegreen"
                        placeholder="Password">
                </div>

                <!-- Divider -->
                <div class="flex justify-center mt-4">
                    <hr class="w-5/6">
                </div>

                <!-- Login button -->
                <div class="flex justify-center mt-4">
                    <button type="submit"
                        class="border w-5/6 bg-custom-bluegreen rounded-lg text-white h-14 transition-shadow duration-300 hover:shadow-inner">Log
                        In</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const emit = defineEmits();
const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");

const login = async () => {
    try {
        await axios.post("/api/adminlogin", {
            email: email.value,
            password: password.value,
        });
        router.replace("/admin/admindashboard");

    } catch (error) {
        if (error.response && error.response.data) {
            errorMessage.value = error.response.data.message;
            toast.error(errorMessage.value);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
};

</script>

<style scoped>
/* Add your custom styles here */
</style>