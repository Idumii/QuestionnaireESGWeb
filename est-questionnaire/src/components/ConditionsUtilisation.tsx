import React from 'react';

interface ConditionsUtilisationProps {
  onBack: () => void;
}

const ConditionsUtilisation: React.FC<ConditionsUtilisationProps> = ({ onBack }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full overflow-y-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Conditions d'utilisation</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Introduction</h3>
        <p className="mb-2">
          Bienvenue sur notre outil d'évaluation ESG. En accédant à ce site et en utilisant ses 
          fonctionnalités, vous acceptez les présentes conditions d'utilisation dans leur intégralité.
        </p>
        <p className="mb-2">
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Usage autorisé</h3>
        <p className="mb-2">
          Cet outil est mis à disposition pour permettre aux entreprises d'auto-évaluer leur performance ESG 
          selon les critères du référentiel VSME créé par l'EFRAG.
        </p>
        <p className="mb-2">
          Vous êtes autorisé à :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Compléter le questionnaire pour évaluer votre propre entreprise</li>
          <li>Télécharger et conserver les résultats de votre évaluation pour votre usage interne</li>
          <li>Partager vos résultats avec des tiers dans le cadre d'une démarche ESG</li>
        </ul>
        <p className="mb-2">
          Vous n'êtes pas autorisé à :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Copier, modifier ou distribuer le contenu du site sans autorisation préalable</li>
          <li>Utiliser le site d'une manière qui pourrait endommager, désactiver ou surcharger nos serveurs</li>
          <li>Tenter d'accéder à des zones restreintes du site</li>
          <li>Utiliser l'outil à des fins commerciales sans notre accord explicite</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Nature des résultats</h3>
        <p className="mb-2">
          L'évaluation ESG générée par notre outil est fournie à titre purement indicatif et informationnel. 
          Elle ne constitue en aucun cas :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Un conseil professionnel ou une consultation d'expert</li>
          <li>Une certification officielle ou une validation par un organisme accrédité</li>
          <li>Une garantie de conformité aux réglementations en vigueur</li>
        </ul>
        <p className="mb-2">
          La qualité des résultats dépend directement de l'exactitude et de l'exhaustivité des informations 
          que vous fournissez dans vos réponses au questionnaire.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Limitation de responsabilité</h3>
        <p className="mb-2">
          Nous nous efforçons de maintenir les informations de ce site à jour et exactes. Cependant :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>
            Nous ne garantissons pas l'exactitude, l'exhaustivité ou la pertinence des informations 
            fournies sur ce site pour un usage particulier
          </li>
          <li>
            Nous déclinons toute responsabilité concernant les décisions prises sur la base des 
            résultats fournis par cet outil
          </li>
          <li>
            Nous ne sommes pas responsables des conséquences directes ou indirectes pouvant résulter 
            de l'accès ou de l'utilisation de ce site
          </li>
        </ul>
        <p className="mb-2">
          En utilisant cet outil, vous reconnaissez que toute décision prise sur la base des résultats 
          obtenus relève de votre seule responsabilité.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Propriété intellectuelle</h3>
        <p className="mb-2">
          L'ensemble du contenu de ce site, incluant mais non limité aux textes, graphiques, logos, 
          algorithmes, structure et questionnaire, est protégé par le droit d'auteur et autres lois 
          sur la propriété intellectuelle.
        </p>
        <p className="mb-2">
          Le questionnaire est basé sur les exigences du module complet de la VSME créé par l'EFRAG, 
          adapté à des fins de recherche académique.
        </p>
        <p className="mb-2">
          Toute reproduction, distribution ou utilisation de ce contenu sans autorisation préalable 
          écrite est strictement interdite.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Modifications des conditions</h3>
        <p className="mb-2">
          Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
          Les modifications entrent en vigueur dès leur publication sur ce site.
        </p>
        <p className="mb-2">
          Il vous incombe de consulter régulièrement ces conditions pour vous tenir informé 
          des éventuelles modifications.
        </p>
        <p className="mb-2">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Loi applicable</h3>
        <p className="mb-2">
          Les présentes conditions d'utilisation sont régies et interprétées conformément au droit français.
        </p>
        <p className="mb-2">
          Tout litige découlant de ou lié à l'utilisation de ce site sera soumis à la compétence 
          exclusive des tribunaux français.
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

export default ConditionsUtilisation;