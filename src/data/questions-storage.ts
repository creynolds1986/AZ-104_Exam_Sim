import { Question } from '../types';

export const storageQuestions: Question[] = [
  // ========== configure-storage-access ==========
  // st-001 to st-010: Configure Azure Storage firewalls and virtual networks

  {
    type: 'single-choice',
    id: 'st-001',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'You have an Azure storage account named storageA. You need to ensure that only resources from VNet1 can access storageA. What should you configure?',
    options: [
      { id: 'a', text: 'A service endpoint for Microsoft.Storage on a subnet of VNet1 and a virtual network rule on storageA' },
      { id: 'b', text: 'A private endpoint on storageA only' },
      { id: 'c', text: 'A network security group (NSG) on VNet1 that blocks all outbound traffic except to Azure Storage' },
      { id: 'd', text: 'An application security group on VNet1' }
    ],
    correctOptionId: 'a',
    explanation: 'To restrict storage account access to a specific VNet, you must first enable a service endpoint for Microsoft.Storage on the relevant subnet, then add a virtual network rule on the storage account firewall to allow that subnet. A private endpoint provides private IP connectivity but is a separate mechanism. NSGs and ASGs control network traffic but do not configure storage account firewall rules.'
  },
  {
    type: 'single-choice',
    id: 'st-002',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'You configure the Azure Storage firewall to deny all traffic by default. Users in your on-premises network connected via ExpressRoute need access to the storage account. What should you do?',
    options: [
      { id: 'a', text: 'Add the on-premises public IP address range to the storage account firewall rules' },
      { id: 'b', text: 'Create a private endpoint for the storage account in the VNet connected to ExpressRoute' },
      { id: 'c', text: 'Enable the "Allow trusted Microsoft services" exception' },
      { id: 'd', text: 'Disable the storage account firewall' }
    ],
    correctOptionId: 'b',
    explanation: 'When on-premises users connect via ExpressRoute, the best approach is to create a private endpoint in the VNet that is connected to the ExpressRoute circuit. This provides private connectivity to the storage account over the Microsoft backbone network. Adding public IP ranges would work for internet-based access but does not leverage the ExpressRoute private connection. The trusted services exception applies only to specific Azure services, not on-premises clients.'
  },
  {
    type: 'single-choice',
    id: 'st-003',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'You run the following Azure CLI command:\n\naz storage account network-rule add --account-name storageA --ip-address 203.0.113.0/24\n\nWhat does this command accomplish?',
    options: [
      { id: 'a', text: 'Adds an IP network rule to allow access from the 203.0.113.0/24 address range' },
      { id: 'b', text: 'Blocks access from the 203.0.113.0/24 address range' },
      { id: 'c', text: 'Creates a virtual network rule for the specified subnet' },
      { id: 'd', text: 'Configures a private endpoint with the specified IP range' }
    ],
    correctOptionId: 'a',
    explanation: 'The az storage account network-rule add command with the --ip-address parameter adds an IP-based network rule to the storage account firewall. When the default action is set to Deny, this rule allows traffic from the specified IP range (203.0.113.0/24). IP rules only apply to public internet traffic and use CIDR notation.'
  },
  {
    type: 'single-choice',
    id: 'st-004',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'You have a storage account with the firewall default rule set to Allow. You add a virtual network rule for SubnetA. What is the effect?',
    options: [
      { id: 'a', text: 'Only SubnetA can access the storage account' },
      { id: 'b', text: 'SubnetA and all other sources can still access the storage account' },
      { id: 'c', text: 'SubnetA is blocked while all other sources are allowed' },
      { id: 'd', text: 'The storage account becomes inaccessible from all networks' }
    ],
    correctOptionId: 'b',
    explanation: 'When the default action is set to Allow, adding network rules has no restrictive effect because all traffic is already permitted. Network rules (both IP and VNet) act as an allow list and only take effect when the default action is set to Deny. To restrict access to only SubnetA, you must change the default action to Deny.'
  },
  {
    type: 'single-choice',
    id: 'st-005',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'Your storage account firewall is configured with default action Deny. An Azure Function app in the same region needs to access the storage account, but the Function app uses dynamic outbound IP addresses. What is the BEST solution?',
    options: [
      { id: 'a', text: 'Add all possible Azure IP ranges to the storage firewall' },
      { id: 'b', text: 'Integrate the Function app with a VNet and add a service endpoint or use a private endpoint' },
      { id: 'c', text: 'Disable the storage account firewall' },
      { id: 'd', text: 'Use a resource instance rule based on the Function app managed identity' }
    ],
    correctOptionId: 'b',
    explanation: 'When a Function app has dynamic outbound IPs, you cannot reliably use IP-based rules. The best approach is to use VNet integration on the Function app and then add either a service endpoint on the integrated subnet or use a private endpoint. This provides stable, secure network access. Resource instance rules are only available for a limited set of Azure services and scenarios. Disabling the firewall removes all protection.'
  },
  {
    type: 'multiple-choice',
    id: 'st-006',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'Which TWO Azure services can be granted access to a storage account through the "Allow trusted Microsoft services" exception? (Choose two.)',
    options: [
      { id: 'a', text: 'Azure Backup' },
      { id: 'b', text: 'Azure App Service' },
      { id: 'c', text: 'Azure Event Grid' },
      { id: 'd', text: 'Azure Virtual Desktop' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Azure Backup and Azure Event Grid are trusted Microsoft services that can be granted access through the firewall exception. The trusted services list includes Azure Backup, Azure Site Recovery, Azure Event Grid, Azure Monitor, Azure Cognitive Search, and several others. Azure App Service and Azure Virtual Desktop are not on the trusted services list and require other methods such as VNet rules or private endpoints.'
  },
  {
    type: 'multiple-choice',
    id: 'st-007',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'You need to configure a private endpoint for an Azure storage account. Which TWO resources must you create? (Choose two.)',
    options: [
      { id: 'a', text: 'A private endpoint in the target VNet' },
      { id: 'b', text: 'A private DNS zone for the storage service (e.g., privatelink.blob.core.windows.net)' },
      { id: 'c', text: 'A service endpoint on the target subnet' },
      { id: 'd', text: 'A NAT gateway on the target subnet' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'A private endpoint requires creating the private endpoint resource itself in the target VNet/subnet, and a private DNS zone (e.g., privatelink.blob.core.windows.net for blob storage) with a DNS zone link to the VNet. The DNS zone ensures that storage account DNS resolution returns the private IP address. Service endpoints and NAT gateways are separate features and not required for private endpoints.'
  },
  {
    type: 'drag-drop',
    id: 'st-008',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'Match each Azure CLI command to the correct storage firewall configuration action.',
    items: [
      { id: 'item1', text: 'az storage account update --default-action Deny' },
      { id: 'item2', text: 'az storage account network-rule add --subnet' },
      { id: 'item3', text: 'az storage account network-rule add --ip-address' }
    ],
    targets: [
      { id: 'target1', label: 'Set the default firewall action to deny all traffic', correctItemId: 'item1' },
      { id: 'target2', label: 'Allow access from a specific virtual network subnet', correctItemId: 'item2' },
      { id: 'target3', label: 'Allow access from a specific public IP range', correctItemId: 'item3' }
    ],
    explanation: 'The az storage account update --default-action Deny sets the default firewall action. The az storage account network-rule add --subnet adds a VNet rule for a specific subnet. The az storage account network-rule add --ip-address adds an IP-based rule for public IP ranges.'
  },
  {
    type: 'dropdown',
    id: 'st-009',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    stem: 'Complete the statement about Azure Storage firewall configuration.',
    segments: [
      { type: 'text', text: 'When configuring a storage account firewall, the default network access rule can be set to ' },
      { type: 'dropdown', id: 'dd1', options: ['Allow', 'Deny', 'Block', 'Filter'], correctOption: 'Deny' },
      { type: 'text', text: ' to block all traffic by default. To allow traffic from a specific VNet subnet, you must first enable a ' },
      { type: 'dropdown', id: 'dd2', options: ['service endpoint', 'load balancer', 'NAT gateway', 'VPN gateway'], correctOption: 'service endpoint' },
      { type: 'text', text: ' for Microsoft.Storage on that subnet.' }
    ],
    explanation: 'To restrict storage account access, set the default action to Deny, then add allow rules for specific networks. Before adding a VNet rule, you must enable a service endpoint for Microsoft.Storage on the target subnet so that traffic is routed optimally through the Azure backbone network.'
  },
  {
    type: 'yes-no',
    id: 'st-010',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure Azure Storage firewalls and virtual networks',
    scenario: 'You have an Azure storage account named storageA with the firewall default action set to Deny. You have added a VNet rule for SubnetA in VNet1.',
    statements: [
      { id: 's1', text: 'A virtual machine in SubnetA of VNet1 can access storageA.', correct: true },
      { id: 's2', text: 'A virtual machine in SubnetB of VNet1 can access storageA.', correct: false },
      { id: 's3', text: 'The Azure portal can be used to manage storageA from any network.', correct: false }
    ],
    explanation: 'With the default action set to Deny and only SubnetA allowed, only resources in SubnetA can access the storage account. SubnetB is not in the allow list and is therefore blocked. The Azure portal accesses the storage data plane from the user\'s client IP, which would also be blocked unless the user\'s IP is added to the firewall rules or they use the portal from a machine in SubnetA.'
  },

  // st-011 to st-020: Create and use shared access signature (SAS) tokens

  {
    type: 'single-choice',
    id: 'st-011',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'You need to generate a SAS token that grants read access to a single blob for the next 24 hours. Which type of SAS should you use?',
    options: [
      { id: 'a', text: 'Account SAS' },
      { id: 'b', text: 'Service SAS' },
      { id: 'c', text: 'User delegation SAS' },
      { id: 'd', text: 'Stored access policy SAS' }
    ],
    correctOptionId: 'c',
    explanation: 'Microsoft recommends using a user delegation SAS whenever possible because it is secured with Azure AD credentials instead of the storage account key. A user delegation SAS is signed with the user delegation key, providing superior security. While a service SAS or account SAS could also grant access to a single blob, user delegation SAS is the best practice for security. A stored access policy is a feature of service SAS, not a separate SAS type.'
  },
  {
    type: 'single-choice',
    id: 'st-012',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'Which type of SAS token is signed using the storage account access key and can grant access to resources across multiple storage services (Blob, Queue, Table, File)?',
    options: [
      { id: 'a', text: 'Service SAS' },
      { id: 'b', text: 'Account SAS' },
      { id: 'c', text: 'User delegation SAS' },
      { id: 'd', text: 'Ad hoc SAS' }
    ],
    correctOptionId: 'b',
    explanation: 'An account SAS is signed with the storage account key and can delegate access to resources in one or more storage services (Blob, Queue, Table, File). It can also grant access to service-level operations like Get Service Properties. A service SAS delegates access to a resource in just one storage service. A user delegation SAS is signed with Azure AD credentials and only works for Blob storage and Data Lake Storage Gen2.'
  },
  {
    type: 'single-choice',
    id: 'st-013',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'You generate a SAS token for a blob container with the following parameters: permissions=r, start=2024-01-01T00:00Z, expiry=2024-01-02T00:00Z, signedprotocol=https. A user attempts to access the container over HTTP. What happens?',
    options: [
      { id: 'a', text: 'The request succeeds with read permissions' },
      { id: 'b', text: 'The request fails with a 403 Forbidden error' },
      { id: 'c', text: 'The request is automatically redirected to HTTPS' },
      { id: 'd', text: 'The request succeeds but with reduced permissions' }
    ],
    correctOptionId: 'b',
    explanation: 'When the signedprotocol (spr) parameter is set to https, only HTTPS requests are permitted. An HTTP request would be rejected with a 403 Forbidden error. Azure Storage does not automatically redirect HTTP to HTTPS for SAS-authenticated requests. It is a best practice to always restrict SAS tokens to HTTPS only to prevent man-in-the-middle attacks.'
  },
  {
    type: 'single-choice',
    id: 'st-014',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'You need to create a user delegation SAS using Azure CLI. Which command should you run first?',
    options: [
      { id: 'a', text: 'az storage account keys list' },
      { id: 'b', text: 'az storage account generate-sas' },
      { id: 'c', text: 'az storage container generate-sas --as-user --auth-mode login' },
      { id: 'd', text: 'az storage account create' }
    ],
    correctOptionId: 'c',
    explanation: 'To create a user delegation SAS using Azure CLI, you use the --as-user parameter along with --auth-mode login. The --as-user flag tells the CLI to use the user delegation key (obtained via Azure AD authentication) rather than the storage account key. The az storage account keys list retrieves account keys and is not related to user delegation SAS. The az storage account generate-sas creates an account SAS, not a user delegation SAS.'
  },
  {
    type: 'single-choice',
    id: 'st-015',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'A user delegation SAS token has been compromised. What is the FASTEST way to revoke it?',
    options: [
      { id: 'a', text: 'Regenerate the storage account access keys' },
      { id: 'b', text: 'Revoke the user delegation key' },
      { id: 'c', text: 'Delete the storage account' },
      { id: 'd', text: 'Rotate the Azure AD application secret' }
    ],
    correctOptionId: 'b',
    explanation: 'A user delegation SAS is signed with the user delegation key. Revoking the user delegation key immediately invalidates all user delegation SAS tokens that were signed with that key. This is done using az storage account revoke-delegation-keys. Regenerating storage account access keys would revoke service SAS and account SAS but not user delegation SAS, since they use a different signing mechanism.'
  },
  {
    type: 'multiple-choice',
    id: 'st-016',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'Which TWO parameters are required when creating any SAS token? (Choose two.)',
    options: [
      { id: 'a', text: 'Expiry time (se)' },
      { id: 'b', text: 'Start time (st)' },
      { id: 'c', text: 'Permissions (sp)' },
      { id: 'd', text: 'Signed IP (sip)' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Every SAS token requires at minimum the expiry time (se) and permissions (sp) parameters. The start time (st) is optional; if omitted, the SAS becomes effective immediately. The signed IP (sip) parameter is also optional and is used to restrict SAS usage to a specific IP address or range.'
  },
  {
    type: 'drag-drop',
    id: 'st-017',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'Match each SAS type to its correct description.',
    items: [
      { id: 'item1', text: 'Signed with Azure AD credentials; supports Blob and Data Lake Storage Gen2 only' },
      { id: 'item2', text: 'Signed with account key; delegates access to resources in a single storage service' },
      { id: 'item3', text: 'Signed with account key; can delegate access across multiple storage services' }
    ],
    targets: [
      { id: 'target1', label: 'User delegation SAS', correctItemId: 'item1' },
      { id: 'target2', label: 'Service SAS', correctItemId: 'item2' },
      { id: 'target3', label: 'Account SAS', correctItemId: 'item3' }
    ],
    explanation: 'A user delegation SAS is signed with Azure AD credentials and only supports Blob storage and Data Lake Storage Gen2. A service SAS is signed with the storage account key and delegates access to a resource in a single service (Blob, Queue, Table, or File). An account SAS is also signed with the account key but can delegate access across multiple services and includes service-level operations.'
  },
  {
    type: 'dropdown',
    id: 'st-018',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'Complete the statement about SAS token permissions.',
    segments: [
      { type: 'text', text: 'In a SAS token, the permission character "r" grants ' },
      { type: 'dropdown', id: 'dd1', options: ['read', 'write', 'rename', 'restore'], correctOption: 'read' },
      { type: 'text', text: ' access, while "d" grants ' },
      { type: 'dropdown', id: 'dd2', options: ['download', 'delete', 'duplicate', 'delegate'], correctOption: 'delete' },
      { type: 'text', text: ' access to the specified resource.' }
    ],
    explanation: 'SAS permission characters are: r = read, w = write, d = delete, l = list, a = add, c = create, u = update, p = process (for queues), t = tag, f = filter, x = execute, i = set immutability policy, y = permanent delete. The permissions must be specified in the correct order when constructing the SAS string.'
  },
  {
    type: 'yes-no',
    id: 'st-019',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    scenario: 'Your company uses SAS tokens to provide access to Azure Blob Storage. You are reviewing the SAS token strategy.',
    statements: [
      { id: 's1', text: 'A user delegation SAS can be used to access Azure Files.', correct: false },
      { id: 's2', text: 'A service SAS can be associated with a stored access policy.', correct: true },
      { id: 's3', text: 'An account SAS can grant access to service-level operations such as Get/Set Service Properties.', correct: true }
    ],
    explanation: 'User delegation SAS only works with Blob storage and Data Lake Storage Gen2, not Azure Files. A service SAS can be associated with a stored access policy, which provides an additional level of control including the ability to revoke the SAS. An account SAS can grant access to service-level operations like Get/Set Service Properties, Get Service Stats, which are not available through a service SAS.'
  },
  {
    type: 'single-choice',
    id: 'st-020',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Create and use shared access signature (SAS) tokens',
    stem: 'You run the following PowerShell command:\n\nNew-AzStorageBlobSASToken -Container "data" -Blob "report.csv" -Permission r -ExpiryTime (Get-Date).AddHours(2) -Context $ctx\n\nWhat type of SAS is generated?',
    options: [
      { id: 'a', text: 'User delegation SAS' },
      { id: 'b', text: 'Service SAS for a specific blob' },
      { id: 'c', text: 'Account SAS' },
      { id: 'd', text: 'Stored access policy SAS' }
    ],
    correctOptionId: 'b',
    explanation: 'The New-AzStorageBlobSASToken cmdlet creates a service SAS for a specific blob. It specifies a container and blob name, granting read permission for 2 hours. The $ctx variable is a storage context that typically contains the account key for signing. For a user delegation SAS, you would need to use the -UserDelegationKey parameter instead of a key-based context.'
  },

  // st-021 to st-030: Configure stored access policies

  {
    type: 'single-choice',
    id: 'st-021',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'What is the maximum number of stored access policies that can be defined on a single blob container?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '5' },
      { id: 'c', text: '10' },
      { id: 'd', text: '25' }
    ],
    correctOptionId: 'b',
    explanation: 'Each storage resource (blob container, file share, queue, or table) can have a maximum of 5 stored access policies at any time. This limit applies per container, not per storage account. If you need more than 5 different access patterns, you can use ad hoc SAS tokens for the additional patterns.'
  },
  {
    type: 'single-choice',
    id: 'st-022',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'You have distributed a service SAS to multiple clients. The SAS is associated with a stored access policy on the container. You need to immediately revoke access for all clients. What should you do?',
    options: [
      { id: 'a', text: 'Delete the stored access policy' },
      { id: 'b', text: 'Regenerate the storage account key' },
      { id: 'c', text: 'Change the container access level to private' },
      { id: 'd', text: 'Modify the SAS token expiry time' }
    ],
    correctOptionId: 'a',
    explanation: 'Deleting or modifying the stored access policy immediately invalidates all SAS tokens associated with that policy. This is one of the key benefits of using stored access policies: you can revoke access without regenerating the storage account key. While regenerating the account key would also work, it would invalidate ALL SAS tokens signed with that key, not just the ones you want to revoke.'
  },
  {
    type: 'single-choice',
    id: 'st-023',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'Which Azure CLI command creates a stored access policy on a blob container?',
    options: [
      { id: 'a', text: 'az storage container policy create' },
      { id: 'b', text: 'az storage account policy create' },
      { id: 'c', text: 'az storage blob policy create' },
      { id: 'd', text: 'az storage container access-policy set' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct command is az storage container policy create, which creates a stored access policy for a specified blob container. You specify the container name, policy name, permissions, start time, and expiry time. The policy is then associated with the container and can be referenced when creating SAS tokens.'
  },
  {
    type: 'single-choice',
    id: 'st-024',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'A SAS token references a stored access policy that specifies read (r) permission. The SAS token itself specifies read and write (rw) permissions. What effective permissions does the SAS grant?',
    options: [
      { id: 'a', text: 'Read and write' },
      { id: 'b', text: 'Read only' },
      { id: 'c', text: 'Write only' },
      { id: 'd', text: 'The SAS token is invalid' }
    ],
    correctOptionId: 'd',
    explanation: 'When a SAS token references a stored access policy, the permissions can be specified either on the stored access policy or on the SAS token, but not on both. If both the stored access policy and the SAS token specify permissions, the SAS token is invalid and requests will fail with a 403 error. You must specify permissions in only one place.'
  },
  {
    type: 'single-choice',
    id: 'st-025',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'Which storage services support stored access policies?',
    options: [
      { id: 'a', text: 'Blob containers, file shares, queues, and tables' },
      { id: 'b', text: 'Blob containers and file shares only' },
      { id: 'c', text: 'Blob containers only' },
      { id: 'd', text: 'Blob containers, file shares, and queues only' }
    ],
    correctOptionId: 'a',
    explanation: 'Stored access policies are supported on all four storage services: blob containers, file shares, queues, and tables. Each resource (container, share, queue, or table) can have up to 5 stored access policies. This provides a consistent management experience for SAS tokens across all storage service types.'
  },
  {
    type: 'multiple-choice',
    id: 'st-026',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'Which TWO parameters can be specified on a stored access policy? (Choose two.)',
    options: [
      { id: 'a', text: 'Permissions' },
      { id: 'b', text: 'Signed IP address range' },
      { id: 'c', text: 'Expiry time' },
      { id: 'd', text: 'Allowed protocol (HTTPS/HTTP)' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'A stored access policy can define the start time, expiry time, and permissions. IP address restrictions and protocol restrictions cannot be specified in a stored access policy; these must be specified directly on the SAS token. This means that even with a stored access policy, you may still need to set some SAS parameters on the token itself.'
  },
  {
    type: 'drag-drop',
    id: 'st-027',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'Place the steps in the correct order to create a SAS token associated with a stored access policy.',
    items: [
      { id: 'item1', text: 'Generate a SAS token referencing the stored access policy by name' },
      { id: 'item2', text: 'Create a stored access policy on the container with desired permissions and expiry' },
      { id: 'item3', text: 'Distribute the SAS token to clients that need access' }
    ],
    targets: [
      { id: 'target1', label: 'Step 1', correctItemId: 'item2' },
      { id: 'target2', label: 'Step 2', correctItemId: 'item1' },
      { id: 'target3', label: 'Step 3', correctItemId: 'item3' }
    ],
    explanation: 'First, create the stored access policy on the container specifying permissions, start time, and expiry time. Then, generate a SAS token that references the stored access policy by its identifier name. Finally, distribute the SAS token to clients that need access. The stored access policy must exist before the SAS token can reference it.'
  },
  {
    type: 'dropdown',
    id: 'st-028',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'Complete the PowerShell command to create a stored access policy on a blob container.',
    segments: [
      { type: 'text', text: 'Set-AzStorageContainerStoredAccessPolicy -Container "mycontainer" -Policy "readpolicy" ' },
      { type: 'dropdown', id: 'dd1', options: ['-Permission r', '-Access Read', '-Role Reader', '-Grant Read'], correctOption: '-Permission r' },
      { type: 'text', text: ' -ExpiryTime "2025-01-01T00:00:00Z" -Context ' },
      { type: 'dropdown', id: 'dd2', options: ['$ctx', '$sasToken', '$key', '$credential'], correctOption: '$ctx' },
    ],
    explanation: 'The Set-AzStorageContainerStoredAccessPolicy cmdlet creates or modifies a stored access policy. Permissions are specified using the -Permission parameter with single-character codes (r for read, w for write, d for delete, l for list). The -Context parameter provides the storage account context that includes the connection information.'
  },
  {
    type: 'yes-no',
    id: 'st-029',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    scenario: 'You are managing stored access policies on an Azure Blob Storage container named "reports".',
    statements: [
      { id: 's1', text: 'You can define up to 10 stored access policies on the "reports" container.', correct: false },
      { id: 's2', text: 'Modifying a stored access policy takes up to 30 seconds to take effect.', correct: true },
      { id: 's3', text: 'A user delegation SAS can be associated with a stored access policy.', correct: false }
    ],
    explanation: 'The maximum is 5 stored access policies per container, not 10. When you modify or delete a stored access policy, it can take up to 30 seconds for the change to propagate and take effect. User delegation SAS tokens cannot be associated with stored access policies; only service SAS tokens can reference stored access policies.'
  },
  {
    type: 'single-choice',
    id: 'st-030',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure stored access policies',
    stem: 'You need to modify the expiry time of an existing stored access policy named "readpolicy" on a blob container. What happens to existing SAS tokens that reference this policy?',
    options: [
      { id: 'a', text: 'They continue using the original expiry time' },
      { id: 'b', text: 'They immediately use the new expiry time' },
      { id: 'c', text: 'They become invalid and stop working' },
      { id: 'd', text: 'They must be regenerated to use the new expiry time' }
    ],
    correctOptionId: 'b',
    explanation: 'When you modify a stored access policy, all SAS tokens that reference the policy automatically inherit the updated parameters (within 30 seconds). The SAS tokens do not need to be regenerated because they reference the policy by name, and the actual parameters are evaluated at request time from the stored access policy. This is a key benefit of using stored access policies.'
  },

  // st-031 to st-040: Manage access keys

  {
    type: 'single-choice',
    id: 'st-031',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'How many access keys does an Azure storage account have by default?',
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '4' }
    ],
    correctOptionId: 'b',
    explanation: 'Every Azure storage account has two access keys (key1 and key2) by default. Having two keys allows you to rotate keys without downtime: you can update applications to use key2, then regenerate key1, and vice versa. Both keys provide full access to the storage account.'
  },
  {
    type: 'single-choice',
    id: 'st-032',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'You need to rotate the access keys for a storage account without causing downtime for existing applications. What is the correct approach?',
    options: [
      { id: 'a', text: 'Regenerate key1 first, update all applications, then regenerate key2' },
      { id: 'b', text: 'Update applications to use key2, regenerate key1, update applications to use the new key1, then regenerate key2' },
      { id: 'c', text: 'Regenerate both keys simultaneously, then update all applications' },
      { id: 'd', text: 'Delete the storage account and create a new one with new keys' }
    ],
    correctOptionId: 'b',
    explanation: 'The correct key rotation procedure is: 1) Update all applications to use key2, 2) Regenerate key1, 3) Update all applications to use the new key1, 4) Regenerate key2. This ensures that at no point are applications using an invalidated key. Regenerating both keys simultaneously would break all applications currently using either key.'
  },
  {
    type: 'single-choice',
    id: 'st-033',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'Which Azure CLI command regenerates a storage account access key?',
    options: [
      { id: 'a', text: 'az storage account keys renew --account-name myaccount --key primary' },
      { id: 'b', text: 'az storage account keys regenerate --account-name myaccount --key key1' },
      { id: 'c', text: 'az storage account rotate-key --account-name myaccount --key-name key1' },
      { id: 'd', text: 'az storage account keys list --account-name myaccount --regenerate' }
    ],
    correctOptionId: 'b',
    explanation: 'The correct command is az storage account keys regenerate with the --key parameter specifying which key to regenerate (key1 or key2). This command generates a new key and returns both keys. The old key is immediately invalidated when the new key is generated.'
  },
  {
    type: 'single-choice',
    id: 'st-034',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'Your company policy requires automatic key rotation for storage accounts. Which Azure service can you use to automate storage account key rotation?',
    options: [
      { id: 'a', text: 'Azure Key Vault with key rotation policy' },
      { id: 'b', text: 'Azure Automation only' },
      { id: 'c', text: 'Azure Policy' },
      { id: 'd', text: 'Azure Active Directory' }
    ],
    correctOptionId: 'a',
    explanation: 'Azure Key Vault supports automatic rotation of storage account access keys. You can configure a key rotation policy in Key Vault that automatically regenerates storage account keys at a specified interval. Key Vault manages the rotation process and stores the current key securely. While Azure Automation could be used to script rotation, Key Vault provides a native, integrated solution.'
  },
  {
    type: 'single-choice',
    id: 'st-035',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'What happens to existing SAS tokens signed with key1 when you regenerate key1?',
    options: [
      { id: 'a', text: 'The SAS tokens continue to work until their expiry time' },
      { id: 'b', text: 'The SAS tokens are immediately invalidated' },
      { id: 'c', text: 'The SAS tokens are automatically re-signed with the new key1' },
      { id: 'd', text: 'The SAS tokens fall back to using key2' }
    ],
    correctOptionId: 'b',
    explanation: 'SAS tokens are signed with a specific storage account key. When that key is regenerated, the old key is invalidated, and all SAS tokens signed with the old key immediately stop working because the signature can no longer be verified. SAS tokens are not re-signed or transferred to another key. You must generate new SAS tokens using the new key.'
  },
  {
    type: 'multiple-choice',
    id: 'st-036',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'Which TWO RBAC roles allow a user to regenerate storage account access keys? (Choose two.)',
    options: [
      { id: 'a', text: 'Owner' },
      { id: 'b', text: 'Storage Blob Data Contributor' },
      { id: 'c', text: 'Storage Account Contributor' },
      { id: 'd', text: 'Reader' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'The Owner role and the Storage Account Contributor role both include the Microsoft.Storage/storageAccounts/regenerateKey/action permission needed to regenerate storage account keys. The Storage Blob Data Contributor role only grants access to blob data operations, not management plane operations like key regeneration. The Reader role is read-only and cannot perform any write actions.'
  },
  {
    type: 'drag-drop',
    id: 'st-037',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'Match each key management best practice to its description.',
    items: [
      { id: 'item1', text: 'Use Azure AD authentication instead of shared keys' },
      { id: 'item2', text: 'Store keys in Azure Key Vault' },
      { id: 'item3', text: 'Rotate keys on a regular schedule' }
    ],
    targets: [
      { id: 'target1', label: 'Eliminate the use of shared keys entirely for blob and queue access', correctItemId: 'item1' },
      { id: 'target2', label: 'Protect keys from being stored in application code or config files', correctItemId: 'item2' },
      { id: 'target3', label: 'Reduce the risk window if a key is compromised', correctItemId: 'item3' }
    ],
    explanation: 'Microsoft recommends using Azure AD authentication to eliminate shared key dependency for Blob and Queue storage. Storing keys in Key Vault prevents hardcoding keys in application configuration. Regular key rotation reduces the exposure window if a key is compromised, ensuring that any leaked key becomes invalid after rotation.'
  },
  {
    type: 'yes-no',
    id: 'st-038',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    scenario: 'You are reviewing the access key configuration for a storage account named storageA.',
    statements: [
      { id: 's1', text: 'You can disable shared key authorization for the storage account to force Azure AD authentication.', correct: true },
      { id: 's2', text: 'Both access keys (key1 and key2) provide identical levels of access to the storage account.', correct: true },
      { id: 's3', text: 'Access keys can be scoped to specific containers or blobs for granular access control.', correct: false }
    ],
    explanation: 'You can disable shared key authorization (AllowSharedKeyAccess = false) on a storage account to enforce Azure AD authentication for all data plane operations. Both key1 and key2 provide full, identical access to the storage account. Access keys cannot be scoped to specific resources; they always provide full access to the entire storage account. For granular access, use SAS tokens or Azure AD RBAC.'
  },
  {
    type: 'dropdown',
    id: 'st-039',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'Complete the PowerShell command to retrieve storage account access keys.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['Get-AzStorageAccountKey', 'Get-AzStorageKey', 'Get-AzAccountKey', 'Get-AzStorageAccessKey'], correctOption: 'Get-AzStorageAccountKey' },
      { type: 'text', text: ' -ResourceGroupName "myRG" -Name "mystorageaccount"' }
    ],
    explanation: 'The Get-AzStorageAccountKey cmdlet retrieves the access keys for an Azure storage account. It requires the -ResourceGroupName and -Name parameters. The command returns both key1 and key2, along with their permissions (Full or Read-only if configured with key policy).'
  },
  {
    type: 'single-choice',
    id: 'st-040',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Manage access keys',
    stem: 'You configure a storage account key policy that sets the key expiration period to 60 days. What happens when a key exceeds the expiration period?',
    options: [
      { id: 'a', text: 'The key is automatically regenerated' },
      { id: 'b', text: 'The key stops working and must be regenerated manually' },
      { id: 'c', text: 'The key continues to work, but Azure Policy reports it as non-compliant' },
      { id: 'd', text: 'The storage account is locked until the key is rotated' }
    ],
    correctOptionId: 'c',
    explanation: 'Setting a key expiration policy does not automatically regenerate or disable keys. The keys continue to work even after the expiration period. However, Azure Policy can detect keys that have exceeded the expiration period and report them as non-compliant. Administrators must manually or automatically (via Key Vault) rotate the keys. The policy is a governance mechanism, not an enforcement mechanism.'
  },

  // st-041 to st-050: Configure identity-based access for Azure Files

  {
    type: 'single-choice',
    id: 'st-041',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'Which identity services can be used for identity-based authentication to Azure Files over SMB? Select the BEST answer.',
    options: [
      { id: 'a', text: 'On-premises Active Directory Domain Services (AD DS) only' },
      { id: 'b', text: 'Microsoft Entra Domain Services only' },
      { id: 'c', text: 'On-premises AD DS, Microsoft Entra Domain Services, or Microsoft Entra Kerberos for hybrid identities' },
      { id: 'd', text: 'Microsoft Entra ID with OAuth 2.0 tokens' }
    ],
    correctOptionId: 'c',
    explanation: 'Azure Files supports identity-based authentication over SMB using three options: on-premises Active Directory Domain Services (AD DS), Microsoft Entra Domain Services (formerly Azure AD DS), or Microsoft Entra Kerberos for hybrid user identities. Each option allows users to access file shares using their domain credentials with NTFS-level permissions.'
  },
  {
    type: 'single-choice',
    id: 'st-042',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'You enable Microsoft Entra Domain Services authentication for Azure Files on a storage account. What is the next step to grant a user access to a file share?',
    options: [
      { id: 'a', text: 'Assign an Azure RBAC share-level permission to the user or group' },
      { id: 'b', text: 'Create a SAS token for the file share' },
      { id: 'c', text: 'Add the storage account key to the user\'s credential manager' },
      { id: 'd', text: 'Configure a stored access policy on the file share' }
    ],
    correctOptionId: 'a',
    explanation: 'After enabling identity-based authentication, you must assign share-level permissions using Azure RBAC roles such as Storage File Data SMB Share Reader, Storage File Data SMB Share Contributor, or Storage File Data SMB Share Elevated Contributor. These share-level permissions work alongside NTFS permissions that can be configured at the directory and file level.'
  },
  {
    type: 'single-choice',
    id: 'st-043',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'Which RBAC role should you assign to allow a user to read, write, and delete files in an Azure file share, as well as modify NTFS permissions?',
    options: [
      { id: 'a', text: 'Storage File Data SMB Share Reader' },
      { id: 'b', text: 'Storage File Data SMB Share Contributor' },
      { id: 'c', text: 'Storage File Data SMB Share Elevated Contributor' },
      { id: 'd', text: 'Storage Account Contributor' }
    ],
    correctOptionId: 'c',
    explanation: 'The Storage File Data SMB Share Elevated Contributor role allows read, write, delete, and modification of NTFS permissions (ACLs) on files and directories. The regular Contributor role allows read, write, and delete but cannot modify NTFS permissions. The Reader role only allows read access. Storage Account Contributor is a management plane role and does not grant data plane access to files.'
  },
  {
    type: 'single-choice',
    id: 'st-044',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'You want to use on-premises AD DS authentication for Azure Files. Which prerequisite must be met?',
    options: [
      { id: 'a', text: 'The storage account must be joined to the on-premises AD DS domain' },
      { id: 'b', text: 'The on-premises AD DS must be synchronized to Microsoft Entra ID using Microsoft Entra Connect' },
      { id: 'c', text: 'The storage account must use premium file shares' },
      { id: 'd', text: 'The storage account must be in the same region as the domain controller' }
    ],
    correctOptionId: 'b',
    explanation: 'For on-premises AD DS authentication with Azure Files, the on-premises AD DS must be synchronized to Microsoft Entra ID using Microsoft Entra Connect (formerly Azure AD Connect). The storage account is registered as a computer or service account in the on-premises AD DS. Premium file shares are not required, and the storage account does not need to be in the same region as the domain controller.'
  },
  {
    type: 'single-choice',
    id: 'st-045',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'After configuring identity-based access for an Azure file share, how are NTFS-level permissions (ACLs) configured on directories and files?',
    options: [
      { id: 'a', text: 'Through the Azure portal only' },
      { id: 'b', text: 'By mounting the share and using Windows File Explorer or icacls' },
      { id: 'c', text: 'Using Azure CLI commands' },
      { id: 'd', text: 'Through Azure Policy' }
    ],
    correctOptionId: 'b',
    explanation: 'NTFS-level permissions (Windows ACLs) are configured by mounting the file share on a Windows machine and using standard tools like Windows File Explorer (Properties > Security tab) or the icacls command-line tool. The Azure portal does not provide a way to configure directory/file-level NTFS permissions. Azure RBAC only controls share-level access.'
  },
  {
    type: 'multiple-choice',
    id: 'st-046',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'Which TWO are valid Azure RBAC roles specifically designed for Azure Files share-level access? (Choose two.)',
    options: [
      { id: 'a', text: 'Storage File Data SMB Share Reader' },
      { id: 'b', text: 'Storage Blob Data Reader' },
      { id: 'c', text: 'Storage File Data SMB Share Contributor' },
      { id: 'd', text: 'Storage Queue Data Reader' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Storage File Data SMB Share Reader and Storage File Data SMB Share Contributor are RBAC roles specifically designed for Azure Files share-level access over SMB. The Reader role provides read access to files and directories, while the Contributor role provides read, write, and delete access. Storage Blob Data Reader and Storage Queue Data Reader are for Blob and Queue services respectively.'
  },
  {
    type: 'drag-drop',
    id: 'st-047',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'Match each identity-based authentication option for Azure Files to its key characteristic.',
    items: [
      { id: 'item1', text: 'Requires Microsoft Entra Connect sync; storage account is registered in on-premises domain' },
      { id: 'item2', text: 'Azure-managed domain service; no domain controller management needed' },
      { id: 'item3', text: 'Supports hybrid identities synced to Microsoft Entra ID; uses Kerberos tickets from Entra ID' }
    ],
    targets: [
      { id: 'target1', label: 'On-premises AD DS authentication', correctItemId: 'item1' },
      { id: 'target2', label: 'Microsoft Entra Domain Services authentication', correctItemId: 'item2' },
      { id: 'target3', label: 'Microsoft Entra Kerberos authentication', correctItemId: 'item3' }
    ],
    explanation: 'On-premises AD DS authentication requires Microsoft Entra Connect to sync identities and the storage account to be registered in the on-premises domain. Microsoft Entra Domain Services is a fully managed domain service that eliminates the need to manage domain controllers. Microsoft Entra Kerberos supports hybrid identities and allows cloud-joined or hybrid-joined VMs to access Azure Files using Kerberos tickets obtained from Microsoft Entra ID.'
  },
  {
    type: 'dropdown',
    id: 'st-048',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'Complete the statement about Azure Files identity-based access.',
    segments: [
      { type: 'text', text: 'Azure Files identity-based access enforces permissions at two levels. The ' },
      { type: 'dropdown', id: 'dd1', options: ['share level', 'storage account level', 'subscription level', 'resource group level'], correctOption: 'share level' },
      { type: 'text', text: ' permissions are controlled by Azure RBAC roles, while the ' },
      { type: 'dropdown', id: 'dd2', options: ['directory and file level', 'container level', 'account level', 'service level'], correctOption: 'directory and file level' },
      { type: 'text', text: ' permissions are controlled by Windows NTFS ACLs.' }
    ],
    explanation: 'Azure Files identity-based access uses a two-tier permission model. Share-level permissions are managed through Azure RBAC roles (such as Storage File Data SMB Share Contributor), which control whether a user can access the share at all. Directory and file-level permissions are managed through standard Windows NTFS ACLs, providing granular access control within the share. Both levels must grant access for a user to access a specific file.'
  },
  {
    type: 'yes-no',
    id: 'st-049',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    scenario: 'You are configuring identity-based access for Azure Files in your organization.',
    statements: [
      { id: 's1', text: 'Identity-based authentication for Azure Files works over the NFS protocol.', correct: false },
      { id: 's2', text: 'You can use identity-based access with Azure Files mounted on Linux clients over SMB.', correct: true },
      { id: 's3', text: 'The superuser (root) permission of the storage account key is maintained even after enabling identity-based access.', correct: true }
    ],
    explanation: 'Identity-based authentication for Azure Files works over SMB, not NFS. NFS file shares use network-level security and do not support identity-based authentication. SMB-based Azure Files can be mounted on Linux clients that support SMB 3.0 with identity-based authentication. After enabling identity-based access, storage account key authentication still works and provides superuser-level access to the file share, allowing all NTFS operations.'
  },
  {
    type: 'single-choice',
    id: 'st-050',
    sectionId: 'storage',
    subsectionId: 'configure-storage-access',
    bulletPoint: 'Configure identity-based access for Azure Files',
    stem: 'You enable on-premises AD DS authentication for Azure Files. Users report they cannot access the file share from their domain-joined workstations. The Azure RBAC share-level permissions are correctly configured. What is the most likely cause?',
    options: [
      { id: 'a', text: 'The users have not been assigned NTFS-level permissions on the share directories' },
      { id: 'b', text: 'The storage account firewall is blocking the users' },
      { id: 'c', text: 'The Kerberos ticket has expired for the storage account in AD DS' },
      { id: 'd', text: 'The file share quota has been exceeded' }
    ],
    correctOptionId: 'c',
    explanation: 'When using on-premises AD DS authentication, the storage account is registered as a computer or service logon account in AD DS. The Kerberos ticket (password) for this account can expire if it is not updated. If the password stored in Azure does not match the password in AD DS, authentication will fail. The solution is to update the password for the storage account identity in AD DS using the AzFilesHybrid PowerShell module.'
  },

  // ========== manage-storage-accounts ==========
  // st-051 to st-060: Create and configure storage accounts

  {
    type: 'single-choice',
    id: 'st-051',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'You need to create a storage account that supports Azure Data Lake Storage Gen2 with hierarchical namespace. Which storage account kind should you select?',
    options: [
      { id: 'a', text: 'Storage (general-purpose v1)' },
      { id: 'b', text: 'StorageV2 (general-purpose v2)' },
      { id: 'c', text: 'BlobStorage' },
      { id: 'd', text: 'BlockBlobStorage' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure Data Lake Storage Gen2 with hierarchical namespace requires a StorageV2 (general-purpose v2) storage account. General-purpose v1 and BlobStorage accounts do not support hierarchical namespace. BlockBlobStorage is a premium storage account type for block blobs but also supports hierarchical namespace; however, StorageV2 is the standard recommendation for Data Lake Storage Gen2.'
  },
  {
    type: 'single-choice',
    id: 'st-052',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'Which Azure CLI command creates a general-purpose v2 storage account with locally redundant storage?',
    options: [
      { id: 'a', text: 'az storage account create --name myaccount --resource-group myRG --kind StorageV2 --sku Standard_LRS --location eastus' },
      { id: 'b', text: 'az storage create --name myaccount --resource-group myRG --type v2 --redundancy LRS' },
      { id: 'c', text: 'az storage account new --name myaccount --resource-group myRG --kind v2 --sku LRS' },
      { id: 'd', text: 'az storage account create --name myaccount --resource-group myRG --kind BlobStorage --sku Standard_LRS' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct command is az storage account create with --kind StorageV2 for general-purpose v2 and --sku Standard_LRS for locally redundant storage. The SKU naming convention is Standard_LRS, Standard_GRS, Standard_RAGRS, Standard_ZRS, Standard_GZRS, Standard_RAGZRS, Premium_LRS, or Premium_ZRS. Option D would create a BlobStorage account, not a general-purpose v2 account.'
  },
  {
    type: 'single-choice',
    id: 'st-053',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'What is the naming requirement for Azure storage accounts?',
    options: [
      { id: 'a', text: 'Between 3 and 24 characters, using only lowercase letters and numbers' },
      { id: 'b', text: 'Between 1 and 64 characters, using letters, numbers, and hyphens' },
      { id: 'c', text: 'Between 3 and 24 characters, using letters, numbers, and underscores' },
      { id: 'd', text: 'Between 5 and 50 characters, using lowercase letters only' }
    ],
    correctOptionId: 'a',
    explanation: 'Azure storage account names must be between 3 and 24 characters in length and can contain only lowercase letters and numbers. The name must be globally unique across all Azure storage accounts because it forms part of the storage endpoint URL (e.g., myaccount.blob.core.windows.net). Hyphens, underscores, and uppercase letters are not allowed.'
  },
  {
    type: 'single-choice',
    id: 'st-054',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'You need a storage account that provides the lowest latency for block blob operations. Which performance tier and account kind should you choose?',
    options: [
      { id: 'a', text: 'Standard performance, StorageV2' },
      { id: 'b', text: 'Premium performance, BlockBlobStorage' },
      { id: 'c', text: 'Premium performance, StorageV2' },
      { id: 'd', text: 'Standard performance, BlobStorage' }
    ],
    correctOptionId: 'b',
    explanation: 'Premium BlockBlobStorage accounts use solid-state drives (SSDs) and provide the lowest and most consistent latency for block blob operations. Premium performance with StorageV2 applies to page blobs only (unmanaged disks). For the lowest latency block blob operations, the BlockBlobStorage account kind with premium performance is the correct choice.'
  },
  {
    type: 'single-choice',
    id: 'st-055',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'You need to enable static website hosting on a storage account. Which storage service hosts the static website content?',
    options: [
      { id: 'a', text: 'Azure Files' },
      { id: 'b', text: 'Azure Blob Storage in a container named $web' },
      { id: 'c', text: 'Azure Table Storage' },
      { id: 'd', text: 'Azure Queue Storage' }
    ],
    correctOptionId: 'b',
    explanation: 'When you enable static website hosting, Azure Storage automatically creates a blob container named $web. You upload your static website files (HTML, CSS, JavaScript, images) to this container. The content is served through a separate static website endpoint. The $web container is a special system container used exclusively for static website hosting.'
  },
  {
    type: 'multiple-choice',
    id: 'st-056',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'Which TWO services are available in a general-purpose v2 (StorageV2) storage account but NOT in a BlobStorage account? (Choose two.)',
    options: [
      { id: 'a', text: 'Azure Files' },
      { id: 'b', text: 'Azure Queue Storage' },
      { id: 'c', text: 'Blob Storage' },
      { id: 'd', text: 'Table Storage' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'A BlobStorage account only supports block blobs and append blobs. A StorageV2 (general-purpose v2) account supports all storage services: Blob Storage, Azure Files, Queue Storage, and Table Storage. Azure Files and Queue Storage are not available in BlobStorage accounts. Microsoft recommends using general-purpose v2 accounts for most scenarios.'
  },
  {
    type: 'multiple-choice',
    id: 'st-057',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'Which TWO properties of a storage account can be changed after creation? (Choose two.)',
    options: [
      { id: 'a', text: 'The storage account name' },
      { id: 'b', text: 'The access tier (Hot/Cool)' },
      { id: 'c', text: 'The replication type (e.g., LRS to GRS)' },
      { id: 'd', text: 'The storage account location (region)' }
    ],
    correctOptionIds: ['b', 'c'],
    requiredSelections: 2,
    explanation: 'The default access tier (Hot/Cool) and the replication type can be changed after creation. You can change between LRS, GRS, RAGRS, ZRS, GZRS, and RAGZRS (with some restrictions on conversion paths). The storage account name and location cannot be changed after creation; you would need to create a new storage account and migrate data.'
  },
  {
    type: 'drag-drop',
    id: 'st-058',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'Match each storage account kind to the services it supports.',
    items: [
      { id: 'item1', text: 'Blob, Files, Queue, Table' },
      { id: 'item2', text: 'Block blobs and append blobs only (premium SSD)' },
      { id: 'item3', text: 'Azure Files only (premium SSD)' }
    ],
    targets: [
      { id: 'target1', label: 'StorageV2 (general-purpose v2)', correctItemId: 'item1' },
      { id: 'target2', label: 'BlockBlobStorage (premium)', correctItemId: 'item2' },
      { id: 'target3', label: 'FileStorage (premium)', correctItemId: 'item3' }
    ],
    explanation: 'StorageV2 supports all four services (Blob, Files, Queue, Table) with standard or premium performance for page blobs. BlockBlobStorage is a premium account kind optimized for block blobs and append blobs with SSD storage. FileStorage is a premium account kind exclusively for Azure Files with SSD storage, providing low-latency file share operations.'
  },
  {
    type: 'dropdown',
    id: 'st-059',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    stem: 'Complete the PowerShell command to create a storage account.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['New-AzStorageAccount', 'Add-AzStorageAccount', 'Set-AzStorageAccount', 'Register-AzStorageAccount'], correctOption: 'New-AzStorageAccount' },
      { type: 'text', text: ' -ResourceGroupName "myRG" -Name "mystorageacct" -Location "eastus" -SkuName "' },
      { type: 'dropdown', id: 'dd2', options: ['Standard_LRS', 'LRS', 'StandardLRS', 'Standard-LRS'], correctOption: 'Standard_LRS' },
      { type: 'text', text: '" -Kind "StorageV2"' }
    ],
    explanation: 'The New-AzStorageAccount cmdlet creates a new storage account. The -SkuName parameter uses the format "Standard_LRS" (or Premium_LRS, Standard_GRS, etc.). The -Kind parameter specifies the account type (StorageV2, Storage, BlobStorage, BlockBlobStorage, FileStorage).'
  },
  {
    type: 'yes-no',
    id: 'st-060',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Create and configure storage accounts',
    scenario: 'You are planning the creation of storage accounts for different workloads in your Azure environment.',
    statements: [
      { id: 's1', text: 'A general-purpose v1 storage account can be upgraded to general-purpose v2 without data migration.', correct: true },
      { id: 's2', text: 'A premium BlockBlobStorage account supports the Hot, Cool, and Archive access tiers.', correct: false },
      { id: 's3', text: 'Storage account names must be unique within the resource group.', correct: false }
    ],
    explanation: 'General-purpose v1 accounts can be upgraded to v2 in-place without moving data, though this is a one-way operation. Premium BlockBlobStorage accounts store data on SSDs and do not support tiering to Hot, Cool, or Archive; all data resides on premium storage. Storage account names must be globally unique across all Azure subscriptions, not just within a resource group, because the name is part of the public endpoint URL.'
  },

  // st-061 to st-070: Configure Azure Storage redundancy

  {
    type: 'single-choice',
    id: 'st-061',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'Which redundancy option stores three copies of your data across three availability zones within the primary region?',
    options: [
      { id: 'a', text: 'Locally redundant storage (LRS)' },
      { id: 'b', text: 'Zone-redundant storage (ZRS)' },
      { id: 'c', text: 'Geo-redundant storage (GRS)' },
      { id: 'd', text: 'Geo-zone-redundant storage (GZRS)' }
    ],
    correctOptionId: 'b',
    explanation: 'Zone-redundant storage (ZRS) replicates data synchronously across three Azure availability zones in the primary region. Each availability zone is a separate physical location with independent power, cooling, and networking. ZRS provides durability of at least 99.9999999999% (12 nines) over a given year and allows data to remain accessible even if a single zone becomes unavailable.'
  },
  {
    type: 'single-choice',
    id: 'st-062',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'Your organization requires read access to data in the secondary region for disaster recovery purposes. Which redundancy option should you choose?',
    options: [
      { id: 'a', text: 'GRS' },
      { id: 'b', text: 'RA-GRS' },
      { id: 'c', text: 'ZRS' },
      { id: 'd', text: 'LRS' }
    ],
    correctOptionId: 'b',
    explanation: 'Read-access geo-redundant storage (RA-GRS) replicates data to a secondary region and provides read access to the secondary region at all times, without requiring a failover. Standard GRS also replicates to a secondary region but only provides access to the secondary after a failover is initiated. ZRS and LRS do not replicate to a secondary region.'
  },
  {
    type: 'single-choice',
    id: 'st-063',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'What is the durability (in nines) provided by geo-zone-redundant storage (GZRS)?',
    options: [
      { id: 'a', text: '99.999999999% (11 nines)' },
      { id: 'b', text: '99.99999999999999% (16 nines)' },
      { id: 'c', text: '99.9999999999% (12 nines)' },
      { id: 'd', text: '99.99% (4 nines)' }
    ],
    correctOptionId: 'b',
    explanation: 'GZRS provides at least 99.99999999999999% (16 nines) durability over a given year. It combines the high availability of ZRS (across three availability zones in the primary region) with the disaster protection of geo-replication (to a secondary region using LRS). This is the highest durability offered by Azure Storage redundancy options.'
  },
  {
    type: 'single-choice',
    id: 'st-064',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'You have a storage account configured with GRS. A regional outage occurs in the primary region. How can you access your data?',
    options: [
      { id: 'a', text: 'Data is automatically available from the secondary region endpoint' },
      { id: 'b', text: 'You must initiate a storage account failover to the secondary region' },
      { id: 'c', text: 'Data is lost and must be restored from a backup' },
      { id: 'd', text: 'You must contact Microsoft support to initiate a failover' }
    ],
    correctOptionId: 'b',
    explanation: 'With GRS (without read access), data in the secondary region is not accessible until a failover is initiated. You can initiate a customer-managed failover through the Azure portal, CLI, or PowerShell. Microsoft can also initiate a Microsoft-managed failover in extreme circumstances. After failover, the secondary region becomes the new primary and the storage account is converted to LRS.'
  },
  {
    type: 'single-choice',
    id: 'st-065',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'Which redundancy option is the least expensive?',
    options: [
      { id: 'a', text: 'LRS' },
      { id: 'b', text: 'ZRS' },
      { id: 'c', text: 'GRS' },
      { id: 'd', text: 'RA-GZRS' }
    ],
    correctOptionId: 'a',
    explanation: 'Locally redundant storage (LRS) is the least expensive redundancy option. It maintains three copies of data within a single data center in the primary region. The cost increases as you add zone redundancy (ZRS), geo-redundancy (GRS/GZRS), and read access to the secondary (RA-GRS/RA-GZRS). RA-GZRS is the most expensive option.'
  },
  {
    type: 'multiple-choice',
    id: 'st-066',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'Which TWO statements about storage account failover are correct? (Choose two.)',
    options: [
      { id: 'a', text: 'After failover, the storage account in the new primary region is configured as LRS' },
      { id: 'b', text: 'Customer-managed failover has an RPO of zero (no data loss)' },
      { id: 'c', text: 'The Last Sync Time property indicates the most recent time primary data was written to the secondary' },
      { id: 'd', text: 'Failover is instantaneous and takes less than 1 second' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'After a customer-managed failover, the storage account in the new primary region is converted to LRS. You must then reconfigure redundancy. The Last Sync Time property indicates when data was last successfully replicated to the secondary, helping estimate potential data loss. Customer-managed failover does NOT guarantee zero data loss; any data written after the Last Sync Time may be lost. Failover is not instantaneous; it typically takes about an hour.'
  },
  {
    type: 'drag-drop',
    id: 'st-067',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'Match each redundancy type to the number of data copies it maintains.',
    items: [
      { id: 'item1', text: '3 copies in a single data center' },
      { id: 'item2', text: '3 copies across 3 availability zones in primary region' },
      { id: 'item3', text: '6 copies total: 3 in primary region (across zones), 3 in secondary region (single data center)' }
    ],
    targets: [
      { id: 'target1', label: 'LRS', correctItemId: 'item1' },
      { id: 'target2', label: 'ZRS', correctItemId: 'item2' },
      { id: 'target3', label: 'GZRS', correctItemId: 'item3' }
    ],
    explanation: 'LRS stores 3 copies in a single data center within the primary region. ZRS stores 3 copies across 3 availability zones in the primary region. GZRS stores 3 copies across availability zones in the primary region (ZRS) plus 3 additional copies in a single data center in the secondary region (LRS), for a total of 6 copies.'
  },
  {
    type: 'dropdown',
    id: 'st-068',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'Complete the statement about Azure Storage redundancy.',
    segments: [
      { type: 'text', text: 'Geo-redundant storage replicates data ' },
      { type: 'dropdown', id: 'dd1', options: ['synchronously', 'asynchronously', 'on-demand', 'hourly'], correctOption: 'asynchronously' },
      { type: 'text', text: ' to a secondary region that is ' },
      { type: 'dropdown', id: 'dd2', options: ['user-selected', 'determined by Azure based on the primary region', 'always in the same geography', 'always in a different geography'], correctOption: 'determined by Azure based on the primary region' },
      { type: 'text', text: '.' }
    ],
    explanation: 'Geo-replication (GRS, RA-GRS, GZRS, RA-GZRS) copies data asynchronously to a secondary region. The secondary region is a fixed paired region determined by Azure based on the primary region (e.g., East US is paired with West US). You cannot choose which secondary region is used for geo-replication. The asynchronous nature means there can be a delay between writes to the primary and their availability in the secondary.'
  },
  {
    type: 'yes-no',
    id: 'st-069',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    scenario: 'You are evaluating Azure Storage redundancy options for your organization.',
    statements: [
      { id: 's1', text: 'You can change a storage account from LRS to ZRS without creating a new account.', correct: true },
      { id: 's2', text: 'Premium storage accounts support all redundancy options (LRS, ZRS, GRS, GZRS).', correct: false },
      { id: 's3', text: 'With RA-GRS, you can write data to the secondary region endpoint.', correct: false }
    ],
    explanation: 'You can change the redundancy type of a storage account in most cases, including LRS to ZRS (a live migration can be requested from Microsoft). Premium storage accounts only support LRS and ZRS; geo-redundant options are not available for premium accounts. With RA-GRS, the secondary region endpoint is read-only; you cannot write data to it. All writes must go through the primary region endpoint.'
  },
  {
    type: 'single-choice',
    id: 'st-070',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure Azure Storage redundancy',
    stem: 'You have a storage account with RA-GRS. The primary endpoint is mystorageaccount.blob.core.windows.net. What is the secondary read endpoint?',
    options: [
      { id: 'a', text: 'mystorageaccount.blob.core.windows.net/secondary' },
      { id: 'b', text: 'mystorageaccount-secondary.blob.core.windows.net' },
      { id: 'c', text: 'secondary.mystorageaccount.blob.core.windows.net' },
      { id: 'd', text: 'mystorageaccount.blob.secondary.core.windows.net' }
    ],
    correctOptionId: 'b',
    explanation: 'The secondary read endpoint for RA-GRS and RA-GZRS follows the pattern: {accountname}-secondary.{service}.core.windows.net. For blob storage, this would be mystorageaccount-secondary.blob.core.windows.net. This endpoint provides read-only access to the replicated data in the secondary region.'
  },

  // st-071 to st-080: Configure object replication

  {
    type: 'single-choice',
    id: 'st-071',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'What is a prerequisite for configuring object replication between two storage accounts?',
    options: [
      { id: 'a', text: 'Both accounts must be in the same region' },
      { id: 'b', text: 'Blob versioning must be enabled on both accounts' },
      { id: 'c', text: 'Both accounts must use the same redundancy type' },
      { id: 'd', text: 'Both accounts must be premium storage accounts' }
    ],
    correctOptionId: 'b',
    explanation: 'Object replication requires blob versioning to be enabled on both the source and destination storage accounts. It also requires change feed to be enabled on the source account. The accounts can be in different regions, use different redundancy types, and can be standard or premium. Object replication works asynchronously and is configured through replication policies and rules.'
  },
  {
    type: 'single-choice',
    id: 'st-072',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'You configure object replication from storage account Source to storage account Destination. A blob that existed in the Source container before the replication rule was created. Will this blob be replicated?',
    options: [
      { id: 'a', text: 'Yes, all existing blobs are replicated automatically' },
      { id: 'b', text: 'No, only blobs created after the rule is configured are replicated by default' },
      { id: 'c', text: 'Only if the blob was modified within the last 24 hours' },
      { id: 'd', text: 'Only if the blob is in the Hot access tier' }
    ],
    correctOptionId: 'b',
    explanation: 'By default, object replication only replicates blobs that are added or modified after the replication rule is configured. Existing blobs are not replicated unless you configure a filter to include blobs created after a specific date or set the copy option to replicate all blobs. This is an important consideration when planning object replication.'
  },
  {
    type: 'single-choice',
    id: 'st-073',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'Which of the following blob types does object replication support?',
    options: [
      { id: 'a', text: 'Block blobs only' },
      { id: 'b', text: 'Block blobs and append blobs' },
      { id: 'c', text: 'Block blobs, append blobs, and page blobs' },
      { id: 'd', text: 'Page blobs only' }
    ],
    correctOptionId: 'a',
    explanation: 'Object replication supports block blobs only. Append blobs and page blobs are not supported. Additionally, blobs in the Archive tier cannot be used as a source for object replication; they must be in the Hot or Cool tier. Blob snapshots and versions from the source account are not replicated to the destination account.'
  },
  {
    type: 'single-choice',
    id: 'st-074',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'In an object replication policy, what defines which blobs are replicated from the source container to the destination container?',
    options: [
      { id: 'a', text: 'A replication rule with optional prefix filter' },
      { id: 'b', text: 'A lifecycle management policy' },
      { id: 'c', text: 'A blob index tag' },
      { id: 'd', text: 'A container access level' }
    ],
    correctOptionId: 'a',
    explanation: 'Object replication uses replication rules within a replication policy. Each rule specifies a source container and destination container mapping, and can optionally include a prefix filter to replicate only blobs whose names begin with a specific prefix. A policy can contain up to 10 rules, each mapping a different source-destination container pair.'
  },
  {
    type: 'single-choice',
    id: 'st-075',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'Which feature must be enabled on the SOURCE storage account for object replication to work, in addition to blob versioning?',
    options: [
      { id: 'a', text: 'Soft delete' },
      { id: 'b', text: 'Change feed' },
      { id: 'c', text: 'Hierarchical namespace' },
      { id: 'd', text: 'Static website' }
    ],
    correctOptionId: 'b',
    explanation: 'Change feed must be enabled on the source storage account for object replication. The change feed provides a log of all changes (creates, modifications, deletions) to blobs in the account, which the object replication process uses to identify and replicate changed blobs to the destination. Blob versioning must be enabled on both source and destination accounts.'
  },
  {
    type: 'multiple-choice',
    id: 'st-076',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'Which TWO scenarios are valid use cases for object replication? (Choose two.)',
    options: [
      { id: 'a', text: 'Minimizing read latency by replicating data closer to users in different regions' },
      { id: 'b', text: 'Replacing geo-redundant storage (GRS) for disaster recovery' },
      { id: 'c', text: 'Processing data in a different region while maintaining the source data intact' },
      { id: 'd', text: 'Synchronously replicating data for zero-RPO disaster recovery' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Object replication is useful for reducing read latency by placing data closer to users in different geographical regions, and for processing/analyzing data in a different region while keeping the source intact. Object replication is asynchronous and does not guarantee zero RPO, so it is not a replacement for GRS. It complements, rather than replaces, storage redundancy options.'
  },
  {
    type: 'drag-drop',
    id: 'st-077',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'Place the steps in the correct order to configure object replication.',
    items: [
      { id: 'item1', text: 'Create a replication policy with rules mapping source to destination containers' },
      { id: 'item2', text: 'Enable blob versioning on both source and destination accounts' },
      { id: 'item3', text: 'Enable change feed on the source account' }
    ],
    targets: [
      { id: 'target1', label: 'Step 1', correctItemId: 'item2' },
      { id: 'target2', label: 'Step 2', correctItemId: 'item3' },
      { id: 'target3', label: 'Step 3', correctItemId: 'item1' }
    ],
    explanation: 'First, enable blob versioning on both the source and destination storage accounts (prerequisite). Second, enable change feed on the source account (prerequisite). Third, create the replication policy with rules that define the source and destination container mappings and any optional prefix filters. The prerequisites must be in place before the policy can be created.'
  },
  {
    type: 'dropdown',
    id: 'st-078',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'Complete the statement about object replication limitations.',
    segments: [
      { type: 'text', text: 'Object replication supports ' },
      { type: 'dropdown', id: 'dd1', options: ['block blobs', 'page blobs', 'append blobs', 'all blob types'], correctOption: 'block blobs' },
      { type: 'text', text: ' only. Blobs in the ' },
      { type: 'dropdown', id: 'dd2', options: ['Archive', 'Cool', 'Hot', 'Premium'], correctOption: 'Archive' },
      { type: 'text', text: ' tier cannot be used as a source for replication.' }
    ],
    explanation: 'Object replication only supports block blobs. Page blobs and append blobs are not supported. Blobs in the Archive access tier cannot be a source for object replication because they are offline and cannot be read until rehydrated. Source blobs must be in the Hot or Cool tier.'
  },
  {
    type: 'yes-no',
    id: 'st-079',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    scenario: 'You have configured object replication between a source account in East US and a destination account in West Europe.',
    statements: [
      { id: 's1', text: 'Blob snapshots from the source account are replicated to the destination.', correct: false },
      { id: 's2', text: 'A single replication policy can contain up to 10 rules.', correct: true },
      { id: 's3', text: 'Deleting a blob in the source account automatically deletes it in the destination account.', correct: false }
    ],
    explanation: 'Blob snapshots are not replicated from source to destination in object replication. A single replication policy can contain up to 10 rules, each mapping a source container to a destination container. Deletions are not replicated by default; deleting a blob in the source does not delete the corresponding blob in the destination. This is by design to protect against accidental data loss.'
  },
  {
    type: 'single-choice',
    id: 'st-080',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure object replication',
    stem: 'You need to check the replication status of a specific blob. Where can you find this information?',
    options: [
      { id: 'a', text: 'In the blob metadata under x-ms-replication-status' },
      { id: 'b', text: 'In the blob properties under x-ms-or-policy-id and x-ms-or-rule-id' },
      { id: 'c', text: 'In the storage account activity log' },
      { id: 'd', text: 'In the replication policy status page in the Azure portal' }
    ],
    correctOptionId: 'b',
    explanation: 'The replication status for a specific blob can be found in the blob properties. The x-ms-or-policy-id and x-ms-or-rule-id headers contain the replication policy and rule IDs, and the replication status indicates whether replication is complete, pending, or failed. You can check this by getting the blob properties using the Azure portal, CLI, or REST API.'
  },

  // st-081 to st-090: Configure storage account encryption

  {
    type: 'single-choice',
    id: 'st-081',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'By default, Azure Storage encrypts data at rest using which encryption method?',
    options: [
      { id: 'a', text: '256-bit AES encryption with Microsoft-managed keys' },
      { id: 'b', text: '128-bit AES encryption with Microsoft-managed keys' },
      { id: 'c', text: '256-bit AES encryption with customer-managed keys' },
      { id: 'd', text: 'No encryption; it must be enabled manually' }
    ],
    correctOptionId: 'a',
    explanation: 'Azure Storage automatically encrypts all data at rest using 256-bit AES encryption (one of the strongest block ciphers available) with Microsoft-managed keys. This encryption is enabled by default for all storage accounts and cannot be disabled. It applies to all Azure Storage services (Blob, Files, Queue, Table) and all redundancy options.'
  },
  {
    type: 'single-choice',
    id: 'st-082',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'You need to use customer-managed keys (CMK) for storage account encryption. Where must the encryption keys be stored?',
    options: [
      { id: 'a', text: 'Azure Key Vault or Azure Key Vault Managed HSM only' },
      { id: 'b', text: 'Any on-premises HSM device' },
      { id: 'c', text: 'Azure Active Directory' },
      { id: 'd', text: 'The storage account itself' }
    ],
    correctOptionId: 'a',
    explanation: 'Customer-managed keys for Azure Storage encryption must be stored in Azure Key Vault or Azure Key Vault Managed HSM. The storage account accesses the key vault to wrap/unwrap the data encryption key. You can use either a system-assigned or user-assigned managed identity to authorize the storage account to access the key vault. On-premises HSM devices and Azure AD are not valid key stores for this purpose.'
  },
  {
    type: 'single-choice',
    id: 'st-083',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'What is the difference between encryption scopes and account-level encryption?',
    options: [
      { id: 'a', text: 'Encryption scopes allow different containers or blobs to use different encryption keys' },
      { id: 'b', text: 'Encryption scopes provide stronger encryption than account-level encryption' },
      { id: 'c', text: 'Encryption scopes only work with premium storage accounts' },
      { id: 'd', text: 'Encryption scopes disable Microsoft-managed key encryption' }
    ],
    correctOptionId: 'a',
    explanation: 'Encryption scopes allow you to manage encryption at the level of an individual container or blob. Different encryption scopes can use different encryption keys (either Microsoft-managed or customer-managed), providing granular control over encryption. Account-level encryption applies a single key to the entire account. Both use the same 256-bit AES encryption strength.'
  },
  {
    type: 'single-choice',
    id: 'st-084',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'You configure a storage account to use a customer-managed key from Azure Key Vault. The Key Vault key is accidentally deleted. What happens to the data in the storage account?',
    options: [
      { id: 'a', text: 'Data remains accessible because a cached copy of the key is used' },
      { id: 'b', text: 'Data becomes inaccessible until the key is recovered' },
      { id: 'c', text: 'Data is permanently lost' },
      { id: 'd', text: 'Azure automatically reverts to Microsoft-managed keys' }
    ],
    correctOptionId: 'b',
    explanation: 'If the customer-managed key is deleted or access is revoked from the Key Vault, the storage account data becomes inaccessible because Azure Storage cannot decrypt the data encryption key without the key wrapping key. If Key Vault soft delete is enabled (which is required), the key can be recovered to restore access. Azure does not automatically fall back to Microsoft-managed keys. This is why soft delete and purge protection should always be enabled on key vaults used for storage encryption.'
  },
  {
    type: 'single-choice',
    id: 'st-085',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'Which option provides double encryption for Azure Storage data at rest?',
    options: [
      { id: 'a', text: 'Enable infrastructure encryption on the storage account' },
      { id: 'b', text: 'Use two customer-managed keys simultaneously' },
      { id: 'c', text: 'Enable HTTPS-only transfer' },
      { id: 'd', text: 'Configure encryption at the file system level inside the VM' }
    ],
    correctOptionId: 'a',
    explanation: 'Infrastructure encryption provides a second layer of encryption at the storage infrastructure level using a different encryption algorithm and key. When enabled, data is encrypted twice: once at the service level (using either Microsoft-managed or customer-managed keys) and once at the infrastructure level (always using Microsoft-managed keys with a different algorithm). This is for organizations requiring the highest level of encryption assurance.'
  },
  {
    type: 'multiple-choice',
    id: 'st-086',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'Which TWO requirements must be met for a Key Vault to be used with customer-managed keys for storage encryption? (Choose two.)',
    options: [
      { id: 'a', text: 'Soft delete must be enabled on the Key Vault' },
      { id: 'b', text: 'Purge protection must be enabled on the Key Vault' },
      { id: 'c', text: 'The Key Vault must be in the same region as the storage account' },
      { id: 'd', text: 'The Key Vault must use premium SKU' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Both soft delete and purge protection must be enabled on the Azure Key Vault used for customer-managed keys. Soft delete ensures deleted keys can be recovered, and purge protection prevents permanent deletion of keys during the soft delete retention period. The Key Vault does not need to be in the same region as the storage account (though it is recommended for latency), and standard SKU is sufficient.'
  },
  {
    type: 'drag-drop',
    id: 'st-087',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'Match each encryption key option to its description.',
    items: [
      { id: 'item1', text: 'Keys managed entirely by Microsoft; no customer configuration needed' },
      { id: 'item2', text: 'Keys stored in Azure Key Vault; customer controls key lifecycle' },
      { id: 'item3', text: 'Keys provided at the request level; customer supplies key with each operation' }
    ],
    targets: [
      { id: 'target1', label: 'Microsoft-managed keys', correctItemId: 'item1' },
      { id: 'target2', label: 'Customer-managed keys (CMK)', correctItemId: 'item2' },
      { id: 'target3', label: 'Customer-provided keys', correctItemId: 'item3' }
    ],
    explanation: 'Microsoft-managed keys are the default and require no configuration. Customer-managed keys (CMK) are stored in Azure Key Vault or Managed HSM, giving the customer control over key rotation, access, and lifecycle. Customer-provided keys are supplied with individual Blob storage requests (via the x-ms-encryption-key header), giving per-request encryption control but adding complexity.'
  },
  {
    type: 'dropdown',
    id: 'st-088',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'Complete the statement about Azure Storage encryption.',
    segments: [
      { type: 'text', text: 'Azure Storage encryption at rest is ' },
      { type: 'dropdown', id: 'dd1', options: ['enabled by default and cannot be disabled', 'disabled by default and must be enabled', 'optional and configurable', 'only available for premium accounts'], correctOption: 'enabled by default and cannot be disabled' },
      { type: 'text', text: '. Customer-provided keys can be specified on individual requests to ' },
      { type: 'dropdown', id: 'dd2', options: ['Blob storage', 'Azure Files', 'Table storage', 'Queue storage'], correctOption: 'Blob storage' },
      { type: 'text', text: ' only.' }
    ],
    explanation: 'Azure Storage encryption is enabled by default for all storage accounts and cannot be disabled. This ensures all data is encrypted at rest regardless of configuration. Customer-provided keys (where the encryption key is included in each request header) are only supported for Blob storage operations, not for Azure Files, Table, or Queue storage.'
  },
  {
    type: 'yes-no',
    id: 'st-089',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    scenario: 'You are reviewing the encryption configuration for your Azure storage accounts.',
    statements: [
      { id: 's1', text: 'You can switch from customer-managed keys back to Microsoft-managed keys at any time.', correct: true },
      { id: 's2', text: 'Azure Storage encryption uses 128-bit AES encryption by default.', correct: false },
      { id: 's3', text: 'Infrastructure encryption can be enabled after the storage account is created.', correct: false }
    ],
    explanation: 'You can switch between Microsoft-managed and customer-managed keys at any time without affecting data availability. Azure Storage uses 256-bit AES encryption (not 128-bit), which is FIPS 140-2 compliant. Infrastructure encryption (double encryption) must be enabled at the time of storage account creation; it cannot be added after the account is created.'
  },
  {
    type: 'single-choice',
    id: 'st-090',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Configure storage account encryption',
    stem: 'You want to ensure that a specific blob container uses a different encryption key than the rest of the storage account. What should you configure?',
    options: [
      { id: 'a', text: 'A separate storage account for the container' },
      { id: 'b', text: 'An encryption scope assigned to the container' },
      { id: 'c', text: 'A different customer-managed key version' },
      { id: 'd', text: 'A stored access policy with encryption settings' }
    ],
    correctOptionId: 'b',
    explanation: 'Encryption scopes allow you to use a different encryption key for specific containers or blobs within the same storage account. You create an encryption scope with either a Microsoft-managed or customer-managed key, then assign it to a container. All blobs uploaded to that container will use the specified encryption scope. This avoids the need for separate storage accounts for different encryption requirements.'
  },

  // st-091 to st-100: Manage data by using Azure Storage Explorer and AzCopy

  {
    type: 'single-choice',
    id: 'st-091',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'Which AzCopy command copies all blobs from a local directory to a blob container?',
    options: [
      { id: 'a', text: 'azcopy copy "C:\\data\\*" "https://myaccount.blob.core.windows.net/container?SAS" --recursive' },
      { id: 'b', text: 'azcopy sync "C:\\data" "https://myaccount.blob.core.windows.net/container"' },
      { id: 'c', text: 'azcopy upload "C:\\data" "https://myaccount.blob.core.windows.net/container"' },
      { id: 'd', text: 'azcopy move "C:\\data" "https://myaccount.blob.core.windows.net/container"' }
    ],
    correctOptionId: 'a',
    explanation: 'The azcopy copy command with the --recursive flag copies all files from a local directory to a blob container. The destination URL includes a SAS token for authentication (or you can use azcopy login for Azure AD authentication). The azcopy sync command synchronizes content but has different behavior. There is no "azcopy upload" command.'
  },
  {
    type: 'single-choice',
    id: 'st-092',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'What is the difference between azcopy copy and azcopy sync?',
    options: [
      { id: 'a', text: 'copy is one-directional; sync compares timestamps and only copies modified files' },
      { id: 'b', text: 'copy supports Azure AD; sync supports SAS tokens only' },
      { id: 'c', text: 'copy works with blobs only; sync works with all storage services' },
      { id: 'd', text: 'There is no difference; they are aliases for the same command' }
    ],
    correctOptionId: 'a',
    explanation: 'The azcopy copy command copies all specified files to the destination regardless of whether they already exist there. The azcopy sync command compares file names and last-modified timestamps, and only copies files that are newer or do not exist at the destination. Sync can also optionally delete files at the destination that do not exist at the source (--delete-destination flag). Both commands support Azure AD and SAS authentication.'
  },
  {
    type: 'single-choice',
    id: 'st-093',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'You need to authenticate AzCopy using Azure AD to copy data to a blob container. Which command should you run first?',
    options: [
      { id: 'a', text: 'azcopy login' },
      { id: 'b', text: 'azcopy auth --method aad' },
      { id: 'c', text: 'az login' },
      { id: 'd', text: 'azcopy connect --identity' }
    ],
    correctOptionId: 'a',
    explanation: 'The azcopy login command authenticates AzCopy with Azure AD. It opens a browser for interactive authentication or can use a service principal with --tenant-id and --application-id. Once authenticated, AzCopy caches the token and uses it for subsequent operations. The az login command authenticates the Azure CLI, not AzCopy; they have separate authentication contexts.'
  },
  {
    type: 'single-choice',
    id: 'st-094',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'You need to copy blobs from one Azure storage account to another using AzCopy. The source account provides a SAS token. What happens server-side during the copy?',
    options: [
      { id: 'a', text: 'Data is downloaded to the local machine and then uploaded to the destination' },
      { id: 'b', text: 'Data is copied directly between storage accounts on the server side without passing through the local machine' },
      { id: 'c', text: 'AzCopy creates a temporary copy in Azure Blob staging area' },
      { id: 'd', text: 'The copy requires both accounts to be in the same region' }
    ],
    correctOptionId: 'b',
    explanation: 'When copying between Azure storage accounts, AzCopy leverages the server-side Put Block From URL and Put Blob From URL APIs. Data is copied directly between storage servers without being downloaded to and re-uploaded from the local machine. This is faster and does not consume local bandwidth. The accounts do not need to be in the same region.'
  },
  {
    type: 'single-choice',
    id: 'st-095',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'In Azure Storage Explorer, how can you connect to a storage account if you do not have an Azure subscription but have been given a SAS token?',
    options: [
      { id: 'a', text: 'Use the "Attach to Azure Storage" option and select "SAS token"' },
      { id: 'b', text: 'You cannot connect without an Azure subscription' },
      { id: 'c', text: 'Use the "Add Account" option and enter the SAS as a password' },
      { id: 'd', text: 'Enter the SAS token in the connection string dialog only' }
    ],
    correctOptionId: 'a',
    explanation: 'Azure Storage Explorer allows connecting to storage resources without an Azure subscription using several methods, including SAS tokens. You use the "Attach to Azure Storage" dialog and select the SAS URI or token option. You can attach to a storage account, container, or individual service using the SAS. This is useful for granting temporary access to external users.'
  },
  {
    type: 'multiple-choice',
    id: 'st-096',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'Which TWO authentication methods does AzCopy support for accessing Azure Blob Storage? (Choose two.)',
    options: [
      { id: 'a', text: 'Azure AD (OAuth)' },
      { id: 'b', text: 'SAS tokens' },
      { id: 'c', text: 'SSH keys' },
      { id: 'd', text: 'Basic authentication (username/password)' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'AzCopy supports Azure AD authentication (using azcopy login) and SAS tokens appended to the storage URL. For Blob and Data Lake Storage, both methods work. For Azure Files, only SAS tokens are supported (Azure AD is not supported for AzCopy with Files). SSH keys and basic authentication are not supported authentication methods for AzCopy.'
  },
  {
    type: 'drag-drop',
    id: 'st-097',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'Match each AzCopy command to its purpose.',
    items: [
      { id: 'item1', text: 'azcopy make' },
      { id: 'item2', text: 'azcopy remove' },
      { id: 'item3', text: 'azcopy jobs list' }
    ],
    targets: [
      { id: 'target1', label: 'Create a new blob container or file share', correctItemId: 'item1' },
      { id: 'target2', label: 'Delete blobs or files from a storage account', correctItemId: 'item2' },
      { id: 'target3', label: 'View the status of previously submitted transfer operations', correctItemId: 'item3' }
    ],
    explanation: 'The azcopy make command creates a new container or file share at the specified URL. The azcopy remove command deletes blobs or files. The azcopy jobs list command displays information about all current and completed AzCopy transfer jobs, including status, file counts, and any errors. These are commonly used AzCopy commands alongside copy and sync.'
  },
  {
    type: 'dropdown',
    id: 'st-098',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'Complete the AzCopy command to synchronize a local directory with a blob container, deleting blobs at the destination that do not exist locally.',
    segments: [
      { type: 'text', text: 'azcopy ' },
      { type: 'dropdown', id: 'dd1', options: ['sync', 'copy', 'mirror', 'replicate'], correctOption: 'sync' },
      { type: 'text', text: ' "C:\\localdata" "https://myaccount.blob.core.windows.net/container?SAS" --' },
      { type: 'dropdown', id: 'dd2', options: ['delete-destination=true', 'remove-extra', 'clean-target', 'purge-missing'], correctOption: 'delete-destination=true' }
    ],
    explanation: 'The azcopy sync command with --delete-destination=true synchronizes the source to the destination and removes any files at the destination that do not exist at the source. This effectively mirrors the local directory to the blob container. Without the --delete-destination flag, sync only adds and updates files but does not remove extra files at the destination.'
  },
  {
    type: 'yes-no',
    id: 'st-099',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    scenario: 'You are using Azure Storage Explorer and AzCopy to manage data in Azure Storage accounts.',
    statements: [
      { id: 's1', text: 'Azure Storage Explorer uses AzCopy as its underlying transfer engine for blob transfers.', correct: true },
      { id: 's2', text: 'AzCopy can only run on Windows operating systems.', correct: false },
      { id: 's3', text: 'AzCopy sync command supports synchronization from blob storage to a local directory.', correct: true }
    ],
    explanation: 'Azure Storage Explorer uses AzCopy internally as its data transfer engine for blob operations. AzCopy is a cross-platform tool available for Windows, Linux, and macOS. The azcopy sync command supports bidirectional synchronization: you can sync from local to blob or from blob to local. However, sync between two blob accounts is also supported.'
  },
  {
    type: 'single-choice',
    id: 'st-100',
    sectionId: 'storage',
    subsectionId: 'manage-storage-accounts',
    bulletPoint: 'Manage data by using Azure Storage Explorer and AzCopy',
    stem: 'You need to transfer a 50 GB file to Azure Blob Storage using AzCopy. How does AzCopy handle large file uploads by default?',
    options: [
      { id: 'a', text: 'Uploads the file as a single request' },
      { id: 'b', text: 'Automatically splits the file into blocks and uploads them in parallel' },
      { id: 'c', text: 'Compresses the file before uploading' },
      { id: 'd', text: 'Requires the file to be manually split before upload' }
    ],
    correctOptionId: 'b',
    explanation: 'AzCopy automatically splits large files into blocks and uploads them in parallel to maximize throughput. This uses the Put Block and Put Block List APIs for block blobs. AzCopy automatically determines the optimal block size based on the file size. It also supports automatic retry and resume for interrupted transfers using the azcopy jobs resume command.'
  },

  // ========== configure-files-blob ==========
  // st-101 to st-110: Create and configure a file share in Azure Storage

  {
    type: 'single-choice',
    id: 'st-101',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'What is the maximum size of a standard Azure file share with large file shares enabled?',
    options: [
      { id: 'a', text: '5 TiB' },
      { id: 'b', text: '10 TiB' },
      { id: 'c', text: '100 TiB' },
      { id: 'd', text: '500 TiB' }
    ],
    correctOptionId: 'c',
    explanation: 'Standard Azure file shares support up to 100 TiB when large file shares are enabled on the storage account. Without large file shares enabled, the default maximum is 5 TiB. Large file shares can be enabled on StorageV2 accounts but have some limitations, such as only supporting LRS and ZRS redundancy (not GRS or GZRS).'
  },
  {
    type: 'single-choice',
    id: 'st-102',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'Which protocols does Azure Files support for accessing file shares?',
    options: [
      { id: 'a', text: 'SMB only' },
      { id: 'b', text: 'NFS only' },
      { id: 'c', text: 'SMB and NFS' },
      { id: 'd', text: 'SMB, NFS, and FTP' }
    ],
    correctOptionId: 'c',
    explanation: 'Azure Files supports both SMB (Server Message Block) and NFS (Network File System) protocols. SMB shares support SMB 3.x and are accessible from Windows, Linux, and macOS. NFS shares support NFS 4.1 and are accessible from Linux and macOS. NFS shares require premium FileStorage accounts and do not support identity-based authentication. FTP is not supported by Azure Files.'
  },
  {
    type: 'single-choice',
    id: 'st-103',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'You need to mount an Azure file share on a Windows 10 computer over the internet. Which port must be open for outbound traffic?',
    options: [
      { id: 'a', text: 'Port 443' },
      { id: 'b', text: 'Port 445' },
      { id: 'c', text: 'Port 2049' },
      { id: 'd', text: 'Port 80' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure file shares accessed via SMB require port 445 to be open for outbound traffic. Many ISPs and organizations block port 445 due to security concerns. If port 445 is blocked, you can use Azure File Sync, a VPN, or ExpressRoute to access the file share. Port 443 is used for HTTPS. Port 2049 is used for NFS protocol, not SMB.'
  },
  {
    type: 'single-choice',
    id: 'st-104',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'Which Azure CLI command creates a file share in a storage account?',
    options: [
      { id: 'a', text: 'az storage share-rm create --storage-account myaccount --name myshare --quota 100' },
      { id: 'b', text: 'az storage fileshare create --name myshare --account-name myaccount' },
      { id: 'c', text: 'az storage create share --name myshare --account myaccount' },
      { id: 'd', text: 'az fileshare create --storage-account myaccount --share-name myshare' }
    ],
    correctOptionId: 'a',
    explanation: 'The az storage share-rm create command creates a new Azure file share using the Azure Resource Manager (ARM) API. The --storage-account parameter specifies the storage account, --name is the share name, and --quota sets the size limit in GiB. The older az storage share create command uses the data plane API and is less commonly recommended for management operations.'
  },
  {
    type: 'single-choice',
    id: 'st-105',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'You need to create an Azure file share that supports NFS protocol. Which account type is required?',
    options: [
      { id: 'a', text: 'StorageV2 with standard performance' },
      { id: 'b', text: 'FileStorage with premium performance' },
      { id: 'c', text: 'StorageV2 with premium performance' },
      { id: 'd', text: 'BlobStorage' }
    ],
    correctOptionId: 'b',
    explanation: 'NFS Azure file shares require a FileStorage account kind with premium performance. NFS shares are not supported on standard storage accounts or other premium account types. FileStorage premium accounts use SSD storage and provide low-latency access. NFS shares also require a VNet configuration (service endpoint or private endpoint) and do not support encryption in transit.'
  },
  {
    type: 'multiple-choice',
    id: 'st-106',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'Which TWO are limitations of enabling large file shares on a storage account? (Choose two.)',
    options: [
      { id: 'a', text: 'Only LRS and ZRS redundancy are supported' },
      { id: 'b', text: 'The storage account cannot be converted to GRS or GZRS' },
      { id: 'c', text: 'File shares cannot exceed 50 TiB' },
      { id: 'd', text: 'SMB protocol is not supported' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'When large file shares are enabled on a storage account, only LRS and ZRS redundancy options are supported. The account cannot be converted to geo-redundant (GRS, GZRS, RA-GRS, RA-GZRS) redundancy. This is an irreversible setting. Large file shares support up to 100 TiB (not 50 TiB), and SMB protocol is fully supported.'
  },
  {
    type: 'drag-drop',
    id: 'st-107',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'Match each Azure Files performance tier to its characteristics.',
    items: [
      { id: 'item1', text: 'HDD-based; pay-as-you-go model based on used capacity; supports Hot, Cool, and Transaction Optimized tiers' },
      { id: 'item2', text: 'SSD-based; provisioned model based on share size; lowest latency for IO-intensive workloads' }
    ],
    targets: [
      { id: 'target1', label: 'Standard file shares', correctItemId: 'item1' },
      { id: 'target2', label: 'Premium file shares', correctItemId: 'item2' }
    ],
    explanation: 'Standard file shares use HDD storage with a pay-as-you-go billing model. They support three tiers: Transaction Optimized (for transaction-heavy workloads), Hot (general file sharing), and Cool (cost-effective online archival). Premium file shares use SSD storage with a provisioned billing model where you pay for the total provisioned capacity, and they provide the lowest latency for IO-intensive workloads.'
  },
  {
    type: 'dropdown',
    id: 'st-108',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'Complete the Windows command to mount an Azure file share.',
    segments: [
      { type: 'text', text: 'net use Z: \\\\mystorageaccount.' },
      { type: 'dropdown', id: 'dd1', options: ['file.core.windows.net', 'blob.core.windows.net', 'files.core.windows.net', 'share.core.windows.net'], correctOption: 'file.core.windows.net' },
      { type: 'text', text: '\\myshare /u:' },
      { type: 'dropdown', id: 'dd2', options: ['AZURE\\mystorageaccount', 'localhost\\mystorageaccount', 'mystorageaccount', 'admin'], correctOption: 'AZURE\\mystorageaccount' },
      { type: 'text', text: ' <storage-account-key>' }
    ],
    explanation: 'To mount an Azure file share on Windows using the net use command, the UNC path follows the format \\\\<accountname>.file.core.windows.net\\<sharename>. The username is AZURE\\<storageaccountname> and the password is the storage account access key. Alternatively, you can use the Azure portal to generate the mount script automatically.'
  },
  {
    type: 'yes-no',
    id: 'st-109',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    scenario: 'You are planning Azure Files deployments for different departments in your organization.',
    statements: [
      { id: 's1', text: 'An Azure NFS file share can be accessed from a Windows client.', correct: false },
      { id: 's2', text: 'Azure file shares can be used as persistent volumes in Azure Kubernetes Service (AKS).', correct: true },
      { id: 's3', text: 'Azure File Sync can synchronize an Azure file share with multiple on-premises Windows servers.', correct: true }
    ],
    explanation: 'Azure NFS file shares are only supported on Linux and macOS clients; Windows does not have native NFS 4.1 client support for Azure Files. Azure file shares can be mounted as persistent volumes in AKS using the Azure Files CSI driver. Azure File Sync can synchronize an Azure file share with multiple on-premises Windows Server endpoints, enabling cloud tiering and multi-site access.'
  },
  {
    type: 'single-choice',
    id: 'st-110',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a file share in Azure Storage',
    stem: 'You want to change the tier of a standard Azure file share from Transaction Optimized to Cool. How can you accomplish this?',
    options: [
      { id: 'a', text: 'Change the tier in the file share properties; the change applies immediately' },
      { id: 'b', text: 'Delete and recreate the file share with the new tier' },
      { id: 'c', text: 'Create a new storage account with the Cool tier' },
      { id: 'd', text: 'File share tiers cannot be changed after creation' }
    ],
    correctOptionId: 'a',
    explanation: 'The tier of a standard Azure file share can be changed at any time through the file share properties in the Azure portal, CLI, or PowerShell. You can switch between Transaction Optimized, Hot, and Cool tiers. The tier change is independent of the storage account default access tier. The change applies without downtime or data movement. Premium file shares do not have configurable tiers.'
  },

  // st-111 to st-120: Create and configure a container in Blob Storage

  {
    type: 'single-choice',
    id: 'st-111',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'What are the valid public access levels for a blob container?',
    options: [
      { id: 'a', text: 'Private (no anonymous access), Blob (anonymous read for blobs only), Container (anonymous read for container and blobs)' },
      { id: 'b', text: 'Public, Private, and Protected' },
      { id: 'c', text: 'Read-only, Read-write, and Full control' },
      { id: 'd', text: 'None, Anonymous, and Authenticated' }
    ],
    correctOptionId: 'a',
    explanation: 'Blob containers have three public access levels: Private (no anonymous access; all requests must be authorized), Blob (anonymous read access for blobs in the container, but the container listing is not available), and Container (anonymous read access for both the container listing and the blobs). Note that public access must also be allowed at the storage account level for container-level public access to work.'
  },
  {
    type: 'single-choice',
    id: 'st-112',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'You run the following command:\n\naz storage container create --name mycontainer --account-name myaccount --public-access off\n\nWhat does the --public-access off parameter do?',
    options: [
      { id: 'a', text: 'Sets the container to private with no anonymous access' },
      { id: 'b', text: 'Disables the storage account firewall' },
      { id: 'c', text: 'Blocks all access including authenticated requests' },
      { id: 'd', text: 'Disables shared key authentication' }
    ],
    correctOptionId: 'a',
    explanation: 'The --public-access off parameter sets the container access level to private, meaning no anonymous (unauthenticated) access is allowed. All requests to the container and its blobs must include valid authentication (SAS token, account key, or Azure AD token). Authenticated requests are still allowed; only anonymous access is blocked.'
  },
  {
    type: 'single-choice',
    id: 'st-113',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'What are the naming rules for blob containers?',
    options: [
      { id: 'a', text: '3-63 characters, lowercase letters, numbers, and hyphens; must start with a letter or number' },
      { id: 'b', text: '1-256 characters, any alphanumeric characters and special characters' },
      { id: 'c', text: '3-24 characters, lowercase letters and numbers only' },
      { id: 'd', text: '1-63 characters, letters, numbers, underscores, and hyphens' }
    ],
    correctOptionId: 'a',
    explanation: 'Blob container names must be between 3 and 63 characters, contain only lowercase letters, numbers, and hyphens, and must start with a letter or number. Consecutive hyphens are not permitted. These rules follow DNS naming conventions because the container name appears in the blob URL (e.g., https://myaccount.blob.core.windows.net/mycontainer).'
  },
  {
    type: 'single-choice',
    id: 'st-114',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'You want to prevent accidental deletion of blobs by enabling a legal hold on a container. Which storage feature should you configure?',
    options: [
      { id: 'a', text: 'Immutable blob storage with a legal hold policy' },
      { id: 'b', text: 'Soft delete for blobs' },
      { id: 'c', text: 'Blob versioning' },
      { id: 'd', text: 'Container lease' }
    ],
    correctOptionId: 'a',
    explanation: 'Immutable blob storage with a legal hold policy prevents blobs from being modified or deleted until the hold is explicitly removed. Legal holds are typically used for compliance scenarios where data must be preserved for legal proceedings. Soft delete allows recovery of deleted blobs but does not prevent deletion. Blob versioning maintains previous versions but does not prevent deletion. Container leases prevent container deletion, not blob deletion.'
  },
  {
    type: 'single-choice',
    id: 'st-115',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'You have disabled public access at the storage account level (AllowBlobPublicAccess = false). A container within the account has its access level set to Blob. What happens when an anonymous user tries to access a blob?',
    options: [
      { id: 'a', text: 'The request succeeds because the container allows blob-level public access' },
      { id: 'b', text: 'The request fails because the account-level setting overrides the container setting' },
      { id: 'c', text: 'The request is redirected to the authentication endpoint' },
      { id: 'd', text: 'The request succeeds but returns an empty response' }
    ],
    correctOptionId: 'b',
    explanation: 'When AllowBlobPublicAccess is set to false at the storage account level, it overrides any container-level public access settings. Even if a container is configured with Blob or Container public access, anonymous requests will be denied. The storage account-level setting acts as a master switch for all containers in the account.'
  },
  {
    type: 'multiple-choice',
    id: 'st-116',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'Which TWO types of blobs are supported in Azure Blob Storage? (Choose two.)',
    options: [
      { id: 'a', text: 'Block blobs' },
      { id: 'b', text: 'Page blobs' },
      { id: 'c', text: 'Stream blobs' },
      { id: 'd', text: 'Archive blobs' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Azure Blob Storage supports three types of blobs: block blobs (optimized for uploading large amounts of data efficiently), page blobs (optimized for random read/write operations, used for VHD disks), and append blobs (optimized for append operations like logging). Stream blobs and archive blobs are not valid blob types; Archive is an access tier, not a blob type.'
  },
  {
    type: 'drag-drop',
    id: 'st-117',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'Match each blob type to its primary use case.',
    items: [
      { id: 'item1', text: 'Storing documents, images, videos, and general-purpose data' },
      { id: 'item2', text: 'Serving as the backing storage for Azure virtual machine disks (VHDs)' },
      { id: 'item3', text: 'Logging data where new entries are continuously appended' }
    ],
    targets: [
      { id: 'target1', label: 'Block blobs', correctItemId: 'item1' },
      { id: 'target2', label: 'Page blobs', correctItemId: 'item2' },
      { id: 'target3', label: 'Append blobs', correctItemId: 'item3' }
    ],
    explanation: 'Block blobs are the most common type, used for storing files of any type (documents, images, videos). Page blobs are designed for random read/write access and are used as the underlying storage for Azure VM unmanaged disks (VHDs) with 512-byte aligned pages. Append blobs are optimized for append operations and are ideal for logging scenarios where data is only added to the end of the blob.'
  },
  {
    type: 'dropdown',
    id: 'st-118',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'Complete the statement about blob container configuration.',
    segments: [
      { type: 'text', text: 'To prevent public access to all containers in a storage account, set the ' },
      { type: 'dropdown', id: 'dd1', options: ['AllowBlobPublicAccess', 'PublicNetworkAccess', 'SharedKeyAccess', 'AnonymousAccess'], correctOption: 'AllowBlobPublicAccess' },
      { type: 'text', text: ' property to false. The maximum number of containers in a storage account is ' },
      { type: 'dropdown', id: 'dd2', options: ['unlimited', '500', '5000', '10000'], correctOption: 'unlimited' },
      { type: 'text', text: '.' }
    ],
    explanation: 'The AllowBlobPublicAccess property at the storage account level controls whether any container can have public access. When set to false, all anonymous access is blocked regardless of individual container settings. There is no limit on the number of containers in a storage account; you can create as many as needed. The overall storage account capacity (5 PiB default) is the main limiting factor.'
  },
  {
    type: 'yes-no',
    id: 'st-119',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    scenario: 'You are configuring blob containers in an Azure storage account for a web application.',
    statements: [
      { id: 's1', text: 'Container names are case-sensitive (MyContainer and mycontainer are different containers).', correct: false },
      { id: 's2', text: 'A blob can have a virtual directory structure using "/" as a path separator in the blob name.', correct: true },
      { id: 's3', text: 'You can apply a lease on a container to prevent its deletion.', correct: true }
    ],
    explanation: 'Container names are case-insensitive and must be all lowercase, so you cannot have both "MyContainer" and "mycontainer". Blob names can contain "/" characters to simulate a directory structure (e.g., "images/2024/photo.jpg"), though blobs are stored in a flat namespace. You can acquire a lease on a container, which prevents the container from being deleted until the lease is released or expired.'
  },
  {
    type: 'single-choice',
    id: 'st-120',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Create and configure a container in Blob Storage',
    stem: 'You need to set metadata on a blob container using PowerShell. Which cmdlet should you use?',
    options: [
      { id: 'a', text: 'Set-AzStorageContainerAcl' },
      { id: 'b', text: 'Update-AzStorageContainer' },
      { id: 'c', text: 'Set-AzStorageBlobContent with -Metadata parameter' },
      { id: 'd', text: 'The CloudBlobContainer.SetMetadata() method through the storage context' }
    ],
    correctOptionId: 'd',
    explanation: 'In Azure PowerShell, container metadata is set by retrieving the container object via Get-AzStorageContainer, adding key-value pairs to the CloudBlobContainer.Metadata dictionary, and calling SetMetadata(). There is no dedicated Set-AzStorageContainerMetadata cmdlet. Set-AzStorageBlobContent uploads blobs, not container metadata. Container metadata consists of name-value pairs associated with the container resource.'
  },

  // st-121 to st-130: Configure storage tiers

  {
    type: 'single-choice',
    id: 'st-121',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'Which access tier has the lowest storage cost but the highest access cost?',
    options: [
      { id: 'a', text: 'Hot' },
      { id: 'b', text: 'Cool' },
      { id: 'c', text: 'Cold' },
      { id: 'd', text: 'Archive' }
    ],
    correctOptionId: 'd',
    explanation: 'The Archive tier has the lowest storage cost of all tiers but the highest access (retrieval) cost. Data in the Archive tier is stored offline and must be rehydrated before it can be read, which can take hours depending on the rehydration priority. The tiers from highest to lowest storage cost are: Hot > Cool > Cold > Archive, and from lowest to highest access cost: Hot < Cool < Cold < Archive.'
  },
  {
    type: 'single-choice',
    id: 'st-122',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'How long must data remain in the Cool tier to avoid an early deletion penalty?',
    options: [
      { id: 'a', text: '7 days' },
      { id: 'b', text: '30 days' },
      { id: 'c', text: '90 days' },
      { id: 'd', text: '180 days' }
    ],
    correctOptionId: 'b',
    explanation: 'Data in the Cool tier has a minimum retention period of 30 days. If a blob is deleted or moved to a different tier before 30 days, an early deletion charge is applied for the remaining days. The Cold tier has a 90-day minimum, and the Archive tier has a 180-day minimum. The Hot tier has no minimum retention period.'
  },
  {
    type: 'single-choice',
    id: 'st-123',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'A blob is currently in the Archive tier. You need to read its content within 1 hour. Which rehydration option should you use?',
    options: [
      { id: 'a', text: 'Standard priority rehydration' },
      { id: 'b', text: 'High priority rehydration' },
      { id: 'c', text: 'The blob can be read directly from the Archive tier' },
      { id: 'd', text: 'Copy the blob to a new container' }
    ],
    correctOptionId: 'b',
    explanation: 'High priority rehydration can complete in under 1 hour for objects under 10 GB, though it is not guaranteed. Standard priority rehydration can take up to 15 hours. Blobs in the Archive tier are stored offline and cannot be read directly; they must be rehydrated to the Hot or Cool tier first. You can rehydrate by changing the blob tier (Set Blob Tier) or by copying the archived blob to a new blob in the Hot or Cool tier.'
  },
  {
    type: 'single-choice',
    id: 'st-124',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'You set the default access tier of a storage account to Cool. You upload a blob without specifying a tier. Which tier is the blob stored in?',
    options: [
      { id: 'a', text: 'Hot (always the default for new blobs)' },
      { id: 'b', text: 'Cool (inherits the account default)' },
      { id: 'c', text: 'Archive' },
      { id: 'd', text: 'The upload fails because a tier must be specified' }
    ],
    correctOptionId: 'b',
    explanation: 'When a blob is uploaded without explicitly specifying an access tier, it inherits the default access tier of the storage account. Since the account default is set to Cool, the blob is stored in the Cool tier. You can override this by explicitly specifying a tier during upload. The storage account default can be set to Hot or Cool (not Archive or Cold).'
  },
  {
    type: 'single-choice',
    id: 'st-125',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'Which Azure CLI command changes the access tier of an existing blob to Archive?',
    options: [
      { id: 'a', text: 'az storage blob set-tier --container-name mycontainer --name myblob --tier Archive --account-name myaccount' },
      { id: 'b', text: 'az storage blob update --container mycontainer --name myblob --access-tier Archive' },
      { id: 'c', text: 'az storage blob move --source myblob --tier Archive' },
      { id: 'd', text: 'az storage blob archive --container mycontainer --name myblob' }
    ],
    correctOptionId: 'a',
    explanation: 'The az storage blob set-tier command changes the access tier of an existing blob. You specify the container name, blob name, and the desired tier (Hot, Cool, Cold, or Archive). When moving to Archive, the blob is taken offline and can no longer be read until rehydrated. The operation is synchronous for moving to Archive but takes time for rehydration from Archive.'
  },
  {
    type: 'multiple-choice',
    id: 'st-126',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'Which TWO tiers can be set as the default access tier for a storage account? (Choose two.)',
    options: [
      { id: 'a', text: 'Hot' },
      { id: 'b', text: 'Cool' },
      { id: 'c', text: 'Cold' },
      { id: 'd', text: 'Archive' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Only Hot and Cool can be set as the default access tier for a storage account. The Cold and Archive tiers can only be set at the individual blob level and cannot be configured as the account default. When creating a storage account, the default access tier is Hot unless you explicitly set it to Cool.'
  },
  {
    type: 'drag-drop',
    id: 'st-127',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'Match each access tier to its minimum retention period to avoid early deletion charges.',
    items: [
      { id: 'item1', text: 'No minimum retention period' },
      { id: 'item2', text: '30 days' },
      { id: 'item3', text: '180 days' }
    ],
    targets: [
      { id: 'target1', label: 'Hot tier', correctItemId: 'item1' },
      { id: 'target2', label: 'Cool tier', correctItemId: 'item2' },
      { id: 'target3', label: 'Archive tier', correctItemId: 'item3' }
    ],
    explanation: 'The Hot tier has no minimum retention period. The Cool tier has a 30-day minimum. The Cold tier has a 90-day minimum (not shown). The Archive tier has a 180-day minimum. If a blob is deleted or moved to a different tier before these periods, an early deletion fee is charged for the remaining days of the minimum retention period.'
  },
  {
    type: 'dropdown',
    id: 'st-128',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'Complete the statement about the Archive tier.',
    segments: [
      { type: 'text', text: 'Blobs in the Archive tier are stored ' },
      { type: 'dropdown', id: 'dd1', options: ['offline', 'online', 'on SSD storage', 'in a separate account'], correctOption: 'offline' },
      { type: 'text', text: ' and must be rehydrated before their content can be read. Standard priority rehydration can take up to ' },
      { type: 'dropdown', id: 'dd2', options: ['1 hour', '15 hours', '24 hours', '72 hours'], correctOption: '15 hours' },
      { type: 'text', text: '.' }
    ],
    explanation: 'Archive tier blobs are stored offline on inexpensive media. They cannot be read or modified until rehydrated to the Hot or Cool tier. Standard priority rehydration can take up to 15 hours. High priority rehydration is typically completed in under 1 hour for objects under 10 GB but is more expensive. You can check the rehydration status through the blob properties.'
  },
  {
    type: 'yes-no',
    id: 'st-129',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    scenario: 'You are configuring access tiers for blobs in an Azure storage account.',
    statements: [
      { id: 's1', text: 'Page blobs support Hot, Cool, and Archive access tiers.', correct: false },
      { id: 's2', text: 'You can change a blob from Hot to Archive tier without incurring any charges.', correct: false },
      { id: 's3', text: 'The Cold tier is available for block blobs in general-purpose v2 storage accounts.', correct: true }
    ],
    explanation: 'Page blobs do not support access tiers; only block blobs support Hot, Cool, Cold, and Archive tiers. Page blobs are always stored in the premium performance tier (when using premium storage) or the Hot tier equivalent. Moving a blob to the Archive tier incurs a write operation charge per 10,000 blobs. The Cold tier is available for block blobs in general-purpose v2 accounts and provides a cost-effective option between Cool and Archive.'
  },
  {
    type: 'single-choice',
    id: 'st-130',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure storage tiers',
    stem: 'You have a blob in the Archive tier and need to read it immediately by copying it. Which approach allows you to read the data soonest?',
    options: [
      { id: 'a', text: 'Use Copy Blob to copy the archived blob to a new blob with the tier set to Hot and high priority rehydration' },
      { id: 'b', text: 'Change the blob tier directly to Hot using Set Blob Tier with standard priority' },
      { id: 'c', text: 'Download the blob directly using Get Blob' },
      { id: 'd', text: 'Delete the blob and upload a new copy' }
    ],
    correctOptionId: 'a',
    explanation: 'Copying an archived blob to a new blob in the Hot tier with high priority rehydration is the fastest way to access the data. The Copy Blob operation creates a new blob from the archived source. With high priority, the rehydration can complete in under 1 hour for objects under 10 GB. You cannot download a blob directly from the Archive tier using Get Blob; it will fail with a 409 Conflict error.'
  },

  // st-131 to st-140: Configure soft delete for blobs and containers

  {
    type: 'single-choice',
    id: 'st-131',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'You enable soft delete for blobs with a retention period of 14 days. A user deletes a blob. How can the blob be recovered?',
    options: [
      { id: 'a', text: 'Undelete the blob using the Undelete Blob operation within 14 days' },
      { id: 'b', text: 'Restore the blob from a backup vault' },
      { id: 'c', text: 'Contact Microsoft support for recovery' },
      { id: 'd', text: 'The blob is permanently deleted and cannot be recovered' }
    ],
    correctOptionId: 'a',
    explanation: 'When blob soft delete is enabled, deleted blobs are retained in a soft-deleted state for the specified retention period (1 to 365 days). During this period, you can recover the blob using the Undelete Blob operation via the Azure portal, CLI, PowerShell, or REST API. After the retention period expires, the blob is permanently deleted and cannot be recovered.'
  },
  {
    type: 'single-choice',
    id: 'st-132',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'What is the maximum retention period that can be configured for blob soft delete?',
    options: [
      { id: 'a', text: '30 days' },
      { id: 'b', text: '90 days' },
      { id: 'c', text: '365 days' },
      { id: 'd', text: 'Unlimited' }
    ],
    correctOptionId: 'c',
    explanation: 'The retention period for blob soft delete can be configured from 1 to 365 days. During the retention period, soft-deleted blobs and their snapshots can be recovered. After the retention period expires, the data is permanently deleted by the garbage collection process. Choose a retention period that balances data recovery needs with storage cost, as soft-deleted data still incurs storage charges.'
  },
  {
    type: 'single-choice',
    id: 'st-133',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'You enable container soft delete with a 7-day retention period. A user deletes a container. What is true about the deleted container?',
    options: [
      { id: 'a', text: 'The container and all its blobs can be recovered within 7 days' },
      { id: 'b', text: 'Only the container is recoverable; the blobs are permanently deleted' },
      { id: 'c', text: 'A new container with the same name can be created immediately' },
      { id: 'd', text: 'The container is immediately purged if it contains more than 1000 blobs' }
    ],
    correctOptionId: 'a',
    explanation: 'When container soft delete is enabled, a deleted container and all its contents (blobs, snapshots, versions) are retained for the specified retention period. During this time, the entire container can be recovered with all its data intact. Note that you cannot create a new container with the same name until the soft-deleted container is either recovered or the retention period expires.'
  },
  {
    type: 'single-choice',
    id: 'st-134',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'Soft delete for blobs is enabled on a storage account. A blob is overwritten with new content. What happens to the previous version?',
    options: [
      { id: 'a', text: 'The previous version is saved as a soft-deleted snapshot' },
      { id: 'b', text: 'The previous version is permanently replaced' },
      { id: 'c', text: 'Both versions are stored as active blobs' },
      { id: 'd', text: 'The previous version is moved to the Archive tier' }
    ],
    correctOptionId: 'a',
    explanation: 'When blob soft delete is enabled and a blob is overwritten, the previous version is automatically saved as a soft-deleted snapshot. This allows you to recover the previous content by undeleting the blob and restoring from the snapshot. This protection applies to both delete and overwrite operations, providing comprehensive data protection against accidental changes.'
  },
  {
    type: 'single-choice',
    id: 'st-135',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'Which Azure CLI command enables blob soft delete with a 30-day retention period?',
    options: [
      { id: 'a', text: 'az storage account blob-service-properties update --account-name myaccount --enable-delete-retention true --delete-retention-days 30' },
      { id: 'b', text: 'az storage blob soft-delete enable --account-name myaccount --days 30' },
      { id: 'c', text: 'az storage account update --name myaccount --soft-delete-enabled --retention-days 30' },
      { id: 'd', text: 'az storage container soft-delete enable --account myaccount --days 30' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct command is az storage account blob-service-properties update with the --enable-delete-retention and --delete-retention-days parameters. This configures soft delete at the blob service level of the storage account. Container soft delete is configured separately using --enable-container-delete-retention and --container-delete-retention-days parameters.'
  },
  {
    type: 'multiple-choice',
    id: 'st-136',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'Which TWO statements about soft delete are correct? (Choose two.)',
    options: [
      { id: 'a', text: 'Soft-deleted blobs incur storage charges at the same rate as active blobs' },
      { id: 'b', text: 'Blob soft delete and container soft delete are configured independently' },
      { id: 'c', text: 'Soft delete prevents blobs from being deleted' },
      { id: 'd', text: 'Soft-deleted blobs are automatically moved to the Cool tier' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Soft-deleted blobs are charged at the same rate as active data in the same tier. Blob soft delete and container soft delete are separate features that must be enabled independently. Soft delete does not prevent deletion; it allows recovery after deletion. Soft-deleted blobs remain in their original tier and are not automatically moved to Cool or any other tier.'
  },
  {
    type: 'drag-drop',
    id: 'st-137',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'Match each data protection feature to what it protects against.',
    items: [
      { id: 'item1', text: 'Recovers deleted blobs and snapshots within a retention period' },
      { id: 'item2', text: 'Recovers deleted containers and their contents within a retention period' },
      { id: 'item3', text: 'Maintains previous versions automatically when blobs are modified or deleted' }
    ],
    targets: [
      { id: 'target1', label: 'Blob soft delete', correctItemId: 'item1' },
      { id: 'target2', label: 'Container soft delete', correctItemId: 'item2' },
      { id: 'target3', label: 'Blob versioning', correctItemId: 'item3' }
    ],
    explanation: 'Blob soft delete allows recovery of deleted blobs and their snapshots. Container soft delete allows recovery of entire deleted containers with all their contents. Blob versioning automatically creates a new version whenever a blob is modified or deleted, maintaining a complete history of changes. These three features complement each other for comprehensive data protection.'
  },
  {
    type: 'dropdown',
    id: 'st-138',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'Complete the PowerShell command to enable container soft delete.',
    segments: [
      { type: 'text', text: 'Enable-AzStorageContainerDeleteRetentionPolicy -ResourceGroupName "myRG" -StorageAccountName "myaccount" -RetentionDays ' },
      { type: 'dropdown', id: 'dd1', options: ['7', '0', '-1', '400'], correctOption: '7' },
    ],
    explanation: 'The Enable-AzStorageContainerDeleteRetentionPolicy cmdlet enables container soft delete. The -RetentionDays parameter specifies how many days deleted containers are retained (1-365). In this example, 7 days is a common retention period. A value of 0 or negative numbers would be invalid, and 400 exceeds the maximum of 365 days.'
  },
  {
    type: 'yes-no',
    id: 'st-139',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    scenario: 'Blob soft delete is enabled with a 14-day retention period on your storage account.',
    statements: [
      { id: 's1', text: 'If you delete a blob and then undelete it within 14 days, the blob is restored to its original state.', correct: true },
      { id: 's2', text: 'Soft-deleted blobs are visible in the Azure portal by default.', correct: false },
      { id: 's3', text: 'Blob soft delete protects against accidental storage account deletion.', correct: false }
    ],
    explanation: 'Undeleting a soft-deleted blob within the retention period restores it to its original state, including all snapshots. Soft-deleted blobs are not visible by default in the Azure portal or listing operations; you must explicitly enable the "Show deleted blobs" option to see them. Blob soft delete does not protect against storage account deletion; that requires Azure resource locks or Azure Backup for storage accounts.'
  },
  {
    type: 'single-choice',
    id: 'st-140',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure soft delete for blobs and containers',
    stem: 'You have blob soft delete enabled. You need to permanently remove a soft-deleted blob before the retention period expires. Is this possible?',
    options: [
      { id: 'a', text: 'No, soft-deleted blobs cannot be permanently removed until the retention period expires' },
      { id: 'b', text: 'Yes, you can use the Delete Blob operation with the permanent delete permission' },
      { id: 'c', text: 'Yes, by disabling soft delete on the storage account' },
      { id: 'd', text: 'Yes, by contacting Microsoft support' }
    ],
    correctOptionId: 'b',
    explanation: 'Soft-deleted blobs can be permanently removed before the retention period by using a delete operation with the appropriate authorization. You need the "permanent delete" permission (y in SAS permissions). You can also permanently delete a soft-deleted version by calling Delete Blob Version. Disabling soft delete does not immediately purge existing soft-deleted data.'
  },

  // st-141 to st-150: Configure snapshots and soft delete for Azure Files

  {
    type: 'single-choice',
    id: 'st-141',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'What is the maximum number of share snapshots that can be taken for an Azure file share?',
    options: [
      { id: 'a', text: '100' },
      { id: 'b', text: '200' },
      { id: 'c', text: '500' },
      { id: 'd', text: 'Unlimited' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure Files supports a maximum of 200 share snapshots per file share. Share snapshots capture the state of the entire file share at a point in time. They are incremental, meaning only changes since the last snapshot are stored. When you reach the 200-snapshot limit, you must delete older snapshots before creating new ones.'
  },
  {
    type: 'single-choice',
    id: 'st-142',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'Azure file share snapshots are incremental. What does this mean?',
    options: [
      { id: 'a', text: 'Each snapshot stores only the changes since the last snapshot was taken' },
      { id: 'b', text: 'Each snapshot is a full copy of all files in the share' },
      { id: 'c', text: 'Snapshots are compressed to reduce storage consumption' },
      { id: 'd', text: 'Snapshots are stored in a different storage account' }
    ],
    correctOptionId: 'a',
    explanation: 'Share snapshots are incremental, meaning each snapshot only captures the data that changed since the previous snapshot. This makes them storage-efficient. However, each snapshot can be used to restore the share to that point in time because it references unchanged data from earlier snapshots. If you delete an earlier snapshot, Azure manages the data so later snapshots remain functional.'
  },
  {
    type: 'single-choice',
    id: 'st-143',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'You enable soft delete for Azure file shares with a 14-day retention period. A user deletes a file share. How do you recover it?',
    options: [
      { id: 'a', text: 'Use the Undelete Share operation in the Azure portal or REST API' },
      { id: 'b', text: 'Restore from an Azure Backup vault' },
      { id: 'c', text: 'Contact Microsoft support' },
      { id: 'd', text: 'Soft delete for file shares does not exist' }
    ],
    correctOptionId: 'a',
    explanation: 'When soft delete for Azure file shares is enabled, deleted shares can be recovered within the retention period using the Undelete Share operation. In the Azure portal, you can view soft-deleted shares by toggling "Show deleted shares" and clicking the Undelete button. The share and all its files, directories, and snapshots are restored. This is separate from blob soft delete.'
  },
  {
    type: 'single-choice',
    id: 'st-144',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'You need to restore a single file from an Azure file share snapshot. Is this possible?',
    options: [
      { id: 'a', text: 'No, you can only restore the entire share from a snapshot' },
      { id: 'b', text: 'Yes, you can restore individual files or directories from a snapshot' },
      { id: 'c', text: 'Only if the file is smaller than 4 TiB' },
      { id: 'd', text: 'Only using Azure Backup, not directly from snapshots' }
    ],
    correctOptionId: 'b',
    explanation: 'You can restore individual files or directories from an Azure file share snapshot. When you browse a share snapshot, you can navigate to specific files and either download them or restore them to the live share. You can also use the Previous Versions feature on Windows clients to browse and restore individual files from share snapshots. Full share restore is also available.'
  },
  {
    type: 'single-choice',
    id: 'st-145',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'Which Azure CLI command creates a snapshot of an Azure file share?',
    options: [
      { id: 'a', text: 'az storage share snapshot --name myshare --account-name myaccount' },
      { id: 'b', text: 'az storage share create-snapshot --share myshare --account myaccount' },
      { id: 'c', text: 'az storage snapshot create --type share --name myshare' },
      { id: 'd', text: 'az storage share backup --name myshare --account myaccount' }
    ],
    correctOptionId: 'a',
    explanation: 'The az storage share snapshot command creates a point-in-time snapshot of an Azure file share. The command requires the share name and storage account credentials (account name and key or SAS token). The snapshot is identified by a timestamp and can be browsed, used to restore files, or deleted when no longer needed.'
  },
  {
    type: 'multiple-choice',
    id: 'st-146',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'Which TWO statements about Azure file share snapshots are correct? (Choose two.)',
    options: [
      { id: 'a', text: 'Share snapshots are stored at the share level, not at the individual file level' },
      { id: 'b', text: 'Deleting a file share also deletes all its snapshots' },
      { id: 'c', text: 'Share snapshots can be taken on NFS file shares' },
      { id: 'd', text: 'Share snapshots require premium file shares' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Share snapshots capture the entire file share at a point in time and are managed at the share level. When you delete a file share, all associated snapshots are also deleted (you must explicitly delete snapshots first, or use --delete-snapshots to include them). Share snapshots are supported on both SMB and NFS file shares. They do not require premium file shares; standard file shares also support snapshots.'
  },
  {
    type: 'drag-drop',
    id: 'st-147',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'Match each Azure Files data protection feature to its description.',
    items: [
      { id: 'item1', text: 'Retains deleted file shares for a configurable number of days' },
      { id: 'item2', text: 'Captures a point-in-time read-only copy of the entire file share' },
      { id: 'item3', text: 'Provides long-term backup with scheduling and retention policies via Azure Backup' }
    ],
    targets: [
      { id: 'target1', label: 'Share soft delete', correctItemId: 'item1' },
      { id: 'target2', label: 'Share snapshots', correctItemId: 'item2' },
      { id: 'target3', label: 'Azure Backup for Azure Files', correctItemId: 'item3' }
    ],
    explanation: 'Share soft delete retains deleted file shares for recovery within a configurable retention period (1-365 days). Share snapshots are manual or scheduled point-in-time copies of the entire share that are read-only and can be used to restore individual files or the entire share. Azure Backup for Azure Files uses share snapshots under the hood but adds scheduling, retention policies, and centralized management through Recovery Services vaults.'
  },
  {
    type: 'dropdown',
    id: 'st-148',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'Complete the statement about Azure file share soft delete.',
    segments: [
      { type: 'text', text: 'Soft delete for Azure file shares can be configured with a retention period of ' },
      { type: 'dropdown', id: 'dd1', options: ['1 to 365 days', '7 to 90 days', '30 to 180 days', '1 to 30 days'], correctOption: '1 to 365 days' },
      { type: 'text', text: '. Soft-deleted shares are billed at the ' },
      { type: 'dropdown', id: 'dd2', options: ['used capacity rate', 'provisioned capacity rate', 'reduced rate (50%)', 'zero cost'], correctOption: 'used capacity rate' },
      { type: 'text', text: ' for standard file shares.' }
    ],
    explanation: 'Azure file share soft delete supports a retention period of 1 to 365 days. Soft-deleted standard file shares are billed based on the used (snapshotted) capacity at the regular storage rate. Premium file shares are billed at the provisioned share rate. The billing continues until the retention period expires and the data is permanently purged.'
  },
  {
    type: 'yes-no',
    id: 'st-149',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    scenario: 'You are configuring data protection for Azure file shares in your storage account.',
    statements: [
      { id: 's1', text: 'You can delete a file share that has active snapshots without deleting the snapshots first.', correct: false },
      { id: 's2', text: 'Share snapshots can be accessed by mounting the snapshot from a Windows client using the Previous Versions feature.', correct: true },
      { id: 's3', text: 'Enabling soft delete on a storage account retroactively protects file shares that were already deleted.', correct: false }
    ],
    explanation: 'You cannot delete a file share that has snapshots unless you explicitly delete all snapshots first or use the --delete-snapshots flag to delete them along with the share. Windows clients can use the Previous Versions tab (right-click a file/folder > Properties > Previous Versions) to access share snapshots. Enabling soft delete does not retroactively recover previously deleted shares; it only protects shares deleted after the feature is enabled.'
  },
  {
    type: 'single-choice',
    id: 'st-150',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure snapshots and soft delete for Azure Files',
    stem: 'You have an Azure file share with 50 snapshots. You try to create a new snapshot but receive an error that the share cannot be deleted. What is the most likely issue?',
    options: [
      { id: 'a', text: 'You have reached the 200-snapshot limit' },
      { id: 'b', text: 'Soft delete is preventing new snapshots' },
      { id: 'c', text: 'The share quota has been exceeded' },
      { id: 'd', text: 'Snapshots are disabled on the storage account' }
    ],
    correctOptionId: 'c',
    explanation: 'If the file share quota has been exceeded (the total data including snapshots exceeds the quota), new snapshots may fail. The 200-snapshot limit has not been reached with only 50 snapshots. Soft delete does not prevent snapshot creation. Check the share quota setting and the total used capacity (including snapshot data) to resolve the issue. Increase the quota if necessary.'
  },

  // st-151 to st-160: Configure blob lifecycle management

  {
    type: 'single-choice',
    id: 'st-151',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'What does a blob lifecycle management policy allow you to do?',
    options: [
      { id: 'a', text: 'Automatically transition blobs between access tiers or delete blobs based on rules' },
      { id: 'b', text: 'Replicate blobs to another storage account automatically' },
      { id: 'c', text: 'Encrypt blobs with customer-managed keys' },
      { id: 'd', text: 'Set access permissions on individual blobs' }
    ],
    correctOptionId: 'a',
    explanation: 'Blob lifecycle management policies define rules that automatically transition blobs to cooler tiers (e.g., Hot to Cool to Archive) or delete blobs based on specified conditions such as the number of days since the blob was last modified or accessed. This helps optimize storage costs by automatically managing data that becomes less frequently accessed over time.'
  },
  {
    type: 'single-choice',
    id: 'st-152',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'You create a lifecycle management rule that moves blobs to the Cool tier after 30 days and to the Archive tier after 90 days since last modification. A blob was last modified 45 days ago and is currently in the Hot tier. What happens when the policy runs?',
    options: [
      { id: 'a', text: 'The blob is moved to the Cool tier' },
      { id: 'b', text: 'The blob is moved directly to the Archive tier' },
      { id: 'c', text: 'The blob remains in the Hot tier' },
      { id: 'd', text: 'The blob is deleted' }
    ],
    correctOptionId: 'a',
    explanation: 'The policy evaluates each rule in order. Since the blob is 45 days old, it meets the condition for the Cool tier (30 days) but not yet the Archive tier (90 days). The blob is moved to the Cool tier. When the blob reaches 90 days since last modification, it will be moved to the Archive tier. Lifecycle management rules are evaluated once per day.'
  },
  {
    type: 'single-choice',
    id: 'st-153',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'Which condition can be used in a lifecycle management rule to trigger an action?',
    options: [
      { id: 'a', text: 'daysAfterModificationGreaterThan' },
      { id: 'b', text: 'blobSizeLargerThan' },
      { id: 'c', text: 'accessCountLessThan' },
      { id: 'd', text: 'createdByUser' }
    ],
    correctOptionId: 'a',
    explanation: 'The daysAfterModificationGreaterThan condition triggers an action when the specified number of days has passed since the blob was last modified. Other valid conditions include daysAfterCreationGreaterThan, daysAfterLastAccessTimeGreaterThan (requires access tracking to be enabled), and daysAfterLastTierChangeGreaterThan. Blob size, access count, and user identity are not available as lifecycle rule conditions.'
  },
  {
    type: 'single-choice',
    id: 'st-154',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'How often are blob lifecycle management rules evaluated and executed?',
    options: [
      { id: 'a', text: 'Every hour' },
      { id: 'b', text: 'Once per day' },
      { id: 'c', text: 'Every 15 minutes' },
      { id: 'd', text: 'Immediately when conditions are met' }
    ],
    correctOptionId: 'b',
    explanation: 'Lifecycle management rules are evaluated once per day. After creating or updating a policy, it can take up to 24 hours for the first run, and up to 24 hours for actions to be applied to all matching blobs. The execution is not real-time; there may be a delay between when conditions are met and when actions are taken.'
  },
  {
    type: 'single-choice',
    id: 'st-155',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'You want to apply a lifecycle rule only to blobs whose names start with "logs/2023/". How do you configure this?',
    options: [
      { id: 'a', text: 'Use a prefix match filter in the rule definition with "logs/2023/"' },
      { id: 'b', text: 'Create a separate container for the matching blobs' },
      { id: 'c', text: 'Tag the blobs and use a tag-based filter' },
      { id: 'd', text: 'Lifecycle rules cannot filter by blob name prefix' }
    ],
    correctOptionId: 'a',
    explanation: 'Lifecycle management rules support prefix match filters that allow you to target blobs whose names start with a specific prefix. You define the prefixMatch array in the rule filters, such as ["logs/2023/"]. You can also filter by blob index tags using blobIndexMatch. Multiple prefix filters can be combined in a single rule.'
  },
  {
    type: 'multiple-choice',
    id: 'st-156',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'Which TWO actions can be performed by a lifecycle management rule? (Choose two.)',
    options: [
      { id: 'a', text: 'tierToCool - Move the blob to the Cool tier' },
      { id: 'b', text: 'delete - Delete the blob' },
      { id: 'c', text: 'replicate - Copy the blob to another account' },
      { id: 'd', text: 'encrypt - Encrypt the blob with a specific key' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Lifecycle management rules support the following actions: tierToCool, tierToCold, tierToArchive, enableAutoTierToHotFromCool, and delete. These actions can be applied to base blobs, blob snapshots, and blob versions. Replication and encryption are not available as lifecycle management actions; they are configured through separate features.'
  },
  {
    type: 'drag-drop',
    id: 'st-157',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'Match each lifecycle management action to its effect on blobs.',
    items: [
      { id: 'item1', text: 'Moves blobs to offline storage with lowest cost per GB' },
      { id: 'item2', text: 'Permanently removes blobs that are no longer needed' },
      { id: 'item3', text: 'Moves blobs to a tier with lower storage cost but higher access cost than Hot' }
    ],
    targets: [
      { id: 'target1', label: 'tierToArchive', correctItemId: 'item1' },
      { id: 'target2', label: 'delete', correctItemId: 'item2' },
      { id: 'target3', label: 'tierToCool', correctItemId: 'item3' }
    ],
    explanation: 'The tierToArchive action moves blobs to the Archive tier, which has the lowest storage cost but stores data offline. The delete action permanently removes blobs. The tierToCool action moves blobs from the Hot tier to the Cool tier, which has lower storage cost but higher access and transaction costs compared to Hot. These actions help automate cost optimization.'
  },
  {
    type: 'dropdown',
    id: 'st-158',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'Complete the lifecycle management rule JSON to move blobs to Cool tier after 30 days.',
    segments: [
      { type: 'text', text: '{ "rules": [{ "name": "moveTooCool", "type": "Lifecycle", "definition": { "actions": { "baseBlob": { "tierToCool": { "daysAfterModificationGreaterThan": ' },
      { type: 'dropdown', id: 'dd1', options: ['30', '"30"', '30.0', 'thirty'], correctOption: '30' },
      { type: 'text', text: ' } } }, "filters": { "blobTypes": [' },
      { type: 'dropdown', id: 'dd2', options: ['"blockBlob"', '"pageBlob"', '"appendBlob"', '"allBlobs"'], correctOption: '"blockBlob"' },
      { type: 'text', text: '] } } }] }' }
    ],
    explanation: 'In the lifecycle management rule JSON, the daysAfterModificationGreaterThan value is specified as an integer (30). The blobTypes filter specifies which blob types the rule applies to; lifecycle management primarily works with "blockBlob" types. The rule name, type (always "Lifecycle"), and the action/filter structure are required components.'
  },
  {
    type: 'yes-no',
    id: 'st-159',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    scenario: 'You are configuring lifecycle management policies for an Azure storage account.',
    statements: [
      { id: 's1', text: 'A lifecycle management policy can have multiple rules that apply to different containers.', correct: true },
      { id: 's2', text: 'Lifecycle management rules can move blobs from Archive back to Hot tier automatically.', correct: false },
      { id: 's3', text: 'The daysAfterLastAccessTimeGreaterThan condition requires access tracking to be enabled.', correct: true }
    ],
    explanation: 'A lifecycle management policy can contain up to 100 rules, each with different filters targeting different containers or blob prefixes. Lifecycle rules can only move blobs to cooler tiers (Hot > Cool > Cold > Archive) or delete them; they cannot rehydrate blobs from Archive to a warmer tier. The daysAfterLastAccessTimeGreaterThan condition requires last access time tracking to be enabled on the storage account to record when each blob was last accessed.'
  },
  {
    type: 'single-choice',
    id: 'st-160',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob lifecycle management',
    stem: 'You want to prevent lifecycle management from moving a recently rehydrated blob back to the Archive tier too quickly. Which condition should you use?',
    options: [
      { id: 'a', text: 'daysAfterLastTierChangeGreaterThan' },
      { id: 'b', text: 'daysAfterModificationGreaterThan' },
      { id: 'c', text: 'daysAfterCreationGreaterThan' },
      { id: 'd', text: 'daysAfterRehydrationGreaterThan' }
    ],
    correctOptionId: 'a',
    explanation: 'The daysAfterLastTierChangeGreaterThan condition checks when the blob tier was last changed. This is useful to prevent lifecycle management from immediately archiving a blob that was recently rehydrated from the Archive tier. For example, you can set the rule to only archive blobs whose tier has not changed in the last 90 days, giving rehydrated blobs time to be accessed before being archived again.'
  },

  // st-161 to st-170: Configure blob versioning

  {
    type: 'single-choice',
    id: 'st-161',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'What happens when you enable blob versioning and modify a blob?',
    options: [
      { id: 'a', text: 'A new version is automatically created for the previous state of the blob' },
      { id: 'b', text: 'The blob is copied to a backup container' },
      { id: 'c', text: 'The modification is rejected unless you explicitly create a version first' },
      { id: 'd', text: 'A snapshot is created automatically' }
    ],
    correctOptionId: 'a',
    explanation: 'When blob versioning is enabled, any write operation (Put Blob, Put Block List, Copy Blob, Set Blob Metadata) automatically creates a new version of the blob. The previous state is preserved as a previous version, and the new data becomes the current version. This happens automatically without any additional action required from the user.'
  },
  {
    type: 'single-choice',
    id: 'st-162',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'How is a specific blob version identified?',
    options: [
      { id: 'a', text: 'By a version ID, which is a DateTime stamp appended to the blob URI' },
      { id: 'b', text: 'By a version number (v1, v2, v3, etc.)' },
      { id: 'c', text: 'By a unique GUID for each version' },
      { id: 'd', text: 'By the ETag value of the blob' }
    ],
    correctOptionId: 'a',
    explanation: 'Each blob version is identified by a version ID, which is a DateTime value that corresponds to when the version was created. The version ID is appended to the blob URI as a query parameter (e.g., ?versionid=2024-01-01T00:00:00.0000000Z). The current version of the blob does not require a version ID to access, but you can specify it explicitly.'
  },
  {
    type: 'single-choice',
    id: 'st-163',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'What happens to previous versions when you delete the current version of a blob with versioning enabled?',
    options: [
      { id: 'a', text: 'All versions are deleted' },
      { id: 'b', text: 'Previous versions are retained; the current version is soft-deleted or removed' },
      { id: 'c', text: 'The most recent previous version automatically becomes the current version' },
      { id: 'd', text: 'All versions are moved to the Archive tier' }
    ],
    correctOptionId: 'b',
    explanation: 'When you delete the current version of a versioned blob, the current version is deleted (or soft-deleted if soft delete is enabled), but all previous versions are retained and remain accessible by their version IDs. Previous versions do not automatically become the current version. To promote a previous version to be the current version, you must explicitly copy it or use the Copy Blob operation.'
  },
  {
    type: 'single-choice',
    id: 'st-164',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'You have blob versioning enabled and want to restore a previous version as the current blob. How do you accomplish this?',
    options: [
      { id: 'a', text: 'Copy the previous version over the current version using Copy Blob' },
      { id: 'b', text: 'Use the Promote Version REST API' },
      { id: 'c', text: 'Delete the current version and the previous version automatically becomes current' },
      { id: 'd', text: 'Move the version using the Move Blob API' }
    ],
    correctOptionId: 'a',
    explanation: 'To restore a previous version, you copy it over the current version using the Copy Blob operation. This makes the previous version data the new current version (creating yet another version in the process). There is no "Promote Version" or "Move Blob" API. Simply deleting the current version does not promote a previous version to current.'
  },
  {
    type: 'single-choice',
    id: 'st-165',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'Which Azure CLI command enables blob versioning on a storage account?',
    options: [
      { id: 'a', text: 'az storage account blob-service-properties update --account-name myaccount --enable-versioning true' },
      { id: 'b', text: 'az storage blob versioning enable --account myaccount' },
      { id: 'c', text: 'az storage account update --name myaccount --versioning-enabled' },
      { id: 'd', text: 'az storage blob-service set --versioning on --account myaccount' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct command is az storage account blob-service-properties update with the --enable-versioning true parameter. This enables automatic versioning for all blobs in the storage account. Once enabled, every modification to a blob automatically creates a new version. The other commands shown are not valid Azure CLI commands.'
  },
  {
    type: 'multiple-choice',
    id: 'st-166',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'Which TWO operations cause a new blob version to be created when versioning is enabled? (Choose two.)',
    options: [
      { id: 'a', text: 'Put Blob (uploading a new version of the blob)' },
      { id: 'b', text: 'Get Blob (reading the blob)' },
      { id: 'c', text: 'Set Blob Metadata (changing metadata)' },
      { id: 'd', text: 'Get Blob Properties (reading properties)' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Write operations that modify blob data or metadata create new versions. Put Blob (uploading/overwriting a blob) and Set Blob Metadata (modifying blob metadata) both create new versions. Read operations like Get Blob and Get Blob Properties do not modify the blob and therefore do not create new versions. Other versioning-triggering operations include Put Block List and Copy Blob.'
  },
  {
    type: 'drag-drop',
    id: 'st-167',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'Match each data protection feature to its characteristics.',
    items: [
      { id: 'item1', text: 'Automatically creates immutable copies on every write operation; each copy has a unique timestamp ID' },
      { id: 'item2', text: 'Manual or scheduled point-in-time copies of a blob; must be explicitly created' },
      { id: 'item3', text: 'Allows recovery of deleted blobs within a retention period; does not track modifications' }
    ],
    targets: [
      { id: 'target1', label: 'Blob versioning', correctItemId: 'item1' },
      { id: 'target2', label: 'Blob snapshots', correctItemId: 'item2' },
      { id: 'target3', label: 'Blob soft delete', correctItemId: 'item3' }
    ],
    explanation: 'Blob versioning automatically creates a new version on every write operation, with each version identified by a DateTime stamp. Blob snapshots are point-in-time copies that must be explicitly created (they are not automatic). Blob soft delete retains deleted blobs for recovery but does not create copies on modification; it specifically protects against deletion (and overwrite when combined with versioning).'
  },
  {
    type: 'dropdown',
    id: 'st-168',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'Complete the statement about blob versioning.',
    segments: [
      { type: 'text', text: 'When blob versioning is enabled, each version is ' },
      { type: 'dropdown', id: 'dd1', options: ['immutable (read-only)', 'mutable (read-write)', 'encrypted separately', 'compressed'], correctOption: 'immutable (read-only)' },
      { type: 'text', text: '. Previous versions can be accessed using the ' },
      { type: 'dropdown', id: 'dd2', options: ['versionid query parameter', 'snapshot query parameter', 'version HTTP header', 'x-ms-version header'], correctOption: 'versionid query parameter' },
      { type: 'text', text: ' appended to the blob URI.' }
    ],
    explanation: 'Previous blob versions are immutable (read-only); they cannot be modified or deleted through normal operations (unless you have explicit delete permissions). To access a specific version, you append the versionid query parameter to the blob URI (e.g., https://myaccount.blob.core.windows.net/container/blob?versionid=2024-01-01T00:00:00Z). The snapshot query parameter is used for blob snapshots, not versions.'
  },
  {
    type: 'yes-no',
    id: 'st-169',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    scenario: 'You have enabled blob versioning on an Azure storage account.',
    statements: [
      { id: 's1', text: 'Blob versioning is supported for storage accounts with hierarchical namespace (Azure Data Lake Storage Gen2) enabled.', correct: false },
      { id: 's2', text: 'Each previous version is billed for the storage it consumes, including unique blocks or pages.', correct: true },
      { id: 's3', text: 'Lifecycle management policies can automatically delete old blob versions based on age.', correct: true }
    ],
    explanation: 'Blob versioning is not currently supported for accounts with hierarchical namespace enabled (Azure Data Lake Storage Gen2). Each version is billed for the unique blocks or pages it contains; shared blocks between versions are only stored and billed once. Lifecycle management policies can target blob versions specifically, allowing you to delete old versions based on age (daysAfterCreationGreaterThan) to manage storage costs.'
  },
  {
    type: 'single-choice',
    id: 'st-170',
    sectionId: 'storage',
    subsectionId: 'configure-files-blob',
    bulletPoint: 'Configure blob versioning',
    stem: 'You want to minimize storage costs from blob versioning. Previous versions older than 90 days should be deleted automatically. How should you configure this?',
    options: [
      { id: 'a', text: 'Create a lifecycle management rule that deletes previous versions where daysAfterCreationGreaterThan is 90' },
      { id: 'b', text: 'Set a version retention policy of 90 days in the blob service properties' },
      { id: 'c', text: 'Configure blob versioning with a maximum of 90 days retention' },
      { id: 'd', text: 'Manually delete old versions using a scheduled Azure Function' }
    ],
    correctOptionId: 'a',
    explanation: 'Lifecycle management rules can target previous blob versions with the delete action using the daysAfterCreationGreaterThan condition. This automatically deletes versions older than the specified number of days. There is no built-in version retention policy or maximum retention setting on blob versioning itself. While Azure Functions could accomplish this, lifecycle management provides a native, zero-code solution that is the recommended approach.'
  }
];
