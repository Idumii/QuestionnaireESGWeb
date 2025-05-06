document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    const dependenceId = question.dataset.dependenceId;
    const condition = question.dataset.condition;

    if (dependenceId) {
      const dependentQuestion = document.querySelector(
        `[data-question-id="${dependenceId}"]`
      );
      const inputs = dependentQuestion.querySelectorAll('input[type="radio"]');

      inputs.forEach((input) => {
        input.addEventListener("change", function () {
          if (input.value === condition) {
            question.style.display = "block";
          } else {
            question.style.display = "none";
          }
        });
      });

      // Masquer la question par défaut
      question.style.display = "none";
    }
  });
});
