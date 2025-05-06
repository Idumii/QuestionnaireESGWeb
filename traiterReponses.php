<?php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_questionnaire = $_POST['id_questionnaire'];
    $reponses = $_POST['reponses']; // Les réponses sont envoyées sous forme de tableau

    try {
        foreach ($reponses as $id_question => $reponse) {
            $stmt = $pdo->prepare("
                INSERT INTO Reponses (id_questionnaire, id_question, reponse)
                VALUES (:id_questionnaire, :id_question, :reponse)
            ");
            $stmt->execute([
                'id_questionnaire' => $id_questionnaire,
                'id_question' => $id_question,
                'reponse' => $reponse,
            ]);
        }

        echo "Vos réponses ont été enregistrées avec succès !";
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}
?>