import { CaseStudyQuestion } from '../types';

export const caseStudyQuestions: CaseStudyQuestion[] = [
  // ========================================================================
  // Case Study 1: Identity & Governance — Contoso Ltd migration
  // ========================================================================
  {
    id: 'cs-001',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'case-study',
    scenario: `Contoso Ltd is migrating to Azure. The company has 2,000 employees across three departments: Engineering, Sales, and Finance. The IT team needs to set up Microsoft Entra ID to manage identities and access.

Requirements:
- All Engineering department users must automatically be added to the "Engineering-Access" security group.
- The Sales team needs access to a shared mailbox and collaborative SharePoint site.
- External contractors from a partner company (Fabrikam) need to access specific Azure resources for 6 months.
- The IT admin team needs the ability to reset passwords for all non-admin users.
- Cost management alerts must be configured for the Engineering subscription, which has a monthly budget of $50,000.`,
    subQuestions: [
      {
        id: 'cs-001-q1',
        type: 'single-choice',
        stem: 'Which type of group should you create for the Engineering-Access group to automatically include all Engineering department users?',
        options: [
          { id: 'a', text: 'Security group with Assigned membership type' },
          { id: 'b', text: 'Microsoft 365 group with Dynamic User membership type' },
          { id: 'c', text: 'Security group with Dynamic User membership type' },
          { id: 'd', text: 'Distribution group with Dynamic User membership type' },
        ],
        correctOptionId: 'c',
        explanation: 'A Security group with Dynamic User membership type is correct. Security groups are used for managing access to Azure resources, and Dynamic User membership allows automatic group membership based on user attributes like department. The membership rule would be (user.department -eq "Engineering").',
      },
      {
        id: 'cs-001-q2',
        type: 'single-choice',
        stem: 'Which type of group should you create for the Sales team to provide access to a shared mailbox and SharePoint site?',
        options: [
          { id: 'a', text: 'Security group with Assigned membership type' },
          { id: 'b', text: 'Microsoft 365 group' },
          { id: 'c', text: 'Distribution group' },
          { id: 'd', text: 'Mail-enabled security group' },
        ],
        correctOptionId: 'b',
        explanation: 'Microsoft 365 groups provide collaboration features including shared mailbox, SharePoint site, Planner, and OneNote. Security groups are for access management only and do not provide collaborative resources.',
      },
      {
        id: 'cs-001-q3',
        type: 'yes-no',
        stem: 'For each of the following statements about managing the external contractors from Fabrikam, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You should invite the Fabrikam contractors as B2B guest users in Microsoft Entra ID.', correct: true },
          { id: 's2', text: 'Guest users can be assigned Azure RBAC roles on Azure resources.', correct: true },
          { id: 's3', text: 'You must create new Microsoft Entra ID accounts for each Fabrikam contractor.', correct: false },
        ],
        explanation: 'B2B guest users can be invited to your Microsoft Entra tenant and can use their own organizational credentials. Guest users can be assigned Azure RBAC roles. You do not need to create new accounts — they authenticate with their home tenant (Fabrikam).',
      },
    ],
    explanation: 'This case study covers Microsoft Entra ID group types, membership management, and B2B guest user scenarios.',
  },

  // ========================================================================
  // Case Study 2: Compute — Web application deployment
  // ========================================================================
  {
    id: 'cs-002',
    sectionId: 'compute',
    subsectionId: 'app-service',
    bulletPoint: 'Create an App Service',
    type: 'case-study',
    scenario: `Woodgrove Bank is deploying a customer-facing web application to Azure. The application consists of a .NET 8 web API and a React frontend.

Architecture requirements:
- The web API must run on Azure App Service with auto-scaling capabilities.
- The application must support zero-downtime deployments.
- During peak hours (9 AM to 5 PM on weekdays), the application must scale to a minimum of 4 instances.
- The application stores sensitive configuration data including database connection strings and API keys.
- A staging environment must be available for testing before production deployment.
- The application must use a custom domain (api.woodgrovebank.com) with TLS encryption.`,
    subQuestions: [
      {
        id: 'cs-002-q1',
        type: 'single-choice',
        stem: 'Which App Service plan tier is the minimum required to support deployment slots for zero-downtime deployments?',
        options: [
          { id: 'a', text: 'Free (F1)' },
          { id: 'b', text: 'Basic (B1)' },
          { id: 'c', text: 'Standard (S1)' },
          { id: 'd', text: 'Premium v3 (P1v3)' },
        ],
        correctOptionId: 'c',
        explanation: 'Standard (S1) is the minimum tier that supports deployment slots. Free and Basic tiers do not support deployment slots. While Premium v3 also supports slots, Standard is the minimum required tier.',
      },
      {
        id: 'cs-002-q2',
        type: 'dropdown',
        stem: 'Complete the following sentence about the deployment strategy:',
        segments: [
          { type: 'text', text: 'To achieve zero-downtime deployments, you should deploy the new version to the ' },
          { type: 'dropdown', id: 'd1', options: ['production slot', 'staging slot', 'development slot', 'canary slot'], correctOption: 'staging slot' },
          { type: 'text', text: ', verify it is working correctly, and then perform a ' },
          { type: 'dropdown', id: 'd2', options: ['slot swap', 'redeployment', 'DNS cutover', 'traffic migration'], correctOption: 'slot swap' },
          { type: 'text', text: ' to route production traffic to the new version.' },
        ],
        explanation: 'You deploy to a staging slot first, validate it, then perform a slot swap which instantly routes production traffic to the new version with zero downtime. The swap operation switches the virtual IP addresses of the two slots.',
      },
      {
        id: 'cs-002-q3',
        type: 'single-choice',
        stem: 'Where should the database connection strings and API keys be stored for the App Service?',
        options: [
          { id: 'a', text: 'In the application source code appsettings.json file' },
          { id: 'b', text: 'In Azure App Service Configuration (Application settings)' },
          { id: 'c', text: 'In an Azure Key Vault referenced by App Service Configuration' },
          { id: 'd', text: 'In environment variables set during deployment' },
        ],
        correctOptionId: 'c',
        explanation: 'For sensitive data like connection strings and API keys, Azure Key Vault is the recommended approach. App Service can reference Key Vault secrets using Key Vault references in Application settings (e.g., @Microsoft.KeyVault(SecretUri=...)). This keeps secrets centralized, auditable, and rotatable without redeploying the application.',
      },
      {
        id: 'cs-002-q4',
        type: 'yes-no',
        stem: 'For each of the following statements about scaling the App Service, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You can use scheduled autoscale rules to set a minimum of 4 instances during weekday peak hours.', correct: true },
          { id: 's2', text: 'Auto-scaling based on a schedule requires the Premium v3 tier.', correct: false },
          { id: 's3', text: 'Autoscale rules can combine both schedule-based and metric-based conditions.', correct: true },
        ],
        explanation: 'Schedule-based autoscaling is available from the Standard tier and above. You can configure autoscale profiles that activate on specific schedules (e.g., weekdays 9 AM - 5 PM) with a minimum instance count of 4. These can be combined with metric-based rules (e.g., scale out when CPU > 70%).',
      },
    ],
    explanation: 'This case study covers App Service deployment slots, auto-scaling, secure configuration management, and TLS setup.',
  },

  // ========================================================================
  // Case Study 3: Storage — Multi-tier data management
  // ========================================================================
  {
    id: 'cs-003',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    type: 'case-study',
    scenario: `Tailwind Traders is implementing a data management solution in Azure. The company generates 500 GB of log data per day and has the following requirements:

Data retention policy:
- Log data must be immediately accessible for the first 30 days.
- After 30 days, log data must be retained but can tolerate higher access latency (accessed roughly once per month).
- After 180 days, log data must be retained for compliance but is rarely accessed (less than once per year).
- After 365 days, log data must be permanently deleted.
- The operations team needs to recover accidentally deleted blobs for up to 14 days after deletion.
- A separate Azure Files share is needed for the development team to store project files, with snapshots taken daily.`,
    subQuestions: [
      {
        id: 'cs-003-q1',
        type: 'dropdown',
        stem: 'Complete the lifecycle management policy for log data:',
        segments: [
          { type: 'text', text: 'Move blobs to the ' },
          { type: 'dropdown', id: 'd1', options: ['Cool tier', 'Cold tier', 'Archive tier', 'Hot tier'], correctOption: 'Cool tier' },
          { type: 'text', text: ' after 30 days. Move blobs to the ' },
          { type: 'dropdown', id: 'd2', options: ['Cool tier', 'Cold tier', 'Archive tier', 'Hot tier'], correctOption: 'Archive tier' },
          { type: 'text', text: ' after 180 days. Delete blobs after ' },
          { type: 'dropdown', id: 'd3', options: ['180 days', '270 days', '365 days', '730 days'], correctOption: '365 days' },
          { type: 'text', text: '.' },
        ],
        explanation: 'The lifecycle management policy should move blobs to Cool tier after 30 days (for monthly access patterns), to Archive tier after 180 days (for rare access, compliance retention), and delete after 365 days. The Cool tier is appropriate for data accessed roughly once a month, while the Archive tier is for data accessed less than once per year.',
      },
      {
        id: 'cs-003-q2',
        type: 'single-choice',
        stem: 'Which feature should you enable to allow the operations team to recover accidentally deleted blobs for up to 14 days?',
        options: [
          { id: 'a', text: 'Blob versioning' },
          { id: 'b', text: 'Soft delete for blobs with a retention period of 14 days' },
          { id: 'c', text: 'Azure Backup for blobs' },
          { id: 'd', text: 'Object replication to a secondary storage account' },
        ],
        correctOptionId: 'b',
        explanation: 'Soft delete for blobs allows recovery of deleted blobs within a specified retention period (up to 365 days). Setting it to 14 days meets the requirement. Blob versioning keeps previous versions but does not specifically protect against deletion. Azure Backup and object replication are more complex and costly for this specific requirement.',
      },
      {
        id: 'cs-003-q3',
        type: 'yes-no',
        stem: 'For each of the following statements about the storage solution, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You need a General-purpose v2 storage account to use blob lifecycle management policies.', correct: true },
          { id: 's2', text: 'Rehydrating a blob from the Archive tier to the Hot tier happens instantaneously.', correct: false },
          { id: 's3', text: 'Azure Files snapshots are incremental and only store the data that has changed since the last snapshot.', correct: true },
        ],
        explanation: 'Lifecycle management policies require a General-purpose v2 or Blob storage account. Rehydrating from Archive tier can take up to 15 hours (standard priority) and is not instantaneous. Azure Files snapshots are incremental — only changes since the last snapshot are stored, making them storage-efficient.',
      },
    ],
    explanation: 'This case study covers blob lifecycle management, storage tiers, soft delete, and Azure Files snapshots.',
  },

  // ========================================================================
  // Case Study 4: Networking — Hub-spoke topology
  // ========================================================================
  {
    id: 'cs-004',
    sectionId: 'networking',
    subsectionId: 'manage-vnets',
    bulletPoint: 'Create and configure virtual network peering',
    type: 'case-study',
    scenario: `Fourth Coffee is implementing a hub-and-spoke network topology in Azure for their multi-tier application.

Network design:
- Hub VNet (10.0.0.0/16) in East US — contains a Network Virtual Appliance (NVA) for traffic inspection and Azure Bastion for secure VM access.
- Spoke 1 VNet (10.1.0.0/16) in East US — hosts the web tier with VMs behind a public load balancer.
- Spoke 2 VNet (10.2.0.0/16) in East US — hosts the database tier with VMs that must not be directly accessible from the internet.
- The web tier must be able to communicate with the database tier through the NVA in the hub VNet.
- Administrators must be able to connect to all VMs for management using Azure Bastion in the hub VNet.
- An NSG must restrict database tier access to only allow SQL traffic (port 1433) from the web tier subnet.`,
    subQuestions: [
      {
        id: 'cs-004-q1',
        type: 'yes-no',
        stem: 'For each of the following statements about the VNet peering configuration, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You need to create peering connections between each spoke VNet and the hub VNet (Spoke1-to-Hub and Spoke2-to-Hub).', correct: true },
          { id: 's2', text: 'VNet peering between Spoke 1 and the Hub automatically enables connectivity between Spoke 1 and Spoke 2.', correct: false },
          { id: 's3', text: 'You must enable "Allow Gateway Transit" on the hub VNet peering to allow spoke-to-spoke traffic through the hub.', correct: false },
        ],
        explanation: 'Each spoke needs its own peering to the hub. VNet peering is non-transitive — peering Spoke1-to-Hub does NOT automatically allow Spoke1-to-Spoke2 traffic. To route spoke-to-spoke traffic through the hub NVA, you need User Defined Routes (UDRs), not gateway transit. Gateway transit is used for sharing a VPN/ExpressRoute gateway.',
      },
      {
        id: 'cs-004-q2',
        type: 'single-choice',
        stem: 'How should you configure routing so that traffic from Spoke 1 to Spoke 2 passes through the NVA in the hub VNet?',
        options: [
          { id: 'a', text: 'Enable VNet peering with "Allow Forwarded Traffic" and create a UDR on the Spoke 1 subnet with a route to 10.2.0.0/16 pointing to the NVA private IP address' },
          { id: 'b', text: 'Create a direct VNet peering between Spoke 1 and Spoke 2' },
          { id: 'c', text: 'Deploy an Azure Application Gateway in the hub VNet' },
          { id: 'd', text: 'Enable "Allow Gateway Transit" on both spoke VNet peerings' },
        ],
        correctOptionId: 'a',
        explanation: 'To route spoke-to-spoke traffic through the NVA: (1) Enable "Allow Forwarded Traffic" on the peering connections so forwarded packets are accepted, (2) Create a User Defined Route (UDR) on the spoke subnets that directs traffic destined for the other spoke through the NVA private IP as the next hop. Direct peering would bypass the NVA. Application Gateway is for HTTP traffic, not general routing. Gateway transit is for VPN/ExpressRoute sharing.',
      },
      {
        id: 'cs-004-q3',
        type: 'multiple-choice',
        stem: 'Which NSG rules should you create on the database tier subnet to restrict access? (Select two)',
        options: [
          { id: 'a', text: 'Inbound Allow rule: Source = 10.1.0.0/16, Destination port = 1433, Protocol = TCP' },
          { id: 'b', text: 'Inbound Allow rule: Source = Any, Destination port = 1433, Protocol = TCP' },
          { id: 'c', text: 'Inbound Deny rule: Source = Any, Destination port = Any, Protocol = Any (with lower priority than the Allow rule)' },
          { id: 'd', text: 'Outbound Deny rule: Source = 10.2.0.0/16, Destination = Internet, Protocol = Any' },
        ],
        correctOptionIds: ['a', 'c'],
        requiredSelections: 2,
        explanation: 'You need an inbound Allow rule for SQL traffic (port 1433) from the web tier subnet (10.1.0.0/16) and a Deny-all rule at a lower priority to block all other inbound traffic. Note: NSGs have a default DenyAllInbound rule at priority 65500, but an explicit deny rule at a higher priority provides defense-in-depth. Source should be the specific web tier CIDR, not "Any".',
      },
    ],
    explanation: 'This case study covers hub-spoke topology, VNet peering, UDR routing through NVAs, and NSG configuration.',
  },

  // ========================================================================
  // Case Study 5: Monitor & Maintain — Disaster recovery
  // ========================================================================
  {
    id: 'cs-005',
    sectionId: 'monitor-maintain',
    subsectionId: 'backup-recovery',
    bulletPoint: 'Create and configure a backup policy',
    type: 'case-study',
    scenario: `Litware Inc runs business-critical workloads on Azure consisting of:
- Three Azure VMs running a SQL Server Always On Availability Group in East US.
- An Azure App Service hosting the company's customer portal.
- Several Azure file shares containing financial documents.

Business requirements:
- VMs must be backed up daily with 30-day retention and monthly backups retained for 12 months.
- The customer portal must have a Recovery Point Objective (RPO) of 15 minutes and must be recoverable in the West US region.
- Financial documents in Azure Files must be backed up weekly with 52-week retention.
- The operations team must be alerted immediately when any backup job fails.
- All backup data must use geo-redundant storage for disaster recovery purposes.`,
    subQuestions: [
      {
        id: 'cs-005-q1',
        type: 'single-choice',
        stem: 'Which type of vault should you create first to back up the Azure VMs?',
        options: [
          { id: 'a', text: 'Azure Backup vault with GRS redundancy' },
          { id: 'b', text: 'Recovery Services vault with GRS redundancy' },
          { id: 'c', text: 'Recovery Services vault with LRS redundancy' },
          { id: 'd', text: 'Azure Key Vault with soft delete enabled' },
        ],
        correctOptionId: 'b',
        explanation: 'Azure VM backups require a Recovery Services vault (not a Backup vault, which is for newer workload types like Azure Database for PostgreSQL and Azure Blobs). GRS (Geo-Redundant Storage) is required per the business requirement that backup data must use geo-redundant storage for disaster recovery.',
      },
      {
        id: 'cs-005-q2',
        type: 'dropdown',
        stem: 'Complete the disaster recovery configuration for the customer portal:',
        segments: [
          { type: 'text', text: 'To meet the RPO of 15 minutes for the customer portal, you should configure ' },
          { type: 'dropdown', id: 'd1', options: ['Azure Backup', 'Azure Site Recovery', 'Azure Traffic Manager', 'Azure Front Door'], correctOption: 'Azure Site Recovery' },
          { type: 'text', text: ' to replicate the App Service to the ' },
          { type: 'dropdown', id: 'd2', options: ['East US 2', 'West US', 'Central US', 'Same region'], correctOption: 'West US' },
          { type: 'text', text: ' region. The replication frequency should be set to continuous replication to meet the RPO requirement.' },
        ],
        explanation: 'Azure Site Recovery (ASR) provides disaster recovery with continuous replication and can achieve RPO as low as a few minutes. The target region should be West US as specified in the requirements. Azure Backup does not provide the same level of RPO granularity. Traffic Manager and Front Door are traffic routing services, not replication services.',
      },
      {
        id: 'cs-005-q3',
        type: 'yes-no',
        stem: 'For each of the following statements about configuring backup alerts, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You can configure Azure Monitor alerts on the Recovery Services vault to trigger when a backup job fails.', correct: true },
          { id: 's2', text: 'You should create an action group with an email notification to alert the operations team.', correct: true },
          { id: 's3', text: 'Built-in backup alerts in the Recovery Services vault require Azure Monitor to be configured separately.', correct: false },
        ],
        explanation: 'Azure Monitor alerts can be configured on Recovery Services vaults to detect backup failures. An action group with email/SMS notifications can be attached to alert the operations team. The Recovery Services vault has built-in backup alerting that does NOT require separate Azure Monitor configuration — it provides alerts for critical scenarios like backup failures natively.',
      },
    ],
    explanation: 'This case study covers Recovery Services vaults, backup policies, Azure Site Recovery for disaster recovery, and backup monitoring with alerts.',
  },

  // ========================================================================
  // Case Study 6: Compute — Container-based microservices
  // ========================================================================
  {
    id: 'cs-006',
    sectionId: 'compute',
    subsectionId: 'containers',
    bulletPoint: 'Create and manage an Azure container registry',
    type: 'case-study',
    scenario: `Adventure Works Cycles is modernizing their e-commerce platform using a microservices architecture on Azure. The platform consists of four microservices: Product Catalog, Order Processing, User Authentication, and Payment Gateway.

Technical requirements:
- All container images must be stored in a private Azure Container Registry (ACR).
- The Product Catalog and User Authentication services run continuously and must auto-scale based on HTTP traffic.
- The Order Processing service runs as a batch job triggered every hour and should only consume resources while running.
- The Payment Gateway must run in an isolated network environment with no public internet access.
- The development team uses a CI/CD pipeline that builds and pushes images to ACR automatically.
- Container images must be scanned for vulnerabilities before deployment.`,
    subQuestions: [
      {
        id: 'cs-006-q1',
        type: 'single-choice',
        stem: 'Which ACR tier should you select to support vulnerability scanning of container images?',
        options: [
          { id: 'a', text: 'Basic tier' },
          { id: 'b', text: 'Standard tier' },
          { id: 'c', text: 'Premium tier' },
          { id: 'd', text: 'Any tier — vulnerability scanning is available on all ACR tiers' },
        ],
        correctOptionId: 'c',
        explanation: 'Microsoft Defender for Containers provides vulnerability scanning for ACR images. While Defender integration works with all tiers, the Premium tier is recommended here as it also supports private link (needed for the Payment Gateway network isolation requirement) and geo-replication. For a production enterprise scenario with security scanning and network isolation needs, Premium is the correct choice.',
      },
      {
        id: 'cs-006-q2',
        type: 'dropdown',
        stem: 'Select the appropriate Azure service for each microservice:',
        segments: [
          { type: 'text', text: 'The Product Catalog service (continuous, auto-scaling on HTTP) should run on ' },
          { type: 'dropdown', id: 'd1', options: ['Azure Container Instances', 'Azure Container Apps', 'Azure Kubernetes Service', 'Azure App Service'], correctOption: 'Azure Container Apps' },
          { type: 'text', text: '. The Order Processing batch job (hourly, pay only while running) should run on ' },
          { type: 'dropdown', id: 'd2', options: ['Azure Container Instances', 'Azure Container Apps', 'Azure Kubernetes Service', 'Azure Functions'], correctOption: 'Azure Container Instances' },
          { type: 'text', text: '.' },
        ],
        explanation: 'Azure Container Apps is ideal for the Product Catalog — it supports HTTP-triggered auto-scaling, runs continuously, and is fully managed. Azure Container Instances is the best fit for the Order Processing batch job — it provides serverless containers that can be started on-demand (e.g., via a scheduled task), you pay only while the container runs, and it requires no infrastructure management. AKS would be over-engineered for these workloads.',
      },
      {
        id: 'cs-006-q3',
        type: 'yes-no',
        stem: 'For each of the following statements about the Payment Gateway network isolation, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You can deploy Azure Container Instances into a virtual network to restrict internet access.', correct: true },
          { id: 's2', text: 'ACR Premium tier supports private endpoints to allow image pulls over a private network.', correct: true },
          { id: 's3', text: 'Containers deployed to a VNet in Azure Container Instances automatically have outbound internet access disabled.', correct: false },
        ],
        explanation: 'ACI supports VNet deployment for network isolation. ACR Premium supports private endpoints so containers can pull images without traversing the public internet. However, VNet-deployed ACI containers still have outbound internet access by default — you need to use NSGs or Azure Firewall to explicitly block outbound traffic if required.',
      },
    ],
    explanation: 'This case study covers Azure Container Registry tiers, choosing between container hosting services, and network isolation for containerized workloads.',
  },

  // ========================================================================
  // Case Study 7: Identity & Governance — RBAC and Policy
  // ========================================================================
  {
    id: 'cs-007',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'case-study',
    scenario: `Fabrikam Inc has the following Azure hierarchy:
- Root Management Group
  - IT Management Group
    - Production Subscription
      - rg-web (Resource Group) — contains App Services and Application Gateway
      - rg-data (Resource Group) — contains SQL Databases and Storage Accounts
    - Development Subscription
      - rg-dev (Resource Group) — contains all development resources

Team access requirements:
- The DBA team must be able to manage SQL Databases in rg-data only, but must NOT have access to Storage Accounts in the same resource group.
- The Web Development team needs full control over resources in rg-web in Production AND all resources in the Development Subscription.
- The Security team must be able to view all resources across both subscriptions but must NOT be able to make any changes.
- An Azure Policy must ensure all resources are tagged with a "CostCenter" tag before they can be created.`,
    subQuestions: [
      {
        id: 'cs-007-q1',
        type: 'single-choice',
        stem: 'Which built-in RBAC role should you assign to the DBA team, and at what scope?',
        options: [
          { id: 'a', text: 'SQL DB Contributor role at the rg-data resource group scope' },
          { id: 'b', text: 'Contributor role at the rg-data resource group scope' },
          { id: 'c', text: 'SQL DB Contributor role at each individual SQL Database resource scope' },
          { id: 'd', text: 'SQL Server Contributor role at the Production Subscription scope' },
        ],
        correctOptionId: 'c',
        explanation: 'Assigning SQL DB Contributor at the individual SQL Database resource scope ensures the DBA team can manage only SQL Databases, not Storage Accounts. Assigning at rg-data scope (option A) would also work with the SQL DB Contributor role since it only grants SQL permissions, but assigning at individual resources provides the most granular control. Contributor at rg-data (option B) would give access to Storage Accounts too.',
      },
      {
        id: 'cs-007-q2',
        type: 'multiple-choice',
        stem: 'Which role assignments should you create for the Web Development team? (Select two)',
        options: [
          { id: 'a', text: 'Contributor role at the rg-web resource group scope' },
          { id: 'b', text: 'Contributor role at the Development Subscription scope' },
          { id: 'c', text: 'Owner role at the IT Management Group scope' },
          { id: 'd', text: 'Contributor role at the Production Subscription scope' },
        ],
        correctOptionIds: ['a', 'b'],
        requiredSelections: 2,
        explanation: 'The Web Development team needs: (1) Contributor at rg-web for full control over web resources in Production, and (2) Contributor at the Development Subscription scope for all dev resources. Contributor at the Production Subscription (option D) would give them access to rg-data as well. Owner at the management group level (option C) would give them far too much access.',
      },
      {
        id: 'cs-007-q3',
        type: 'dropdown',
        stem: 'Configure the Security team access and the tagging policy:',
        segments: [
          { type: 'text', text: 'The Security team should be assigned the ' },
          { type: 'dropdown', id: 'd1', options: ['Reader', 'Contributor', 'Security Reader', 'Security Admin'], correctOption: 'Reader' },
          { type: 'text', text: ' role at the ' },
          { type: 'dropdown', id: 'd2', options: ['Root Management Group', 'IT Management Group', 'Production Subscription', 'Each resource group'], correctOption: 'IT Management Group' },
          { type: 'text', text: ' scope. The tagging policy should use the ' },
          { type: 'dropdown', id: 'd3', options: ['Audit', 'Deny', 'Append', 'DeployIfNotExists'], correctOption: 'Deny' },
          { type: 'text', text: ' effect to enforce the CostCenter tag requirement.' },
        ],
        explanation: 'Reader role gives view-only access across all resources. Assigning at the IT Management Group scope covers both Production and Development subscriptions. The Deny policy effect prevents resource creation if the CostCenter tag is missing, ensuring compliance before resources are created (not after).',
      },
    ],
    explanation: 'This case study covers Azure RBAC role assignments at various scopes, the principle of least privilege, and Azure Policy enforcement for tagging.',
  },

  // ========================================================================
  // Case Study 8: Networking — Secure connectivity
  // ========================================================================
  {
    id: 'cs-008',
    sectionId: 'networking',
    subsectionId: 'secure-access',
    bulletPoint: 'Create and configure network security groups (NSGs) and application security groups',
    type: 'case-study',
    scenario: `Relecloud is deploying a three-tier application in Azure with strict security requirements.

Infrastructure:
- VNet: 10.0.0.0/16
  - WebSubnet: 10.0.1.0/24 — two web server VMs behind a public Azure Load Balancer
  - AppSubnet: 10.0.2.0/24 — two application server VMs (no direct internet access)
  - DbSubnet: 10.0.3.0/24 — one database server VM (no direct internet access)

Security requirements:
- Web servers must accept HTTP (80) and HTTPS (443) traffic from the internet.
- Application servers must only accept traffic on port 8080 from the web servers.
- The database server must only accept SQL traffic (port 1433) from the application servers.
- No tier should be able to initiate outbound connections to the internet except the web tier.
- Administrators must use Azure Bastion for all VM management — no public IPs on VMs.
- The application servers need to access Azure Storage via a private connection, not over the internet.`,
    subQuestions: [
      {
        id: 'cs-008-q1',
        type: 'yes-no',
        stem: 'For each of the following statements about the NSG configuration, select Yes if the statement is true. Otherwise, select No.',
        statements: [
          { id: 's1', text: 'You should create separate NSGs for each subnet (WebSubnet, AppSubnet, DbSubnet).', correct: true },
          { id: 's2', text: 'The default NSG rules already block all inbound traffic from the internet, so you only need to add Allow rules.', correct: true },
          { id: 's3', text: 'Application Security Groups (ASGs) can be used to group the web server VMs and simplify NSG rules.', correct: true },
        ],
        explanation: 'Separate NSGs per subnet allow granular control for each tier. The default NSG DenyAllInbound rule blocks internet traffic, so you only add specific Allow rules for required traffic. ASGs simplify rules by grouping VMs logically — instead of specifying IP ranges, you reference the ASG as source or destination.',
      },
      {
        id: 'cs-008-q2',
        type: 'single-choice',
        stem: 'How should you provide the application servers with private access to Azure Storage without using the public internet?',
        options: [
          { id: 'a', text: 'Create a service endpoint for Microsoft.Storage on the AppSubnet' },
          { id: 'b', text: 'Deploy an Azure Storage account in the AppSubnet' },
          { id: 'c', text: 'Configure a NAT Gateway on the AppSubnet for outbound connectivity' },
          { id: 'd', text: 'Create a VPN connection between the VNet and Azure Storage' },
        ],
        correctOptionId: 'a',
        explanation: 'A service endpoint for Microsoft.Storage on the AppSubnet provides a private, optimized route from the subnet to Azure Storage over the Microsoft backbone network. Traffic never leaves the Azure network. Private endpoints are also a valid option (providing a private IP), but service endpoints are simpler for this scenario. You cannot deploy storage accounts inside subnets, and NAT Gateway enables outbound internet access which is what we want to avoid.',
      },
      {
        id: 'cs-008-q3',
        type: 'single-choice',
        stem: 'Which Azure Bastion SKU and configuration is required to access VMs in all three subnets from a single Bastion deployment?',
        options: [
          { id: 'a', text: 'Basic SKU — Bastion can reach VMs in any subnet within the same VNet by default' },
          { id: 'b', text: 'Standard SKU — required for connecting to VMs in subnets other than the AzureBastionSubnet' },
          { id: 'c', text: 'Basic SKU — but you must deploy a separate Bastion host in each subnet' },
          { id: 'd', text: 'Developer SKU — the minimum tier that supports multi-subnet connectivity' },
        ],
        correctOptionId: 'a',
        explanation: 'Azure Bastion, even at the Basic SKU, can connect to any VM within the same VNet regardless of which subnet the VM is in. Bastion is deployed in its own dedicated AzureBastionSubnet but can reach VMs in any peered or local subnet. You do not need the Standard SKU for intra-VNet connectivity — Standard adds features like native client support, IP-based connections, and shareable links.',
      },
    ],
    explanation: 'This case study covers NSG and ASG configuration for a multi-tier application, service endpoints for private connectivity, and Azure Bastion deployment.',
  },

  // ========================================================================
  // Case Study 9: Compute — VM Scale Sets and availability
  // ========================================================================
  {
    id: 'cs-009',
    sectionId: 'compute',
    subsectionId: 'virtual-machines',
    bulletPoint: 'Deploy and configure an Azure Virtual Machine Scale Sets',
    type: 'case-study',
    scenario: `Proseware Inc needs to deploy a high-availability web application on Azure Virtual Machines.

Requirements:
- The application must remain available even if an entire Azure datacenter fails within a region.
- During normal hours, 2 VM instances are sufficient. During peak hours, the system must scale to 10 instances.
- Scaling must be based on average CPU utilization: scale out when CPU exceeds 75% and scale in when CPU drops below 25%.
- New VM instances must be automatically configured with the web application using a custom script.
- The VMs must use managed disks with at least 99.9% availability SLA.
- A recent outage was caused by a faulty OS update. Updates must be rolled out gradually to prevent all instances from being affected simultaneously.`,
    subQuestions: [
      {
        id: 'cs-009-q1',
        type: 'single-choice',
        stem: 'How should you deploy the Virtual Machine Scale Set to ensure availability if an entire datacenter fails?',
        options: [
          { id: 'a', text: 'Deploy the VMSS across multiple availability sets' },
          { id: 'b', text: 'Deploy the VMSS across availability zones' },
          { id: 'c', text: 'Deploy the VMSS with fault domain count set to 5' },
          { id: 'd', text: 'Deploy two separate VMSS instances in different resource groups' },
        ],
        correctOptionId: 'b',
        explanation: 'Availability zones protect against datacenter failures within a region. Each zone is a separate datacenter with independent power, cooling, and networking. VMSS supports zone-spanning deployment which distributes instances across zones. Availability sets only protect against rack-level failures within a single datacenter. Increasing fault domains does not span datacenters.',
      },
      {
        id: 'cs-009-q2',
        type: 'dropdown',
        stem: 'Configure the auto-scaling for the VMSS:',
        segments: [
          { type: 'text', text: 'Set the minimum instance count to ' },
          { type: 'dropdown', id: 'd1', options: ['1', '2', '3', '5'], correctOption: '2' },
          { type: 'text', text: ' and the maximum instance count to ' },
          { type: 'dropdown', id: 'd2', options: ['5', '8', '10', '20'], correctOption: '10' },
          { type: 'text', text: '. To install the web application on new instances automatically, use the ' },
          { type: 'dropdown', id: 'd3', options: ['Custom Script Extension', 'Desired State Configuration', 'Azure Automation Runbook', 'VM Applications'], correctOption: 'Custom Script Extension' },
          { type: 'text', text: '.' },
        ],
        explanation: 'Minimum 2 instances for normal hours, maximum 10 for peak. The Custom Script Extension is the standard approach for running initialization scripts on VMSS instances during provisioning — it downloads and executes scripts to configure the application automatically.',
      },
      {
        id: 'cs-009-q3',
        type: 'single-choice',
        stem: 'Which VMSS feature should you enable to prevent a faulty OS update from affecting all instances simultaneously?',
        options: [
          { id: 'a', text: 'Enable automatic OS image upgrades with rolling upgrade policy' },
          { id: 'b', text: 'Set the upgrade policy to Manual' },
          { id: 'c', text: 'Enable Azure Update Manager' },
          { id: 'd', text: 'Configure a maintenance window' },
        ],
        correctOptionId: 'a',
        explanation: 'Automatic OS image upgrades with a rolling upgrade policy updates instances in batches, ensuring that only a configurable percentage of instances are upgraded at any time. If a batch fails health checks, the rollout stops, preventing widespread impact. Manual upgrade policy would require manual intervention for every update. Update Manager and maintenance windows control timing but not the rolling behavior.',
      },
    ],
    explanation: 'This case study covers VMSS deployment across availability zones, autoscaling configuration, Custom Script Extension, and rolling upgrade policies.',
  },

  // ========================================================================
  // Case Study 10: Monitor & Maintain — Monitoring and alerting
  // ========================================================================
  {
    id: 'cs-010',
    sectionId: 'monitor-maintain',
    subsectionId: 'monitor-resources',
    bulletPoint: 'Set up alert rules, action groups, and alert processing rules in Azure Monitor',
    type: 'case-study',
    scenario: `Datum Corporation is setting up comprehensive monitoring for their Azure infrastructure.

Environment:
- 20 Azure VMs running across two subscriptions (Production and Staging).
- An Azure SQL Database with performance-sensitive workloads.
- An Azure Application Gateway handling 10,000+ requests per hour.
- Azure Storage accounts with large blob containers.

Monitoring requirements:
- The operations team must be alerted via email and SMS when any Production VM has CPU usage above 90% for more than 5 minutes.
- Database administrators must be notified when SQL Database DTU consumption exceeds 80%.
- All VM performance metrics (CPU, memory, disk) must be collected every 60 seconds and retained for 90 days.
- The team needs a dashboard showing real-time status of all Application Gateway backend health.
- During planned maintenance windows (Saturday 2 AM - 6 AM), alerts should be suppressed to avoid false alarms.`,
    subQuestions: [
      {
        id: 'cs-010-q1',
        type: 'dropdown',
        stem: 'Configure the VM CPU alerting:',
        segments: [
          { type: 'text', text: 'Create a ' },
          { type: 'dropdown', id: 'd1', options: ['metric alert rule', 'log alert rule', 'activity log alert rule', 'smart detection alert'], correctOption: 'metric alert rule' },
          { type: 'text', text: ' with the signal "Percentage CPU", threshold type set to ' },
          { type: 'dropdown', id: 'd2', options: ['Static', 'Dynamic', 'Baseline', 'Anomaly'], correctOption: 'Static' },
          { type: 'text', text: ', operator "Greater than", threshold value "90", and aggregation period of 5 minutes.' },
        ],
        explanation: 'A metric alert rule is appropriate for monitoring VM CPU percentage. A static threshold of 90% matches the requirement exactly. Dynamic thresholds use machine learning to determine baselines, which is useful when you do not have a specific threshold in mind, but the requirement specifies exactly 90%.',
      },
      {
        id: 'cs-010-q2',
        type: 'single-choice',
        stem: 'How should you configure Azure Monitor to collect VM performance metrics every 60 seconds and retain them for 90 days?',
        options: [
          { id: 'a', text: 'Platform metrics are collected automatically at 1-minute intervals and retained for 93 days — no additional configuration is needed' },
          { id: 'b', text: 'Deploy the Azure Monitor Agent with a Data Collection Rule (DCR) that sends performance counters to a Log Analytics workspace with 90-day retention' },
          { id: 'c', text: 'Enable Boot Diagnostics on each VM to collect performance data' },
          { id: 'd', text: 'Create an Azure Automation account with a PowerShell runbook to poll VM metrics' },
        ],
        correctOptionId: 'a',
        explanation: 'Azure platform metrics for VMs (CPU, disk, network) are automatically collected at 1-minute intervals and retained for 93 days at no extra cost. This already meets the 60-second collection and 90-day retention requirements without additional configuration. The Azure Monitor Agent with DCRs is needed for guest-level metrics (like memory usage), custom logs, or longer retention periods.',
      },
      {
        id: 'cs-010-q3',
        type: 'single-choice',
        stem: 'How should you suppress alerts during the planned maintenance window on Saturdays from 2 AM to 6 AM?',
        options: [
          { id: 'a', text: 'Disable the alert rules manually every Saturday and re-enable them after maintenance' },
          { id: 'b', text: 'Create an alert processing rule with a suppression action and a recurring schedule for Saturday 2 AM - 6 AM' },
          { id: 'c', text: 'Configure the action group to not send notifications on Saturdays' },
          { id: 'd', text: 'Create a separate maintenance subscription and move resources during maintenance' },
        ],
        correctOptionId: 'b',
        explanation: 'Alert processing rules (formerly action rules) can suppress alert notifications based on a schedule. You create a rule with a suppression action scoped to the relevant resources and configure a recurring schedule for Saturday 2-6 AM. This is the correct, automated approach. Manually disabling rules is error-prone, and action groups do not support time-based scheduling.',
      },
    ],
    explanation: 'This case study covers Azure Monitor metric alerts, platform metrics collection, and alert processing rules for maintenance windows.',
  },
];
