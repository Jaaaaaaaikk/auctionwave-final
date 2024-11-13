<template>
    <div>
        <!-- Responsive Navbar -->
        <nav class=" top-0 left-0 right-0 px-3 py-3 flex justify-between bg-white shadow-md z-50">
            <div class="nav-start flex flex:justify-between">
                <div class="text-white text-2xl">
                    <a class="logo" href="/">
                        <img src="/public/images/auctionwave-logo-final.png" class="h-12 object-contain" alt="Logo" />
                    </a>
                </div>
                <!--Button-->
                <div class="hidden md:flex items-center mt-2 space-x-2">
                    <ul class="flex flex-col md:flex-row md:space-x-6">
                        <li>
                            <NuxtLink to="/admin/admindashboard"
                                class="flex items-center px-2 py-2 text-black text-lg font-semibold hover:text-[#005262]">
                                Home</NuxtLink>
                        </li>

                    </ul>
                    <!--History Dropdown Button-->
                    <div class="relative">
                        <button @click="toggleHistoryDropdown"
                            class="flex items-center px-1 py-2 text-black text-lg font-semibold hover:text-[#005262]">
                            <i class="bx bx-chevron-down ml-4" aria-hidden="true"></i>
                            History
                        </button>
                        <div v-if="historyDropdownOpen"
                            class="absolute left-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6EEEF]">
                                <svg fill="#000000" height="28" width="30" version="1.1" id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="-14.46 -14.46 511.00 511.00" xml:space="preserve" stroke="#000000"
                                    stroke-width="12.052125">
                                    <g id="SVGRepo_bgCarrier" stroke-width="2">
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                    </g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <path
                                                d="M461.271,343.312c-6.339-5.654-14.297-8.26-22.403-7.329c-13.612,1.557-31.436,5.233-50.307,9.125 c-25.482,5.256-51.83,10.69-72.004,11.951c-17.426,1.086-49.161-3.454-58.563-8.379c-6.342-3.322-9.89-7.396-11.877-10.998h39.11 c16.135,0,29.261-13.126,29.261-29.26v-22.978c0-16.134-13.126-29.259-29.261-29.259H178.02c-4.555-0.14-59.253-1.17-97.131,31.14 c-6.704,5.718-12.036,11.121-16.288,16.031c-4.498-5.621-11.41-9.232-19.153-9.232H10.5c-5.799,0-10.5,4.701-10.5,10.5V452.96 c0,2.785,1.107,5.456,3.075,7.425c1.97,1.969,4.641,3.075,7.425,3.075l34.947-0.001c13.525,0,24.528-11.003,24.528-24.527v-8.07 c10.451,0.656,34.136,3.242,84.261,12.653c59.194,11.115,96.13,14.882,125.231,14.881c20.856,0,37.691-1.934,55.801-4.485 c22.387-3.151,50.544-11.116,75.386-18.143c11.5-3.253,22.362-6.325,31.974-8.749c25.901-6.533,29.769-22.865,29.769-32.02V368.25 C472.397,358.85,468.237,349.527,461.271,343.312z M48.976,438.932c0,1.945-1.583,3.527-3.528,3.527L21,442.46V315.125h24.447 c1.945,0,3.528,1.582,3.528,3.527V438.932z M451.397,395c0,2.23,0,8.15-13.903,11.656c-9.903,2.498-20.906,5.61-32.555,8.905 c-24.198,6.845-51.625,14.603-72.598,17.555c-41.317,5.818-75.766,8.248-174.23-10.239c-50.639-9.508-75.773-12.382-88.136-13.041 v-77.961c0.375-0.469,0.722-0.968,1.021-1.513c2.69-4.908,9.323-14.949,23.521-27.059c32.373-27.613,82.42-26.142,82.913-26.125 c0.136,0.005,0.272,0.008,0.408,0.008h107.39c4.555,0,8.261,3.705,8.261,8.259v22.978c0,4.555-3.706,8.26-8.261,8.26h-107.39 c-5.799,0-10.5,4.701-10.5,10.5s4.701,10.5,10.5,10.5h45.977c2.159,8.61,8.116,21.052,24.435,29.6 c14.925,7.819,51.944,11.846,69.616,10.736c21.654-1.352,48.742-6.939,74.938-12.343c18.396-3.795,35.772-7.379,48.451-8.829 c2.672-0.302,4.756,0.993,6.037,2.137c2.532,2.259,4.106,5.811,4.106,9.268V395z">
                                            </path>
                                            <path
                                                d="M455.157,18.625H86.362c-14.848,0-26.928,12.08-26.928,26.928V218.45c0,14.849,12.08,26.93,26.928,26.93h368.795 c14.848,0,26.928-12.081,26.928-26.93V45.552C482.085,30.705,470.005,18.625,455.157,18.625z M403.067,224.379H138.474 c-2.782-31.306-27.122-56.49-58.039-60.583V97.343c29.967-3.968,53.751-27.752,57.718-57.719h265.235 c3.967,29.961,27.74,53.741,57.697,57.717v66.457C430.179,167.9,405.849,193.081,403.067,224.379z M461.085,45.552v30.528 c-18.359-3.591-32.854-18.093-36.438-36.456h30.51C458.426,39.625,461.085,42.284,461.085,45.552z M86.362,39.625h30.531 c-3.584,18.37-18.089,32.875-36.459,36.46V45.552C80.435,42.284,83.094,39.625,86.362,39.625z M80.435,218.45v-33.395 c19.314,3.769,34.352,19.611,36.919,39.324H86.362C83.094,224.379,80.435,221.719,80.435,218.45z M455.157,224.379h-30.97 c2.566-19.706,17.593-35.545,36.897-39.32v33.391C461.085,221.719,458.426,224.379,455.157,224.379z">
                                            </path>
                                            <path
                                                d="M271.325,56.884c-41.421,0-75.119,33.697-75.119,75.117c0,41.421,33.698,75.119,75.119,75.119 c41.42,0,75.118-33.698,75.118-75.119C346.443,90.582,312.745,56.884,271.325,56.884z M271.325,186.121 c-29.842,0-54.119-24.277-54.119-54.119c0-29.84,24.277-54.117,54.119-54.117c29.841,0,54.118,24.277,54.118,54.117 C325.443,161.843,301.166,186.121,271.325,186.121z">
                                            </path>
                                            <path
                                                d="M150.439,99.705c-17.81,0-32.298,14.488-32.298,32.298c0,17.809,14.488,32.297,32.298,32.297 c17.809,0,32.297-14.488,32.297-32.297C182.736,114.193,168.248,99.705,150.439,99.705z M150.439,143.299 c-6.229,0-11.298-5.067-11.298-11.297c0-6.23,5.068-11.298,11.298-11.298c6.23,0,11.297,5.068,11.297,11.298 C161.736,138.232,156.669,143.299,150.439,143.299z">
                                            </path>
                                            <path
                                                d="M392.209,99.705c-17.809,0-32.297,14.488-32.297,32.298c0,17.809,14.488,32.297,32.297,32.297 c17.81,0,32.299-14.488,32.299-32.297C424.508,114.193,410.019,99.705,392.209,99.705z M392.209,143.299 c-6.23,0-11.297-5.067-11.297-11.297c0-6.23,5.067-11.298,11.297-11.298c6.23,0,11.299,5.068,11.299,11.298 C403.508,138.232,398.44,143.299,392.209,143.299z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>Transaction History
                            </a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6EEEF]">
                                <svg fill="#000000" height="28" width="30" version="1.1" id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="-49.17 -49.17 590.03 590.03" xml:space="preserve" stroke="#000000"
                                    stroke-width="9.8339">
                                    <g id="SVGRepo_bgCarrier" stroke-width="2">
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                        stroke="#CCCCCC" stroke-width="1.96678">
                                    </g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <path
                                                d="M436.714,0H149.471c-16.438,0-29.812,13.374-29.812,29.812v66.714c-54.49,15.594-94.489,65.857-94.489,125.288 c0,59.431,39.998,109.694,94.489,125.288v114.783c0,16.438,13.374,29.812,29.812,29.812h234.733c2.785,0,5.455-1.106,7.425-3.075 l71.821-71.822c1.969-1.969,3.075-4.64,3.075-7.425V29.812C466.525,13.374,453.152,0,436.714,0z M149.471,21h287.243 c4.858,0,8.811,3.953,8.811,8.812v31.689H140.659V29.812C140.659,24.953,144.612,21,149.471,21z M46.17,221.813 c0-60.263,49.027-109.29,109.29-109.29c60.263,0,109.29,49.027,109.29,109.29s-49.027,109.291-109.29,109.291 C95.197,331.104,46.17,282.076,46.17,221.813z M140.659,461.884V351.258c4.86,0.552,9.797,0.846,14.802,0.846 c39.135,0,74.292-17.347,98.195-44.752h64.336c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5h-49.381 c9.133-15.95,14.984-34.005,16.644-53.242h32.736c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-32.603 c-1.42-19.194-7.02-37.242-15.886-53.241h48.488c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-62.974 c-23.918-28.323-59.67-46.347-99.558-46.347c-5.005,0-9.942,0.294-14.802,0.846v-9.867h304.866v316.372h-42.009 c-16.439,0-29.811,13.374-29.811,29.811v42.011H149.471C144.612,470.695,140.659,466.743,140.659,461.884z M394.705,455.845v-27.16 c0-4.859,3.953-8.811,8.811-8.811h27.16L394.705,455.845z">
                                            </path>
                                            <path
                                                d="M359.246,158.869h34.87c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-34.87c-5.799,0-10.5,4.701-10.5,10.5 C348.746,154.168,353.447,158.869,359.246,158.869z">
                                            </path>
                                            <path
                                                d="M359.246,233.11h34.87c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5h-34.87c-5.799,0-10.5,4.701-10.5,10.5 C348.746,228.409,353.447,233.11,359.246,233.11z">
                                            </path>
                                            <path
                                                d="M359.246,307.352h34.87c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5h-34.87c-5.799,0-10.5,4.701-10.5,10.5 S353.447,307.352,359.246,307.352z">
                                            </path>
                                            <path
                                                d="M394.116,381.593c5.799,0,10.5-4.701,10.5-10.5s-4.701-10.5-10.5-10.5h-98.225c-5.799,0-10.5,4.701-10.5,10.5 s4.701,10.5,10.5,10.5H394.116z">
                                            </path>
                                            <path
                                                d="M236.982,168.845l-12.81-12.81c-3.45-3.449-8.036-5.349-12.915-5.349s-9.465,1.9-12.915,5.349l-67.19,67.19l-18.573-18.573 c-3.449-3.448-8.036-5.348-12.914-5.348c-4.878,0-9.465,1.9-12.914,5.349l-12.813,12.812c-7.12,7.121-7.12,18.708,0.001,25.829 l44.297,44.296c3.45,3.451,8.037,5.351,12.916,5.351c0,0,0.001,0,0.001,0c4.878,0,9.465-1.9,12.913-5.349l92.917-92.917 C244.103,187.554,244.103,175.966,236.982,168.845z M131.151,270.807l-40.429-40.428l8.942-8.942l24.062,24.062 c4.101,4.101,10.749,4.101,14.85,0l72.681-72.681l8.942,8.942L131.151,270.807z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>Bidding History
                            </a>
                        </div>
                    </div>
                    <!-- Help Dropdown Button -->
                    <div class="relative">
                        <button @click="toggleHelpDropdown"
                            class="flex items-center px-1 py-2 text-black text-lg font-semibold hover:text-[#005262]">
                            <i class="bx bx-chevron-down ml-4" aria-hidden="true"></i>
                            Help
                        </button>
                        <div v-if="helpDropdownOpen"
                            class="absolute left-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6EEEF]">
                                <svg class="w-6 h-6 item-center text-gray-800 dark:text-black" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>How to Bid
                            </a>

                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6EEEF]">
                                <svg class="w-6 h-6 text-gray-800 flex dark:text-black" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h6M9 3v4a1 1 0 0 1-1 1H4m11 13a11.426 11.426 0 0 1-3.637-3.99A11.139 11.139 0 0 1 10 11.833L15 10l5 1.833a11.137 11.137 0 0 1-1.363 5.176A11.425 11.425 0 0 1 15.001 21Z" />
                                </svg>Privacy Policy
                            </a>

                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6EEEF]">
                                <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z" />
                                </svg>Contact Support
                            </a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E6EEEF]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6 dark:text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>Terms & Condition
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button @click="toggleMenu" class="text-gray-300 focus:outline-none">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            <!--Search-->
            <div class=" flex items-center px-4 space-x-5">
                <div class="relative item-center">
                    <form action="">
                        <input
                            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search">
                        <button type="submit" class="absolute right-0 mt-2 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </form>
                </div>

                <div class="relative flex items-center">
                    <!--Icon (Envelop)-->
                    <button class="text-gray-800 hover:text-[#005262] focus:outline-none ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="size-7">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </button>
                </div>

                <!--Notification-->
                <div class="relative item-center">
                    <!-- Icon (Bell)  -->
                    <button class="text-gray-800 hover:text-[#005262] focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="size-7">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </button>
                    <!-- Notification Badge  -->
                    <span
                        class="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
                </div>
                <!-- Profile Image -->
                <div class="relative item-center ">
                    <button @click="toggleProfileDropdown"
                        class="flex item-center text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-10 h-10 rounded-full" src="/images/default-profile-image.png">
                    </button>
                    <div v-if="profileDropdownOpen"
                        class="absolute right-0 mx-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md shadow-gray-300 drop-shadow-md dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <button
                                    class="flex items-center px-4 py-2 w-full hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-200"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 9 10.4318H10.5Z"
                                            fill="#6B7280"></path>
                                    </svg>
                                    Help
                                </button>
                            </li>
                            <li>
                                <button @click="logout"
                                    class="flex items-center px-4 py-2 w-full hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-200"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6-10V5a3 3 0 00-6 0v1" />
                                    </svg>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="md:hidden bg-[#005262] space-y-2 p-4">
                <a href="#" class="block text-gray-300 hover:text-white">Home</a>
                <a href="#" class="block text-gray-300 hover:text-white">About</a>
                <a href="#" class="block text-gray-300 hover:text-white">History</a>
                <!-- Help Dropdown Button for Mobile -->
                <div>
                    <button @click="toggleHelpDropdown" class="text-white w-full text-left py-2">Help
                    </button>
                    <div v-if="helpDropdownOpen" class="space-y-2 bg-white">
                        <a href="#" class=" text-gray-300 hover:text-white">FAQ</a>
                        <a href="#" class="block text-gray-300 hover:text-white">Support</a>
                        <a href="#" class="block text-gray-300 hover:text-white">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { toast } from 'vue3-toastify';


const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const helpDropdownOpen = ref(false);
const historyDropdownOpen = ref(false);
const profileDropdownOpen = ref(false);

const logout = async () => {
    try {
        await axios.post("/api/logout");

        router.replace("/homepage");
    } catch (error) {
        console.error("Logout failed:", error);
        // handle logout error
    }
};

const toggleProfileDropdown = () => {
    profileDropdownOpen.value = !profileDropdownOpen.value;
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    profileDropdownOpen.value = !profileDropdownOpen.value;
};

const toggleHelpDropdown = () => {
    helpDropdownOpen.value = !helpDropdownOpen.value;
    profileDropdownOpen.value = !profileDropdownOpen.value;
};

const toggleHistoryDropdown = () => {
    historyDropdownOpen.value = !historyDropdownOpen.value;
    profileDropdownOpen.value = !profileDropdownOpen.value;
};
</script>
<style>
/* You can add custom styles here if needed */
</style>