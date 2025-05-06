<?php
// filepath: c:\Users\User\Documents\QuestionnaireLucas\QuestionnaireESGWeb\db_connection.php

// Fonction pour charger les variables d'environnement depuis un fichier .env
function loadEnv($filePath)
{
    if (!file_exists($filePath)) {
        die("Le fichier .env est introuvable.");
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Ignorer les commentaires
        }

        $keyValue = explode('=', $line, 2);
        if (count($keyValue) === 2) {
            $key = trim($keyValue[0]);
            $value = trim($keyValue[1]);
            $_ENV[$key] = $value;
        }
    }
}

// Charger les variables d'environnement
loadEnv(__DIR__ . '/.env');

// Informations de connexion
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];

try {
    // Création d'une connexion PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configuration des options PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Gestion des erreurs de connexion
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>