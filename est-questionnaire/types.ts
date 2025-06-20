export interface QuestionDefinition {
  code: string;
  text: string;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  questions: QuestionDefinition[];
}

export type UserAnswers = Record<string, string>; // Maps question code to user's textual answer

export interface ESGEvaluation {
  overallAssessment: string;
  keyStrengths?: string[];
  areasForImprovement?: string[];
  E_score?: number; // Score for Environmental aspect (0-100)
  S_score?: number; // Score for Social aspect (0-100)
  G_score?: number; // Score for Governance aspect (0-100)
  overall_score?: number; // Overall ESG score (0-100)
}