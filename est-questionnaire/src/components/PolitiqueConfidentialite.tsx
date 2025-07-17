import React from 'react';

interface PolitiqueConfidentialiteProps {
  onBack: () => void;
}

const PolitiqueConfidentialite: React.FC<PolitiqueConfidentialiteProps> = ({ onBack }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full overflow-y-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Politique de confidentialité</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Introduction</h3>
        <p className="mb-2">
          La présente politique de confidentialité décrit comment nous collectons, utilisons et protégeons 
          vos données personnelles lorsque vous utilisez notre outil d'évaluation ESG.
        </p>
        <p className="mb-2">
          Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) et à la 
          législation française en vigueur.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Données collectées</h3>
        <p className="mb-2">
          Lors de l'utilisation de notre outil d'évaluation ESG, nous collectons uniquement les données que 
          vous fournissez volontairement dans le cadre du questionnaire. Ces données incluent :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Les réponses aux questions sur les pratiques ESG de votre entreprise</li>
          <li>Les informations sur votre entreprise partagées dans vos réponses</li>
        </ul>
        <p className="mb-2">
          Nous ne collectons aucune donnée personnelle d'identification (nom, prénom, email) à moins que vous 
          ne choisissiez de nous contacter directement.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Utilisation des données</h3>
        <p className="mb-2">
          Les données collectées sont utilisées exclusivement pour :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Générer votre évaluation ESG personnalisée</li>
          <li>Améliorer notre outil d'évaluation</li>
          <li>Réaliser des analyses statistiques anonymisées dans le cadre de notre recherche académique</li>
        </ul>
        <p className="mb-2">
          Nous ne vendons, n'échangeons ni ne transférons vos données à des tiers.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Conservation des données</h3>
        <p className="mb-2">
          Vos réponses au questionnaire sont conservées pour deux finalités distinctes :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>
            <strong>Usage personnel :</strong> Vos données sont temporairement stockées dans votre navigateur (localStorage) 
            pour vous permettre de reprendre le questionnaire si vous quittez la page et y revenez ultérieurement.
          </li>
          <li>
            <strong>Recherche académique :</strong> Les réponses anonymisées sont également conservées dans une base de données 
            sécurisée afin de permettre l'analyse des tendances et pratiques ESG dans le cadre d'une thèse professionnelle.
            Aucune information permettant de vous identifier directement n'est associée à ces données.
          </li>
        </ul>
        <p className="mb-2">
          La période de conservation des données à des fins de recherche est limitée à la durée nécessaire à la réalisation 
          et à la publication de la thèse professionnelle, et pour une durée maximale de 2 ans.
        </p>
        <p className="mb-2">
          En utilisant cet outil d'évaluation, vous consentez à ce que vos réponses, sous forme anonymisée, soient utilisées 
          à des fins de recherche académique. Vous pouvez demander la suppression de vos données en nous contactant via 
          l'adresse email mentionnée dans la section "Vos droits".
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Cookies</h3>
        <p className="mb-2">
          Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement de l'outil. 
          Ces cookies ne collectent aucune information personnelle et sont utilisés pour maintenir votre 
          session active pendant que vous complétez le questionnaire.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Vos droits</h3>
        <p className="mb-2">
          Conformément au RGPD, vous disposez des droits suivants concernant vos données :
        </p>
        <ul className="list-disc pl-6 mb-2 space-y-1">
          <li>Droit d'accès aux données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (droit à l'oubli)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit d'opposition</li>
        </ul>
        <p className="mb-2">
          Pour exercer ces droits, veuillez nous contacter par email à : lucas.loir@laposte.net ou vincent.dievart.8@gmail.com
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Sécurité des données</h3>
        <p className="mb-2">
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
          vos données contre tout accès non autorisé, modification, divulgation ou destruction.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-medium text-green-600 mb-3">Modifications de la politique</h3>
        <p className="mb-2">
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
          Toute modification sera publiée sur cette page.
        </p>
        <p className="mb-2">
          Dernière mise à jour : {new Date().toLocaleDateString()}
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

export default PolitiqueConfidentialite;