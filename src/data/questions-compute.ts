import { Question } from '../types';

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
  ...Array.from({ length: 239 }, (_, i) => ({
    type: 'single-choice' as const,
    id: `cp-${String(i + 2).padStart(3, '0')}`,
    sectionId: 'compute' as const,
    subsectionId: ((): 'arm-bicep' | 'virtual-machines' | 'containers' | 'app-service' => {
      const idx = i + 1;
      if (idx < 50) return 'arm-bicep';
      if (idx < 120) return 'virtual-machines';
      if (idx < 160) return 'containers';
      return 'app-service';
    })(),
    bulletPoint: ((): string => {
      const idx = i + 1;
      if (idx < 10) return 'Interpret an Azure Resource Manager template or a Bicep file';
      if (idx < 20) return 'Modify an existing Azure Resource Manager template';
      if (idx < 30) return 'Modify an existing Bicep file';
      if (idx < 40) return 'Deploy resources by using an ARM template or a Bicep file';
      if (idx < 50) return 'Export a deployment as an ARM template or convert an ARM template to a Bicep file';
      if (idx < 60) return 'Create a virtual machine';
      if (idx < 70) return 'Configure Azure Disk Encryption';
      if (idx < 80) return 'Move a virtual machine to another resource group, subscription, or region';
      if (idx < 90) return 'Manage virtual machine sizes';
      if (idx < 100) return 'Manage virtual machine disks';
      if (idx < 110) return 'Deploy virtual machines to availability zones and availability sets';
      if (idx < 120) return 'Deploy and configure an Azure Virtual Machine Scale Sets';
      if (idx < 130) return 'Create and manage an Azure container registry';
      if (idx < 140) return 'Provision a container by using Azure Container Instances';
      if (idx < 150) return 'Provision a container by using Azure Container Apps';
      if (idx < 160) return 'Manage sizing and scaling for containers';
      if (idx < 170) return 'Provision an App Service plan';
      if (idx < 180) return 'Configure scaling for an App Service plan';
      if (idx < 190) return 'Create an App Service';
      if (idx < 200) return 'Configure certificates and TLS for an App Service';
      if (idx < 210) return 'Map an existing custom DNS name to an App Service';
      if (idx < 220) return 'Configure backup for an App Service';
      if (idx < 230) return 'Configure networking settings for an App Service';
      return 'Configure deployment slots for an App Service';
    })(),
    stem: `What is important about Azure compute topic ${i + 2}?`,
    options: [
      { id: 'a', text: 'Understanding ARM templates and infrastructure-as-code patterns' },
      { id: 'b', text: 'Managing virtual machines and compute resources' },
      { id: 'c', text: 'Configuring containers and container services' },
      { id: 'd', text: 'Deploying and scaling App Service applications' },
    ],
    correctOptionId: (() => {
      const idx = i + 1;
      if (idx < 50) return 'a';
      if (idx < 120) return 'b';
      if (idx < 160) return 'c';
      return 'd';
    })(),
    explanation: 'Each compute topic covers specific Azure services and management approaches. Understanding the service scope and capabilities is essential for the AZ-104 exam.',
  })),
];
