import React, { useState, useEffect } from "react";
import { Question, UserAnswers } from "../types";

interface InteractiveQuestionnaireProps {
  question: Question;
  totalQuestions: number;
  currentQuestionNumber: number;
  answer: string;
  onAnswerChange: (code: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  userAnswers: UserAnswers;
}

const InteractiveQuestionnaire: React.FC<InteractiveQuestionnaireProps> = ({
  question,
  totalQuestions,
  currentQuestionNumber,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  onComplete,
  isFirstQuestion,
  isLastQuestion,
  userAnswers,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(answer);

  useEffect(() => {
    setCurrentAnswer(answer);
  }, [answer, question.code]);

  // Gestion de la condition d'affichage
  if (question.conditional) {
    const dependsOnAnswer = userAnswers[question.conditional.dependsOn];

    // Vérifier hasAnswer si défini
    if (question.conditional.hasAnswer !== undefined) {
      const hasAnswer = Boolean(
        dependsOnAnswer && dependsOnAnswer.trim() !== ""
      );
      if (question.conditional.hasAnswer !== hasAnswer) {
        return null;
      }
    }
    // Vérifier value si défini (logique existante)
    else if (question.conditional.value !== undefined) {
      // Si value est un tableau, vérifie si la réponse est incluse dans le tableau
      if (Array.isArray(question.conditional.value)) {
        if (
          !question.conditional.value.includes(
            userAnswers[question.conditional.dependsOn]
          )
        ) {
          return null;
        }
      }
      // Sinon, compare directement avec la valeur unique
      else if (
        userAnswers[question.conditional.dependsOn] !==
        question.conditional.value
      ) {
        return null;
      }
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setCurrentAnswer(value);
    onAnswerChange(question.code, value);
  };

  const handleNextClick = () => {
    onNext();
  };

  const handlePreviousClick = () => {
    onPrevious();
  };

  const handleCompleteClick = () => {
    onComplete();
  };

  // Calcul du pourcentage de progression
  const progressPercentage = Math.round((currentQuestionNumber / totalQuestions) * 100);

  return (
    <div className="flex flex-col h-full">
      {/* Barre de progression */}
      <div className="bg-gray-200 rounded-t-xl p-2">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-sky-600 bg-sky-200">
                Progression
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-sky-600">
                {progressPercentage}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-sky-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-sky-500 transition-all duration-300"
            ></div>
          </div>
        </div>
      </div>

      {/* Augmenter l'espace disponible pour les questions */}
      <div className="p-6 flex-grow overflow-auto" style={{ minHeight: "400px" }}>
        <div className="mb-4 text-slate-700 font-semibold">
          Question {currentQuestionNumber} / {totalQuestions}
        </div>
        <div className="mb-2 text-slate-500 text-sky-500 text-sm font-mono">
          {question.code}
        </div>
        <div className="mb-6 text-gray-800 text-lg font-medium">{question.text}</div>

        {/* Affichage selon le type de question */}
        {(!question.type || question.type === "text") && (
          <div className="mb-4 w-full transition-all duration-200">
            <div className="relative">
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                value={currentAnswer}
                onChange={handleChange}
                rows={16}
                placeholder="Votre réponse ici..."
              />
              {/* Animation d'état actif */}
              <div className={`absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none transition-opacity duration-200 $$
                currentAnswer ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
            {/* Indicateur de caractères (optionnel) */}
            <div className="text-xs text-right mt-1 text-slate-500">
              {currentAnswer.length} caractères
            </div>
          </div>
        )}

        {(question.type === "radio" || question.type === "options") &&
          question.options && (
            <div className="flex flex-col gap-3">
              {question.options.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    currentAnswer === opt
                      ? "border-green-500 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setCurrentAnswer(opt);
                    onAnswerChange(question.code, opt);
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      currentAnswer === opt
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {currentAnswer === opt && (
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                  </div>
                  <span
                    className={`flex-grow ${
                      currentAnswer === opt ? "font-medium" : ""
                    }`}
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          )}
      </div>

      {/* Boutons de navigation en bas, toujours visibles */}
      <div className="p-4 border-t bg-slate-50 rounded-b-xl flex justify-between items-center">
        <button
          onClick={handlePreviousClick}
          disabled={isFirstQuestion}
          className={`px-4 py-2 rounded ${
            isFirstQuestion
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-slate-200 hover:bg-slate-300 text-slate-700"
          }`}
        >
          Précédent
        </button>

        {!isLastQuestion ? (
          <button
            onClick={handleNextClick}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Suivant
          </button>
        ) : (
          <button
            onClick={handleCompleteClick}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Terminer
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuestionnaire;
