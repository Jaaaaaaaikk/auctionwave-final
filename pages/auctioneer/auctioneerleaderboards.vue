<template>
    <NuxtLayout name="auctioneernavbar">
        <NuxtLayout name="auctioneersidebar"></NuxtLayout>
        <div class="bg-white shadow-md rounded-md overflow-hidden w-5/6 mx-auto mt-4 px-10">
            <div class="font-bold text-2xl rounded-md overflow-hidden w-full  mt-4">
                <h1>Leaderboards</h1>
            </div>

            <div class="bg-white  rounded-md overflow-hidden w-full mx-auto mt-4 my-10 ">
                <div class="bg-gray-100 py-2 px-4">
                    <h2 class="text-xl font-semibold text-gray-800">Top Auctioneers</h2>
                </div>

                <table class="min-w-full bg-white">
                    <!-- Column headers -->
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="w-1/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">#</th>
                            <th class="w-3/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Name</th>
                            <th class="w-3/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Location</th>
                            <th class="w-3/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Successful Auctions
                            </th>
                            <th class="w-2/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Rating</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <!-- Row 1 -->
                        <tr>
                            <td class="py-4 px-6 text-gray-700 text-lg font-medium">1.</td>
                            <td class="py-4 px-6 flex items-center">
                                <img class="w-12 h-12 rounded-full object-cover mr-4"
                                    src="https://randomuser.me/api/portraits/women/72.jpg" alt="User avatar">
                                <span
                                    class="text-lg font-medium text-gray-800 hover:underline hover:cursor-pointer">Emily
                                    Jones</span>
                            </td>
                            <td class="py-4 px-6 text-gray-600 text-base">Davao City</td>
                            <td class="py-4 px-6 text-gray-600 text-base">1234</td>
                            <td class="py-4 px-6 flex items-center">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span class="text-sm font-bold text-gray-900">4.95</span>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                                <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline">73
                                    reviews</a>
                            </td>
                        </tr>

                        <!-- Row 2 -->
                        <tr>
                            <td class="py-4 px-6 text-gray-700 text-lg font-medium">2.</td>
                            <td class="py-4 px-6 flex items-center">
                                <img class="w-12 h-12 rounded-full object-cover mr-4"
                                    src="https://randomuser.me/api/portraits/men/40.jpg" alt="User avatar">
                                <span
                                    class="text-lg font-medium text-gray-800 hover:underline hover:cursor-pointer">David
                                    Lee</span>
                            </td>
                            <td class="py-4 px-6 text-gray-600 text-base">Mati City</td>
                            <td class="py-4 px-6 text-gray-600 text-base">987</td>
                            <td class="py-4 px-6 flex items-center">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span class="text-sm font-bold text-gray-900">4.95</span>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                                <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline">73
                                    reviews</a>
                            </td>
                        </tr>

                        <!-- Add more rows as needed -->

                    </tbody>
                </table>
            </div>
            <div class="bg-white  rounded-md overflow-hidden w-full mx-auto mt-4 my-10 ">
                <div class="bg-gray-100 py-2 px-4">
                    <h2 class="text-xl font-semibold text-gray-800">Top Bidders</h2>
                </div>

                <table class="min-w-full bg-white">
                    <!-- Column headers -->
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="w-1/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">#</th>
                            <th class="w-3/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Name</th>
                            <th class="w-3/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Location</th>
                            <th class="w-3/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Successful Auctions
                            </th>
                            <th class="w-2/12 py-2 px-6 text-left text-gray-700 text-lg font-medium">Rating</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <!-- Row 1 -->
                        <tr>
                            <td class="py-4 px-6 text-gray-700 text-lg font-medium">1.</td>
                            <td class="py-4 px-6 flex items-center">
                                <img class="w-12 h-12 rounded-full object-cover mr-4"
                                    src="https://randomuser.me/api/portraits/women/72.jpg" alt="User avatar">
                                <span
                                    class="text-lg font-medium text-gray-800 hover:underline hover:cursor-pointer">Emily
                                    Jones</span>
                            </td>
                            <td class="py-4 px-6 text-gray-600 text-base">Digos City</td>
                            <td class="py-4 px-6 text-gray-600 text-base">1234</td>
                            <td class="py-4 px-6 flex items-center">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span class="text-sm font-bold text-gray-900">4.95</span>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                                <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline">73
                                    reviews</a>
                            </td>
                        </tr>

                        <!-- Row 2 -->
                        <tr>
                            <td class="py-4 px-6 text-gray-700 text-lg font-medium">2.</td>
                            <td class="py-4 px-6 flex items-center">
                                <img class="w-12 h-12 rounded-full object-cover mr-4"
                                    src="https://randomuser.me/api/portraits/men/40.jpg" alt="User avatar">
                                <span
                                    class="text-lg font-medium text-gray-800 hover:underline hover:cursor-pointer">David
                                    Lee</span>
                            </td>
                            <td class="py-4 px-6 text-gray-600 text-base">Zamboanga City</td>
                            <td class="py-4 px-6 text-gray-600 text-base">987</td>
                            <td class="py-4 px-6 flex items-center">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span class="text-sm font-bold text-gray-900">4.95</span>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                                <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline">73
                                    reviews</a>
                            </td>

                        </tr>


                        <!-- Add more rows as needed -->

                    </tbody>
                </table>
            </div>
        </div>
        <!-- bidder -->


    </NuxtLayout>
</template>

<script setup>
</script>

<style scoped></style>