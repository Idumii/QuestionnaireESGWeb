<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de Questionnaire</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 text-gray-800">
    <header class="bg-blue-600 text-white p-4">
        <h1 class="text-2xl font-bold text-center">Créer un Nouveau Questionnaire</h1>
    </header>
    <main class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded">
        <form id="creation-form" class="space-y-6">
            <section>
                <h2 class="text-xl font-semibold mb-4">Informations Générales</h2>
                <div class="form-group mb-4">
                    <label for="titre" class="block text-sm font-medium text-gray-700">Titre du Questionnaire :</label>
                    <input type="text" id="titre" name="titre" placeholder="Entrez le titre" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="form-group mb-4">
                    <label for="description" class="block text-sm font-medium text-gray-700">Description :</label>
                    <textarea id="description" name="description" placeholder="Entrez une description" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
            </section>
            <section>
                <h2 class="text-xl font-semibold mb-4">Questions</h2>
                <div id="questions-container" class="space-y-4">
                    <!-- Les questions ajoutées dynamiquement apparaîtront ici -->
                </div>
                <button type="button" id="add-question-btn"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Ajouter une Question
                </button>
            </section>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Créer le Questionnaire
            </button>
        </form>
    </main>
    <footer class="bg-gray-800 text-white text-center p-4 mt-6">
        <p>&copy; 2025 Questionnaires ESG. Tous droits réservés.</p>
    </footer>
    <script src="creationScript.js"></script>
</body>

</html>