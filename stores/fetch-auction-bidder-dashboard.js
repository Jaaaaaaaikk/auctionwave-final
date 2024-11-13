// stores/auctionFilterStore.js
import { defineStore } from 'pinia';

export const useAuctionFilterStore = defineStore('auctionFilter', {
    state: () => ({
        selectedBiddingType: null,
        selectedRarity: null,
        searchTerm: null,
    }),

    actions: {
        updateBiddingType(selectedBiddingType) {
            this.selectedBiddingType = selectedBiddingType;
        },
        updateRarity(selectedRarity) {
            this.selectedRarity = selectedRarity;
        },
        updateSearchTerm(searchTerm) {
            this.searchTerm = searchTerm; // Action to set the search term
        },
        clearBiddingType() {
            this.selectedBiddingType = null;
        },
        clearRarity() {
            this.selectedRarity = null;
        },

    },
});
