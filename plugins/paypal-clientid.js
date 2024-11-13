// plugins/paypalClientId.js
export default defineNuxtPlugin((nuxtApp) => {
    const clientId = nuxtApp.$config.public.PAYPAL_CLIENT_ID; // access public config
    const paypalStore = usePaypalStore();

    // Initialize the clientId in your PayPal store
    paypalStore.setClientId(clientId);
});
