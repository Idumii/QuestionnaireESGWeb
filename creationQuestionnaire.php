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

        // Insérer les questions
        foreach ($questions as $index => $question) {
            $text = $question['text'];
            $type = $question['type'];
            $dependence = $question['dependence'] ?? null;
            $condition = $question['condition'] ?? null;

            $stmt = $pdo->prepare("
                INSERT INTO Questions (id_questionnaire, numero_question, question, type, id_question_dependante, valeur_condition)
                VALUES (:id_questionnaire, :numero_question, :question, :type, :id_question_dependante, :valeur_condition)
            ");
            $stmt->execute([
                'id_questionnaire' => $questionnaireId,
                'numero_question' => $index,
                'question' => $text,
                'type' => $type,
                'id_question_dependante' => $dependence,
                'valeur_condition' => $condition,
            ]);
        }

        echo "Questionnaire créé avec succès !";
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}
?>