import React, { useState, useEffect } from "react";
import { QuestionDefinition, UserAnswers } from "../types";

interface InteractiveQuestionnaireProps {
  question: QuestionDefinition;
  totalQuestions: number;
  currentQuestionNumber: number;
  answer: string;
  onAnswerChange: (questionCode: string, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  // Ajout pour gérer les conditionnelles :
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
  if (
    question.conditional &&
    userAnswers[question.conditional.dependsOn] !== question.conditional.value
  ) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setCurrentAnswer(e.target.value);
    onAnswerChange(question.code, e.target.value);
  };

  const handleNextClick = () => {
    onAnswerChange(question.code, currentAnswer);
    onNext();
  };

  const handlePreviousClick = () => {
    onAnswerChange(question.code, currentAnswer);
    onPrevious();
  };

  const handleCompleteClick = () => {
    onAnswerChange(question.code, currentAnswer);
    onComplete();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="mb-4 text-slate-700 font-semibold">
        Question {currentQuestionNumber} / {totalQuestions}
      </div>
      <div className="mb-2 text-slate-500 text-sm font-mono">
        {question.code}
      </div>
      <div className="mb-6 text-lg font-medium">{question.text}</div>

      {/* Affichage selon le type de question */}
      {(!question.type || question.type === "text") && (
        <textarea
          className="w-full border rounded-md p-2"
          value={currentAnswer}
          onChange={handleChange}
          rows={4}
        />
      )}

      {(question.type === "radio" || question.type === "options") &&
        question.options && (
          <div className="flex flex-col gap-2">
            {question.options.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={question.code}
                  value={opt}
                  checked={currentAnswer === opt}
                  onChange={handleChange}
                />
                {opt}
              </label>
            ))}
          </div>
        )}

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        {!isFirstQuestion && (
          <button
            onClick={handlePreviousClick}
            className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300"
          >
            Précédent
          </button>
        )}
        {!isLastQuestion ? (
          <button
            onClick={handleNextClick}
            className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700"
          >
            Suivant
          </button>
        ) : (
          <button
            onClick={handleCompleteClick}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Terminer
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuestionnaire;
