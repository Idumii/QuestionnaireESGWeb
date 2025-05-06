<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réponse au Questionnaire</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <header>
        <h1>Répondez au Questionnaire</h1>
    </header>
    <main>
        <section>
            <h2>Titre du Questionnaire</h2>
            <p>
                Description du questionnaire sélectionné. Expliquez ici les objectifs et l'importance de ce
                questionnaire.
            </p>
        </section>
        <section>
            <h3>Questions</h3>
            <form id="questionnaire-form">
                <!-- Exemple de question -->
                <div class="question">
                    <?php
                    require_once 'db_connection.php';

                    $questionnaireId = $_GET['id'];

                    $stmt = $pdo->prepare("SELECT * FROM Questions WHERE id_questionnaire = :id_questionnaire ORDER BY numero_question");
                    $stmt->execute(['id_questionnaire' => $questionnaireId]);
                    $questions = $stmt->fetchAll();

                    foreach ($questions as $question) {
                        echo '<div class="mb-4">';
                        echo '<label class="block text-sm font-medium text-gray-700">' . htmlspecialchars($question['question']) . '</label>';

                        if ($question['type'] === 'text') {
                            echo '<input type="text" name="question' . $question['id'] . '" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">';
                        } elseif ($question['type'] === 'multiple') {
                            echo '<div class="mt-2">';
                            echo '<label><input type="radio" name="question' . $question['id'] . '" value="oui" class="mr-2"> Oui</label>';
                            echo '<label class="ml-4"><input type="radio" name="question' . $question['id'] . '" value="non" class="mr-2"> Non</label>';
                            echo '</div>';
                        }

                        echo '</div>';
                    }
                    ?>
                    <input type="text" id="question1" name="question1" required>
                </div>
                <!-- Ajoutez d'autres questions ici -->
                <button type="submit">Soumettre</button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Questionnaires ESG. Tous droits réservés.</p>
    </footer>
    <script src="script.js"></script>
</body>

</html>