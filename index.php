<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Questionnaires ESG</title>
    <script src="https://cdn.tailwindcss.com"></script>
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
        <section class="mb-6">
            <h2 class="text-xl font-semibold mb-2">À propos des questionnaires</h2>
            <p class="text-gray-700">
                Les questionnaires ESG sont conçus pour recueillir des informations importantes
                sur divers sujets liés à l'environnement, au social et à la gouvernance.
                Ils permettent de mieux comprendre les enjeux actuels et d'agir en conséquence.
            </p>
        </section>
        <section class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Liste des questionnaires</h2>
            <ul class="space-y-4">
                <?php
                // Inclure la connexion à la base de données
                require_once 'db_connection.php';

                try {
                    // Récupérer les questionnaires depuis la base de données
                    $stmt = $pdo->query("SELECT id, nom, description FROM Questionnaires");
                    while ($row = $stmt->fetch()) {
                        echo '<li class="p-4 bg-gray-50 shadow rounded">';
                        echo '<strong class="text-lg">' . htmlspecialchars($row['nom']) . '</strong><br>';
                        echo '<p class="text-gray-600">' . htmlspecialchars($row['description']) . '</p>';
                        echo '<a href="questionnaire.php?id=' . $row['id'] . '" class="text-blue-500 hover:underline">Répondre</a>';
                        echo '</li>';
                    }
                } catch (PDOException $e) {
                    echo '<p class="text-red-500">Erreur lors de la récupération des questionnaires : ' . $e->getMessage() . '</p>';
                }
                ?>
            </ul>
        </section>
        <section>
            <h2 class="text-xl font-semibold mb-2">Navigation</h2>
            <a href="creationQuestionnaire.php" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Créer un Nouveau Questionnaire
            </a>
        </section>
    </main>
    <footer class="bg-gray-800 text-white text-center p-4 mt-6">
        <p>&copy; 2025 Questionnaires ESG. Tous droits réservés.</p>
    </footer>
</body>

</html>