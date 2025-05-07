<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réponse au Questionnaire</title>
    <link rel="stylesheet" href="src/output.css">
</head>

<body class="bg-gray-100 text-gray-800">
    <header class="navbar bg-blue-600 text-white p-4">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
            <a class="text-xl font-bold">Questionnaires ESG</a>
        </div>
    </header>
    <main class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded mt-6">
        <section>
            <?php
            require_once 'db_connection.php';

            $questionnaireId = $_GET['id'];

            $stmt = $pdo->prepare("SELECT nom, description FROM Questionnaires WHERE id = :id");
            $stmt->execute(['id' => $questionnaireId]);
            $questionnaire = $stmt->fetch();

            if ($questionnaire) {
                echo '<section class="p-6 mb-6 bg-gray-50 shadow rounded">';
                echo '<h2 class="text-2xl font-bold mb-2">' . htmlspecialchars($questionnaire['nom']) . '</h2>';
                echo '<p class="text-gray-700">' . htmlspecialchars($questionnaire['description']) . '</p>';
                echo '</section>';
            } else {
                echo '<p class="text-red-500 border border-red-500 bg-red-100 p-2 rounded">Questionnaire introuvable.</p>';
            }
            ?>
        </section>
        <section>
            <h3 class="text-xl font-semibold mb-4">Questions</h3>
            <form id="questionnaire-form" method="POST" action="traiterReponses.php" class="space-y-4">
                <input type="hidden" name="id_questionnaire" value="<?php echo htmlspecialchars($questionnaireId); ?>">
                <?php
                $stmt = $pdo->prepare("SELECT * FROM Questions WHERE id_questionnaire = :id_questionnaire ORDER BY numero_question");
                $stmt->execute(['id_questionnaire' => $questionnaireId]);
                $questions = $stmt->fetchAll();

                if (!$questions) {
                    echo '<p class="text-red-500">Aucune question trouvée pour ce questionnaire.</p>';
                }

                foreach ($questions as $question) {
                    $dependenceId = $question['id_question_dependante'];
                    $condition = $question['valeur_condition'];

                    echo '<div class="form-control mb-4 question" data-question-id="' . $question['id'] . '"';
                    if ($dependenceId) {
                        echo ' data-dependence-id="' . $dependenceId . '" data-condition="' . htmlspecialchars($condition) . '"';
                    }
                    echo '>';

                    echo '<label class="label">';
                    echo '<span class="label-text">' . htmlspecialchars($question['question']) . '</span>';
                    echo '</label>';

                    if ($question['type'] === 'text') {
                        echo '<input type="text" name="reponses[' . $question['id'] . ']" class="input input-bordered w-full">';
                    } elseif ($question['type'] === 'multiple') {
                        echo '<div class="flex gap-4 mt-2">';
                        echo '<label class="cursor-pointer"><input type="radio" name="reponses[' . $question['id'] . ']" value="oui" class="radio radio-primary mr-2"> Oui</label>';
                        echo '<label class="cursor-pointer"><input type="radio" name="reponses[' . $question['id'] . ']" value="non" class="radio radio-primary mr-2"> Non</label>';
                        echo '</div>';
                    }

                    echo '</div>';
                }
                ?>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Soumettre
                </button>
            </form>
        </section>
    </main>
    <footer class="bg-gray-800 text-white text-center p-4 mt-6">
        <p>&copy; 2025 Questionnaires ESG. Tous droits réservés.</p>
    </footer>
</body>

</html>