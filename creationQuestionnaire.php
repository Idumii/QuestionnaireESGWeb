<?php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titre = $_POST['titre'];
    $description = $_POST['description'];
    $questions = $_POST['questions'];

    try {
        // Insérer le questionnaire
        $stmt = $pdo->prepare("INSERT INTO Questionnaires (nom, description) VALUES (:nom, :description)");
        $stmt->execute(['nom' => $titre, 'description' => $description]);
        $questionnaireId = $pdo->lastInsertId();

        // Étape 1 : Insérer toutes les questions sans dépendances
        $questionIds = [];
        foreach ($questions as $index => $question) {
            $text = $question['text'];
            $type = $question['type'] ?? 'text'; // Par défaut, type = 'text'

            $stmt = $pdo->prepare("
                INSERT INTO Questions (id_questionnaire, numero_question, question, type)
                VALUES (:id_questionnaire, :numero_question, :question, :type)
            ");
            $stmt->execute([
                'id_questionnaire' => $questionnaireId,
                'numero_question' => $index,
                'question' => $text,
                'type' => $type,
            ]);

            // Stocker l'ID de la question insérée
            $questionIds[$index] = $pdo->lastInsertId();
        }

        // Étape 2 : Mettre à jour les questions avec leurs dépendances
        foreach ($questions as $index => $question) {
            if (!empty($question['dependence'])) {
                $dependenceIndex = $question['dependence'];
                $dependenceId = $questionIds[$dependenceIndex];
                $condition = $question['condition'] ?? null;

                $stmt = $pdo->prepare("
                    UPDATE Questions
                    SET id_question_dependante = :id_question_dependante, valeur_condition = :valeur_condition
                    WHERE id = :id
                ");
                $stmt->execute([
                    'id_question_dependante' => $dependenceId,
                    'valeur_condition' => $condition,
                    'id' => $questionIds[$index],
                ]);
            }
        }

        echo "Questionnaire créé avec succès !";
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de Questionnaire</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/daisyui@latest"></script>
    <script>
        tailwind.config = {
            plugins: [daisyui],
            daisyui: {
                themes: ["corporate", "dark"], // Vous pouvez choisir un thème ici
            },
        };
    </script>
</head>

<body class="bg-gray-100 text-gray-800">
    <header class="navbar bg-blue-600 text-white">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">Questionnaires ESG</a>
        </div>
    </header>
    <main class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded">
        <form id="creation-form" class="space-y-6" method="POST" action="">
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