<?php

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


// Vérifiez que la requête provient de GitHub
$secret = $_ENV['SECRET']; // Remplacez par un secret que vous définissez dans le webhook
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'] ?? '';
$payload = file_get_contents('php://input');

if ('sha1=' . hash_hmac('sha1', $payload, $secret) !== $signature) {
    http_response_code(403);
    exit('Invalid signature');
}

// Exécutez le script de déploiement
shell_exec('sh /home/bawi2179/www/QuestionnaireESG/deploy.sh');
http_response_code(200);
echo 'Déploiement effectué avec succès.';
?>