import React from 'react';

interface MentionsLegalesProps {
  onBack: () => void;
}

const MentionsLegales: React.FC<MentionsLegalesProps> = ({ onBack }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Mentions légales</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Éditeur du site</h3>
        <p className="mb-2">
          Ce site d'évaluation ESG est édité dans le cadre d'une thèse professionnelle.
        </p>
        <p className="mb-2">
          <strong>Auteurs :</strong> Lucas LOIR et Vincent DIEVART
        </p>
        <p className="mb-2">
          <strong>Email de contact :</strong> lucas.loir@laposte.net / vincent.dievart.8@gmail.com
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Hébergement</h3>
        <p className="mb-2">
          <strong>Hébergeur :</strong> o2switch
        </p>
        <p className="mb-2">
          <strong>Adresse :</strong> CHE DES PARDIAUX 63000 CLERMONT FERRAND, France
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Propriété intellectuelle</h3>
        <p className="mb-2">
          L'ensemble du contenu de ce site (structure, textes, algorithmes, etc.) est protégé par le droit d'auteur.
          Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
        </p>
        <p className="mb-2">
          Le questionnaire est basé sur les exigences du module complet de la VSME créer par l'EFRAG (European Financial Reporting Advisory Group) 
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Limitation de responsabilité</h3>
        <p className="mb-2">
          Les informations contenues sur ce site sont fournies à titre indicatif uniquement. Les évaluations 
          générées par l'outil ne constituent pas des conseils professionnels et ne remplacent en aucun cas 
          l'analyse d'un expert en ESG.
        </p>
        <p className="mb-2">
          Les auteurs ne peuvent être tenus responsables de toute décision prise sur la base des évaluations 
          fournies par cet outil.
        </p>
      </section>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default MentionsLegales;