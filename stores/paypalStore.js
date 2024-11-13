// stores/paypalStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePaypalStore = defineStore('paypal', () => {
    const isPaypalLoaded = ref(false);
    const clientId = ref(null); // State to store the client ID

    // Action to set client ID (called from the plugin)
    const setClientId = (id) => {
        clientId.value = id;
    };

    // Action to load the PayPal SDK script
    const loadPaypalSdk = () => {
        if (!window.paypal && clientId.value) {  // Ensure client ID is defined
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId.value}&components=buttons&currency=PHP&buyer-country=PH`;
            script.onload = () => {
                console.log('PayPal SDK loaded');
                isPaypalLoaded.value = true;
            };
            script.onerror = (error) => {
                console.error('Error loading PayPal SDK', error);
            };
            document.head.appendChild(script);
        } else if (window.paypal) {
            isPaypalLoaded.value = true; // PayPal SDK is already loaded
        }
    };

    return { isPaypalLoaded, loadPaypalSdk, setClientId };
});
