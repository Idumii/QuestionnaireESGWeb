import React, { useState, useCallback, useEffect } from "react";
import InteractiveQuestionnaire from "./components/InteractiveQuestionnaire";
import ESGEvaluationDisplay from "./components/ESGReportDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { FLATTENED_QUESTIONS, QUESTIONNAIRE_STRUCTURE } from "./constants";
// Types locaux (à adapter selon ton projet)
import { UserAnswers, QuestionDefinition } from "./types";

type AppPhase =
  | "welcome"
  | "questionnaire"
  | "generating"
  | "evaluation"
  | "error";

const App: React.FC = () => {
  const [appPhase, setAppPhase] = useState<AppPhase>("welcome");
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [esgEvaluation, setEsgEvaluation] = useState<any>(null); // Type à adapter selon ton usage
  const [error, setError] = useState<string | null>(null);

  const totalQuestions = FLATTENED_QUESTIONS.length;
  const currentQuestion: QuestionDefinition | undefined =
    FLATTENED_QUESTIONS[currentQuestionIndex];

  const handleStartQuestionnaire = () => {
    setError(null);
    setEsgEvaluation(null);
    const savedAnswers = localStorage.getItem("userAnswers");
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    let startIndex = 0;
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    } else {
      setUserAnswers({});
    }
    if (savedIndex) {
      const parsedIndex = parseInt(savedIndex, 10);
      if (parsedIndex >= 0 && parsedIndex < totalQuestions) {
        startIndex = parsedIndex;
      }
    }
    // Sauter les questions conditionnelles non pertinentes au démarrage
    while (
      FLATTENED_QUESTIONS[startIndex] &&
      FLATTENED_QUESTIONS[startIndex].conditional &&
      (!userAnswers[FLATTENED_QUESTIONS[startIndex].conditional.dependsOn] ||
        userAnswers[FLATTENED_QUESTIONS[startIndex].conditional.dependsOn] !==
          FLATTENED_QUESTIONS[startIndex].conditional.value)
    ) {
      startIndex++;
    }
    setCurrentQuestionIndex(startIndex);
    setAppPhase("questionnaire");
  };

  useEffect(() => {
    if (appPhase === "questionnaire") {
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      localStorage.setItem(
        "currentQuestionIndex",
        currentQuestionIndex.toString()
      );
    }
  }, [userAnswers, currentQuestionIndex, appPhase]);

  const handleAnswerChange = useCallback(
    (questionCode: string, answer: string) => {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionCode]: answer,
      }));
    },
    []
  );

  const handleNextQuestion = useCallback(() => {
    let nextIndex = currentQuestionIndex + 1;
    while (
      FLATTENED_QUESTIONS[nextIndex] &&
      FLATTENED_QUESTIONS[nextIndex].conditional &&
      userAnswers[FLATTENED_QUESTIONS[nextIndex].conditional.dependsOn] !==
        FLATTENED_QUESTIONS[nextIndex].conditional.value
    ) {
      nextIndex++;
    }
    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, userAnswers]);

  const handlePreviousQuestion = useCallback(() => {
    let prevIndex = currentQuestionIndex - 1;
    while (
      prevIndex >= 0 &&
      FLATTENED_QUESTIONS[prevIndex].conditional &&
      userAnswers[FLATTENED_QUESTIONS[prevIndex].conditional.dependsOn] !==
        FLATTENED_QUESTIONS[prevIndex].conditional.value
    ) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    }
  }, [currentQuestionIndex, userAnswers]);

  // Cette fonction ne fait plus appel à Gemini, adapte-la selon ton besoin
  const handleGenerateEvaluation = useCallback(async () => {
    const answersToSubmit: UserAnswers = {};
    for (const code in userAnswers) {
      if (userAnswers[code] && userAnswers[code].trim() !== "") {
        answersToSubmit[code] = userAnswers[code].trim();
      }
    }

    if (Object.keys(answersToSubmit).length === 0) {
      setError(
        "Veuillez répondre à au moins une question avant de générer l'évaluation."
      );
      setAppPhase("questionnaire");
      return;
    }

    setAppPhase("generating");
    setError(null);
    setEsgEvaluation(null);

    // Ici tu peux mettre ta logique d'évaluation locale ou simuler une réponse
    setTimeout(() => {
      const sectionScores = calculateSectionScores(userAnswers);
      setEsgEvaluation({
        message: "Évaluation fictive (Gemini désactivé)",
        sectionScores, // <-- Ajout ici
      });
      setAppPhase("evaluation");
      localStorage.removeItem("userAnswers");
      localStorage.removeItem("currentQuestionIndex");
    }, 1000);
  }, [userAnswers]);

  const handleEditAnswers = () => {
    setAppPhase("questionnaire");
    setError(null);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setEsgEvaluation(null);
    setError(null);
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("currentQuestionIndex");
    setAppPhase("welcome");
  };

  // userAnswers : { [code: string]: string }
  function calculateSectionScores(userAnswers) {
    const sectionScores = {};

    for (const section of QUESTIONNAIRE_STRUCTURE) {
      let sectionScore = 0;
      let maxScore = 0;

      for (const question of section.questions) {
        if (question.type === "radio" && question.scoreMap) {
          const answer = userAnswers[question.code];
          if (answer && question.scoreMap[answer] !== undefined) {
            sectionScore += question.scoreMap[answer];
          }
          maxScore += 1; // chaque question radio vaut 1 point max
        }
      }

      sectionScores[section.id] = {
        score: sectionScore,
        max: maxScore,
        percent:
          maxScore > 0
            ? Math.round((sectionScore / maxScore) * 100)
            : null,
      };
    }

    return sectionScores;
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-sky-700 tracking-tight">
          Assistant d'Évaluation ESG
        </h1>
        {appPhase === "welcome" && (
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Répondez aux questions pas à pas pour obtenir une évaluation ESG de
            votre entreprise.
          </p>
        )}
        {appPhase === "questionnaire" && (
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Progressez dans le questionnaire. Vos réponses sont sauvegardées
            automatiquement.
          </p>
        )}
        {appPhase === "evaluation" && (
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Voici votre évaluation ESG générée. Analysez les points soulevés.
          </p>
        )}
      </header>

      <main className="max-w-3xl w-full mx-auto flex-grow">
        {appPhase === "welcome" && (
          <div className="text-center bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-sky-600 mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-slate-600 mb-8">
              Cliquez sur le bouton ci-dessous pour démarrer le questionnaire.
              Sur la base de vos réponses, une évaluation ESG qualitative sera
              générée.
            </p>
            <button
              onClick={handleStartQuestionnaire}
              className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              Commencer le Questionnaire
            </button>
          </div>
        )}

        {appPhase === "questionnaire" && currentQuestion && (
          <InteractiveQuestionnaire
            question={currentQuestion}
            totalQuestions={totalQuestions}
            currentQuestionNumber={currentQuestionIndex + 1}
            answer={userAnswers[currentQuestion.code] || ""}
            onAnswerChange={handleAnswerChange}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onComplete={handleGenerateEvaluation}
            isFirstQuestion={currentQuestionIndex === 0}
            isLastQuestion={currentQuestionIndex === totalQuestions - 1}
            userAnswers={userAnswers} // <-- AJOUT ICI
          />
        )}

        {(appPhase === "generating" ||
          appPhase === "evaluation" ||
          appPhase === "error") && (
          <div className="bg-white p-1 rounded-xl shadow-xl">
            {appPhase === "generating" && <LoadingSpinner />}
            <ErrorMessage message={error || ""} />
            {appPhase === "evaluation" && !error && (
              <>
                <ESGEvaluationDisplay evaluationData={esgEvaluation} />
                <div className="mt-8 p-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleEditAnswers}
                    className="w-full sm:w-auto flex justify-center py-2.5 px-5 border border-sky-500 rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-colors"
                  >
                    Modifier mes réponses
                  </button>
                  <button
                    onClick={handleRestart}
                    className="w-full sm:w-auto flex justify-center py-2.5 px-5 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
                  >
                    Recommencer avec une nouvelle évaluation
                  </button>
                </div>
              </>
            )}
            {appPhase === "error" && (
              <div className="mt-8 p-6 text-center">
                <button
                  onClick={handleEditAnswers}
                  className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                >
                  Retourner au questionnaire
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-slate-500 py-6">
        <p>&copy; {new Date().getFullYear()} Assistant d'Évaluation ESG.</p>
      </footer>
    </div>
  );
};

export default App;
