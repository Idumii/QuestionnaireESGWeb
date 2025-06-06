<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réponse au Questionnaire</title>
    <link rel="stylesheet" href="src/output.css">
</head>

<body>
    <section class="w-full px-6 pb-12 antialiased bg-white 2xl:font-serif 2xl:text-green-50 tails-selected-element">
        <div class="mx-auto max-w-7xl">
            <nav class="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
                <div
                    class="relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
                    <div class="flex items-center justify-start w-1/4 h-full pr-4">
                        <a href="#_"
                            class="flex items-center text-lg py-4 space-x-2 font-extrabold text-gray-900 md:py-0">
                            <span class="text-[40px] mr-2">✪</span> logo
                        </a>
                    </div>
                    <div class="top-0 left-0 items-start hidden w-full h-full p-4 bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute md:bg-transparent justify-between md:p-0 md:relative md:flex text-lime-700"
                        :class="{'flex fixed': showMenu, 'hidden': !showMenu }">
                        <div
                            class="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                            <a href="#_"
                                class="inline-flex items-center block w-auto h-16 px-4 text-xl font-black leading-none text-gray-900 md:hidden">
                                <span class="text-4xl mr-2">✪</span> logo
                            </a>
                            <div
                                class="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 font-semibold md:mt-0 md:flex-row md:items-center">
                                <a href="index.php"
                                    class="inline-block w-full py-2 mx-0 ml-6 text-left text-lime-900 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 text-lime-700 md:text-center">Accueil</a>
                                <a href="questionnaire.php"
                                    class="inline-block w-full py-2 mx-0 text-left text-lime-900 md:w-auto md:px-0 md:mx-2 hover:text-black lg:mx-3 text-lime-700 md:text-center">Questionnaire</a>
                                <a href="mentions_legales.php"
                                    class="inline-block w-full py-2 mx-0 text-left text-lime-900 md:w-auto md:px-0 md:mx-2 hover:text-black lg:mx-3  text-lime-700 md:text-center">Mentions
                                    légales</a>

                                <a href="#_"
                                    class="absolute top-0 left-0 hidden py-2 mt-6 ml-10 mr-2 text-gray-600 lg:inline-block md:mt-0 md:ml-2 lg:mx-3 md:relative">

                                </a>
                            </div>
                            <div
                                class="flex flex-col items-start justify-end md:ml-16 font-semibold lg:ml-0 w-full pt-4 md:items-center md:w-1/3 flex-shrink-0 md:flex-row md:py-0">


                            </div>
                        </div>
                    </div>
                    <div @click="showMenu = !showMenu"
                        class="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                        <svg class="w-6 h-6 text-gray-700" x-show="!showMenu" fill="none" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        <svg class="w-6 h-6 text-gray-700" x-show="showMenu" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
            </nav>
            <div class="w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
            <!-- Main Hero Content -->
            <div class="flex flex-col items-center md:flex-row tails-selected-element">

                <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                    <p class="font-medium text-blue-500 uppercase" data-primary="blue-500">Building Businesses</p>
                    <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                        Changing The Way People Do Business.
                    </h2>
                    <p class="text-xl text-zinc-600 md:pr-16">Learn how to engage with your visitors and teach them
                        about your mission. We're revolutionizing the way customers and businesses interact.</p>
                </div>

                <div class="w-full mt-16 md:mt-0 md:w-2/5">
                    <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-zinc-300 rounded-lg shadow-2xl px-7"
                        data-rounded="rounded-lg" data-rounded-max="rounded-full">
                        <h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
                        <input type="text" name="email" id="email"
                            class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-zinc-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                            data-rounded="rounded-lg" data-primary="blue-500" placeholder="Email address">
                        <input type="password" name="password" id="password"
                            class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-zinc-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                            data-rounded="rounded-lg" data-primary="blue-500" placeholder="Password">
                        <div class="block">
                            <button class="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg"
                                data-primary="blue-600" data-rounded="rounded-lg">Log Me In</button>
                        </div>
                        <p class="w-full mt-4 text-sm text-center text-zinc-500">Don't have an account? <a href="#_"
                                class="text-blue-500 underline">Sign up here</a></p>
                    </div>
                </div>

            </div>
            <!-- End Main Hero Content -->
        </div>
    </section>
</body>

</html>