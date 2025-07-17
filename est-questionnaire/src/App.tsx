import React, { useState, useCallback, useEffect } from "react";
import InteractiveQuestionnaire from "./components/InteractiveQuestionnaire";
import ESGEvaluationDisplay from "./components/ESGReportDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { FLATTENED_QUESTIONS, QUESTIONNAIRE_STRUCTURE } from "./constants";
// Types locaux (à adapter selon ton projet)
import { UserAnswers, QuestionDefinition } from "./types";
import { jsPDF } from "jspdf";
import MentionsLegales from "./components/MentionsLegales";
import PolitiqueConfidentialite from "./components/PolitiqueConfidentialite";
import ConditionsUtilisation from "./components/ConditionsUtilisation";

interface ConditionalQuestion {
  dependsOn: string;
  value: string | string[];
}

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
  const [legalPage, setLegalPage] = useState<string | null>(null);

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
      nextIndex < FLATTENED_QUESTIONS.length &&
      FLATTENED_QUESTIONS[nextIndex].conditional
    ) {
      const condition = FLATTENED_QUESTIONS[nextIndex].conditional;
      const dependentAnswer = userAnswers[condition.dependsOn];

      // Vérifie si la réponse satisfait la condition
      let conditionMet = false;

      // Vérifie hasAnswer si défini
      if (condition.hasAnswer !== undefined) {
        const hasAnswer = Boolean(
          dependentAnswer && dependentAnswer.trim() !== ""
        );
        conditionMet = condition.hasAnswer === hasAnswer;
      }
      // Vérifie value si défini
      else if (condition.value !== undefined) {
        if (Array.isArray(condition.value)) {
          conditionMet = condition.value.includes(dependentAnswer);
        } else {
          conditionMet = dependentAnswer === condition.value;
        }
      }

      // Si la condition n'est pas remplie, passe à la question suivante
      if (!conditionMet) {
        nextIndex++;
      } else {
        // La condition est remplie, affiche cette question
        break;
      }
    }

    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, userAnswers]);

  const handlePreviousQuestion = useCallback(() => {
    let prevIndex = currentQuestionIndex - 1;
    while (prevIndex >= 0 && FLATTENED_QUESTIONS[prevIndex].conditional) {
      const condition = FLATTENED_QUESTIONS[prevIndex].conditional;
      const dependentAnswer = userAnswers[condition.dependsOn];

      // Vérifie si la réponse satisfait la condition
      let conditionMet = false;

      // Vérifie hasAnswer si défini
      if (condition.hasAnswer !== undefined) {
        const hasAnswer = Boolean(
          dependentAnswer && dependentAnswer.trim() !== ""
        );
        conditionMet = condition.hasAnswer === hasAnswer;
      }
      // Vérifie value si défini
      else if (condition.value !== undefined) {
        if (Array.isArray(condition.value)) {
          conditionMet = condition.value.includes(dependentAnswer);
        } else {
          conditionMet = dependentAnswer === condition.value;
        }
      }

      // Si la condition n'est pas remplie, continue à reculer
      if (!conditionMet) {
        prevIndex--;
      } else {
        // La condition est remplie, affiche cette question
        break;
      }
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

      // Calcul du score global basé sur TOUTES les questions possibles
      let totalScore = 0;
      let totalMax = 0;
      
      // Parcourir toutes les sections et additionner les scores
      Object.values(sectionScores).forEach(({ score, max, totalPossibleMax }) => {
        totalScore += score;
        // Utiliser le maximum possible au lieu du maximum actif
        totalMax += totalPossibleMax || max; // Utilise totalPossibleMax s'il existe, sinon max
      });

      // Arrondir à 1 décimale
      totalScore = Math.round(totalScore * 10) / 10;
      totalMax = Math.round(totalMax * 10) / 10;

      const overallScore = totalMax > 0 
        ? Math.round((totalScore / totalMax) * 1000) / 10 
        : 0;

      // Message dynamique selon le score
      const scoreMessage =
        overallScore >= 70
          ? "Félicitations ! Votre entreprise présente un excellent niveau de maturité ESG."
          : overallScore >= 50
          ? "Votre entreprise est sur la bonne voie en matière d'ESG, avec quelques axes d'amélioration."
          : "Votre entreprise a plusieurs opportunités d'amélioration en matière d'ESG.";

      setEsgEvaluation({
        message: `Évaluation terminée. ${scoreMessage} Voici vos résultats détaillés par section. Cette évaluation est à titre indicatif uniquement et n'est qu'un point d'entrée pour une réflexion plus approfondie sur les pratiques ESG de votre entreprise. Pour une évaluation complète et personnalisée, il est recommandé de consulter un expert en durabilité ou en ESG.`,
        sectionScores,
        overallScore,
      });

      setAppPhase("evaluation");

      // AJOUT : téléchargement automatique du CSV après un court délai
      setTimeout(() => {
        downloadCSVForResearch();
      }, 500);
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

  // Fonction de calcul des scores de section modifiée

  const calculateSectionScores = (answers: UserAnswers) => {
    const sectionScores: Record<string, { 
      score: number; 
      max: number; 
      percent: number;
      totalPossibleMax: number; // Maximum possible si toutes les questions étaient applicables
    }> = {};
    
    QUESTIONNAIRE_STRUCTURE.forEach(section => {
      let sectionScore = 0;
      let maxScore = 0;
      let totalPossibleMax = 0; // Nouveau compteur pour le maximum possible
      let questionsInSection = 0;
      
      section.questions.forEach(question => {
        // Calcul du maximum possible pour toutes les questions, qu'elles soient applicables ou non
        if (question.scoreMap) {
          totalPossibleMax += Math.max(...Object.values(question.scoreMap));
        } else if (question.scoreIfAnswered) {
          totalPossibleMax += question.scoreIfAnswered;
        }
        
        // Logique existante pour le score actuel
        let shouldInclude = true;
        if (question.conditional) {
          const dependentAnswer = answers[question.conditional.dependsOn];
          
          if (question.conditional.hasAnswer !== undefined) {
            const hasAnswer = Boolean(dependentAnswer && dependentAnswer.trim() !== "");
            shouldInclude = question.conditional.hasAnswer === hasAnswer;
          } else if (question.conditional.value !== undefined) {
            if (Array.isArray(question.conditional.value)) {
              shouldInclude = question.conditional.value.includes(dependentAnswer);
            } else {
              shouldInclude = dependentAnswer === question.conditional.value;
            }
          }
        }
        
        if (shouldInclude) {
          questionsInSection++;
          if (question.scoreMap && answers[question.code]) {
            sectionScore += question.scoreMap[answers[question.code]] || 0;
            maxScore += Math.max(...Object.values(question.scoreMap));
          } else if (question.scoreIfAnswered) {
            const hasAnswer = Boolean(answers[question.code] && answers[question.code].trim() !== "");
            sectionScore += hasAnswer ? question.scoreIfAnswered : 0;
            maxScore += question.scoreIfAnswered;
          }
        }
      });
      
      // Arrondir à 1 chiffre après la virgule
      sectionScore = Math.round(sectionScore * 10) / 10;
      maxScore = Math.round(maxScore * 10) / 10;
      totalPossibleMax = Math.round(totalPossibleMax * 10) / 10;
      
      // Calculer le pourcentage basé sur les questions actuellement applicables
      // Sinon, si la section n'a pas de questions applicables, utiliser N/A ou 0
      let percent = 0;
      if (maxScore > 0) {
        percent = Math.round((sectionScore / maxScore) * 1000) / 10;
      } else if (questionsInSection === 0) {
        // Aucune question applicable dans cette section
        maxScore = 0;
        sectionScore = 0;
        percent = 0;
      }
      
      sectionScores[section.id] = {
        score: sectionScore,
        max: maxScore,
        percent,
        totalPossibleMax
      };
    });
    
    return sectionScores;
  };

  // Fonction pour générer et télécharger le PDF
  const exportToPDF = () => {
    // Création d'un nouveau document PDF A4
    const doc = new jsPDF();

    // Titre du document
    doc.setFontSize(18);
    doc.text("Résultat de votre évaluation ESG", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);

    let yPosition = 40;

    // Ajoute le score global
    if (esgEvaluation?.overallScore !== undefined) {
      doc.setFontSize(14);
      doc.text(`Score global: ${esgEvaluation.overallScore}%`, 20, yPosition);
      yPosition += 10;
    }

    // Parcours chaque section du questionnaire
    QUESTIONNAIRE_STRUCTURE.forEach((section, sectionIndex) => {
      // Éviter le débordement de page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      // Titre de section
      doc.setFontSize(14);
      doc.text(section.title, 20, yPosition);
      yPosition += 8;

      // Score de section
      if (
        esgEvaluation?.sectionScores &&
        esgEvaluation.sectionScores[section.id]
      ) {
        const sectionScore = esgEvaluation.sectionScores[section.id];
        doc.setFontSize(12);
        doc.text(
          `Score: ${sectionScore.percent}% (${sectionScore.score}/${sectionScore.max})`,
          25,
          yPosition
        );
        yPosition += 8;
      }

      // Questions et réponses
      section.questions.forEach((question) => {
        // Éviter le débordement de page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        // Vérifie si c'est une question conditionnelle à afficher
        let shouldDisplay = true;
        if (question.conditional) {
          const dependentAnswer = userAnswers[question.conditional.dependsOn];

          if (question.conditional.hasAnswer !== undefined) {
            const hasAnswer = Boolean(
              dependentAnswer && dependentAnswer.trim() !== ""
            );
            shouldDisplay = question.conditional.hasAnswer === hasAnswer;
          } else if (question.conditional.value !== undefined) {
            if (Array.isArray(question.conditional.value)) {
              shouldDisplay =
                question.conditional.value.includes(dependentAnswer);
            } else {
              shouldDisplay = dependentAnswer === question.conditional.value;
            }
          }
        }

        if (shouldDisplay) {
          // Question
          doc.setFontSize(11);
          doc.setFont(undefined, "bold");
          // Gère le texte long en le coupant en lignes
          const splitQuestion = doc.splitTextToSize(
            question.code + ": " + question.text,
            170
          );
          doc.text(splitQuestion, 25, yPosition);
          yPosition += splitQuestion.length * 6;

          // Réponse
          doc.setFont(undefined, "normal");
          const answer = userAnswers[question.code] || "Non répondu";
          const splitAnswer = doc.splitTextToSize(answer, 160);
          doc.text(splitAnswer, 30, yPosition);
          yPosition += splitAnswer.length * 6 + 4;
        }
      });

      yPosition += 10; // Espace entre les sections
    });

    // Sauvegarde du PDF
    doc.save("evaluation-esg.pdf");
  };

  // Fonction pour générer un CSV à partir des réponses au questionnaire
  const generateCSV = () => {
    // En-têtes du CSV
    let csvContent = "Code Question,Question,Réponse\n";

    // Parcourir toutes les questions du questionnaire
    FLATTENED_QUESTIONS.forEach((question) => {
      const answer = userAnswers[question.code] || "";

      // Échapper les guillemets et les virgules dans les champs
      const escapedQuestion = question.text.replace(/"/g, '""');
      const escapedAnswer = answer.toString().replace(/"/g, '""');

      // Ajouter une ligne au CSV
      csvContent += `"${question.code}","${escapedQuestion}","${escapedAnswer}"\n`;
    });

    // Ajouter les métadonnées
    csvContent += "\nMétadonnées\n";
    csvContent += `"Date de complétion","${new Date().toISOString()}"\n`;

    if (esgEvaluation?.overallScore) {
      csvContent += `"Score global","${esgEvaluation.overallScore}"\n`;
    }

    if (esgEvaluation?.sectionScores) {
      csvContent += "\nScores par section\n";
      Object.entries(esgEvaluation.sectionScores).forEach(([sectionId, score]) => {
        const section = QUESTIONNAIRE_STRUCTURE.find((s) => s.id === sectionId);
        if (section) {
          csvContent += `"${section.title}","${score.percent}%"\n`;
        }
      });
    }

    return csvContent;
  };

  // Fonction pour télécharger automatiquement le CSV pour la recherche
  const downloadCSVForResearch = () => {
    const csvContent = generateCSV();
    
    // Ajouter un identifiant unique basé sur la date/heure
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Créer un Blob avec le contenu CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Créer un lien de téléchargement et le déclencher automatiquement
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `esg-data-${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Nettoyer
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {legalPage === "mentions" && (
        <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <MentionsLegales onBack={() => setLegalPage(null)} />
          </div>
        </div>
      )}
      
      {legalPage === "confidentialite" && (
        <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">  {/* Ajout des classes px-4, etc. */}
          <div className="max-w-3xl mx-auto">
            <PolitiqueConfidentialite onBack={() => setLegalPage(null)} />
          </div>
        </div>
      )}
      
      {legalPage === "conditions" && (
        <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ConditionsUtilisation onBack={() => setLegalPage(null)} />
          </div>
        </div>
      )}

      {!legalPage && (
        <div className="py-8 px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">
              Outil d'évaluation de la performance ESG
            </h1>
            {appPhase === "welcome" && (
              <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto text-left">
                <br />Ce questionnaire est basé sur les exigences du{" "}
                <strong>module complet de la
                VSME</strong> (référentiel volontaire pour une démarche de durabilité dans
                les PME). <br />
                Cet outil d'évaluation à été{" "}
                <strong>réalisé dans le cadre de la rédaction d'une thèse professionnel</strong> qui aborde le sujet de la performance de durabilité des PME.{" "}
                
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

          <main className="max-w-3xl w-full mx-auto flex-grow flex flex-col justify-center">
            {appPhase === "welcome" && (
              <div className="bg-white p-8 rounded-xl shadow-lg h-[400px] overflow-auto flex flex-col">
                <div>
                  <h2 className="text-2xl font-semibold text-green-600 mb-6">
                    Découvrez maintenant votre notation ESG
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Cliquez sur le bouton ci-dessous pour démarrer le questionnaire.
                    Sur la base de vos réponses, une évaluation ESG qualitative sera
                    générée. Il est important de{" "}
                    <strong>répondre précisément aux questions</strong> pour avoir une notation optimale. Par ailleurs,{" "}
                    <strong>une bonne connaissance stratégique de votre entreprise est requise</strong>.
                  </p>
                </div>
                <div className="flex-grow flex items-end justify-center">
                  <button
                    onClick={handleStartQuestionnaire}
                    className="w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Commencer le questionnaire
                  </button>
                </div>
              </div>
            )}

            {appPhase === "questionnaire" && currentQuestion && (
              <div className="bg-white rounded-xl shadow-lg h-[700px] flex flex-col">
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
                  userAnswers={userAnswers}
                />
              </div>
            )}

            {(appPhase === "generating" ||
              appPhase === "evaluation" ||
              appPhase === "error") && (
              <div className="bg-white p-6 rounded-xl shadow-lg h-[700px] overflow-auto">
                {appPhase === "generating" && <LoadingSpinner />}
                <ErrorMessage message={error || ""} />
                {appPhase === "evaluation" && esgEvaluation && (
                  <ESGEvaluationDisplay
                    evaluation={esgEvaluation}
                    onEditAnswers={handleEditAnswers}
                    onRestart={handleRestart}
                    onExportPDF={exportToPDF}
                  />
                )}
                {appPhase === "error" && (
                  <div className="mt-8 p-6 text-center">
                    <button
                      onClick={handleEditAnswers}
                      className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      Retourner au questionnaire
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
      {/* Footer avec fond vert explicite */}
      <footer className="w-full bg-green-50 py-4 mt-auto border-t border-green-100">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>© 2025 Questionnaire ESG réalisé par Lucas LOIR et Vincent DIEVART.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <button 
              onClick={() => setLegalPage('mentions')} 
              className="hover:underline text-slate-500"
            >
              Mentions légales
            </button>
            <button 
              onClick={() => setLegalPage('confidentialite')}
              className="hover:underline text-slate-500"
            >
              Politique de confidentialité
            </button>
            <button 
              onClick={() => setLegalPage('conditions')}
              className="hover:underline text-slate-500"
            >
              Conditions d'utilisation
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
