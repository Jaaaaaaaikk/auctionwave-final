<template>
  <transition name="modal-fade">
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden w-11/12 max-w-lg mx-auto p-5">
        <!-- Modal Header -->
        <header class="p-4">
          <h1 class="text-2xl font-bold text-start">Upload Profile Picture</h1>
        </header>

        <!-- Modal Body -->
        <section class="p-4">
          <!-- Upload Button -->
          <div class="flex flex-col items-center justify-center space-y-4">
            <button @click="triggerFileInput"
              class="px-4 py-2 bg-custom-bluegreen text-white rounded-md hover:bg-green-500 focus:outline-none">
              + Upload Picture
            </button>
            <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" class="hidden" />
          </div>

          <!-- Uploaded Image Preview -->
          <div class="mt-6 flex justify-center">
            <div v-if="uploadedImage" class="border rounded-lg p-2">
              <img :src="uploadedImage" alt="User Uploaded Image" class="w-full h-auto object-cover rounded-md" />
            </div>
          </div>
        </section>

        <!-- Display Previously Uploaded Images -->
        <section class="p-4">
          <h1 class="text-2xl font-bold text-start mb-4">Your Uploads</h1>
          <div v-if="previousUploads.length > 0" class="grid grid-cols-2 gap-4">
            <div v-for="image in previousUploads" :key="image.profile_image_id"
              @click="confirmSetAsProfileImage(image.profile_image_id)"
              class="cursor-pointer border-2 rounded-lg p-2 hover:border-custom-bluegreen">
              <img :src="image.profile_image_url" alt="Uploaded Image" class="w-full h-auto object-cover rounded-md" />
            </div>
          </div>
          <p v-else class="text-center mb-4">No uploads yet.</p>
        </section>

        <!-- Modal Footer -->
        <footer class="p-4 text-center">
          <button type="button" @click="saveProfileImage"
            class="w-52 mx-2 my-2 font-medium px-4 py-2 bg-custom-bluegreen text-white rounded-md hover:bg-green-500">
            Save
          </button>
          <button @click="$emit('close')"
            class="w-52 mx-2 my-2 font-medium px-4 py-2 bg-white border-2 rounded-md shadow-sm-light hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 text-custom-bluegreen">
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user-profile-image'; // Import your Pinia store

// References
const fileInput = ref(null);  // File input reference
const uploadedImage = ref(null);  // Store the uploaded image URL for preview
const previousUploads = ref([]);  // Store previously uploaded images from the server
const emit = defineEmits();
const userStore = useUserStore(); // Use the user store

// Fetch the user's previously uploaded images
const fetchPreviousUploads = async () => {
  try {
    const response = await axios.get('/api/user-uploads');  // Fetch previously uploaded images
    console.log("Fetched uploads:", response.data);
    previousUploads.value = response.data.uploads;
  } catch (error) {
    console.error('Error fetching previous uploads:', error);
  }
};

// Trigger hidden file input
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle image upload with validation and preview
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    // Validate file type
    if (!validTypes.includes(file.type)) {
      alert("Please upload an image in PNG, JPG, JPEG, or GIF format.");
      return;
    }

    // Create a local URL for the image preview
    setTimeout(() => {
      const localImageUrl = URL.createObjectURL(file);
      uploadedImage.value = localImageUrl;
    }, 0); // Defer to avoid blocking the event handler
  }
};

// Save the profile image to the database
const saveProfileImage = async () => {
  if (!uploadedImage.value) {
    alert("Please upload an image before saving.");
    return;
  }

  const file = fileInput.value.files[0]; // Get the uploaded file
  const formData = new FormData();
  formData.append("image", file);

  try {
    // Send the image to the server for upload
    const response = await axios.post("/api/upload-profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const newProfileImageUrl = response.data.user_profile_picture;

    // Update the profile image in the store
    userStore.setProfileImage(newProfileImageUrl); // Set the new profile image in Pinia store

    emit('image-uploaded');
    emit('close');

    // Display a success message
    console.log("Image uploaded and saved successfully:", response.data);
  } catch (error) {
    console.error("Error uploading image:", error.message);
  }
};

// Set an existing uploaded image as the profile picture
const setAsProfileImage = async (imageId) => {
  try {
    // Send a request to set the selected image as the current profile picture
    const response = await axios.post('/api/set-profile-image', { profile_image_id: imageId });

    const newProfileImageUrl = response.data.user_profile_picture;

    // Update the profile image in the store
    userStore.setProfileImage(newProfileImageUrl); // Set the new profile image in Pinia store

    console.log('Profile image set successfully:', response.data);
    // Optionally update the UI or show success feedback
  } catch (error) {
    console.error('Error setting profile image:', error);
  }
};

// Confirm setting an existing uploaded image as the profile picture
const confirmSetAsProfileImage = (imageId) => {
  const confirm = window.confirm("Are you sure you want to set this image as your profile picture?");
  if (confirm) {
    setAsProfileImage(imageId);  // Proceed to set the profile image if confirmed
    emit('image-uploaded');
    emit('close');
  }
};

// Fetch previously uploaded images when the component is mounted
onMounted(fetchPreviousUploads);
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
