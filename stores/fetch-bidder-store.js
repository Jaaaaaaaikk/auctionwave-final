// stores/useAuctionStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuctionStore = defineStore('auction', () => {
    const bidders = ref([]);
    const currentUserId = ref(null);
    const minBid = ref(0);
    const maxBid = ref(0);
    const auction = ref(null);

    const fetchBidders = async (auction) => {
        if (!auction.id) {
            console.error('No listing ID');
            return;
        }

        try {
            const response = await axios.get(`/api/auctions/fill-in-bidder-participants?id=${auction.id}`);
            bidders.value = response.data.bidders;
            currentUserId.value = response.data.currentUserId;

            // Set bid limits
            if (response.data.lowestBid !== null) {
                maxBid.value = response.data.lowestBid;
                minBid.value = Math.ceil(response.data.lowestBid * 0.8);
            } else {
                minBid.value = auction.starting_bid;
                maxBid.value = auction.starting_bid;
            }

        } catch (error) {
            console.error('Failed to fetch bidders:', error);
        }
    };

    return {
        bidders,
        currentUserId,
        minBid,
        maxBid,
        auction,
        fetchBidders,
    };
});
