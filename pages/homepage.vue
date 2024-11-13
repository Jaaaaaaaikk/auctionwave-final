<template>
  <div class="flex flex-col min-h-screen bg-custom-blue2">
    <!-- Main content -->
    <div class="flex-grow">

      <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16">
        <div class="flex justify-between items-center sm:px-10 px-5 h-full">
          <img src="/public/images2/auctionwave-logo-final.png" class="h-10 object-contain hidden md:block"
            alt="Logo" />
          <img src="/public/images/logo-no-text123.jpg" class="h-10 object-contain md:hidden" alt="Logo" />
          <div class="flex items-center space-x-4">
            <div
              class="px-5 py-2 font-medium text-white  bg-custom-bluegreen rounded-md cursor-pointer flex items-center justify-center hover:bg-green-500 hover:text-white border-custom-bluegreen"
              @click="showSigninModal = true">Sign in</div>
          </div>
        </div>
      </nav>
    </div>

    <section class="bg-white dark:bg-gray-900 mt-16">
      <div class="lg:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="lg:mr-auto place-self-center lg:col-span-7">
          <h1
            class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-center lg:text-left text-custom-bluegreen dark:text-white italic">
            Online Auctions Made Easy
          </h1>
          <p
            class="max-w-2xl mb-6 font-light text-center lg:text-left text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Experience
            a seamless and convenient way to participate in online auctions, from anywhere and at any time.</p>
          <div class="flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
            <button @click="scrollToAuctions"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-custom-bluegreen hover:bg-green-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Discover Auctions Within Your City
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <a href="#"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-custom-bluegreen border border-custom-bluegreen rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Contact Us
            </a>
          </div>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/public/images2/5989.jpg" alt="mockup">
        </div>
      </div>
    </section>
    <!------------------------------------------------------------->
    <!--Find Auction Area-->
    <section id="featured-auctions" class="bg-custom-blue2 py-8 antialiased dark:bg-gray-900 md:pt-24">
      <div class="mx-auto w-5/6 px-4 2xl:px-0">

        <!-- Heading & Filters -->
        <div class="mb-4 items-end justify-between space-y-4 xl:flex sm:space-y-0 md:mb-8 w-5/6 mx-auto">
          <div class="w-full">
            <h2 class="mt-3 text-xl text-start font-semibold text-gray-900 dark:text-white sm:text-3xl">Featured
              Auctions</h2>
          </div>

          <!-- Filter Section -->
          <div class="flex items-center space-x-4 justify-end w-full relative">
            <!-- Dropdown Button -->
            <button id="dropdown-button" @click="toggleDropdown"
              class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
              <p class="hidden md:block">Filter</p>
              <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <!-- Dropdown content (toggle visibility) -->
            <div v-show="isDropdownVisible"
              class="absolute right-0 top-10 mt-2 w-auto bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              id="dropdown">
              <div class="py-2 px-4">
                <div class="flex space-x-2">
                  <!-- City Filter -->
                  <div class="">
                    <h3 class="font-medium text-gray-900 dark:text-white">Select City</h3>
                    <div class="space-y-2 mt-2">
                      <div v-for="city in visibleCities" :key="city" class="flex items-center">
                        <input type="radio" :id="city" :value="city" v-model="selectedCity" name="city"
                          class="w-4 h-4 text-custom-bluegreen focus:ring-custom-bluegreen dark:bg-gray-600 dark:border-gray-500">
                        <label :for="city" class="ml-2 text-sm text-gray-900 dark:text-gray-400 cursor-pointer">{{ city
                          }}</label>
                      </div>
                    </div>
                    <!-- See More Button -->
                    <button v-if="cities.length > 5" @click="toggleShowMoreCities" class="text-blue-500 text-sm mt-2">{{
                      isCitiesExpanded ? 'Show Less' : 'See More' }}</button>
                  </div>

                  <!-- Clear All Button (align with filters) -->
                  <div class="mb-4 w-1/6">
                    <button @click="clearSelectedCity"
                      class="text-xs font-medium text-custom-bluegreen hover:text-custom-bluegreen-dark hover:underline mt-6 md:mt-0">
                      Clear All
                    </button>
                  </div>

                  <!-- Category Filter -->
                  <div class="mb-4 w-1/6">
                    <h3 class="font-medium text-gray-900 dark:text-white">Select Category</h3>
                    <div class="space-y-2 mt-2">
                      <div v-for="category in visibleCategories" :key="category" class="flex items-center">
                        <input type="radio" :id="category" :value="category" v-model="selectedCategory" name="category"
                          class="w-4 h-4 text-custom-bluegreen focus:ring-custom-bluegreen dark:bg-gray-600 dark:border-gray-500">
                        <label :for="category" class="ml-2 text-sm text-gray-900 dark:text-gray-400 cursor-pointer">{{
                          category }}</label>
                      </div>
                    </div>
                    <!-- See More Button -->
                    <button v-if="categories.length > 5" @click="toggleShowMoreCategories"
                      class="text-blue-500 text-sm mt-2">{{ isCategoriesExpanded ? 'Show Less' : 'See More' }}</button>
                  </div>

                  <div class="mx-2">
                    <button @click="clearSelectedCategory"
                      class="text-xs font-medium text-custom-bluegreen hover:text-custom-bluegreen-dark hover:underline mt-6 md:mt-0">
                      Clear All
                    </button>
                  </div>
                  <!-- Clear All Button (align with filters) -->
                </div>
              </div>
            </div>
          </div>
        </div>


        <div v-if="displayedAuctions.length === 0" class="text-center mt-6 text-gray-500 dark:text-gray-300">
          No auctions found for the selected city or category.
        </div>
        <!-- Auction Section -->
        <section class="bg-custom-blue2 dark:bg-gray-900 antialiased w-full mx-auto rounded-b-md mt-10">
          <div class="flex flex-wrap mx-auto justify-center">
            <!-- Product Card Example -->
            <div @click="showSigninModal = true" v-for="auction in displayedAuctions" :key="auction.listing_id"
              class="cursor-pointer bg-white hover:border relative hover:border-gray-200 hover:shadow rounded-lg m-2 transition-transform hover:scale-105 w-64">
              <!-- Auction Image -->
              <img v-if="auction.image_urls.length > 0" :src="auction.image_urls[0]" alt="Auction Image"
                class="object-cover w-full h-52 rounded-t-lg" loading="lazy" />
              <img v-else src="/public/images/no-image.jpg" alt="No Image Available"
                class="object-cover w-full h-44 rounded-t-lg" loading="lazy" />
              <div class="p-2 pb-12">
                <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-white">{{ auction.name }}
                </h5>
                <div class="mt-1 flex flex-wrap">
                  <span v-for="(category, index) in auction.categories" :key="index"
                    class="bg-gray-200 text-gray-700 text-xs font-semibold mr-1 mb-1 px-1 py-0.5 rounded">{{
                      category }}</span>
                </div>
                <p class="text-gray-500 dark:text-white mt-1 text-xs">Bidding Type: <span
                    class="font-bold text-black">{{ auction.bidding_type }}</span></p>
                <p v-if="auction.bidding_type === 'Lowest-type'" class="text-gray-500 dark:text-white mt-1 text-xs">
                  Starting Bid: <span class="font-bold text-black">₱
                    {{ auction.starting_bid }}</span></p>
                <p class="text-gray-500 dark:text-white mt-1 text-xs">Rarity: <span class="font-bold text-black">{{
                  auction.rarity }}</span></p>
              </div>
            </div>
          </div>

          <div v-if="canLoadMore" class="mt-20 mb-5 mx-auto flex justify-center">
            <button @click="loadMoreAuctions"
              class="xl:w-1/4 text-white bg-custom-bluegreen border border-custom-bluegreen hover:border-green-500 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{{
                isShowingAll ? 'Show Less' : 'More Auctions' }}</button>
          </div>
        </section>
      </div>
    </section>

    <!------------------------------------------------------------->

    <section class="py-24 px-4">
      <div class="mx-auto max-w-7xl  sm:px-6 lg:px-8">
        <div
          class="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
          <div class="relative w-full text-center lg:text-left lg:w-2/4">
            <h2
              class="text-4xl font-bold text-custom-bluegreen2 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
              Enjoy the finest features with our products</h2>
          </div>
          <div class="relative w-full text-center  lg:text-left lg:w-2/4">
            <p class="text-lg font-normal text-gray-500 mb-5">We simplify your online auction experience, handling all
              transactions smoothly so you can focus on winning your bids with ease.</p>
            <button @click="scrollToAuctions"
              class="flex flex-row items-center justify-center gap-2 text-base font-semibold text-custom-bluegreen lg:justify-start hover:text-green-500 ">Try
              now <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                  stroke="#005262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          class="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          <div
            class="group relative w-full bg-white rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-custom-bluegreen">
            <div class="bg-gray-100 rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                  stroke="#005262" stroke-width="2"></path>
              </svg>

            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Easy Payment</h4>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Transactions are facilitated through PayPal payment gateways.
            </p>
          </div>
          <div
            class="group relative w-full bg-white rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-custom-bluegreen">
            <div class="bg-gray-100 rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.6071 14.375 9.6071C12.6491 9.6071 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571V20.8571M3.75 13.2264V15.2343C3.75 17.6868 3.75 18.9131 4.27747 19.9685C4.80493 21.0239 5.78567 21.76 7.74715 23.2322L8.57248 23.8516C11.4626 26.0208 12.9077 27.1054 14.5753 27.1054C16.243 27.1054 17.688 26.0208 20.5782 23.8516L21.4035 23.2322C23.365 21.76 24.3457 21.0239 24.8732 19.9685C25.4006 18.9131 25.4006 17.6868 25.4006 15.2343V13.2264C25.4006 9.95932 25.4006 8.32576 24.546 7.05852C23.6913 5.79128 22.1768 5.17918 19.1477 3.95499L18.3223 3.62144C16.4724 2.87381 15.5475 2.5 14.5753 2.5C13.6032 2.5 12.6782 2.87381 10.8283 3.62144L10.003 3.95499C6.97389 5.17919 5.45934 5.79128 4.60467 7.05852C3.75 8.32576 3.75 9.95932 3.75 13.2264Z"
                  stroke="#005262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>

            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Safe Transaction</h4>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              We ensure top-level security for all user transactions.
            </p>
          </div>

          <div
            class="group relative w-full bg-white rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-custom-bluegreen">
            <div class="bg-gray-100 rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 15C17.5 15 19.5 13 19.5 10.5C19.5 8 17.5 6 15 6C12.5 6 10.5 8 10.5 10.5C10.5 13 12.5 15 15 15Z"
                  stroke="#005262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.5 27C4.5 23.5 10.5 21 15 21C19.5 21 25.5 23.5 25.5 27" stroke="#005262" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              User Management</h4>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Manage user profiles, permissions, and preferences seamlessly for a personalized experience.
            </p>
          </div>
          <div
            class="group relative w-full bg-white rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-custom-bluegreen">
            <div class="bg-gray-100 rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30,24V22H27.8989a4.9678,4.9678,0,0,0-.7319-1.7529l1.49-1.49-1.414-1.414-1.49,1.49A4.9678,4.9678,0,0,0,24,18.1011V16H22v2.1011a4.9678,4.9678,0,0,0-1.7529.7319l-1.49-1.49-1.414,1.414,1.49,1.49A4.9678,4.9678,0,0,0,18.1011,22H16v2h2.1011a4.9678,4.9678,0,0,0,.7319,1.7529l-1.49,1.49,1.414,1.414,1.49-1.49A4.9678,4.9678,0,0,0,22,27.8989V30h2V27.8989a4.9678,4.9678,0,0,0,1.7529-.7319l1.49,1.49,1.414-1.414-1.49-1.49A4.9678,4.9678,0,0,0,27.8989,24Zm-7,2a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,23,26Z"
                  fill="#005262"></path>
                <path
                  d="M28,4H4A2.002,2.002,0,0,0,2,6V26a2.0023,2.0023,0,0,0,2,2H14V26H4V12H28v3h2V6A2.0023,2.0023,0,0,0,28,4Zm0,6H4V6H28Z"
                  fill="#005262"></path>
                <circle cx="20" cy="8" r="1" fill="#005262"></circle>
                <circle cx="23" cy="8" r="1" fill="#005262"></circle>
                <circle cx="26" cy="8" r="1" fill="#005262"></circle>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Auction Management</h4>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Streamline auctions from item listing to bid tracking for a seamless experience.
            </p>
          </div>
        </div>
        <div
          class="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:justify-center lg:gap-x-8 mt-10">


          <div
            class="group relative w-full bg-white rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-custom-bluegreen">
            <div class="bg-custom-blue2 rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="#005262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M12 6V12" stroke="#005262" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M16.24 16.24L12 12" stroke="#005262" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Real-Time Bidding</h4>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Bid in real time and keep track of auctions as they happen.</p>
          </div>

          <div
            class="group relative w-full bg-white rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-custom-bluegreen">
            <div class="bg-custom-blue2 rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 20L12 3L5 20L12 17L19 20Z" stroke="#005262" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              Easy Navigation</h4>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
              Intuitive design for seamless browsing through auctions.</p>
          </div>
        </div>
      </div>
    </section>

    <!------------------------------------------------------------->
    <div class="w-full pt-16 pb-48 lg:px-4">
      <div class="lg:w-full w-8/12 mx-auto">
        <div class="container mx-auto flex flex-col items-center gap-16">
          <div class="flex flex-col gap-16">
            <div class="flex flex-col gap-2 text-center">
              <h2 class="mb-2 text-3xl font-bold text-custom-bluegreen2 lg:text-4xl">
                How AuctionWave Works
              </h2>
              <p class="text-base font-medium leading-7 text-custom-bluegreen2">
                AuctionWave lets users register as Auctioneers or Bidders, clearly outlining their roles from the start.
              </p>
            </div>
          </div>
          <div
            class="flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
            <div class="flex flex-col items-center md:flex-row md:items-start md:gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-custom-bluegreen bg-transparent text-purple-blue-500 mx-auto md:mx-0">
                <span class="text-base font-bold leading-7 text-custom-bluegreen2">1</span>
              </div>
              <div class="flex flex-col text-center md:text-left mt-2 md:mt-0">
                <h3 class="mb-2 text-base font-bold leading-tight text-custom-bluegreen2">
                  Create Your Account
                </h3>
                <p class="text-base font-medium leading-7 text-custom-bluegreen2">
                  Register as an Auctioneer or Bidder with your name, email, password, and role details.
                </p>
              </div>
            </div>
            <div class="rotate-90 lg:rotate-0 ">
              <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
                <g clip-path="url(#clip0_3346_6663)">
                  <path
                    d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                    fill="#68769F" />
                </g>
                <defs>
                  <clipPath id="clip0_3346_6663">
                    <rect width="42" height="42" fill="white" transform="translate(0.666748)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div class="flex flex-col items-center md:flex-row md:items-start md:gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-custom-bluegreen bg-transparent text-purple-blue-500 mx-auto md:mx-0">
                <span class="text-base font-bold leading-7 text-custom-bluegreen2">2</span>
              </div>
              <div class="flex flex-col text-center md:text-left mt-2 md:mt-0">
                <h3 class="mb-2 text-base font-bold leading-tight text-custom-bluegreen2">
                  Setup Your Account
                </h3>
                <p class="text-base font-medium leading-7 text-custom-bluegreen2">
                  Bidders can top up wallets with various payment methods, while Auctioneers set up listings.
                </p>
              </div>
            </div>
            <div class="rotate-90 lg:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
                <g clip-path="url(#clip0_3346_6663)">
                  <path
                    d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                    fill="#68769F" />
                </g>
                <defs>
                  <clipPath id="clip0_3346_6663">
                    <rect width="42" height="42" fill="white" transform="translate(0.666748)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div class="flex flex-col items-center md:flex-row md:items-start md:gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-custom-bluegreen bg-transparent text-purple-blue-500 mx-auto md:mx-0">
                <span class="text-base font-bold leading-7 text-custom-bluegreen2">3</span>
              </div>
              <div class="flex flex-col text-center md:text-left mt-2 md:mt-0">
                <h3 class="mb-2 text-base font-bold leading-tight text-custom-bluegreen2">
                  Start Bidding on Auctions
                </h3>
                <p class="text-base font-medium leading-7 text-custom-bluegreen2">
                  Bidders can use different bidding types, and the platform tracks proof evaluations and bid history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!------------------------------------------------------------->

    <div class="w-full bg-white">
      <div class="md:text-4xl sm:text-4xl text-3xl  font-bold w-full mt-32 text-custom-bluegreen2 text-center">Products
        Offered</div>

      <div
        class="mx-auto justify-center items-center w-8/12 mt-24 mb-10 transform transition-all hover:-translate-y-2 duration-300 hover:scale-105">
        <div class="flex flex-col xl:flex-row justify-center">
          <div class="text-center w-full xl:w-3/5">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/art.jpg" alt="Image 1" class="w-full h-full object-cover">
            </div>
          </div>
          <div class="w-full xl:w-3/5 mt-4 md:mt-0">
            <div class="bg-white rounded-r-lg xl:p-6">
              <h1 class="text-2xl font-medium text-black  xl:mx-14 my-2">Art</h1>
              <p class="xl:mx-14   text-gray-500 text-lg font-light">
                Explore a variety of artistic masterpieces available for auction, from contemporary to classic pieces.
              </p>
              <ul class="xl:mx-14  mt-4 space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Paintings</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Sculptures</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Photography</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Digital Art</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Mixed Media</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div
        class="mx-auto justify-center items-center w-8/12 mb-10 my-24 transform transition-all hover:-translate-y-2 duration-300 hover:scale-105">
        <div class="flex flex-col xl:flex-row justify-center">
          <!-- Mobile Image Section (Visible on small screens) -->
          <div class="w-full xl:w-3/5 text-center block xl:hidden">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/furniture.jpg" alt="Furniture Image" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Text Section -->
          <div class="w-full xl:w-3/5 mt-4">
            <div class="bg-white rounded-l-lg xl:p-6">
              <h1 class="text-3xl font-medium text-black  xl:mx-14 my-2">Furniture</h1>
              <p class="xl:mx-14   text-gray-500 font-light text-lg">Browse a diverse selection of furniture, from
                modern to antique pieces.</p>
              <ul class="xl:mx-14 mt-4 space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Sofas and sectionals</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Dining tables and chairs</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Bedroom sets</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Vintage and antique furniture</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Outdoor and patio sets</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Desktop Image Section (Visible on larger screens) -->
          <div class="w-full xl:w-3/5 text-center hidden xl:block">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/furniture.jpg" alt="Furniture Image" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>

      <div
        class="mx-auto justify-center items-center w-8/12 mb-10 my-24 transform transition-all hover:-translate-y-2 duration-300 hover:scale-105">
        <div class="flex flex-col xl:flex-row justify-center">
          <!-- Image Section (Visible on mobile first, hidden on desktop) -->
          <div class="w-full xl:w-3/5 text-center">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/electronics.jpg" alt="Electronics Image" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Text Section -->
          <div class="w-full xl:w-3/5 mt-4">
            <div class="bg-white rounded-r-lg xl:p-6">
              <h1 class="text-3xl font-medium text-black xl:mx-14 my-2">Electronics</h1>
              <p class="xl:mx-14 text-gray-500 text-lg font-light">
                Auction items cover the latest in electronics, ranging from everyday gadgets to specialized equipment.
              </p>
              <ul class="xl:mx-14 mt-6 space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Smartphones & tablets</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Laptops & computers</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Audio equipment</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Home entertainment <br>systems</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Wearable tech</span>
                </li>
              </ul>
            </div>
          </div>


        </div>
      </div>

      <div
        class="mx-auto justify-center items-center w-8/12 mb-10 my-24 transform transition-all hover:-translate-y-2 duration-300 hover:scale-105">
        <div class="flex flex-col xl:flex-row justify-center">
          <!-- Mobile Image Section (Visible on mobile only) -->
          <div class="xl:hidden w-full text-center">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/collectibles.jpg" alt="Collectibles Image" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Text Section -->
          <div class="w-full md:w-3/5 mt-4">
            <div class="bg-white rounded-lg xl:p-6">
              <h1 class="text-3xl font-medium text-black xl:mx-14 my-2">Collectibles</h1>
              <p class="xl:mx-14 text-gray-500 font-light text-lg">
                Explore rare and valuable items such as coins, stamps, and memorabilia.
              </p>
              <ul class="xl:mx-14 mt-6 space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Rare coins</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Stamps</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Vintage toys</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Memorabilia</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light">Art prints</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Desktop Image Section (Visible on larger screens only) -->
          <div class="hidden xl:block w-3/5 text-center">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/collectibles.jpg" alt="Collectibles Image" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>

      <div
        class="mx-auto justify-center items-center w-8/12 mb-10 my-24 transform transition-all hover:-translate-y-2 duration-300 hover:scale-105">
        <div class="flex flex-col xl:flex-row justify-center">
          <!-- Image Section (Visible on mobile first, hidden on desktop) -->
          <div class="w-full xl:w-3/5 text-center">
            <div class="mt-2 rounded-md overflow-hidden">
              <img src="public/images2/realestate.jpg" alt="Electronics Image" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Text Section -->
          <div class="w-full xl:w-3/5 mt-4">
            <div class="bg-white rounded-r-lg xl:p-6">
              <h1 class="text-3xl font-medium text-black xl:mx-14 my-2">Real Estate</h1>
              <p class="xl:mx-14 text-gray-500 text-lg font-light">
                Bid on a range of properties, including homes, commercial buildings, and land.
              </p>
              <ul class="xl:mx-14 mt-6 space-y-2">
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Residential homes</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Commercial properties</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Vacant land</span>
                </li>

                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Investment properties</span>
                </li>
                <li class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-custom-bluegreen mr-4 flex-shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-500 text-lg font-light flex-shrink-0">Luxury estates</span>
                </li>
              </ul>
            </div>
          </div>


        </div>
      </div>








      <!----------------------------------------------------------------------------------->


    </div>


    <div class="mx-auto xl:px-5 px-12 w-full mb-32 my-24 ">
      <div class="xl:flex xl:items-start items-center max-w-6xl mx-auto">
        <!-- Image Section -->
        <div class="flex-shrink-0 w-1/2 pr-8 mt-10 hidden xl:block">
          <img src="/public/images2/faqnobg.png" alt="Description of image" class="w-full h-auto rounded-md">
        </div>

        <!-- FAQ Section -->
        <div class="xl:w-2/3 xl:pl-16 sm:ml-16">
          <div class="flex flex-col  xl:items-start items-center">
            <h2
              class="mt-5 text-custom-bluegreen text-4xl font-bold tracking-tight text-center md:text-left md:text-5xl lg:text-left">
              FAQ's
            </h2>
            <p class="mt-3 text-lg text-neutral-500 text-center md:text-left md:text-xl">
              Frequently asked questions
            </p>
          </div>
          <div class="mt-8 grid xl:max-w-xl divide-y divide-neutral-200">
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> How does the billing work?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">AuctionWave is free to use for both
                  auctioneers and bidders. There may be additional fees for certain services, such as usage fees or cash
                  bond deposits when bidding.</p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> Can I get a refund for my fees?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">Refunds for any fees incurred, such as usage
                  fees or cash bond deposits, may be considered on a case-by-case basis. Please contact support for
                  assistance.</p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> How do I cancel my participation in an auction?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">To cancel your participation in an auction,
                  you can log in to your account and navigate to the auction listing. If cancellation is allowed, you
                  will find the option there.</p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> How do I contact support?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">If you need help with our platform or have
                  any other questions, you can contact our support team by submitting a support request through the
                  website or by emailing support@auctionwave.com.</p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> Do you offer any discounts or promotions?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">Currently, AuctionWave is free to use, and we
                  do not have any additional discounts or promotions.</p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> How can I ensure my bids are secure?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">AuctionWave implements secure authentication
                  methods, including two-factor authentication, to protect user accounts and transactions.</p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span class="text-lg"> What happens if I win an auction?</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="group-open:animate-fadeIn mt-3 text-neutral-600">If you win an auction, you will receive a
                  notification and need to complete the payment process within the specified timeframe to finalize the
                  transaction.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
      <SigninModal v-if="showSigninModal" @close="showSigninModal = false" @close-signup="showSignupModal = false" />
      <AdminSigninModal v-if="showSigninModalAdmin" @close-signin-admin="showSigninModalAdmin = false" />
    </div>
    <!-- Footer -->
    <NuxtLayout name="footer"></NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';
import SigninModal from "~/components/signinmodal.vue";
import AdminSigninModal from '~/components/admin-signinmodal.vue'

const isDropdownVisible = ref(false);
const cities = ref(['Davao City', 'Zamboanga City', 'Cagayan de Oro', 'General Santos City', 'Butuan', 'Iligan', 'Cotabato City', 'Tagum', 'Valencia', 'Pagadian', 'Panabo', 'Marawi', 'Koronadal', 'Malaybalay', 'Digos', 'Polomolok', 'Surigao City', 'Kidapawan', 'Mati', 'Ozamiz', 'Dipolog', 'Tacurong', 'Bislig', 'Bayugan', 'El Salvador', 'Lamitan', 'Tandag', 'Sultan Kudarat', 'Isabela City']);
const categories = ref(['Art', 'Electronics', 'Collectibles', 'Furniture', 'Real Estate', 'Jewelry & Watches', 'Vehicles', 'Sports Memorabilia', 'Home Appliances', 'Books', 'Antiques', 'Music Instruments', 'Manuscripts', 'Tickets', 'Vintage', 'Coins', 'Pet Supplies', 'DIY Materials']);
const selectedCity = ref(null);
const selectedCategory = ref(null);
const showSigninModal = ref(false);
const showSigninModalAdmin = ref(false)
const visibleCities = ref(cities.value.slice(0, 5));  // Show only 5 cities initially
const visibleCategories = ref(categories.value.slice(0, 5));  // Show only 5 categories initially
const isCitiesExpanded = ref(false);
const isCategoriesExpanded = ref(false);
const auctions = ref([]);
const auctionsToShow = ref(5);
const isShowingAll = ref(false);
const displayedAuctions = ref([]);

const clearSelectedCity = () => {
  selectedCity.value = null;
};

const clearSelectedCategory = () => {
  selectedCategory.value = null;
};

// Toggle visibility of more cities
const toggleShowMoreCities = () => {
  isCitiesExpanded.value
    ? visibleCities.value = cities.value.slice(0, 5)
    : visibleCities.value = cities.value;
  isCitiesExpanded.value = !isCitiesExpanded.value;
};

// Toggle visibility of more categories
const toggleShowMoreCategories = () => {
  isCategoriesExpanded.value
    ? visibleCategories.value = categories.value.slice(0, 5)
    : visibleCategories.value = categories.value;
  isCategoriesExpanded.value = !isCategoriesExpanded.value;
};

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// Fetch auctions from the server
const fetchAuctions = async () => {
  try {
    const response = await axios.get('/api/auctions/display-auctions-homepage', {
      params: {
        city: selectedCity.value,
        category: selectedCategory.value
      }
    });
    auctions.value = response.data.listings;
    displayedAuctions.value = auctions.value.slice(0, auctionsToShow.value);
  } catch (error) {
    console.error('Failed to fetch auctions:', error);
  }
};

// Load more auctions or reset to initial view
const loadMoreAuctions = () => {
  if (!isShowingAll.value) {
    // Show more auctions
    auctionsToShow.value += 5;
    displayedAuctions.value = auctions.value.slice(0, auctionsToShow.value);
    if (auctionsToShow.value >= auctions.value.length) {
      isShowingAll.value = true;
    }
  } else {
    // Reset to initial view
    auctionsToShow.value = 5;
    displayedAuctions.value = auctions.value.slice(0, auctionsToShow.value);
    isShowingAll.value = false;
  }
};

const canLoadMore = computed(() => auctions.value.length > displayedAuctions.value.length || isShowingAll.value);
watch([selectedCity, selectedCategory], fetchAuctions);

// Function to detect the key combination (Ctrl + D)
const handleKeyDown = (event) => {
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault()
    showSigninModalAdmin.value = true;
  }
}

const scrollToAuctions = () => {
  const auctionSection = document.getElementById("featured-auctions");
  if (!auctionSection) return;

  const duration = 800; // Duration in milliseconds
  const startingY = window.pageYOffset;
  const targetY = auctionSection.getBoundingClientRect().top + window.pageYOffset;
  const diff = targetY - startingY;
  let start;

  // Easing function for animation
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // Animation function
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1); // Keep it between 0 and 1
    const eased = easeInOutQuad(percent); // Apply easing
    window.scrollTo(0, startingY + diff * eased);

    if (time < duration) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

// Register event listener when the component is mounted
onMounted(() => {
  fetchAuctions();
  window.addEventListener('keydown', handleKeyDown)
})

// Remove event listener when the component is unmounted  
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
});

</script>

<style>
/* Styles for the overlay */
.bg-gray-900 {
  background-color: rgba(0, 0, 0, 0.5);
  /* Adjust opacity as needed */
}

/* assets/css/custom.css */
.magnify-container {
  position: relative;
  overflow: hidden;
}

.magnify-image {
  transition: transform 0.3s ease;
}

.magnify-container:hover .magnify-image {
  transform: scale(1.5);
  /* Adjust zoom level as needed */
}

.magnify-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
}
</style>