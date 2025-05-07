<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réponse au Questionnaire</title>
    <link rel="stylesheet" href="style.css">
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

<body>
    <header class="navbar bg-blue-600 text-white">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">Questionnaires ESG</a>
        </div>
    </header>
    <main>
        <section>
            <?php
            require_once 'db_connection.php';

            $questionnaireId = $_GET['id'];

            $stmt = $pdo->prepare("SELECT nom, description FROM Questionnaires WHERE id = :id");
            $stmt->execute(['id' => $questionnaireId]);
            $questionnaire = $stmt->fetch();

            if ($questionnaire) {
                echo '<section class="card shadow-lg bg-base-100 p-6 mb-6">';
                echo '<h2 class="card-title text-2xl font-bold">' . htmlspecialchars($questionnaire['nom']) . '</h2>';
                echo '<p class="text-gray-700">' . htmlspecialchars($questionnaire['description']) . '</p>';
                echo '</section>';
            } else {
                echo '<p class="text-red-500">Questionnaire introuvable.</p>';
            }
            ?>
        </section>
        <section>
            <h3>Questions</h3>
            <form id="questionnaire-form" method="POST" action="traiterReponses.php">
                <input type="hidden" name="id_questionnaire" value="<?php echo htmlspecialchars($questionnaireId); ?>">
                <!-- Exemple de question -->
                <div class="question">
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
                </div>
                <!-- Ajoutez d'autres questions ici -->
                <button type="submit" class="btn btn-primary w-full mt-4">
                    Soumettre
                </button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Questionnaires ESG. Tous droits réservés.</p>
    </footer>
    <script src="script.js"></script>
</body>

</html>