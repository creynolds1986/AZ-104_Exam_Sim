import { Question } from '../types';
import { armBicepQuestions } from './compute-arm-bicep';
import { vmQuestions } from './compute-vms';
import { containerQuestions } from './compute-containers';
import { appServiceQuestions } from './compute-app-service';

export const computeQuestions: Question[] = [
  // ARM/Bicep questions (cp-001 to cp-050)
  {
    type: 'single-choice',
    id: 'cp-001',
    sectionId: 'compute',
    subsectionId: 'arm-bicep',
    bulletPoint: 'Interpret an Azure Resource Manager template or a Bicep file',
    stem: 'You are reviewing an ARM template. The template contains a parameter named "environment" with allowed values of "dev", "test", and "prod". Which section of the template defines these allowed values?',
    options: [
      { id: 'a', text: 'variables section' },
      { id: 'b', text: 'parameters section with allowedValues property' },
      { id: 'c', text: 'outputs section' },
      { id: 'd', text: 'functions section' },
    ],
    correctOptionId: 'b',
    explanation: 'The allowedValues property in the parameters section restricts parameter input to specific values. This ensures only valid environments can be deployed.',
  },
  ...armBicepQuestions,
  ...vmQuestions,
  ...containerQuestions,
  ...appServiceQuestions,
];
