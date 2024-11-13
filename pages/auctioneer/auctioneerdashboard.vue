<template>
  <NuxtLayout name="auctioneernavbar">
    <NuxtLayout name="auctioneersidebar"></NuxtLayout>

    <div class="my-6  ">
      <div class="flex flex-wrap mx-auto w-5/6 ">
        <div class="filter-container w-full sm:w-1/2 xl:w-1/3" @click="filterPendingAuctions">
          <div
            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white hover:bg-custom-bluegreen hover:bg-opacity-20 hover:cursor-pointer">
            <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
              <svg class="w-8 h-8" fill="#fffafa" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                stroke="#fffafa">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>auction</title>
                  <path
                    d="M11.623 7.603l6.062 3.5c0.479 0.276 1.090 0.112 1.365-0.366 0.277-0.478 0.113-1.090-0.365-1.365l-6.062-3.5c-0.479-0.276-1.090-0.112-1.366 0.365s-0.112 1.089 0.366 1.366zM17.186 11.969l-6.062-3.5-3.5 6.062 6.062 3.5 3.5-6.062zM6.123 17.129l6.062 3.5c0.478 0.276 1.090 0.112 1.365-0.366s0.112-1.090-0.365-1.365l-6.062-3.5c-0.479-0.276-1.090-0.112-1.366 0.365-0.277 0.478-0.112 1.090 0.366 1.366zM27.012 19.951l-11.076-5.817-1 1.732 10.576 6.683c0.717 0.414 1.635 0.169 2.049-0.549s0.168-1.635-0.549-2.049zM16.033 25c0-0.553-0.448-1-1-1h-9c-0.553 0-1 0.447-1 1 0 0.552 0 1 0 1l-1.033-0.021 0.033 1.021h13l0.047-0.958-0.984-0.042c0 0-0.063-0.448-0.063-1z">
                  </path>
                </g>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">{{ totalPendingAuctions }}</h4>
              <div class="text-gray-500">Pending Auctions</div>
            </div>
          </div>
        </div>

        <div class="filter-container w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0" @click="filterPendingCashbonds">
          <div
            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white hover:bg-custom-bluegreen hover:bg-opacity-20 hover:cursor-pointer">
            <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
              <svg class="w-8 h-8" fill="#ffffff" height="200px" width="200px" version="1.1"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 512 512" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="m264,376.2v40.1c5.3-1 9.7-3.3 13-7.2 3.3-3.8 5-8.3 5-13.4 0-4.6-1.4-8.6-4.2-11.9-2.8-3.2-7.4-5.8-13.8-7.6z">
                      </path>
                      <path
                        d="m234.8,324.8c0,3.6 1.1,7 3.4,10.1 2.3,3.1 5.7,5.6 10.3,7.6v-35.6c-4.2,1.4-7.5,3.7-10,7-2.5,3.2-3.7,6.9-3.7,10.9z">
                      </path>
                      <path
                        d="m296.4,423.4c-7.8,8.5-18.6,13.7-32.5,15.6v19.2h-15.5v-18.7c-12.3-1.4-22.3-5.9-29.9-13.3-7.7-7.4-12.6-17.9-14.7-31.4l27.8-2.9c1.1,5.5 3.3,10.2 6.4,14.2 3.1,4 6.6,6.9 10.4,8.6v-43.1c-13.9-3.8-24.1-9.7-30.6-17.4-6.5-7.8-9.8-17.2-9.8-28.4 0-11.3 3.7-20.7 11-28.4 7.4-7.7 17.1-12.1 29.4-13.2v-10.2h15.6v10.2c11.3,1.3 20.3,5 27,11.2 6.7,6.1 10.9,14.4 12.8,24.6l-27,3.4c-1.6-8.1-5.9-13.6-12.8-16.5v40.2c17.1,4.5 28.7,10.2 34.9,17.3 6.2,7.1 9.3,16.2 9.3,27.3-0.1,12.8-4,23.2-11.8,31.7zm184.2-191.8h-449.2c-11.3,0-20.4,9.1-20.4,20.4v228.6c0,11.3 9.1,20.4 20.4,20.4h449.2c11.3,0 20.4-9.1 20.4-20.4v-228.6c5.68434e-14-11.3-9.1-20.4-20.4-20.4z">
                      </path>
                      <path
                        d="m427,159h-342c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h342c11.3,0 20.4-9.1 20.4-20.4 0-11.2-9.1-20.4-20.4-20.4z">
                      </path> \
                      <path
                        d="m146.3,125.8h219.5c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-219.5c-11.3,0-20.4,9.1-20.4,20.4-0.1,11.3 9.1,20.4 20.4,20.4z">
                      </path>
                      <path
                        d="m219.5,51.8h73.1c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-73.1c-11.3,0-20.4,9.1-20.4,20.4-2.84217e-14,11.3 9.1,20.4 20.4,20.4z">
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">{{ totalPendingCashbonds }}</h4>
              <div class="text-gray-500">Pending Cashbonds</div>
            </div>
          </div>
        </div>

        <div class="filter-container w-full mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0" @click="filterPendingTransactions">
          <div
            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white hover:bg-custom-bluegreen hover:bg-opacity-20 hover:cursor-pointer">
            <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z"
                    fill="#ffffff"></path>
                </g>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700"> {{ totalPendingTransaction }}</h4>
              <div class="text-gray-500">Transaction Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="bg-white rounded-lg  flex flex-col items-center justify-center w-5/6 mx-auto">
      <!-- Default Message if No Auctions Exist -->
      <div v-if="auctions.length === 0 && !isSearching" class="flex flex-row items-center space-x-6">
        <div class="flex-shrink-0">
          <img src="/public/images/auction-image.png" alt="Create Auction" class="w-64 h-auto" />
        </div>
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-semibold mb-4">
            You don't have created auctions yet.
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Click the button below to create one.
          </p>
          <button @click="create_AuctionModal = true"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create Auction
          </button>
        </div>
      </div>

      <!-- Auctions Table if Auctions Exist -->
      <div v-else class="w-full">
        <div class="gap-4 sm:flex sm:items-center sm:justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl m-6">My Auctions</h2>

          <div class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0 mx-6">
            <!-- <form @submit.prevent class="flex justify-end max-w-lg w-full"> -->
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                </svg>
              </div>
              <input type="search" v-model="searchTerm" @input="handleSearch" id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Search auction name..." />
            </div>

            <!-- </form> -->

            <div>
              <label for="AuctionStatus"
                class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Auction Status</label>
              <select id="AuctionStatus" v-model="selectedAuctionStatus" @change="resetAuctionStatus" class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 py-2.5 text-sm
                text-gray-900 focus:border-custom-bluegreen focus:ring-custom-bluegreen dark:border-gray-600
                dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-custom-bluegreen
                dark:focus:ring-custom-bluegreen">
                <option value="">
                  All
                </option>
                <option v-for="auctionStatus in auctionStatusMap" :key="auctionStatus" :value="auctionStatus">
                  {{ auctionStatus }}
                </option>
              </select>
            </div>

            <div>
              <label for="AuctionPayment
                Status" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">AuctionPayment
                Status</label>
              <select id="AuctionPayment
                Status" v-model="selectedPaymentStatus" @change="resetPaymentStatus"
                class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-custom-bluegreen focus:ring-custom-bluegreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-custom-bluegreen dark:focus:ring-custom-bluegreen">
                <option value="">
                  All
                </option>
                <option v-for="paymentStatus in paymentStatusMap" :key="paymentStatus" :value="paymentStatus">
                  {{ paymentStatus }}
                </option>
              </select>
            </div>

            <div>
              <label for="AuctionTransaction
                Status" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">AuctionTransaction
                Status</label>
              <select id="AuctionTransaction
                Status" v-model="selectedTransactionStatus" @change="resetTransactionStatus"
                class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-custom-bluegreen focus:ring-custom-bluegreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-custom-bluegreen dark:focus:ring-custom-bluegreen">
                <option value="">
                  All
                </option>
                <option v-for="transactionStatus in transactionStatusMap" :key="transactionStatus"
                  :value="transactionStatus">
                  {{ transactionStatus }}
                </option>
              </select>
            </div>

            <!-- <span class="inline-block text-gray-500 dark:text-gray-400"> from </span> -->

            <button @click="create_AuctionModal = true"
              class="flex bg-custom-bluegreen text-white py-2 px-4 rounded hover:bg-green-500"><svg class=" w-5 h-5"
                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>


          </div>
        </div>

        <!-- Message for No Search Results -->
        <div v-if="isSearching && filteredAuctions.length === 0"
          class="text-center mt-6 text-gray-500 dark:text-gray-300">
          {{ noResultsMessage }}
        </div>

        <!-- Table Layout -->
        <div v-for="auction in filteredAuctions" :key="auction.listing_id" @click="view_auction(auction)"
          class="flex flex-wrap items-center border-b gap-y-4 py-5 hover:bg-custom-bluegreen hover:bg-opacity-20 hover:cursor-pointer border-gray-300 px-6 ">
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Auction Name:</dt>
            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              <a href="#" class="hover:underline">{{ auction.name }}</a>
            </dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
            <dd v-if="auction.status === 'Transaction Pending'"
              class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              {{ auction.transaction_status }}
            </dd>
            <dd v-else class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              {{ auction.status }}
            </dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Location:</dt>
            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ auction.location_name }}</dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Bidding Type:</dt>
            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ auction.bidding_type }}</dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Rarity:</dt>
            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{ auction.rarity }}</dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Date Created:</dt>
            <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{{
              formatDate(auction.created_at) }}</dd>
          </dl>

          <!-- Check and Wrong Indicators -->
          <dl v-if="auction.transaction_status === 'Transaction Pending'" class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">

            <dd class="mt-1.5 flex items-center space-x-2">
              <!-- Green Circle with Check Icon and "Item Received" Text -->
              <div
                class="flex items-center justify-center px-2 py-1 rounded bg-custom-bluegreen hover:bg-green-500 text-white space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 6.707a1 1 0 00-1.414-1.414L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-sm">Item Received</span>
              </div>

              <!-- Red Circle with Wrong (X) Icon and "Not Received" Text -->
              <div
                class="flex items-center justify-center px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-sm">Not Received</span>
              </div>
            </dd>
          </dl>
          <span v-else class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          </span>
        </div>


        <!-- Pagination Controls -->
        <div v-if="filteredAuctions.length > 0" class="my-20 mx-auto flex justify-center">
          <div class="inline-flex -space-x-px text-sm">
            <button @click="prevPage" :disabled="currentPage === 1"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-gray-700">
              Previous
            </button>
            <span v-for="page in totalPages" :key="page" :class="{
              'flex items-center justify-center px-3 h-8 text-custom-bluegreen border border-gray-300 bg-green-50 hover:bg-blue-100 hover:text-blue-700': currentPage === page,
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700': currentPage !== page
            }" @click="goToPage(page)">
              {{ page }}
            </span>

            <button @click="nextPage" :disabled="currentPage === totalPages"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-custom-bluegreen hover:bg-opacity-25 hover:text-gray-700">
              Next
            </button>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded pb-24 z-0">
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class=" w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">Recent Activities</h3>
              </div>
            </div>
            <div class="block w-full">
              <div
                class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Today
              </div>
              <ul class="my-1">
                <li v-if="recentActivitiesToday.length === 0" class="px-4 py-2 text-gray-600 dark:text-gray-200">No
                  recent activities today.</li>
                <li v-for="(activity, index) in recentActivitiesToday" :key="index" class="flex px-4">
                  <div class="w-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3">
                    <svg class="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                      <path
                        d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z">
                      </path>
                    </svg>
                  </div>
                  <div
                    class="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                    <div class="flex-grow flex justify-between items-center">
                      <span class="self-center">
                        {{ activity.message }}
                      </span>
                      <div class="flex-shrink-0 ml-2">
                        <button
                          class="flex items-center font-medium text-custom-bluegreen hover:text-green-500 dark:text-blue-400 dark:hover:text-blue-500"
                          href="#0" style="outline: none;" @click="viewActivity(activity)">
                          View
                          <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                              class="transform transition-transform duration-500 ease-in-out">
                              <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Yesterday
              </div>
              <ul class="my-1">
                <li v-if="recentActivitiesYesterday.length === 0" class="px-4 py-2 text-gray-600 dark:text-gray-200">No
                  recent activities yesterday.</li>
                <li v-for="(activity, index) in recentActivitiesYesterday" :key="index" class="flex px-4">
                  <div class="w-9 h-9 rounded-full flex-shrink-0 bg-green-500 my-2 mr-3">
                    <svg class="w-9 h-9 fill-current text-light-blue-50" viewBox="0 0 36 36">
                      <path
                        d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z">
                      </path>
                    </svg>
                  </div>
                  <div class="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                    <div class="flex-grow flex justify-between items-center">
                      <span class="self-center">{{ activity.message }}</span>
                      <div class="flex-shrink-0 ml-2">
                        <button @click="viewActivity(activity)"
                          class="flex items-center font-medium text-custom-bluegreen hover:text-green-500 dark:text-blue-400 dark:hover:text-blue-500"
                          href="#0" style="outline: none;">
                          View<span><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                              class="transform transition-transform duration-500 ease-in-out">
                              <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                            </svg></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- ./Recent Activities -->
      </div>

      <CreateAuction_Modal v-if="create_AuctionModal" @close="handleModalClose" />

    </section>

  </NuxtLayout>
  <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CreateAuction_Modal from "~/components/createauctionmodal.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const create_AuctionModal = ref(false);
const auctions = ref([]);
const currentPage = ref(1);
const pageSize = ref(6);
const totalPages = ref(0);
const router = useRouter();
const searchTerm = ref("");
const isSearching = ref(false);
const isFiltered = ref(false);
const totalPendingAuctions = ref(0);
const totalPendingCashbonds = ref(0);
const totalPendingTransaction = ref(0);
const selectedAuctionStatus = ref("");
const selectedPaymentStatus = ref("");
const selectedTransactionStatus = ref("");
const recentActivitiesToday = ref([]);
const recentActivitiesYesterday = ref([]);

// Initialize auction status map as an array of strings
const auctionStatusMap = ref([
  "Auction Pending",
  "Auction Ended",
  "Awaiting Payment",
]);

const paymentStatusMap = ref([
  "Payment Pending",
  "Payment Completed",
  "Payment Failed",
  "Payment Refunded",
]);

const transactionStatusMap = ref([
  "Transaction Pending",
  "Transaction Disputed",
  "Transaction Completed",
  "Transaction Failed",
]);

const noResultsMessage = computed(() => {
  if (selectedAuctionStatus.value) {
    return "No auctions found for the selected auction status.";
  } else if (selectedPaymentStatus.value) {
    return "No auctions found for the selected payment status.";
  } else if (selectedTransactionStatus.value) {
    return "No auctions found for the selected transaction status.";
  } else {
    return "No auctions found for your search criteria.";
  }
});

const filterPendingAuctions = () => {
  selectedAuctionStatus.value = "Auction Pending";
  selectedPaymentStatus.value = "";
  selectedTransactionStatus.value = "";
  currentPage.value = 1;
  isSearching.value = true;
  isFiltered.value = true;
  fetchAuctions();
};

const filterPendingCashbonds = () => {
  selectedAuctionStatus.value = "";
  selectedPaymentStatus.value = "Payment Pending";
  selectedTransactionStatus.value = "";
  isFiltered.value = true;
  isSearching.value = true;
  currentPage.value = 1;
  fetchAuctions();
};

const filterPendingTransactions = () => {
  selectedAuctionStatus.value = "";
  selectedPaymentStatus.value = "";
  selectedTransactionStatus.value = "Transaction Pending";
  currentPage.value = 1;
  isSearching.value = true;
  isFiltered.value = true;
  fetchAuctions();
};

const resetAuctionStatus = () => {
  selectedPaymentStatus.value = "";
  selectedTransactionStatus.value = "";
  searchTerm.value = "";
  currentPage.value = 1;
  isSearching.value = true;
  fetchAuctions();
};

const resetPaymentStatus = () => {
  selectedAuctionStatus.value = "";
  selectedTransactionStatus.value = "";
  searchTerm.value = "";
  currentPage.value = 1;
  isSearching.value = true;
  fetchAuctions();
};

const resetTransactionStatus = () => {
  selectedAuctionStatus.value = "";
  selectedPaymentStatus.value = "";
  searchTerm.value = "";
  currentPage.value = 1;
  isSearching.value = true;
  fetchAuctions();
};

const fetchRecentActivities = async () => {
  try {
    const { data } = await axios.post("/api/auctions/display-recent-activities", {
    });
    console.log('the Data', data);
    recentActivitiesToday.value = data.recentActivitiesToday;
    recentActivitiesYesterday.value = data.recentActivitiesYesterday;

  } catch (error) {
    console.error("Error fetching recent activities:", error);
  }
};


const view_auction = (auction) => {
  // Pass auction ID in query parameter
  router.push({ path: '/auctioneer/auctioneer-manage-auction', query: { id: auction.uuid } });
};

const viewActivity = (activity) => {
  // Pass auction ID in query parameter
  router.push({ path: '/auctioneer/auctioneer-manage-auction', query: { id: activity.auctionUuid } });
};

// Fetch auctions with pagination parameters
const fetchAuctions = async () => {
  try {
    const { data } = await axios.get("/api/auctions/auctioneer-created-auctions", {
      params: { page: currentPage.value, pageSize: pageSize.value, search: searchTerm.value, auctionStatus: selectedAuctionStatus.value, paymentStatus: selectedPaymentStatus.value, transactionStatus: selectedTransactionStatus.value, }
    });

    auctions.value = data.auctions;
    totalPendingAuctions.value = data.totalAuctionPending;
    totalPendingCashbonds.value = data.totalCashbondPending;
    totalPendingTransaction.value = data.totalTransactionPending;
    totalPages.value = data.totalPages;

  } catch (error) {
    console.error("Failed to fetch auctions:", error);
  }
};

// Computed filtered results
const filteredAuctions = computed(() => {
  if (!isFiltered.value) return auctions.value;
  return auctions.value.filter((auction) => {
    const matchesAuctionStatus = !selectedAuctionStatus.value || auction.status === selectedAuctionStatus.value;
    const matchesPaymentStatus = !selectedPaymentStatus.value || auction.payment_status === selectedPaymentStatus.value;
    const matchesTransactionStatus = !selectedTransactionStatus.value || auction.transaction_status === selectedTransactionStatus.value;
    return matchesAuctionStatus && matchesPaymentStatus && matchesTransactionStatus;
  });
});

watch([filteredAuctions, currentPage], () => {
  // If currentPage exceeds totalPages after filtering, adjust it to totalPages
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;  // Ensure currentPage stays within totalPages
  }
});


const handleSearch = () => {
  currentPage.value = 1; // Reset to first page on new search
  isSearching.value = !!searchTerm.value;
  selectedAuctionStatus.value = "";
  selectedPaymentStatus.value = "";
  selectedTransactionStatus.value = "";
  fetchAuctions();
};

const handleModalClose = () => {
  create_AuctionModal.value = false;
  fetchAuctions(); // Re-fetch auctions after closing the modal
};

// Pagination controls
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchAuctions();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchAuctions();
  }
};

const goToPage = (page) => {
  if (page !== currentPage.value) {
    currentPage.value = page;
    fetchAuctions();
  }
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchAuctions();
  fetchRecentActivities();
});

</script>


<style scoped>
/* Your styles here */
</style>
