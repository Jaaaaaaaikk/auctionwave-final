<template>
  <NuxtLayout :name="navbarLayout">
    <section class="bg-white dark:bg-gray-900">
      <div class="container px-6 py-10 mx-auto">
        <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white text-center">
          Frequently Asked Questions
        </h1>

        <div class="mt-8 space-y-8 lg:mt-12">
          <div v-for="(faq, index) in faqs" :key="index" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
              {{ faq.question }}
            </h2>
            <p class="mt-4 text-gray-600 dark:text-gray-400">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>

  <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const navbarLayout = ref('');
const faqs = ref([
  {
    question: "What is AuctionWave?",
    answer: "AuctionWave is a web-based bidding system that allows users to participate in online auctions for various products and services."
  },
  {
    question: "How do I create an auction?",
    answer: "To create an auction, you need to sign in as an auctioneer. Once logged in, go to your dashboard and click on 'Create Auction' to get started."
  },
  {
    question: "How do I place a bid?",
    answer: "To place a bid, sign in as a bidder, browse through available auctions, and click 'Join Auction' or 'View Auction' to participate in the bidding process."
  },
  {
    question: "Can I track my bids?",
    answer: "Yes! You can track all your placed bids under the 'Bidding History' section on your dashboard."
  },
  {
    question: "Is there a fee for joining auctions?",
    answer: "There is no fee for joining most auctions. However, specific auctions may have participation fees depending on the auctioneer’s terms."
  }
]);

onMounted(() => {
  const userType = route.query.userType;
  if (userType === 'Auctioneer') {
    navbarLayout.value = 'auctioneernavbar';
  } else {
    navbarLayout.value = 'biddernavbar';
  }
});
</script>

<style scoped>
/* Tailwind CSS is used for styling, adjust as needed */
</style>