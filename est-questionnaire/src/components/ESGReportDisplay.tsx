import React from "react";
import { QUESTIONNAIRE_STRUCTURE } from "../constants";

// Ajoute les types pour les scores
interface SectionScore {
  score: number;
  max: number;
  percent: number;
}

interface ESGEvaluationDisplayProps {
  evaluation: {
    message: string;
    sectionScores?: Record<string, SectionScore>;
    overallScore?: number;
  };
  onEditAnswers: () => void;
  onRestart: () => void;
  onExportPDF: () => void;  // Ajoute cette propriété
}

const ESGReportDisplay: React.FC<ESGEvaluationDisplayProps> = ({
  evaluation,
  onEditAnswers,
  onRestart,
  onExportPDF,  // Ajoute ce paramètre
}) => {
  // Vérification que evaluation existe
  if (!evaluation) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Chargement de l'évaluation...
        </h2>
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }
  
  // Fonction pour obtenir le nom complet d'une section à partir de son ID
  const getSectionTitle = (sectionId: string) => {
    const section = QUESTIONNAIRE_STRUCTURE.find(s => s.id === sectionId);
    return section ? section.title : sectionId;
  };

  // Fonction pour obtenir la classe de couleur en fonction du pourcentage
  const getScoreColorClass = (percent: number) => {
    if (percent >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (percent >= 60) return "bg-lime-100 text-lime-800 border-lime-200";
    if (percent >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (percent >= 20) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto p-6">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold mb-3">
            Évaluation ESG
          </h2>
          
          {/* Score global déplacé ici */}
          {evaluation.overallScore !== undefined && (
            <div className={`w-full max-w-md mb-4 p-4 rounded-lg border ${getScoreColorClass(evaluation.overallScore)} text-center`}>
              <h3 className="text-lg font-semibold mb-1">Score global</h3>
              <div className="text-3xl font-bold">{evaluation.overallScore}%</div>
            </div>
          )}
        </div>
        
        <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-slate-700">{evaluation.message}</p>
        </div>

        {/* Scores par section */}
        {evaluation.sectionScores && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">
              Scores par section
            </h3>
            
            <div className="space-y-4">
              {Object.entries(evaluation.sectionScores).map(([sectionId, { score, max, percent }]) => (
                <div 
                  key={sectionId}
                  className={`p-4 rounded-lg border ${max > 0 ? getScoreColorClass(percent) : 'bg-gray-50 border-gray-200'} flex justify-between items-center`}
                >
                  <div>
                    <h4 className="font-medium">{getSectionTitle(sectionId)}</h4>
                    <p className="text-sm mt-1 opacity-80">
                      {max === 0 
                        ? "Section non applicable" 
                        : `${score} point${score !== 1 ? "s" : ""} sur ${max} possible${max !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <div className="text-xl font-bold">
                    {max === 0 ? "N/A" : `${percent}%`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Supprime l'ancien emplacement du score global */}

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          <button
            onClick={onEditAnswers}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Modifier mes réponses
          </button>
          <button
            onClick={onExportPDF}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Télécharger en PDF
          </button>
          <button
            onClick={onRestart}
            className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Recommencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESGReportDisplay;