<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentions Légales / CGU</title>
    <link rel="stylesheet" href="src/output.css">
</head>

<body class="bg-gray-900 text-gray-100 flex flex-col min-h-screen">
    <main class="flex-grow flex flex-col justify-center items-center text-center p-6">
        <header>
            <section class="w-full px-6 pb-12 antialiased bg-white tails-selected-element">
                <div class="mx-auto max-w-7xl">
                    <nav class="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
                        <div
                            class="relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
                            <div class="flex items-center justify-start w-1/4 h-full pr-4">
                                <a href="#_"
                                    class="flex items-center text-lg py-4 space-x-2 font-extrabold text-gray-900 md:py-0">
                                    <span class="text-[40px] mr-2">✪</span> logo </a>
                            </div>
                            <div class="top-0 left-0 items-start hidden w-full h-full p-4 bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute md:bg-transparent justify-between md:p-0 md:relative md:flex"
                                :class="{'flex fixed': showMenu, 'hidden': !showMenu }">
                                <div
                                    class="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                                    <a href="#_"
                                        class="inline-flex items-center block w-auto h-16 px-4 text-xl font-black leading-none text-gray-900 md:hidden">
                                        <span class="text-4xl mr-2">✪</span> logo </a>
                                    <div
                                        class="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 font-semibold md:mt-0 md:flex-row md:items-center">
                                        <a href="#_"
                                            class="inline-block w-full py-2 mx-0 ml-6 text-left text-black md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center">Accueil</a>
                                        <a href="#_"
                                            class="inline-block w-full py-2 mx-0 text-left text-gray-500 md:w-auto md:px-0 md:mx-2 hover:text-black lg:mx-3 md:text-center">Questionnaire</a>
                                        <a href="#_"
                                            class="inline-block w-full py-2 mx-0 text-left text-gray-500 md:w-auto md:px-0 md:mx-2 hover:text-black lg:mx-3 md:text-center">Mentions
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
                    <!-- End Main Hero Content -->
                </div>
            </section>

        </header>


        <section class="py-24 bg-white">
            <div class="px-8 mx-auto max-w-7xl lg:px-16">
                <h2 class="mb-4 text-xl font-bold md:text-3xl">Mentions légales</h2>
                <div class="grid grid-cols-1 gap-8 text-zinc-600 md:grid-cols-2 md:gap-16">
                    <div>
                        <h5 class="mt-10 mb-3 font-semibold text-zinc-900">Éditeur du site</h5>
                        <p>
                            Nom de l'entreprise : [Nom de l'entreprise]<br>
                            Adresse : [Adresse de l'entreprise]<br>
                            Téléphone : [Numéro de téléphone]<br>
                            Email : [Adresse email]<br>
                            SIRET : [Numéro SIRET]<br>
                            Directeur de la publication : [Nom du responsable]
                        </p>
                    </div>
                    <div>
                        <h5 class="mt-10 mb-3 font-semibold text-zinc-900">Hébergement</h5>
                        <p>
                            Hébergeur : [Nom de l'hébergeur]<br>
                            Adresse : [Adresse de l'hébergeur]<br>
                            Téléphone : [Numéro de téléphone de l'hébergeur]
                        </p>
                    </div>
                </div>
                <div class="mt-12">
                    <h2 class="mb-4 text-xl font-bold md:text-3xl">RGPD</h2>
                    <div class="text-zinc-600">
                        <h5 class="mt-6 mb-2 font-semibold text-zinc-900">Collecte des données</h5>
                        <p>
                            Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par
                            [Nom de l'entreprise] pour [finalité du traitement].<br>
                            Elles sont conservées pendant [durée de conservation] et sont destinées à [destinataires des
                            données].
                        </p>
                        <h5 class="mt-6 mb-2 font-semibold text-zinc-900">Droits des utilisateurs</h5>
                        <p>
                            Conformément à la loi « informatique et libertés » et au RGPD, vous pouvez exercer votre
                            droit d'accès, de rectification, d'opposition, de suppression et de portabilité des données
                            vous concernant en contactant : [Adresse email de contact].
                        </p>
                        <h5 class="mt-6 mb-2 font-semibold text-zinc-900">Cookies</h5>
                        <p>
                            Ce site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer
                            votre navigateur pour refuser les cookies.
                        </p>
                    </div>
                </div>
                <div class="mt-12">
                    <h2 class="mb-4 text-xl font-bold md:text-3xl">Contact</h2>
                    <p class="text-zinc-600">
                        Pour toute question, vous pouvez nous contacter à l'adresse suivante : [Adresse email de
                        contact].
                    </p>
                </div>
            </div>
        </section>


    </main>
</body>

</html>