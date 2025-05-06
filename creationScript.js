let questionCount = 0;

document
  .getElementById("add-question-btn")
  .addEventListener("click", function () {
    questionCount++;

    const container = document.getElementById("questions-container");
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("form-group", "mb-4");
    questionDiv.innerHTML = `
        <label for="question${questionCount}" class="block text-sm font-medium text-gray-700">
            Question ${questionCount} :
        </label>
        <input type="text" id="question${questionCount}" name="questions[${questionCount}][text]" placeholder="Entrez la question" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">

        <label for="type${questionCount}" class="block text-sm font-medium text-gray-700 mt-2">
            Type de réponse :
        </label>
        <select id="type${questionCount}" name="questions[${questionCount}][type]" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
            <option value="text">Réponse libre</option>
            <option value="multiple">Choix multiple (Oui/Non)</option>
        </select>

        <label for="dependence${questionCount}" class="block text-sm font-medium text-gray-700 mt-2">
            Dépend de la réponse à une autre question (optionnel) :
        </label>
        <select id="dependence${questionCount}" name="questions[${questionCount}][dependence]" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
            <option value="">Aucune</option>
            ${generateQuestionOptions()}
        </select>

        <label for="condition${questionCount}" class="block text-sm font-medium text-gray-700 mt-2">
            Condition (valeur attendue pour afficher cette question) :
        </label>
        <input type="text" id="condition${questionCount}" name="questions[${questionCount}][condition]" placeholder="Exemple : oui"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
    `;
    container.appendChild(questionDiv);
  });

function generateQuestionOptions() {
  let options = "";
  for (let i = 1; i <= questionCount; i++) {
    options += `<option value="${i}">Question ${i}</option>`;
  }
  return options;
}
