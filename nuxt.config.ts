// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
  },
  modules: ['@pinia/nuxt'],
  css: [ "~/assets/tailwind.css", 'leaflet/dist/leaflet.css', '~/assets/custom.css' ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // Exposing to client-side (public)
    public: {
      PAYPAL_CLIENT_ID: process.env.NUXT_ENV_PAYPAL_CLIENT_ID,  // Now accessible on the client-side
      PAYPAL_BASE_URL: process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com',
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  hooks: {
    // Trigger the cron job when Nuxt server starts listening
    'listen': () => {
      // Import and run the cron job script
      require('./server/cron-job'); // Adjust the path if needed, based on your folder structure
    }
  },
});
