import { QuestionnaireSection, QuestionDefinition } from "./types";

export const ESG_GENERATE_EVALUATION_PROMPT_TEMPLATE = `
Vous êtes un analyste ESG expérimenté. L'utilisateur a fourni des réponses à un questionnaire ESG.
Votre tâche est d'analyser ces réponses et de fournir une évaluation globale de la maturité ESG de l'entreprise, incluant des scores quantitatifs.

CONTEXTE DU QUESTIONNAIRE (pour votre information, ne pas inclure dans la sortie JSON) :
---
{{QUESTIONNAIRE_CONTEXT}}
---

RÉPONSES DE L'UTILISATEUR (au format JSON, où la clé est le code de la question et la valeur est la réponse textuelle de l'utilisateur) :
---
{{USER_ANSWERS_JSON}}
---

Sur la base des réponses fournies, générez une évaluation ESG au format JSON. L'objet JSON doit contenir les clés suivantes :
- "overallAssessment": (chaîne de caractères) Une synthèse qualitative de 3-5 phrases décrivant le profil ESG de l'entreprise tel qu'il ressort des réponses. Mettez en évidence les aspects notables, qu'ils soient positifs, négatifs, ou des domaines où l'information est manquante mais cruciale.
- "keyStrengths": (tableau de chaînes de caractères, optionnel) Une liste de 2-4 points forts principaux clairement identifiables à partir des réponses. Si aucun point fort distinct n'est évident, omettez cette clé ou fournissez un tableau vide.
- "areasForImprovement": (tableau de chaînes de caractères, optionnel) Une liste de 2-4 principaux domaines d'amélioration suggérés, basés sur les réponses ou les omissions notables. Si aucun domaine d'amélioration spécifiques n'est évident, omettez cette clé ou fournissez un tableau vide.
- "E_score": (nombre, 0-100) Un score quantitatif pour l'aspect Environnemental, basé sur l'analyse qualitative des réponses pertinentes.
- "S_score": (nombre, 0-100) Un score quantitatif pour l'aspect Social, basé sur l'analyse qualitative des réponses pertinentes.
- "G_score": (nombre, 0-100) Un score quantitatif pour l'aspect Gouvernance, basé sur l'analyse qualitative des réponses pertinentes.
- "overall_score": (nombre, 0-100) Un score ESG global, reflétant la maturité globale de l'entreprise telle qu'évaluée qualitativement. Ce score peut être une moyenne pondérée ou une évaluation holistique des scores E, S et G et de l'appréciation générale.

Soyez objectif et basez votre évaluation uniquement sur les informations fournies. Si les réponses sont globalement insuffisantes pour une évaluation significative, indiquez-le clairement dans "overallAssessment" et attribuez des scores bas en conséquence.
Ne générez pas de scores numériques en dehors des champs E_score, S_score, G_score, et overall_score. L'évaluation principale reste qualitative.

Format de sortie JSON attendu (exemple) :
{
  "overallAssessment": "L'entreprise X semble avoir initié une démarche ESG, notamment avec [aspect positif identifié]. Cependant, des informations cruciales manquent concernant [domaine manquant], et des efforts supplémentaires sont nécessaires pour [domaine à améliorer]. Globalement, la maturité ESG est émergente.",
  "keyStrengths": ["Engagement initial sur la réduction des déchets", "Politique de diversité et inclusion en place"],
  "areasForImprovement": ["Définition d'objectifs chiffrés pour la réduction des GES", "Formalisation d'un plan de transition climatique détaillé", "Publication d'informations sur la diversité au niveau de la direction"],
  "E_score": 60,
  "S_score": 75,
  "G_score": 50,
  "overall_score": 62
}

Assurez-vous que la sortie est un JSON valide.
`;

export const QUESTIONNAIRE_STRUCTURE: QuestionnaireSection[] = [
  {
    id: "C1",
    title: "Section C1 – Stratégie : business model et durabilité",
    questions: [
      {
        code: "C1-01",
        text: "Quel(s) groupe(s) important(s) de produits et/ou de services votre entreprise propose-t-elle ?",
        scoreIfAnswered: 1,
      },
      {
        code: "C1-02",
        text: "Sur quels marchés (secteurs d’activité et zones géographiques) votre entreprise opère-t-elle principalement ?",
        scoreIfAnswered: 1,
      },
      {
        code: "C1-03",
        text: "Quelles sont les principales relations commerciales de votre entreprise (clients, partenaires, distributeurs) ?",
        scoreIfAnswered: 1,
      },
      {
        code: "C1-04",
        text: "Combien de fournisseurs estimez-vous avoir, et quels sont leurs secteurs d’activité et zones géographiques ?, veuillez préciser si vous n'avez pas de fournisseur",
        scoreIfAnswered: 1,
      },
      {
        code: "C1-05",
        text: "Quels sont les éléments clés de votre stratégie d’entreprise relatifs à la durabilité ?, veuillez laisser vide si nous n'avez pas d'éléments clés",
        scoreIfAnswered: 1,
      },
    ],
  },
  {
    id: "C2",
    title:
      "Section C2 – Pratiques, politiques et initiatives pour la transition",
    questions: [
      {
        code: "C2-01",
        text: "Quelles pratiques, politiques ou initiatives (existantes ou à venir) avez-vous mises en place concernant la durabilité ? (préciser si fournisseur/client), sinon, laissez vide",
        scoreIfAnswered: 1,
      },
      {
        code: "C2-02",
        text: "Quels sont vos objectifs chiffrés en matière de durabilité ?, laissez vide si vous n'avez pas d'objectifs chiffrés",
        scoreIfAnswered: 1,
      },
      {
        code: "C2-03",
        text: "Quel est le niveau le plus élevé au sein de votre entreprise responsable de la mise en œuvre de ces pratiques, politiques, objectifs ou initiatives ? Si aucune personne n'est dédiée à la tâche, laissez vide",
        scoreIfAnswered: 1,
      },
    ],
  },
  {
    id: "C3",
    title:
      "Section C3 – Réduction des émissions de GES et transition climatique",
    questions: [
      {
        code: "C3-01",
        text: "Quelles sont les années cibles fixées pour vos objectifs de réduction des émissions de GES ?",
        type: "options",
        options: ["2025 - 2030", "2030 - 2050", "2050"],
        scoreMap: {
          "2025 - 2030": 1,
          "2030 - 2050": 1,
          "2050": 1,
        },
      },
      {
        code: "C3-02",
        text: "Quels sont les pourcentages de réduction visés de vos émissions de GES pour les années mentionnées  ?",
        type: "options",
        options: ["<10%", "10 - 30%", "30 - 40%", "40 - 80%", ">80%"],
        scoreMap: {
          "<10%": 0.2,
          "10 - 30%": 0.4,
          "30 - 40%": 0.6,
          "40 - 80%": 0.8,
          ">80%": 1,
        },
      },
      {
        code: "C3-03",
        text: "Quelles années de base avez-vous choisies pour mesurer votre progression ?",
        type: "options",
        options: ["dès 2025", "dès 2030", "> 2040"],
        scoreMap: {
          "dès 2025": 1,
          "dès 2030": 0.7,
          "> 2040": 0.4,
        },
      },
      {
        code: "C3-04",
        text: "Quelles sont les valeurs (en tCo2e) des émissions GES pour ces années de base ?",
        scoreIfAnswered: 1,
      },
      {
        code: "C3-05",
        text: "Quelles unités utilisez-vous pour exprimer vos cibles GES ?",
        type: "options",
        options: [
          "en % de réduction",
          "tCo2e",
          "tCo2e/unité",
          "kgCO₂e/€ ",
          "Aucune des ces unités",
        ],
        scoreMap: {
          "en % de réduction": 1,
          tCo2e: 0.8,
          "tCo2e/unité": 0.7,
          "kgCO₂e/€ ": 0.5,
          "Aucune des ces unités": 0,
        },
      },
      {
        code: "C3-06",
        text: "Quelle part de votre périmètre d’activité est concernée par ces cibles ? (Scope 1, 1+2, Scope 3…)",
        type: "options",
        options: ["Scope 1", "Scope 1 + 2", "Scope 1 + 2 + 3", "Aucune"],
        scoreMap: {
          "Scope 1": 0.5,
          "Scope 1 + 2": 0.7,
          "Scope 1 + 2 + 3": 1,
          Aucune: 0,
        },
      },
      {
        code: "C3-07",
        text: "Quelles sont les principales actions prévues pour atteindre ces objectifs ?, citez les grands axes",
        scoreIfAnswered: 1,
      },
      {
        code: "C3-08",
        text: "Décrivez votre plan de transition pour l’atténuation du changement climatique.",
        scoreIfAnswered: 1,
      },
      {
        code: "C3-09",
        text: "Avez-vous adopté un plan de transition climatique ? Si oui, quand ? Sinon, laissez vide",
        scoreIfAnswered: 1,
      },
    ],
  },
  {
    id: "C4",
    title: "Section C4 – Risques climatiques",
    questions: [
      {
        code: "C4-01",
        text: "Quels sont les risques climatiques physiques et de transition identifiés pour votre entreprise ? Sinon, laissez vide",
        scoreIfAnswered: 1,
      },
      {
        code: "C4-02",
        text: "Comment avez-vous évalué l’exposition et la sensibilité de vos actifs, activités et chaîne de valeur face à ces risques ? Si aucune évaluation, laissez vide",
        scoreIfAnswered: 1,
      },
      {
        code: "C4-03",
        text: "Quels horizons temporels utilisez-vous pour ces évaluations ?",
        conditional: {
          dependsOn: "C4-02",
          hasAnswer: true,
        },
      },
      {
        code: "C4-04",
        text: "Avez-vous mis en place des mesures d’adaptation au climat ?",
        type: "options",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C4-05",
        text: "Quels sont les effets négatifs potentiels de ces risques climatiques sur votre performance financière (perte de marchés etc.) ?",
        scoreIfAnswered: 1,
      },
    ],
  },
  {
    id: "C5",
    title: "Section C5 – Main d’œuvre (général)",
    questions: [
      {
        code: "C5-01",
        text: "Quel est le ratio femmes-hommes au niveau de la direction pour la période de référence ?",
        type: "options",
        options: ["0%", "40 - 60%", "> 60%"],
        scoreMap: {
          "0%": 0,
          "40 - 60%": 1,
          "> 60%": 0.5,
        },
      },
      {
        code: "C5-02",
        text: "Combien de travailleurs indépendants sans personnel travaillent exclusivement pour l’entreprise ?",
        type: "options",
        options: ["0", "1 - 3", "> 3"],
        scoreMap: {
          "0": 1,
          "1 - 3": 0.5,
          "> 3": 0,
        },
      },
      {
        code: "C5-03",
        text: "Combien de travailleurs temporaires sont fournis par des entreprises d’intérim ?",
        type: "options",
        options: ["< 10", "10 - 20", "> 20"],
        scoreMap: {
          "< 10": 1,
          "10 - 20": 0.5,
          "> 20": 0,
        },
      },
    ],
  },
  {
    id: "C6",
    title: "Section C6 – Code de conduite / droits humains",
    questions: [
      {
        code: "C6-01",
        text: "Disposez-vous d’un code de conduite ou d’une politique des droits de l’homme pour votre personnel ?",
        type: "options",
        options: ["Oui", "Non", "En cours de développement"],
        scoreMap: {
          Oui: 1,
          Non: 0,
          "En cours de développement": 0.5,
        },
      },
      {
        code: "C6-02",
        text: "Couvre-t-il le travail des enfants ?",
        type: "options",
        options: ["Oui", "Non"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C6-03",
        text: "Couvre-t-il le travail forcé ?",
        type: "options",
        options: ["Oui", "Non"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C6-04",
        text: "Couvre-t-il la traite des êtres humains ?",
        type: "options",
        options: ["Oui", "Non"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C6-05",
        text: "Couvre-t-il la discrimination ?",
        type: "options",
        options: ["Oui", "Non"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C6-06",
        text: "Couvre-t-il la prévention des accidents ?",
        type: "options",
        options: ["Oui", "Non"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C6-07",
        text: "Couvre-t-il d’autres sujets ?",
        type: "options",
        options: ["Oui", "Non", "Non concerné"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
      {
        code: "C6-07-01",
        text: "Merci de préciser les autres sujets couverts.",
        type: "text",
        conditional: {
          dependsOn: "C6-07",
          value: "Oui",
        },
      },
      {
        code: "C6-09",
        text: "Disposez-vous d’un mécanisme de traitement des plaintes ou d’un dispositif d’alerte pour votre personnel ?",
        type: "options",
        options: ["Oui", "Non"],
        conditional: {
          dependsOn: "C6-01",
          value: ["Oui", "En cours de développement"],
        },
        scoreMap: {
          Oui: 1,
          Non: 0,
        },
      },
    ],
  },
  {
    id: "C7",
    title: "Section C7 – Incidents graves (droits humains)",
    questions: [
      {
        code: "C7-01",
        text: "Avez-vous constaté des incidents confirmés concernant le travail des enfants ?",
        type: "radio",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 0,
          Non: 1,
        },
      },
      {
        code: "C7-02",
        text: "Avez-vous constaté des incidents confirmés concernant le travail forcé ?",
        type: "radio",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 0,
          Non: 1,
        },
      },
      {
        code: "C7-03",
        text: "Avez-vous constaté des incidents confirmés concernant la traite des êtres humains ?",
        type: "radio",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 0,
          Non: 1,
        },
      },
      {
        code: "C7-04",
        text: "Avez-vous constaté des incidents confirmés concernant la discrimination ?",
        type: "radio",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 0,
          Non: 1,
        },
      },
      {
        code: "C7-05",
        text: "Avez-vous constaté d'autres incidents confirmés ?",
        type: "radio",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 0,
          Non: 1,
        },
      },
      {
        code: "C7-05-01",
        text: "Pour les autres incidents, détaillez les sujets.",
        type: "text",
        conditional: {
          dependsOn: "C7-05",
          value: "Oui",
        },
      },
      {
        code: "C7-05-02",
        text: "Décrivez les mesures prises pour remédier à ces incidents.",
        type: "text",
        conditional: {
          dependsOn: "C7-05",
          value: "Oui",
        },
      },
      {
        code: "C7-08",
        text: "Avez-vous connaissance d’incidents impliquant la chaîne de valeur, des communautés, des consommateurs ?",
        type: "radio",
        options: ["Oui", "Non"],
        scoreMap: {
          Oui: 0,
          Non: 1,
        },
      },
      {
        code: "C7-08-01",
        text: "Précisez ces incidents.",
        type: "text",
        conditional: {
          dependsOn: "C7-08",
          value: "Oui",
        },
      },
    ],
  },
  {
    id: "C8",
    title: "Section C8 – Revenus secteurs controversés",
    questions: [
      {
        code: "C8-01",
        text: "Quel pourcentage du chiffre d’affaires provient des armes controversées ?",
        type: "radio",
        options: ["0%", "<1%", "1-5%", "5-10%", "10-25%", ">25%"],
        scoreMap: {
          "0%": 1,
          "<1%": 0.8,
          "1-5%": 0.6,
          "5-10%": 0.4,
          "10-25%": 0.2,
          ">25%": 0,
        },
      },
      {
        code: "C8-02",
        text: "Quel pourcentage du chiffre d’affaires provient du tabac ?",
        type: "radio",
        options: ["0%", "<1%", "1-5%", "5-10%", "10-25%", ">25%"],
        scoreMap: {
          "0%": 1,
          "<1%": 0.8,
          "1-5%": 0.6,
          "5-10%": 0.4,
          "10-25%": 0.2,
          ">25%": 0,
        },
      },
      {
        code: "C8-03",
        text: "Quel pourcentage du chiffre d’affaires provient des combustibles fossiles ?",
        type: "radio",
        options: ["0%", "<1%", "1-5%", "5-10%", "10-25%", ">25%"],
        scoreMap: {
          "0%": 1,
          "<1%": 0.8,
          "1-5%": 0.6,
          "5-10%": 0.4,
          "10-25%": 0.2,
          ">25%": 0,
        },
      },
      {
        code: "C8-04",
        text: "Quel pourcentage du chiffre d’affaires provient des produits chimiques controversés ?",
        type: "radio",
        options: ["0%", "<1%", "1-5%", "5-10%", "10-25%", ">25%"],
        scoreMap: {
          "0%": 1,
          "<1%": 0.8,
          "1-5%": 0.6,
          "5-10%": 0.4,
          "10-25%": 0.2,
          ">25%": 0,
        },
      },
      {
        code: "C8-05",
        text: "Êtes-vous exclu des indices de référence UE alignés sur Paris ?",
        type: "radio",
        options: [
          "Oui",
          "Non, mais je m'efforce de m'aligner avec les indices de référence.",
          "Je suis concerné, mais ne m'efforce pas de m'aligner avec les indices de référence.",
        ],
        scoreMap: {
          Oui: 1,
          "Non, mais je m'efforce de m'aligner avec les indices de référence.": 0.5,
          "Je suis concerné, mais ne m'efforce pas de m'aligné avec les indices de référence.": 0,
        },
      },
    ],
  },
  {
    id: "C9",
    title: "Section C9 – Diversité gouvernance",
    questions: [
      {
        code: "C9-01",
        text: "Quel est le ratio de diversité de genres au sein de l’organe de gouvernance ?",
        type: "radio",
        options: ["<10%", "10-25%", "25-50%", ">50%"],
        scoreMap: {
          "<10%": 0,
          "10-25%": 0.2,
          "25-50%": 0.6,
          ">50%": 1,
        },
      },
      {
        code: "C9-01-bis",
        text: "Quel genre est le plus représenté ?",
        type: "radio",
        options: ["Femmes", "Hommes", "Parité"],
        scoreMap: {
          Femmes: 0.2,
          Hommes: 0,
          Parité: 1,
        },
      },
    ],
  },
];

export const MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const FLATTENED_QUESTIONS: QuestionDefinition[] =
  QUESTIONNAIRE_STRUCTURE.reduce(
    (acc, section) => acc.concat(section.questions),
    [] as QuestionDefinition[]
  );

export const QUESTIONNAIRE_CONTEXT_FOR_AI: string = QUESTIONNAIRE_STRUCTURE.map(
  (section) =>
    `# ${section.title}\n` +
    section.questions.map((q) => `${q.code}. ${q.text}`).join("\n")
).join("\n\n");
