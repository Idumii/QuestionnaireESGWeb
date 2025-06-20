import React from 'react';
import { ESGEvaluation } from '../../types';

interface ESGEvaluationDisplayProps {
  evaluationData: ESGEvaluation | null;
}

const BulletList: React.FC<{ title: string; items: string[] | undefined; icon: JSX.Element; itemClassName: string; titleClassName: string }> = ({ title, items, icon, itemClassName, titleClassName }) => {
  if (!items || items.length === 0) {
    return (
        <div className="mb-6">
            <h4 className={`text-lg font-semibold mb-2 flex items-center ${titleClassName}`}>
                {React.cloneElement(icon, { className: "w-6 h-6 mr-2"})}
                {title}
            </h4>
            <p className="text-sm italic text-slate-500">Aucun élément à afficher.</p>
        </div>
    );
  }
  return (
    <div className="mb-6">
      <h4 className={`text-lg font-semibold mb-2 flex items-center ${titleClassName}`}>
        {React.cloneElement(icon, { className: "w-6 h-6 mr-2"})}
        {title}
      </h4>
      <ul className="list-disc pl-5 space-y-1 text-slate-700">
        {items.map((item, index) => (
          <li key={index} className={`text-sm ${itemClassName}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ScoreCard: React.FC<{ title: string; score: number | undefined; icon: JSX.Element; bgColor: string; textColor: string }> = ({ title, score, icon, bgColor, textColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center ${bgColor}`}>
      <div className={`text-3xl mb-2 ${textColor}`}>
        {React.cloneElement(icon, { className: "w-10 h-10"})}
      </div>
      <h5 className={`text-md font-semibold mb-1 text-center ${textColor}`}>{title}</h5>
      {typeof score === 'number' ? (
        <p className={`text-2xl font-bold ${textColor}`}>{score} <span className="text-sm">/ 100</span></p>
      ) : (
        <p className={`text-sm italic ${textColor}`}>N/A</p>
      )}
    </div>
  );
};


const ESGEvaluationDisplay: React.FC<ESGEvaluationDisplayProps> = ({ evaluationData }) => {
  if (!evaluationData) {
    return (
        <div className="mt-8 p-6 text-center text-slate-500 bg-white rounded-xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-sky-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.172a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.832c.494 0 .984.156 1.396.438M7.875 1.562c.381.21.73.457 1.037.748M9.75 1.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10.5 3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
            <h3 className="text-xl font-semibold text-sky-600 mb-2">Aucune évaluation à afficher pour le moment.</h3>
            <p className="text-slate-600">Complétez le questionnaire pour générer votre évaluation ESG.</p>
        </div>
    );
  }

  const { overallAssessment, keyStrengths, areasForImprovement, E_score, S_score, G_score, overall_score, sectionScores } = evaluationData;

  const hasScores = typeof E_score === 'number' || typeof S_score === 'number' || typeof G_score === 'number' || typeof overall_score === 'number';

  return (
    <div className="space-y-8 p-4 md:p-6 bg-slate-100/50 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 border-b-2 border-sky-200 pb-4 text-center">
        Évaluation ESG Générée
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2 text-sky-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          Synthèse de l'Évaluation
        </h3>
        <p className="text-slate-700 leading-relaxed whitespace-pre-line text-justify">
          {overallAssessment || <span className="italic text-slate-400">Aucune évaluation globale fournie.</span>}
        </p>
      </div>

      {hasScores && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Scores ESG Détaillés
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ScoreCard 
              title="Score Environnemental (E)" 
              score={E_score}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>}
              bgColor="bg-green-50"
              textColor="text-green-700"
            />
            <ScoreCard 
              title="Score Social (S)" 
              score={S_score}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-1.5a3 3 0 0 0-3.741 1.5M15 11.673a5.977 5.977 0 0 1-4.5 0m4.5 0a4.238 4.238 0 0 0-4.5 0m4.5 0a3 3 0 0 0 3.741-1.5a3 3 0 0 0-3.741-1.5m0 0A5.977 5.977 0 0 1 10.5 10c0-1.603.621-3.073 1.64-4.157M12 6.343a1.5 1.5 0 0 1 0-2.686m0 2.686a1.5 1.5 0 0 0 0 2.686m-4.5-.482a1.5 1.5 0 1 0 0-2.686m0 2.686a1.5 1.5 0 1 1 0-2.686m0 0a1.5 1.5 0 0 1 2.686 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
              bgColor="bg-sky-50"
              textColor="text-sky-700"
            />
            <ScoreCard 
              title="Score Gouvernance (G)" 
              score={G_score}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12.75h6m-6 6h6M4.5 6.75h.75m13.5 0h.75M4.5 12.75h.75m13.5 0h.75m-15 6h.75m13.5 0h.75M9 3.75h6M9 18.75h6" /></svg>}
              bgColor="bg-amber-50"
              textColor="text-amber-700"
            />
            <ScoreCard 
              title="Score Global ESG" 
              score={overall_score}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.82.61l-4.725-2.885a.562.562 0 0 0-.652 0l-4.725 2.885a.562.562 0 0 1-.82-.61l1.285-5.385a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>}
              bgColor="bg-indigo-50"
              textColor="text-indigo-700"
            />
          </div>
        </div>
      )}


      {(keyStrengths && keyStrengths.length > 0) || (areasForImprovement && areasForImprovement.length > 0) ? (
        <div className="grid md:grid-cols-2 gap-6 mt-6 bg-white p-6 rounded-lg shadow-lg">
          <BulletList
            title="Points Forts Identifiés"
            items={keyStrengths}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
            itemClassName="text-green-700"
            titleClassName="text-green-600"
          />
          <BulletList
            title="Pistes d'Amélioration Suggérées"
            items={areasForImprovement}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>}
            itemClassName="text-amber-700"
            titleClassName="text-amber-600"
          />
        </div>
      ) : (
        <p className="text-sm italic text-slate-500 mt-6 p-4 bg-white rounded-lg shadow text-center">Aucun point fort spécifique ou piste d'amélioration n'a été détaillé dans cette évaluation.</p>
      )}
       <p className="text-xs text-slate-600 bg-sky-50 p-3 rounded-md border border-sky-200 shadow-sm mt-8">
        <strong>Note :</strong> Cette évaluation, y compris les scores, a été générée par une AI (Gemini) sur la base de vos réponses. Veuillez l'utiliser comme une première analyse et la compléter par une expertise humaine. L'exactitude et la pertinence dépendent de la qualité des informations fournies et des capacités du modèle.
      </p>

      {evaluationData.sectionScores && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Scores par section</h3>
          <ul className="space-y-2">
            {Object.entries(evaluationData.sectionScores).map(([sectionId, {score, max, percent}]) => (
              <li key={sectionId} className="flex justify-between">
                <span>Section {sectionId}</span>
                <span>{score} / {max} ({percent}%)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ESGEvaluationDisplay;