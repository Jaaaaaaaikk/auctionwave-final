<template>
    <div>
        <NuxtLayout name="adminnavbar"></NuxtLayout>
        <div class="mt-3 grid grid-cols-1 gap-2 m-2 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in stats" :key="item.id" class="rounded-lg bg-white shadow sm:px-4 sm:pt-3">
                <div class="text-right">
                    <div class="absolute rounded-md bg-[#005262] p-3">
                        <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p class="ml-16 truncate text- font-medium text-gray-500 text-right">{{ item.name }}</p>
                </div>
                <div class="flex justify-end">
                    <dd class="ml-16 flex items-baseline pb-6 sm:pb-4 text-right">
                        <div class="text-xl font-semibold text-gray-900 text-right">{{ item.stat }}</div>
                    </dd>
                </div>
            </div>
        </div>
        <div>
            <div id="app" class="bg-[#E6EEEF] text-gray-700 min-h-screen p-6">
                <div class="max-w-7xl mx-auto">
                    <!-- Main Layout -->
                    <div class="grid grid-cols-3 gap-6">
                        <!-- Deployments Section -->
                        <div class="col-span-2">
                            <div class="flex justify-between">
                                <h2 class="font-bold text-lg mb-4">Auction Activity</h2>
                                <div>
                                    <button class="text-gray-700 flex items-center mr-4 space-x-2">
                                        <span>Sort by</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div v-for="item in auction" :key="item.id"
                                class="bg-white p-4 m-2 rounded-lg flex justify-between  items-center">
                                <div>
                                    <div class="font-semibold">{{ item.name }}</div>
                                    <div class="text-gray-500 text-sm">{{ item.info }}</div>
                                </div>
                                <div>
                                    <button v-if="item.status === 'Complete'"
                                        class="bg-green-400 text-white px-3 py-1 rounded-full">Complete</button>
                                    <button v-else class="bg-gray-400 text-gray-700 px-3 py-1 rounded-full">In
                                        progress</button>
                                </div>
                            </div>
                        </div>
                        <!-- Activity Feed Section -->
                        <div>
                            <div class="flex justify-between mb-4">
                                <h2 class="font-bold text-lg">Activity feed</h2>
                            </div>

                            <div class="space-y-4">
                                <!-- Activity Item -->
                                <div class="flex items-center space-x-4">
                                    <img src="/public/images/default-profile-image.png" class="w-10 h-10 rounded-full"
                                        alt="User avatar" />
                                    <div>
                                        <div class="font-semibold">Robert jims M. Aquino</div>
                                        <div class="text-gray-500 text-sm">
                                            Auction request has been Approved
                                        </div>
                                    </div>
                                </div>

                                <!-- Additional Activity Item -->
                                <div class="flex items-center space-x-4">
                                    <img src="/images/default-profile-image.png" class="w-10 h-10 rounded-full"
                                        alt="User avatar" />
                                    <div>
                                        <div class="font-semibold">Lindsay Walton</div>
                                        <div class="text-gray-500 text-sm">
                                            Auction request has been Approved
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ClipboardDocumentCheckIcon, ClockIcon, CheckCircleIcon, EllipsisHorizontalCircleIcon } from '@heroicons/vue/24/outline'




const stats = [
    { id: 1, name: 'Approved', stat: '71,897', icon: CheckCircleIcon },
    { id: 2, name: 'Pending', stat: '587', icon: EllipsisHorizontalCircleIcon },
    { id: 3, name: 'Completed', stat: '242', icon: ClipboardDocumentCheckIcon },
    { id: 4, name: 'In progress', stat: '244', icon: ClockIcon },
]

const auction = [
    { id: 1, name: 'Auction 1', info: 'Rare item from china', status: 'Complete' },
    { id: 2, name: 'Auction 2', info: 'Rare item from china', status: 'In Progress' },
    { id: 3, name: 'Auction 3', info: 'Rare item from china', status: 'In Progress' },
    { id: 4, name: 'Auction 4', info: 'Rare item from china', status: 'Complete' },
    { id: 1, name: 'Auction 1', info: 'Rare item from china', status: 'Complete' },
    { id: 2, name: 'Auction 2', info: 'Rare item from china', status: 'In Progress' },
    { id: 3, name: 'Auction 3', info: 'Rare item from china', status: 'In Progress' },
    { id: 4, name: 'Auction 4', info: 'Rare item from china', status: 'Complete' }, { id: 1, name: 'Auction 1', info: 'Rare item from china', status: 'Complete' },
    { id: 2, name: 'Auction 2', info: 'Rare item from china', status: 'In Progress' },
    { id: 3, name: 'Auction 3', info: 'Rare item from china', status: 'In Progress' },
    { id: 4, name: 'Auction 4', info: 'Rare item from china', status: 'Complete' },
]







</script>