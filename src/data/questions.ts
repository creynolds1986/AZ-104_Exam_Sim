import { Question } from '../types';
import { identityGovernanceQuestions } from './questions-identity';
import { storageQuestions } from './questions-storage';
import { computeQuestions } from './questions-compute';
import { networkingQuestions } from './questions-networking';
import { monitorMaintainQuestions } from './questions-monitor';

export function getAllQuestions(): Question[] {
  return [
    ...identityGovernanceQuestions,
    ...storageQuestions,
    ...computeQuestions,
    ...networkingQuestions,
    ...monitorMaintainQuestions,
  ];
}
