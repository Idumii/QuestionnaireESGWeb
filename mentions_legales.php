<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentions Légales / CGU</title>
    <link rel="stylesheet" href="src/output.css">
    <!-- Removed Alpine.js dependency -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
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
                                    class="inline-block w-full py-2 mx-0 text-left text-lime-900 md:w-auto md:px-0 md:mx-2 hover:text-lime-900 lg:mx-3 text-lime-700 md:text-center">Questionnaire</a>
                                <a href="mentions_legales.php"
                                    class="inline-block w-full py-2 mx-0 text-left text-lime-900 md:w-auto md:px-0 md:mx-2 hover:text-lime-900 lg:mx-3  text-lime-700 md:text-center">Mentions
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
            <section class="w-full px-6 pb-12 pt-16 antialiased bg-white">
                <div class="mx-auto max-w-7xl">
                    <h1 class="text-4xl font-bold text-center text-lime-700">Mentions légales</h1>
                    <div class="mt-8 space-y-6">
                        <!-- Section Informations légales -->
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">Informations légales</h2>
                            <p class="mt-4 text-gray-600">
                                Nom de l'entreprise : [Votre entreprise]<br>
                                Adresse : [Votre adresse]<br>
                                Téléphone : [Votre numéro de téléphone]<br>
                                Email : [Votre email]<br>
                                Numéro SIRET : [Votre numéro SIRET]<br>
                                Directeur de la publication : [Nom du directeur]<br>
                            </p>
                        </div>

                        <!-- Section RGPD -->
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">Politique de confidentialité (RGPD)</h2>
                            <p class="mt-4 text-gray-600">
                                Conformément au Règlement Général sur la Protection des Données (RGPD), nous nous
                                engageons à protéger vos données personnelles.
                                Les informations collectées sur ce site sont utilisées uniquement dans le cadre de
                                [précisez l'utilisation, ex. : la gestion des questionnaires].
                                Vous avez le droit d'accéder, de rectifier ou de supprimer vos données personnelles.
                                Pour exercer ces droits, veuillez nous contacter via les informations ci-dessous.
                            </p>
                        </div>

                        <!-- Section Contacts -->
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">Contact</h2>
                            <p class="mt-4 text-gray-600">
                                Pour toute question ou demande concernant les mentions légales ou la politique de
                                confidentialité, vous pouvez nous contacter :
                            </p>
                            <ul class="mt-4 text-gray-600">
                                <li>Email : [Votre email]</li>
                                <li>Téléphone : [Votre numéro de téléphone]</li>
                                <li>Adresse : [Votre adresse]</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Main Hero Content -->
        </div>
    </section>

</body>

</html>