import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userProfileImage = ref('/images/default-profile-image.png');

  // Load profile image from localStorage
  const initializeProfileImage = () => {
    const cachedProfileImage = localStorage.getItem('user_profile_picture');
    if (cachedProfileImage) {
      userProfileImage.value = cachedProfileImage;
    }
  };

  // Set the profile image and save to localStorage
  const setProfileImage = (imageUrl) => {
    userProfileImage.value = imageUrl;
    localStorage.setItem('user_profile_picture', imageUrl);
  };

  return {
    userProfileImage,
    initializeProfileImage,
    setProfileImage,
  };
});
