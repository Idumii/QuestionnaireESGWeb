<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réponse au Questionnaire</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 text-gray-800">
    <header class="bg-blue-600 text-white p-4">
        <h1 class="text-2xl font-bold text-center">Répondez au Questionnaire</h1>
    </header>
    <main class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded">
        <section class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Titre du Questionnaire</h2>
            <p class="text-gray-700">
                Description du questionnaire sélectionné. Expliquez ici les objectifs et l'importance de ce
                questionnaire.
            </p>
        </section>
        <section>
            <h3 class="text-lg font-semibold mb-4">Questions</h3>
            <form id="questionnaire-form" class="space-y-4">
                <!-- Exemple de question -->
                <div class="question">
                    <label for="question1" class="block text-sm font-medium text-gray-700">Question 1 : Votre réponse
                        ici</label>
                    <input type="text" id="question1" name="question1" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </div>
                <!-- Ajoutez d'autres questions ici -->
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Soumettre
                </button>
            </form>
        </section>
    </main>
    <footer class="bg-gray-800 text-white text-center p-4 mt-6">
        <p>&copy; 2025 Questionnaires ESG. Tous droits réservés.</p>
    </footer>
    <script src="script.js"></script>
</body>

</html>