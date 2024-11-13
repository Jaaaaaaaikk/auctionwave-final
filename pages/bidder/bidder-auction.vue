<template>
  <NuxtLayout name="biddernavbar">
    <section class="bg-white md:pb-16 dark:bg-gray-900 antialiased w-3/5 mx-auto px-10 rounded-b-md">
      <NuxtLayout name="biddersidebar"></NuxtLayout>
      <nav v-if="auction"
        class="flex  pt-10 pb-10 text-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <NuxtLink to="/bidder/bidderdashboard"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Dashboard
            </NuxtLink>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
              <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{{ auction.name }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div v-if="auction" class="max-w-screen-xl px-4 mx-auto 2xl:px-0 pt-10">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <div class="p-4 border  rounded-lg">
              <img v-if="auction.image_url" :src="auction.image_url" alt="Auction Image Preview" class="w-full h-auto"
                @error="auction.image_url = '/images/no-image.jpg'" />
              <img v-else src="/images/no-image.jpg" class="w-full h-auto" alt="No Image Available" />
            </div>
            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p class="font-medium">Auction Request Caption</p>
            <p class="font-medium text-gray-900 dark:text-gray-400">{{ auction.caption }}</p>
            <p v-if="!auction.caption" class="text-gray-500">No Request Caption Provided.</p>
            <p class="font-medium mt-3">Auction Request Description</p>
            <p class="mb-6 text-gray-900 dark:text-gray-400">
              {{ auction.description }}
            </p>
            <p v-if="!auction.description" class="text-gray-500">No Request Description Provided.</p>

            <details v-if="auction.bidding_type === 'Lowest-type'" class="my-16 w-2/3 group mt-2">
              <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                <span class="font-medium">Participated Bidders</span>
                <span class="ml-2">
                  <span class="group-open:hidden text-lg text-custom-bluegreen">+</span>
                  <span class="hidden group-open:block text-lg text-custom-bluegreen">-</span>
                </span>
              </summary>
              <span v-if="auctionStore.bidders.length === 0" class="text-gray-500 mb-2">No participated bidders
                yet.</span>
              <div v-else v-for="(bid, index) in auctionStore.bidders.slice(0, bidderToShow)" :key="index"
                class="text-sm text-gray-500 mt-3">
                <span>
                  {{ bid.bidder_name }} - <strong>₱{{ formatNumber(bid.bid_amount) }}</strong> on {{
                    formatDate(bid.bid_time)
                  }}
                  <span v-if="isCurrentUser(bid.user_id)" class="pr-2"> <strong>(YOU)</strong></span>
                </span>
              </div>

              <!-- See More Button -->
              <div v-if="bidderToShow < auctionStore.bidders.length" class="text-center mt-4">
                <button @click="loadMoreBids" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  See More
                </button>
              </div>
            </details>
          </div>



          <div class="mt-6 sm:mt-8 lg:mt-0 px-4">
            <div class="flex items-center mb-2">
              <img v-if="auction?.auctioneer_profile_image && auction.auctioneer_profile_image.length > 0"
                :src="auction.auctioneer_profile_image" class="w-6 h-6 rounded-full mr-2" loading="lazy" />
              <img v-else src="/images/default-profile-image.png" class="w-6 h-6 rounded-full mr-2"
                alt="No Image Available" loading="lazy" />
              <span class="block text-gray-600 text-sm hover:underline hover:cursor-pointer">{{ auction.auctioneer_name
                ||
                'No Name' }}</span>
            </div>
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {{ auction.name }}
            </h1>
            <div v-if="auction.bidding_type === 'Lowest-type'" class="mt-4 sm:items-center sm:gap-4 sm:flex">
              <div>
                <p class="text-gray-500 text-lg dark:text-white">Starting Bid </p>
                <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  ₱{{ formatNumber(auction.starting_bid) }}
                </p>
              </div>
            </div>

            <div class="mt-3 mb-3 sm:gap-4 sm:items-center sm:flex ">
              <div class="mb-2">
                <p class="text-gray-500 mt-2">Cash Bond</p>
                <div class="flex flex-wrap mt-2">
                  <p class="text-xs font-semibold text-gray-900 sm:text-lg dark:text-white">
                    ₱{{ formatNumber(auction.cashbond_amount) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-3 mb-3 sm:gap-4 sm:items-center sm:flex ">
              <div class="mb-2">
                <p class="text-gray-500">Categories</p>
                <div class="flex flex-wrap mt-2">
                  <span v-if="auction.categories.length === 0" class="text-gray-500">No categories</span>
                  <span v-for="(category) in auction.categories"
                    class="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                    {{ category }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="auction.bidding_type === 'Lowest-type'" class="my-4">
              <strong>Time Left: </strong>
              <span v-if="remainingTime > 0" class="text-red-300">{{ formattedTime }}</span>
              <span v-else-if="remainingTime <= 0 || auction.status === 'Auction Ended'" class="text-red-300"> (Auction
                Ended)</span>
            </div>
            <div v-if="auction.bidding_type === 'Offer-type'" class="my-4">
              <strong>Status</strong>
              <span class="flex text-red-300"> {{ auction.status }}</span>
            </div>
            <button v-if="auction.bidding_type === 'Lowest-type'"
              class="text-white mt-4 sm:mt-0 bg-custom-bluegreen hover:bg-green-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center w-full"
              @click="checkAuctionStatusBeforePlacingBid">
              <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="1.5"
                class="w-5 h-5 -ms-2 me-2">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"
                    transform="translate(1 3)"> <!-- Set stroke to white -->
                    <path
                      d="m17.5 8.5v3c0 1.2994935-3.1340068 3-7 3-3.86599325 0-7-1.7005065-7-3 0-.4275221 0-1.2608554 0-2.5">
                    </path>
                    <path
                      d="m3.79385803 9.25873308c.86480173 1.14823502 3.53999333 2.22489962 6.70614197 2.22489962 3.8659932 0 7-1.60524016 7-2.98595204 0-.77476061-.9867994-1.62391104-2.5360034-2.22001882">
                    </path>
                    <path
                      d="m14.5 3.5v3c0 1.29949353-3.1340068 3-7 3-3.86599325 0-7-1.70050647-7-3 0-.64128315 0-2.35871685 0-3">
                    </path>
                    <path
                      d="m7.5 6.48363266c3.8659932 0 7-1.60524012 7-2.985952 0-1.38071187-3.1340068-2.99768066-7-2.99768066-3.86599325 0-7 1.61696879-7 2.99768066 0 1.38071188 3.13400675 2.985952 7 2.985952z">
                    </path>
                  </g>
                </g>
              </svg>
              PLACE BID
            </button>
            <span v-if="biddersCount === 0" class="my-2 text-gray-500 flex items-center">No bidders participate this
              time.</span>
            <span v-else class="my-2 text-gray-500 flex items-center">
              <svg height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 488.944 488.944" xml:space="preserve"
                fill="#000000" class="mr-2">
                <g>
                  <path style="fill:#9BC9FF;"
                    d="M283.46,161.422V33.146c-35.366,0-64.138,28.772-64.138,64.138S248.095,161.422,283.46,161.422z">
                  </path>
                  <path style="fill:#57A4FF;"
                    d="M347.598,97.284c0-35.366-28.772-64.138-64.138-64.138v128.276 C318.826,161.422,347.598,132.65,347.598,97.284z">
                  </path>
                  <path style="fill:#9BC9FF;"
                    d="M250.923,268.524c24.677-29.818,61.953-48.848,103.591-48.848c3.913,0,7.784,0.178,11.613,0.507 c-18.498-27.252-49.194-43.761-82.667-43.761c-28.62,0-55.208,12.072-73.881,32.603 C228.525,224.349,243.054,244.926,250.923,268.524z">
                  </path>
                  <path style="fill:#005ECE;"
                    d="M128.751,160.409v-160c-44.112,0-80,35.888-80,80S84.638,160.409,128.751,160.409z"></path>
                  <path style="fill:#003F8A;"
                    d="M208.751,80.409c0-44.112-35.888-80-80-80v160C172.863,160.409,208.751,124.522,208.751,80.409z">
                  </path>
                  <path style="fill:#003F8A;"
                    d="M250.923,268.524c-7.87-23.598-22.398-44.174-41.344-59.498 c-22.114-17.886-50.24-28.616-80.829-28.616v148.75h93.666C226.7,306.421,236.721,285.685,250.923,268.524z">
                  </path>
                  <path style="fill:#005ECE;" d="M0,309.159v20h128.75v-148.75C57.76,180.409,0,238.169,0,309.159z">
                  </path>
                  <path style="fill:#FFDA44;"
                    d="M311.449,410.662l4.999-46.904l-31.614-35.011l46.154-9.739l23.526-40.888 c0,0.001,0-58.444,0-58.444c-41.638,0-78.914,19.03-103.591,48.848c-14.202,17.161-24.223,37.898-28.508,60.635 c-1.524,8.087-2.33,16.424-2.33,24.946c0,74.125,60.305,134.43,134.429,134.43v-97.121L311.449,410.662z">
                  </path>
                  <path style="fill:#FCC324;"
                    d="M366.127,220.183c-3.829-0.329-7.7-0.507-11.613-0.507v58.445l23.527,40.886l46.154,9.74 l-31.614,35.011l4.999,46.904l-43.066-19.247v97.121c74.125,0,134.43-60.305,134.43-134.43 C488.944,283.893,434.835,226.09,366.127,220.183z">
                  </path>
                  <polygon style="fill:#2488FF;"
                    points="330.988,319.007 284.834,328.747 316.448,363.757 311.449,410.662 354.515,391.414 397.581,410.662 392.582,363.757 424.196,328.747 378.042,319.006 354.515,278.12 ">
                  </polygon>
                </g>
              </svg>
              {{ biddersCount }} bidders are currently participating in this auction.
            </span>

            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />


            <section class="my-4">
              <h5 class="font-bold mb-2">Payment</h5>

              <div class="flex items-start mb-3">
                <div class="flex items-center">
                  <span class="mr-2">
                    <svg fill="none" height="44" viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg"
                      class="text-gray-600">
                      <path clip-rule="evenodd"
                        d="M11.4996 8.57898C10.9799 8.57898 10.5585 9.00036 10.5585 9.52016V34.4799C10.5585 34.9997 10.9799 35.4211 11.4996 35.4211H23.6433C24.1631 35.4211 24.5844 34.9997 24.5844 34.4799V30.4473H19.4438C17.9363 30.4473 16.7143 29.2253 16.7143 27.7179V15.8083C16.7143 14.3009 17.9363 13.0789 19.4438 13.0789H24.5844V9.52016C24.5844 9.00036 24.1631 8.57898 23.6433 8.57898H11.4996Z"
                        fill="#656565" fill-rule="evenodd" opacity="0.4"></path>
                      <rect fill="#656565" height="0.789474" rx="0.394737" width="4.67532" x="15.2338" y="33.8422">
                      </rect>
                      <path clip-rule="evenodd"
                        d="M10.6 7C9.71634 7 9 7.71634 9 8.6V35.4C9 36.2837 9.71634 37 10.6 37H24.5429C25.4265 37 26.1429 36.2837 26.1429 35.4V30.4474H24.5844V34.4799C24.5844 34.9997 24.1631 35.421 23.6433 35.421H11.4996C10.9798 35.421 10.5585 34.9997 10.5585 34.4799V9.52012C10.5585 9.00032 10.9798 8.57894 11.4996 8.57894H13.6754V9.21677C13.6754 9.73657 14.0967 10.1579 14.6165 10.1579H20.5264C21.0462 10.1579 21.4676 9.73657 21.4676 9.21677V8.57894H23.6433C24.1631 8.57894 24.5844 9.00032 24.5844 9.52012V13.0788H19.4437C17.9363 13.0788 16.7143 14.3008 16.7143 15.8082V27.7178C16.7143 27.7228 16.7144 27.7278 16.7144 27.7327C16.7144 27.7278 16.7143 27.7229 16.7143 27.718V15.8084C16.7143 14.301 17.9363 13.079 19.4438 13.079H26.1429V8.6C26.1429 7.71634 25.4265 7 24.5429 7H10.6Z"
                        fill="#656565" fill-rule="evenodd"></path>
                      <path clip-rule="evenodd"
                        d="M18.4287 16.4159C18.4287 15.5323 19.1451 14.8159 20.0287 14.8159H37.4001C38.2838 14.8159 39.0001 15.5323 39.0001 16.4159V27.1107C39.0001 27.9943 38.2838 28.7107 37.4001 28.7107H20.0287C19.1451 28.7107 18.4287 27.9943 18.4287 27.1107V16.4159ZM32.1052 18.8678C32.1052 17.9841 32.8215 17.2678 33.7052 17.2678H35.0264C35.91 17.2678 36.6264 17.9841 36.6264 18.8678V18.9371C36.6264 19.8208 35.91 20.5371 35.0264 20.5371H33.7052C32.8215 20.5371 32.1052 19.8208 32.1052 18.9371V18.8678ZM21.6195 22.1718C21.1681 22.1718 20.8022 22.5377 20.8022 22.9891C20.8022 23.4405 21.1681 23.8065 21.6195 23.8065H35.809C36.2604 23.8065 36.6264 23.4405 36.6264 22.9891C36.6264 22.5377 36.2604 22.1718 35.809 22.1718H21.6195ZM24.57 25.8499C24.57 25.6242 24.753 25.4412 24.9787 25.4412H28.6826C28.9083 25.4412 29.0912 25.6242 29.0912 25.8499C29.0912 26.0756 28.9083 26.2586 28.6826 26.2586H24.9787C24.753 26.2586 24.57 26.0756 24.57 25.8499ZM21.2108 25.4412C20.9851 25.4412 20.8022 25.6242 20.8022 25.8499C20.8022 26.0756 20.9851 26.2586 21.2108 26.2586H23.4076C23.6333 26.2586 23.8163 26.0756 23.8163 25.8499C23.8163 25.6242 23.6333 25.4412 23.4076 25.4412H21.2108Z"
                        fill="#656565" fill-rule="evenodd"></path>
                      <g opacity="0.4">
                        <rect fill="#656565" height="1.63468" rx="0.817338" width="15.8242" x="20.8021" y="22.1718">
                        </rect>
                        <rect fill="#656565" height="0.817338" rx="0.408669" width="3.01413" x="20.8021" y="25.4413">
                        </rect>
                        <rect fill="#656565" height="0.817338" rx="0.408669" width="4.52119" x="24.5701" y="25.4413">
                        </rect>
                      </g>
                    </svg>
                  </span>
                  <div>
                    <span class="text-gray-800 font-medium">
                      Accepts seamless payments through AuctionWave
                    </span>
                  </div>
                </div>
              </div>

              <NuxtLink to="#"
                class=" text-custom-bluegreen py-2 px-4 mt-3 rounded hover:underline transition duration-200">View
                Auction Policy for Details</NuxtLink>

            </section>
          </div>
        </div>
        <div class="flex flex-col items-end mt-6 w-full">
          <section class="w-full rounded-lg  p-4 my-8 mx-auto " v-if="auction.bidding_type === 'Offer-type'">
            <h3 class="font-os text-lg font-bold">Recent Offers</h3>

            <div v-for="(comment, index) in comments.slice(0, offersToShow)" :key="comment.id" class="flex mt-4">
              <!-- Display user's profile image -->
              <div class="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center">
                <img class="h-12 w-12 rounded-full object-cover"
                  :src="comment.userImageUrl || '/images/default-profile-image.png'" alt="User Image">
              </div>

              <div class="ml-3">
                <div class="font-medium text-gray-900 flex">
                  {{ comment.firstname }} {{ comment.lastname }}

                </div>
                <div class="text-gray-600 text-sm">Posted on {{ formatDate(comment.offer_time) }}</div>
                <div class="mt-2 text-gray-900 max-w-3xl break-words bg-gray-200 p-4 rounded-lg">{{ comment.comment }}
                </div>
                <div v-if="comment.commentImages && comment.commentImages.length > 0" class="text-center">

                  <div class="flex flex-wrap gap-2 mt-2">
                    <div v-for="(image, idx) in comment.commentImages" :key="idx" class="w-64 h-64 border rounded-lg">
                      <img @click="openImageModal(image)" :src="image" alt="Offer Image"
                        class="w-full h-full object-cover rounded cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-4 flex items-start space-x-4">
                <p :class="{
                  'bg-yellow-200 text-yellow-800': comment.review_status === 'Offer Pending',
                  'bg-green-200 text-green-800': comment.review_status === 'Accepted Offer',
                  'bg-red-200 text-red-800': comment.review_status === 'Offer Discarded',
                  'bg-purple-200 text-purple-800': comment.review_status === 'Provide More'
                }" class="mt-1 text-sm  px-3 rounded-lg">
                  {{ comment.review_status }}
                </p>
              </div>

            </div>
            <!-- Add an <hr> to separate offers visually -->
            <hr v-if="comments.length > 0" class="my-4 border-t border-gray-300">

            <!-- See More Button -->
            <div v-if="offersToShow < comments.length" class="text-center mt-4">
              <button @click="loadMoreOffers"
                class="bg-custom-bluegreen text-white py-2 px-4 rounded hover:bg-green-500">
                See More
              </button>
            </div>

            <!-- Modal to display the clicked image -->
            <div v-if="isPictureViewModalOpen" @click="closeImageViewModal"
              class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div class="relative">
                <img :src="modalImageSrc" alt="Large View" class="max-w-4xl max-h-[70vh] object-contain" />
                <!-- Close button -->
                <button @click="closeImageViewModal"
                  class="absolute top-0 right-0 bg-gray-900 text-white rounded-full p-2 cursor-pointer">
                  x
                </button>
              </div>
            </div>

            <!-- Comment Form -->
            <div class="relative my-4 flex items-start w-full">

              <!-- Comment Textarea -->
              <div class="flex items-start w-full">
                <!-- Text Area for Comment -->
                <textarea id="comment" v-model="offerComment"
                  class="border border-white bg-gray-200 p-6 w-full rounded-lg"
                  placeholder="Enter your offer comment here" required></textarea>
              </div>
              <!-- Validation Label -->
              <p v-if="offerValidationMessage" class="absolute right-2 flex top-28 text-sm text-red-500 mt-1">
                {{ offerValidationMessage }}
              </p>

              <!-- Display uploaded images horizontally -->
              <div v-if="uploadedImages.length" class="absolute right-40 flex top-4 space-x-2">
                <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
                  <img :src="image" alt="Uploaded image" class="w-16 h-16 object-cover rounded" />
                  <!-- Remove button for each image -->
                  <button @click="removeImage(index)"
                    class="absolute top-0 right-0 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    ×
                  </button>
                </div>
              </div>

              <!-- File Upload Button -->
              <button class="custom-upload absolute right-20 top-1/2 transform -translate-y-1/2"
                @click="triggerFileUpload">
                <svg class="hover:text-custom-bluegreen w-6 h-6 text-gray-800 dark:text-black"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
                </svg>
                <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" class="hidden" />
              </button>

              <!-- Post Button -->
              <button @click="confirmOffer"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom-bluegreen text-white font-medium py-1 px-4 rounded-full hover:bg-green-500">
                Post
              </button>

            </div>
          </section>
        </div>
      </div>
      <PlaceBidModal v-if="showPlaceBidModal" @close="showPlaceBidModal = false" :auctionUuid="auctionId"
        :auctionStartingBid="auction.starting_bid" @displayTheBid="fetchAuction" />
    </section>

    <section class="bg-custom-blue2 md:pb-16 dark:bg-gray-900 antialiased w-2/3 mx-auto px-10 rounded-b-md mt-10">
      <h1 class="text-2xl font-semibold mb-3">Recommended Auctions</h1>
      <div class="flex flex-wrap mx-auto justify-center">
        <!-- No recommended auctions message -->
        <div v-if="recommendedAuctions.length === 0" class="text-gray-500 dark:text-white mt-4">
          No recommended auctions found.
        </div>
        <!-- Render each auction -->
        <div v-else v-for="auction in recommendedAuctions" :key="auction.listing_id"
          @click="openViewAuctionModal(auction)"
          class="cursor-pointer bg-white border relative border-gray-200 rounded-lg shadow m-2 transition-transform hover:scale-105 w-64">
          <!-- Auction Image -->
          <img
            :src="(auction.image_urls && auction.image_urls.length > 0) ? auction.image_urls[0] : '/public/images/no-image.jpg'"
            alt="Auction Image" class="object-cover w-full h-32 rounded-t-lg" loading="lazy" />
          <div class="p-2 pb-12">
            <!-- Auction Name -->
            <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-white">{{ auction.name }}</h5>
            <!-- Categories -->
            <div class="mt-1 flex flex-wrap">
              <span v-for="category in auction.categories" :key="category"
                class="bg-gray-200 text-gray-700 text-xs font-semibold mr-1 mb-1 px-1 py-0.5 rounded">
                {{ category }}
              </span>
            </div>
            <!-- Starting Bid and Other Details -->
            <p class="text-gray-500 dark:text-white mt-1 text-xs">Bidding Type: <span class="font-bold text-black">{{
              auction.bidding_type }}</span></p>
            <p v-if="auction.bidding_type === 'Lowest-type'" class="text-gray-500 dark:text-white mt-1 text-xs">Starting
              Bid: <span class="font-bold text-black">${{
                auction.starting_bid }}</span></p>
            <p class="text-gray-500 dark:text-white mt-1 text-xs">Rarity: <span class="font-bold text-black">{{
              auction.rarity }}</span></p>
          </div>
        </div>
      </div>
      <ViewAuctionModal v-if="showModal" :auction="selectedAuction" @close="closeModal"
        @refreshRecommendedAuctions="fetchRecommendedAuctions" />
    </section>
  </NuxtLayout>
  <NuxtLayout name="footer"></NuxtLayout>
</template>


<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import PlaceBidModal from '~/components/placebidmodal.vue'
import { useAuctionStore } from '@/stores/fetch-bidder-store';
import { useInboxSocketStore } from '@/stores/socketStore';
import ViewAuctionModal from "~/components/viewauctionmodal.vue";
import { toast } from 'vue3-toastify';

const auctionStore = useAuctionStore();
const socketStore = useInboxSocketStore();
const showModal = ref(false);
const showPlaceBidModal = ref(false)
const route = useRoute();
const auction = ref(null);
const offerComment = ref('');
const comments = ref([]); // New state variable for comments
const remainingTime = ref(0);
const biddersCount = ref(null);
let timerInterval = null;
const auctionId = ref(null);
const recommendedAuctions = ref([]);
const fileInput = ref(null);
const uploadedImages = ref([]);
const offerValidationMessage = ref('');
const isPictureViewModalOpen = ref(false);
const modalImageSrc = ref('');
const offersToShow = ref(3);
const bidderToShow = ref(3);
const selectedAuction = ref(null);

const formatNumber = (value) => {
  return new Intl.NumberFormat().format(value);
};

const checkAuctionStatusBeforePlacingBid = () => {
  if (auction.value.status === 'Auction Ended' || auction.value.status === 'Transaction Ended') {
    toast.error('You cannot place a bid as the auction has already ended.');
    return;
  }
  showPlaceBidModal.value = true;
};

// Function to load more offers
const loadMoreOffers = () => {
  offersToShow.value += 3; // Show 3 more offers when the button is clicked
};

const loadMoreBids = () => {
  bidderToShow.value += 3; // Show 3 more offers when the button is clicked
};

// Function to open the modal with the clicked image's source
const openImageModal = (imageSrc) => {
  modalImageSrc.value = imageSrc;
  isPictureViewModalOpen.value = true;
};

// Function to close the modal
const closeImageViewModal = () => {
  isPictureViewModalOpen.value = false;
  modalImageSrc.value = '';  // Reset the modal image source
};

// Trigger hidden file input
const triggerFileUpload = () => {
  fileInput.value?.click();
};

// Handle image upload with validation and preview
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.warn("Please upload an image in PNG, JPG, JPEG, or GIF format.");
      return;
    }

    if (uploadedImages.value.length < 3) {  // Limit to 3 images
      // Convert the image file to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        uploadedImages.value.push(base64String); // Save base64 string
      };
      reader.readAsDataURL(file);
    } else {
      toast.warn("You can only upload up to 3 images.");
    }
  }
};


// Function to remove an image from the uploaded list
const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};

// Function to fetch recommended auctions
const fetchRecommendedAuctions = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Ensure auctionId is defined
    if (!auctionId.value) {
      console.error("Auction ID is not set before fetching recommended auctions.");
      return;
    }

    // Pass the auctionId as a query parameter
    const response = await axios.get(`/api/auctions/recommend`, {
      params: {
        auctionId: auctionId.value // Ensure this matches the server's expected parameter name
      }
    });

    console.log("Recommended Auctions:", response.data); // Log the response
    recommendedAuctions.value = response.data;
  } catch (error) {
    console.error("Failed to fetch recommended auctions:", error);
    recommendedAuctions.value = []; // Ensure we reset to an empty array on error
  }
};


const fetchComments = async (listingId) => {
  try {
    const { data } = await axios.post(`/api/auctions/comment-section?id=${listingId}`);
    comments.value = data.comments;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
  }
};

const fetchAuction = async () => {
  try {
    auction.value = null; // Reset auction data
    remainingTime.value = 0;
    comments.value = [];
    biddersCount.value = null;

    console.log("Fetching auction with ID:", route.query.id);

    const response = await axios.get(`/api/auctions/${route.query.id}`);
    if (response.data) {
      auction.value = response.data;
      auction.value.categories = auction.value.categories
        ? auction.value.categories.split(', ').map(category => category.trim())
        : [];

      // Calculate remaining time and start the countdown
      remainingTime.value = calculateRemainingTime();
      startTimer();

      auctionStore.fetchBidders(auction.value);
      fetchComments(auction.value.id);
      fetchBiddersCount(auction.value.id);
    } else {
      throw new Error("No auction data returned");
    }
  } catch (err) {
    console.error("Failed to fetch auction details:", err);
  }
};


const fetchBiddersCount = async (listingId) => {
  try {
    const response = await axios.get(`/api/auctions/get-bidders-count?id=${listingId}`);
    console.log("Number of bidders:", response.data.bidderCount);
    biddersCount.value = response.data.bidderCount;
  } catch (error) {
    console.error("Error fetching bidders count:", error);
  }
};

// Function to handle offer submission
const confirmOffer = () => {
  const comment = offerComment.value.trim();

  // Check if there is a comment and no image
  if (!comment && uploadedImages.value.length === 0) {
    offerValidationMessage.value = 'Please enter a comment and upload at least one image.';
    return;
  }

  // Check if there is a comment but no image
  if (comment && uploadedImages.value.length === 0) {
    offerValidationMessage.value = 'You have added a comment, but adding images would strengthen your offer.';
    return;
  }

  // Check if there is an image but no comment
  if (uploadedImages.value.length > 0 && !comment) {
    offerValidationMessage.value = 'You have uploaded images, but you need to add a comment to strengthen your offer.';
    return;
  }

  if (auction.value.status === 'Auction Ended' || auction.value.status === 'Transaction Ended') {
    toast.error('You cannot place an offer as the auction has already ended.');
    return;
  }

  // After passing all checks, ask for confirmation
  const confirmed = confirm(`Are you sure you want to place the offer: "${comment}"?`);
  if (confirmed) {
    offerValidationMessage.value = '';
    placeOffer(comment);
  }
};


const placeOffer = async (comment) => {
  try {

    if (!auctionId.value) {
      throw new Error("Auction ID is missing");
    }

    const response = await axios.post('/api/auctions/place-offer', {
      auctionId: auctionId.value, offerComment: comment,
      imageUrls: uploadedImages.value
    });

    const notificationDetails = response.data.results;

    // Emit notifications for each bidder
    notificationDetails.forEach(notification => {
      console.log('notification data', notification)
      socketStore.socket.emit('offer-message', {
        recipientId: notification.auctioneerId,
        notification: {
          location: notification.notificationDetails.location_id,
          sender_full_name: notification.notificationDetails.sender_full_name,
          auction_name: notification.notificationDetails.auction_name,
          listing_id: notification.notificationDetails.listing_id,
          message: notification.notificationDetails.message,
          is_read: notification.notificationDetails.is_read,
          created_at: notification.notificationDetails.created_at,
          unreadCount: notification.unreadCount
        }
      });
    });

    toast.success("Offer placed successfully!");

    // Reset offer comment and remove browsed images.
    offerComment.value = '';
    uploadedImages.value = [];

    fetchComments(auction.value.id);
  } catch (err) {
    console.error("Failed to place offer:", err);
    toast.error("Failed to place offer.");
  }
};

const isCurrentUser = (bidderId) => {
  return bidderId === auctionStore.currentUserId;
};

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true // 12-hour format with AM/PM
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Calculate remaining time based on auction's end_time
const calculateRemainingTime = () => {
  if (!auction.value || !auction.value.end_time) return 0; // Return 0 if end_time is missing

  const now = new Date();
  const endTime = new Date(auction.value.end_time);

  if (isNaN(endTime.getTime())) return 0; // Return 0 if end_time is not a valid date

  const timeDiff = endTime - now;
  return Math.max(0, Math.floor(timeDiff / 1000)); // return time in seconds
};

// Format the remaining time as hh:mm:ss
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

const formattedTime = computed(() => {
  return formatTime(remainingTime.value);
});

// Timer to update remaining time every second
const startTimer = () => {
  // Clear any existing interval to avoid multiple timers running
  if (timerInterval) clearInterval(timerInterval);

  // Start a new interval
  timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      // Stop the timer once it hits zero
      clearInterval(timerInterval);
    }
  }, 1000); // Decrease by 1 every second
};

const openViewAuctionModal = (auction) => {
  selectedAuction.value = auction;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedAuction.value = null;
};

const handleIncomingResponseFromOutbid = (responseNotification) => {
  console.log('Received system notification in BidderNavbar:', responseNotification);
  fetchAuction();
};

watch(
  () => route.query.id,
  (newId) => {
    if (newId) {
      fetchAuction();
    }
  }
);

onMounted(() => {
  if (route.query.id) {
    auctionId.value = route.query.id;
    fetchAuction();
    fetchRecommendedAuctions();
    clearInterval(timerInterval);
  }
  else {
    console.error('Auction UUID is not provided in route.');
  }
  if (!socketStore.socket) {
    socketStore.connectSocket();
  }
  socketStore.socket.on('outbid-channel', handleIncomingResponseFromOutbid);
});

onBeforeUnmount(() => {
  clearInterval(timerInterval);
  auction.value = null;
  comments.value = [];
  remainingTime.value = 0;
  biddersCount.value = null;
  socketStore.socket.off('outbid-channel', handleIncomingResponseFromOutbid);
});
</script>

<style scoped>
/* Add any specific styles for the auction page here */
</style>
