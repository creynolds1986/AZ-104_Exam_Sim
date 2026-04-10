/**
 * Mapping of question bullet points to their corresponding Microsoft Learn URLs.
 * Used to show "Learn more" links in explanation boxes when reviewing incorrect answers.
 */
export const learnLinks: Record<string, string> = {
  // ===== Manage Azure identities and governance =====

  // Manage Microsoft Entra users and groups
  'Create users and groups': 'https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users',
  'Manage user and group properties': 'https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info',
  'Manage licenses in Microsoft Entra ID': 'https://learn.microsoft.com/en-us/entra/fundamentals/license-users-groups',
  'Manage external users': 'https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b',
  'Configure self-service password reset (SSPR)': 'https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr',

  // Manage access to Azure resources
  'Manage built-in Azure roles': 'https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles',
  'Assign roles at different scopes': 'https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal',
  'Interpret access assignments': 'https://learn.microsoft.com/en-us/azure/role-based-access-control/check-access',

  // Manage Azure subscriptions and governance
  'Implement and manage Azure Policy': 'https://learn.microsoft.com/en-us/azure/governance/policy/overview',
  'Configure resource locks': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources',
  'Apply and manage tags on resources': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources',
  'Manage resource groups': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal',
  'Manage subscriptions': 'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-subscription',
  'Manage costs by using alerts, budgets, and Azure Advisor recommendations': 'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/cost-mgt-best-practices',
  'Configure management groups': 'https://learn.microsoft.com/en-us/azure/governance/management-groups/overview',

  // ===== Implement and manage storage =====

  // Configure access to storage
  'Configure Azure Storage firewalls and virtual networks': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security',
  'Create and use shared access signature (SAS) tokens': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview',
  'Configure stored access policies': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-stored-access-policy-define-dotnet',
  'Manage access keys': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage',
  'Configure identity-based access for Azure Files': 'https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview',

  // Configure and manage storage accounts
  'Create and configure storage accounts': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create',
  'Configure Azure Storage redundancy': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy',
  'Configure object replication': 'https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview',
  'Configure storage account encryption': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption',
  'Manage data by using Azure Storage Explorer and AzCopy': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10',

  // Configure Azure Files and Azure Blob Storage
  'Create and configure a file share in Azure Storage': 'https://learn.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share',
  'Create and configure a container in Blob Storage': 'https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal',
  'Configure storage tiers': 'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
  'Configure soft delete for blobs and containers': 'https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview',
  'Configure snapshots and soft delete for Azure Files': 'https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files',
  'Configure blob lifecycle management': 'https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview',
  'Configure blob versioning': 'https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview',

  // ===== Deploy and manage Azure compute resources =====

  // Automate deployment of resources by using ARM templates or Bicep files
  'Interpret an Azure Resource Manager template or a Bicep file': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview',
  'Modify an existing Azure Resource Manager template': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/template-tutorial-create-first-template',
  'Modify an existing Bicep file': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview',
  'Deploy resources by using an ARM template or a Bicep file': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-portal',
  'Export a deployment as an ARM template or convert an ARM template to a Bicep file': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/decompile',

  // Create and configure virtual machines
  'Create a virtual machine': 'https://learn.microsoft.com/en-us/azure/virtual-machines/windows/quick-create-portal',
  'Configure Azure Disk Encryption': 'https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-overview',
  'Move a virtual machine to another resource group, subscription, or region': 'https://learn.microsoft.com/en-us/azure/resource-mover/tutorial-move-region-virtual-machines',
  'Manage virtual machine sizes': 'https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview',
  'Manage virtual machine disks': 'https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview',
  'Deploy virtual machines to availability zones and availability sets': 'https://learn.microsoft.com/en-us/azure/virtual-machines/availability',
  'Deploy and configure an Azure Virtual Machine Scale Sets': 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview',

  // Provision and manage containers in the Azure portal
  'Create and manage an Azure container registry': 'https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal',
  'Provision a container by using Azure Container Instances': 'https://learn.microsoft.com/en-us/azure/container-instances/container-instances-quickstart-portal',
  'Provision a container by using Azure Container Apps': 'https://learn.microsoft.com/en-us/azure/container-apps/quickstart-portal',
  'Manage sizing and scaling for containers': 'https://learn.microsoft.com/en-us/azure/container-instances/container-instances-container-groups',

  // Create and configure Azure App Service
  'Provision an App Service plan': 'https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans',
  'Configure scaling for an App Service plan': 'https://learn.microsoft.com/en-us/azure/app-service/manage-scale-up',
  'Create an App Service': 'https://learn.microsoft.com/en-us/azure/app-service/getting-started',
  'Configure certificates and TLS for an App Service': 'https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate',
  'Map an existing custom DNS name to an App Service': 'https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain',
  'Configure backup for an App Service': 'https://learn.microsoft.com/en-us/azure/app-service/manage-backup',
  'Configure networking settings for an App Service': 'https://learn.microsoft.com/en-us/azure/app-service/networking-features',
  'Configure deployment slots for an App Service': 'https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots',

  // ===== Implement and manage virtual networking =====

  // Configure and manage virtual networks in Azure
  'Create and configure virtual networks and subnets': 'https://learn.microsoft.com/en-us/azure/virtual-network/quick-create-portal',
  'Create and configure virtual network peering': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview',
  'Configure public IP addresses': 'https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses',
  'Configure user-defined network routes': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview',
  'Troubleshoot network connectivity': 'https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-connectivity-overview',

  // Configure secure access to virtual networks
  'Create and configure network security groups (NSGs) and application security groups': 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview',
  'Evaluate effective security rules in NSGs': 'https://learn.microsoft.com/en-us/azure/virtual-network/diagnose-network-traffic-filter-problem',
  'Implement Azure Bastion': 'https://learn.microsoft.com/en-us/azure/bastion/bastion-overview',
  'Configure service endpoints for Azure PaaS': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview',
  'Configure private endpoints for Azure PaaS': 'https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview',

  // Configure name resolution and load balancing
  'Configure Azure DNS': 'https://learn.microsoft.com/en-us/azure/dns/dns-overview',
  'Configure an internal or public load balancer': 'https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview',
  'Troubleshoot load balancing': 'https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-troubleshoot',

  // ===== Monitor and maintain Azure resources =====

  // Monitor resources in Azure
  'Interpret metrics in Azure Monitor': 'https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-platform-metrics',
  'Configure log settings in Azure Monitor': 'https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings',
  'Query and analyze logs in Azure Monitor': 'https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial',
  'Set up alert rules, action groups, and alert processing rules in Azure Monitor': 'https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview',
  'Configure and interpret monitoring of VMs, storage accounts, and networks by using Azure Monitor Insights': 'https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vminsights-overview',
  'Use Azure Network Watcher and Connection Monitor': 'https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview',

  // Implement backup and recovery
  'Create a Recovery Services vault': 'https://learn.microsoft.com/en-us/azure/backup/backup-create-recovery-services-vault',
  'Create an Azure Backup vault': 'https://learn.microsoft.com/en-us/azure/backup/create-manage-backup-vault',
  'Create and configure a backup policy': 'https://learn.microsoft.com/en-us/azure/backup/backup-azure-policy-supported-skus',
  'Perform backup and restore operations by using Azure Backup': 'https://learn.microsoft.com/en-us/azure/backup/backup-overview',
  'Configure Azure Site Recovery for Azure resources': 'https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview',
  'Perform a failover to a secondary region by using Site Recovery': 'https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback',
  'Configure and interpret reports and alerts for backups': 'https://learn.microsoft.com/en-us/azure/backup/configure-reports',
};
