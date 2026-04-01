import { Question } from '../types';

export const identityGovernanceQuestions: Question[] = [
  // ========================================================================
  // ig-001 to ig-010: "Create users and groups" (subsection: manage-entra-users)
  // ========================================================================
  {
    id: 'ig-001',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'single-choice',
    stem: 'You need to create a new user account in Microsoft Entra ID for an employee named Alex Johnson. The user must be able to sign in immediately using the username alex.johnson@contoso.com. Which PowerShell command should you use?',
    options: [
      { id: 'a', text: 'New-MgUser -DisplayName "Alex Johnson" -UserPrincipalName "alex.johnson@contoso.com" -AccountEnabled -MailNickname "alex.johnson" -PasswordProfile @{Password="P@ssw0rd1234"; ForceChangePasswordNextSignIn=$true}' },
      { id: 'b', text: 'New-AzADUser -DisplayName "Alex Johnson" -UserPrincipalName "alex.johnson@contoso.com" -Password "P@ssw0rd1234"' },
      { id: 'c', text: 'New-MgUser -DisplayName "Alex Johnson" -UserPrincipalName "alex.johnson@contoso.com" -AccountEnabled:$false -PasswordProfile @{Password="P@ssw0rd1234"}' },
      { id: 'd', text: 'az ad user create --display-name "Alex Johnson" --user-principal-name "alex.johnson@contoso.com" --force-change-password-next-sign-in false' }
    ],
    correctOptionId: 'a',
    explanation: 'New-MgUser is the Microsoft Graph PowerShell command to create users in Microsoft Entra ID. The -AccountEnabled flag (without $false) enables the account immediately. The PasswordProfile must include a Password and typically ForceChangePasswordNextSignIn. Option C disables the account, option B uses the older Az module syntax, and option D is Azure CLI but is missing the required --password parameter.'
  },
  {
    id: 'ig-002',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'single-choice',
    stem: 'You need to create a security group named "Finance-Team" in Microsoft Entra ID that will be used to manage access to Azure resources. The group membership must be managed manually by an administrator. Which group type and membership type should you configure?',
    options: [
      { id: 'a', text: 'Group type: Microsoft 365, Membership type: Assigned' },
      { id: 'b', text: 'Group type: Security, Membership type: Dynamic User' },
      { id: 'c', text: 'Group type: Security, Membership type: Assigned' },
      { id: 'd', text: 'Group type: Distribution, Membership type: Assigned' }
    ],
    correctOptionId: 'c',
    explanation: 'Security groups are used to manage access to Azure resources and can be assigned Azure roles. The "Assigned" membership type means an administrator manually adds and removes members. Microsoft 365 groups are for collaboration (email, SharePoint). Dynamic User membership is rule-based, not manually managed. Distribution groups are for email distribution only and cannot be used for Azure RBAC.'
  },
  {
    id: 'ig-003',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'single-choice',
    stem: 'You are using Azure CLI to create a new user in Microsoft Entra ID. Which command correctly creates a user with the display name "Sara Lee" and a temporary password?',
    options: [
      { id: 'a', text: 'az ad user create --display-name "Sara Lee" --password "TempP@ss123" --user-principal-name sara.lee@contoso.com --mail-nickname sara.lee' },
      { id: 'b', text: 'az ad user new --name "Sara Lee" --password "TempP@ss123" --upn sara.lee@contoso.com' },
      { id: 'c', text: 'az identity user create --display-name "Sara Lee" --password "TempP@ss123" --principal-name sara.lee@contoso.com' },
      { id: 'd', text: 'az ad user create --display-name "Sara Lee" --user-principal-name sara.lee@contoso.com' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct Azure CLI command is "az ad user create" with the required parameters: --display-name, --password, --user-principal-name, and --mail-nickname. Option B uses a non-existent "new" subcommand. Option C uses a non-existent "az identity user" command. Option D is missing the required --password parameter.'
  },
  {
    id: 'ig-004',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'single-choice',
    stem: 'Your organization needs to create a dynamic group in Microsoft Entra ID that automatically includes all users from the Sales department. Which membership rule should you use?',
    options: [
      { id: 'a', text: '(user.department -eq "Sales")' },
      { id: 'b', text: '(user.jobTitle -contains "Sales")' },
      { id: 'c', text: '(user.department -match "Sales")' },
      { id: 'd', text: '(user.group -eq "Sales")' }
    ],
    correctOptionId: 'a',
    explanation: 'Dynamic membership rules in Microsoft Entra ID use a specific syntax. The correct rule to include all users where the department attribute equals "Sales" is (user.department -eq "Sales"). The -eq operator checks for an exact match. While -contains checks if a string contains a substring, -eq is more precise for department matching. The -match operator and user.group property are not valid in dynamic membership rules.'
  },
  {
    id: 'ig-005',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'single-choice',
    stem: 'You need to bulk create 500 user accounts in Microsoft Entra ID. Which approach is the most efficient?',
    options: [
      { id: 'a', text: 'Create each user individually through the Azure portal' },
      { id: 'b', text: 'Use the Bulk create users operation in the Microsoft Entra admin center by uploading a CSV file' },
      { id: 'c', text: 'Use Azure Resource Manager (ARM) templates to deploy users' },
      { id: 'd', text: 'Create users through Azure Cloud Shell using az group create commands' }
    ],
    correctOptionId: 'b',
    explanation: 'The Microsoft Entra admin center provides a Bulk create users feature that allows you to upload a CSV template with user information to create multiple users at once. This is the most efficient method for bulk operations. Creating users individually in the portal is impractical for 500 users. ARM templates are for Azure resource deployment, not user creation. The "az group create" command creates resource groups, not users.'
  },
  {
    id: 'ig-006',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'multiple-choice',
    stem: 'You are creating a new Microsoft 365 group in Microsoft Entra ID. Which TWO features are available for Microsoft 365 groups but NOT for security groups? (Choose two.)',
    options: [
      { id: 'a', text: 'Shared mailbox' },
      { id: 'b', text: 'Azure role assignment' },
      { id: 'c', text: 'Shared SharePoint document library' },
      { id: 'd', text: 'Dynamic membership rules' },
      { id: 'e', text: 'Nested group membership' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Microsoft 365 groups provide collaboration features including a shared mailbox and a shared SharePoint document library. These features are not available with security groups. Both group types support dynamic membership rules. Azure role assignment is primarily a security group feature (Microsoft 365 groups can be role-assignable but that is not a distinguishing feature). Nested group membership is supported by security groups.'
  },
  {
    id: 'ig-007',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'multiple-choice',
    stem: 'You need to create a user account in Microsoft Entra ID through the Azure portal. Which THREE properties are required when creating a new user? (Choose three.)',
    options: [
      { id: 'a', text: 'User principal name' },
      { id: 'b', text: 'Display name' },
      { id: 'c', text: 'Department' },
      { id: 'd', text: 'Initial password' },
      { id: 'e', text: 'Job title' }
    ],
    correctOptionIds: ['a', 'b', 'd'],
    requiredSelections: 3,
    explanation: 'When creating a new user in Microsoft Entra ID through the Azure portal, the required fields are User principal name (the sign-in name), Display name, and an initial password. Department and Job title are optional profile properties that can be configured later.'
  },
  {
    id: 'ig-008',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'drag-drop',
    stem: 'Match each Azure CLI or PowerShell command to the action it performs for user and group management in Microsoft Entra ID.',
    items: [
      { id: 'item1', text: 'az ad group create --display-name "DevOps" --mail-nickname "devops"' },
      { id: 'item2', text: 'az ad group member add --group "DevOps" --member-id <user-object-id>' },
      { id: 'item3', text: 'New-MgGroup -DisplayName "DevOps" -SecurityEnabled -MailEnabled:$false -MailNickname "devops"' },
      { id: 'item4', text: 'az ad user create --display-name "John" --password "P@ss" --user-principal-name john@contoso.com --mail-nickname john' }
    ],
    targets: [
      { id: 'target1', label: 'Create a security group using PowerShell', correctItemId: 'item3' },
      { id: 'target2', label: 'Create a group using Azure CLI', correctItemId: 'item1' },
      { id: 'target3', label: 'Add a user to a group using Azure CLI', correctItemId: 'item2' },
      { id: 'target4', label: 'Create a new user using Azure CLI', correctItemId: 'item4' }
    ],
    explanation: 'New-MgGroup with -SecurityEnabled creates a security group in PowerShell. "az ad group create" creates a group via Azure CLI. "az ad group member add" adds a member to an existing group. "az ad user create" creates a new user account via Azure CLI.'
  },
  {
    id: 'ig-009',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'dropdown',
    stem: 'Complete the following PowerShell command to create a dynamic security group that includes all users with the department set to "Engineering".',
    segments: [
      { type: 'text', text: 'New-MgGroup -DisplayName "Engineering Team" -SecurityEnabled -MailEnabled:$false -MailNickname "eng-team" -GroupTypes ' },
      { type: 'dropdown', id: 'dd1', options: ['"DynamicMembership"', '"Unified"', '"Security"', '"Assigned"'], correctOption: '"DynamicMembership"' },
      { type: 'text', text: ' -MembershipRule ' },
      { type: 'dropdown', id: 'dd2', options: ['"(user.department -eq \\"Engineering\\")"', '"(department = Engineering)"', '"user.department == Engineering"', '"WHERE department = \'Engineering\'"'], correctOption: '"(user.department -eq \\"Engineering\\")"' },
      { type: 'text', text: ' -MembershipRuleProcessingState "On"' }
    ],
    explanation: 'To create a dynamic group using Microsoft Graph PowerShell, you must set -GroupTypes to "DynamicMembership" and provide a -MembershipRule using the dynamic membership rule syntax. The correct syntax is (user.department -eq "Engineering"). The -MembershipRuleProcessingState must be set to "On" to enable rule evaluation.'
  },
  {
    id: 'ig-010',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Create users and groups',
    type: 'yes-no',
    scenario: 'Your company is setting up Microsoft Entra ID for a new Azure environment. You need to understand how users and groups work in Microsoft Entra ID.',
    statements: [
      { id: 's1', text: 'A user can be a member of a maximum of 50 groups in Microsoft Entra ID.', correct: false },
      { id: 's2', text: 'A security group can be used to assign permissions to Azure resources through RBAC.', correct: true },
      { id: 's3', text: 'When creating a user via the Azure portal, you can specify the user\'s usage location, which is required for license assignment.', correct: true }
    ],
    explanation: 'A user can be a member of up to 500 groups (not 50) in Microsoft Entra ID. Security groups can indeed be used with Azure RBAC to manage access to resources. The usage location property is available during user creation in the portal and is required before assigning licenses, as some services are not available in all locations.'
  },

  // ========================================================================
  // ig-011 to ig-020: "Manage user and group properties" (subsection: manage-entra-users)
  // ========================================================================
  {
    id: 'ig-011',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'single-choice',
    stem: 'A user reports that their job title is displayed incorrectly in Microsoft Entra ID. You need to update the job title to "Senior Developer" using PowerShell. Which command should you use?',
    options: [
      { id: 'a', text: 'Update-MgUser -UserId user@contoso.com -JobTitle "Senior Developer"' },
      { id: 'b', text: 'Set-MgUser -UserId user@contoso.com -JobTitle "Senior Developer"' },
      { id: 'c', text: 'Set-AzureADUser -ObjectId user@contoso.com -JobTitle "Senior Developer"' },
      { id: 'd', text: 'az ad user update --id user@contoso.com --set jobTitle="Senior Developer"' }
    ],
    correctOptionId: 'a',
    explanation: 'The Microsoft Graph PowerShell command to update user properties is Update-MgUser. You specify the user with -UserId and the property to update with the parameter name, such as -JobTitle. Set-MgUser does not exist; the correct cmdlet is Update-MgUser. Set-AzureADUser was the older Azure AD PowerShell module command which is deprecated. Option D is Azure CLI syntax, which is valid but the question asks for PowerShell.'
  },
  {
    id: 'ig-012',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'single-choice',
    stem: 'You need to block a user from signing in to Microsoft Entra ID without deleting their account. What should you do?',
    options: [
      { id: 'a', text: 'Remove all group memberships from the user' },
      { id: 'b', text: 'Set the Account enabled property to No in the user\'s profile' },
      { id: 'c', text: 'Remove all role assignments from the user' },
      { id: 'd', text: 'Reset the user\'s password' }
    ],
    correctOptionId: 'b',
    explanation: 'Setting the Account enabled property to No (disabling the account) prevents the user from signing in without deleting the account. The user\'s data, group memberships, and role assignments are preserved. Removing group memberships or role assignments reduces access but does not block sign-in. Resetting the password changes credentials but still allows sign-in with the new password.'
  },
  {
    id: 'ig-013',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'single-choice',
    stem: 'You need to change the display name of a security group from "IT-Support" to "IT-HelpDesk" using Azure CLI. Which command should you run?',
    options: [
      { id: 'a', text: 'az ad group update --group "IT-Support" --display-name "IT-HelpDesk"' },
      { id: 'b', text: 'az ad group rename --name "IT-Support" --new-name "IT-HelpDesk"' },
      { id: 'c', text: 'az ad group set --group "IT-Support" --display-name "IT-HelpDesk"' },
      { id: 'd', text: 'az ad group modify --group "IT-Support" --new-display-name "IT-HelpDesk"' }
    ],
    correctOptionId: 'a',
    explanation: 'The "az ad group update" command is used to update group properties in Microsoft Entra ID. The --group parameter identifies the group (by display name or object ID), and --display-name sets the new display name. The other options use non-existent Azure CLI subcommands.'
  },
  {
    id: 'ig-014',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'single-choice',
    stem: 'An administrator needs to view the sign-in activity of a specific user in Microsoft Entra ID. Where in the Azure portal should the administrator look?',
    options: [
      { id: 'a', text: 'Microsoft Entra ID > Users > select the user > Sign-in logs' },
      { id: 'b', text: 'Microsoft Entra ID > Enterprise applications > Sign-in logs' },
      { id: 'c', text: 'Azure Monitor > Activity log > filter by user' },
      { id: 'd', text: 'Microsoft Entra ID > Security > Authentication methods' }
    ],
    correctOptionId: 'a',
    explanation: 'To view the sign-in activity of a specific user, navigate to Microsoft Entra ID > Users, select the user, and then view their Sign-in logs. This shows all authentication attempts for that user. Enterprise applications sign-in logs show application-level sign-ins, not user-specific. Azure Monitor Activity log tracks Azure resource management operations. Authentication methods shows configured MFA methods, not sign-in history.'
  },
  {
    id: 'ig-015',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'single-choice',
    stem: 'You have a dynamic group with the membership rule (user.department -eq "Marketing"). A user who belongs to the Marketing department is not appearing in the group. What is the MOST likely cause?',
    options: [
      { id: 'a', text: 'The user\'s department property in Microsoft Entra ID is not set to "Marketing"' },
      { id: 'b', text: 'The user does not have a license assigned' },
      { id: 'c', text: 'The user\'s account is disabled' },
      { id: 'd', text: 'The group has reached its maximum member limit' }
    ],
    correctOptionId: 'a',
    explanation: 'Dynamic group membership is based on user attribute values in Microsoft Entra ID. If a user is not appearing in a dynamic group, the most likely cause is that their attribute value does not match the rule. The department property in Entra ID must exactly match "Marketing" (case-sensitive). License assignment, account status, and group size limits do not affect dynamic group membership evaluation.'
  },
  {
    id: 'ig-016',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'multiple-choice',
    stem: 'You need to configure a group in Microsoft Entra ID so that members can be automatically added or removed based on user attributes. Which TWO settings must be configured? (Choose two.)',
    options: [
      { id: 'a', text: 'Set the membership type to Dynamic User' },
      { id: 'b', text: 'Enable group-based licensing' },
      { id: 'c', text: 'Configure a dynamic membership rule' },
      { id: 'd', text: 'Assign an owner to the group' },
      { id: 'e', text: 'Enable self-service group management' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'To automatically manage group membership based on user attributes, you must set the membership type to "Dynamic User" and configure a dynamic membership rule that defines the criteria for inclusion. Group-based licensing, assigning an owner, and self-service group management are separate features that are not required for dynamic membership.'
  },
  {
    id: 'ig-017',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'multiple-choice',
    stem: 'Which TWO user properties can be modified by the user themselves without administrator intervention in Microsoft Entra ID? (Choose two.)',
    options: [
      { id: 'a', text: 'Password (through self-service password reset)' },
      { id: 'b', text: 'User principal name' },
      { id: 'c', text: 'Profile photo' },
      { id: 'd', text: 'Usage location' },
      { id: 'e', text: 'Account enabled status' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Users can change their own password through self-service password reset (when enabled) and update their profile photo. The user principal name, usage location, and account enabled status are administrative properties that can only be changed by an administrator with appropriate permissions.'
  },
  {
    id: 'ig-018',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'drag-drop',
    stem: 'Match each user property management task to the correct Azure CLI command.',
    items: [
      { id: 'item1', text: 'az ad user update --id user@contoso.com --account-enabled false' },
      { id: 'item2', text: 'az ad group member remove --group "TeamA" --member-id <object-id>' },
      { id: 'item3', text: 'az ad user update --id user@contoso.com --display-name "New Name"' },
      { id: 'item4', text: 'az ad group owner add --group "TeamA" --owner-object-id <object-id>' }
    ],
    targets: [
      { id: 'target1', label: 'Disable a user account', correctItemId: 'item1' },
      { id: 'target2', label: 'Change a user\'s display name', correctItemId: 'item3' },
      { id: 'target3', label: 'Remove a user from a group', correctItemId: 'item2' },
      { id: 'target4', label: 'Add an owner to a group', correctItemId: 'item4' }
    ],
    explanation: 'Use "az ad user update --account-enabled false" to disable an account. Use "az ad user update --display-name" to change a display name. Use "az ad group member remove" to remove a member from a group. Use "az ad group owner add" to add an owner to a group.'
  },
  {
    id: 'ig-019',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'dropdown',
    stem: 'You need to update a user\'s department and manager in Microsoft Entra ID using PowerShell. Complete the commands below.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['Update-MgUser', 'Set-MgUser', 'New-MgUser', 'Set-AzureADUser'], correctOption: 'Update-MgUser' },
      { type: 'text', text: ' -UserId "user@contoso.com" -Department "Engineering"\n\n$managerRef = @{ "@odata.id" = "https://graph.microsoft.com/v1.0/users/<manager-id>" }\n' },
      { type: 'dropdown', id: 'dd2', options: ['Set-MgUserManagerByRef', 'Update-MgUserManager', 'Set-MgUserManager', 'New-MgUserManagerByRef'], correctOption: 'Set-MgUserManagerByRef' },
      { type: 'text', text: ' -UserId "user@contoso.com" -BodyParameter $managerRef' }
    ],
    explanation: 'Update-MgUser is used to modify standard user properties like Department. To set a user\'s manager, you use Set-MgUserManagerByRef, which creates a reference link between the user and their manager using the Microsoft Graph API. The $managerRef variable contains the OData reference to the manager\'s user object.'
  },
  {
    id: 'ig-020',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage user and group properties',
    type: 'yes-no',
    scenario: 'You are managing user and group properties in Microsoft Entra ID for your organization.',
    statements: [
      { id: 's1', text: 'A deleted user account can be restored within 30 days of deletion.', correct: true },
      { id: 's2', text: 'Changing a user\'s User Principal Name (UPN) immediately invalidates all existing sessions.', correct: false },
      { id: 's3', text: 'A group owner can add and remove members from the group without being a Global Administrator.', correct: true }
    ],
    explanation: 'Deleted user accounts are soft-deleted and can be restored within 30 days. After 30 days, the account is permanently deleted. Changing a user\'s UPN does not immediately invalidate existing sessions; the user continues to use existing tokens until they expire. A group owner has permissions to manage the group\'s membership without needing the Global Administrator role.'
  },

  // ========================================================================
  // ig-021 to ig-030: "Manage licenses in Microsoft Entra ID" (subsection: manage-entra-users)
  // ========================================================================
  {
    id: 'ig-021',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'single-choice',
    stem: 'You need to assign a Microsoft 365 E3 license to a user. Before assigning the license, which user property must be configured?',
    options: [
      { id: 'a', text: 'Department' },
      { id: 'b', text: 'Usage location' },
      { id: 'c', text: 'Manager' },
      { id: 'd', text: 'Job title' }
    ],
    correctOptionId: 'b',
    explanation: 'Before a license can be assigned to a user in Microsoft Entra ID, the Usage location property must be set. This is because some Microsoft services are not available in all geographic locations due to local laws and regulations. The usage location determines which services within the license are available to the user. Department, Manager, and Job title are optional properties not required for license assignment.'
  },
  {
    id: 'ig-022',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'single-choice',
    stem: 'Your organization has 100 Microsoft 365 E5 licenses. You need to ensure that all members of the Sales department automatically receive this license. What is the recommended approach?',
    options: [
      { id: 'a', text: 'Assign the license directly to each user in the Sales department' },
      { id: 'b', text: 'Create a dynamic group for the Sales department and assign the license to the group' },
      { id: 'c', text: 'Use a PowerShell script that runs daily to assign licenses to Sales users' },
      { id: 'd', text: 'Create an Azure Automation runbook to manage license assignment' }
    ],
    correctOptionId: 'b',
    explanation: 'Group-based licensing is the recommended approach for automatic license management. By creating a dynamic group with a rule like (user.department -eq "Sales") and assigning the license to the group, any user whose department is set to Sales will automatically receive the license. This is more efficient and reliable than direct assignment, scripts, or automation runbooks.'
  },
  {
    id: 'ig-023',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'single-choice',
    stem: 'A user has been assigned a Microsoft 365 E3 license through group-based licensing. The administrator also directly assigns the same license to the user. What happens to the license assignment?',
    options: [
      { id: 'a', text: 'The user consumes two licenses from the available pool' },
      { id: 'b', text: 'The direct assignment is rejected with an error' },
      { id: 'c', text: 'The user has both a direct and group-based assignment but consumes only one license' },
      { id: 'd', text: 'The group-based assignment is automatically removed' }
    ],
    correctOptionId: 'c',
    explanation: 'When a user receives the same license through both direct assignment and group-based licensing, they consume only one license from the pool. Microsoft Entra ID tracks both assignment sources but does not double-consume licenses. This is useful to know because if the user is later removed from the group, they will still retain the license through the direct assignment.'
  },
  {
    id: 'ig-024',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'single-choice',
    stem: 'You notice that group-based license assignment has failed for several users in a group. Where can you identify the specific errors and affected users?',
    options: [
      { id: 'a', text: 'Microsoft Entra ID > Groups > select the group > Licenses > look for users with assignment errors' },
      { id: 'b', text: 'Azure Monitor > Diagnostics settings > License errors' },
      { id: 'c', text: 'Microsoft Entra ID > Audit logs > filter by license' },
      { id: 'd', text: 'Microsoft Entra ID > Users > All users > filter by license status' }
    ],
    correctOptionId: 'a',
    explanation: 'When group-based license assignment fails, you can view the specific errors by navigating to the group in Microsoft Entra ID, selecting Licenses, and reviewing users with assignment errors. Common errors include insufficient licenses, conflicting service plans, or missing usage location. This view shows exactly which users failed and why.'
  },
  {
    id: 'ig-025',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'single-choice',
    stem: 'You need to disable specific service plans within a Microsoft 365 E5 license for a group of users. For example, you want to disable Yammer Enterprise while keeping all other services enabled. What should you do?',
    options: [
      { id: 'a', text: 'Assign the license to the group and then configure disabled service plans in the license assignment' },
      { id: 'b', text: 'Create a conditional access policy to block Yammer' },
      { id: 'c', text: 'Remove the license and assign individual service licenses instead' },
      { id: 'd', text: 'Use Azure Policy to prevent Yammer access' }
    ],
    correctOptionId: 'a',
    explanation: 'When assigning a license (directly or through group-based licensing), you can select which service plans within the license to enable or disable. This allows you to assign a Microsoft 365 E5 license but disable specific services like Yammer Enterprise. Conditional access policies control sign-in conditions, not license service plans. Individual service licenses would be more complex to manage, and Azure Policy is for Azure resource governance.'
  },
  {
    id: 'ig-026',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'multiple-choice',
    stem: 'Which TWO of the following are common reasons for group-based license assignment failure in Microsoft Entra ID? (Choose two.)',
    options: [
      { id: 'a', text: 'Not enough available licenses in the tenant' },
      { id: 'b', text: 'The group has more than 100 members' },
      { id: 'c', text: 'A user is missing the Usage location property' },
      { id: 'd', text: 'The group is a Microsoft 365 group instead of a security group' },
      { id: 'e', text: 'The group is nested inside another group' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'The two most common reasons for group-based license assignment failure are: insufficient available licenses in the tenant and users missing the Usage location property. Group size does not cause failures. Both security groups and Microsoft 365 groups support group-based licensing. While nested groups do have some limitations with group-based licensing, the direct group assignment is what matters.'
  },
  {
    id: 'ig-027',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'multiple-choice',
    stem: 'You are using PowerShell to manage licenses in Microsoft Entra ID. Which TWO cmdlets would you use to assign a license to a user? (Choose two.)',
    options: [
      { id: 'a', text: 'Set-MgUserLicense' },
      { id: 'b', text: 'Get-MgSubscribedSku to retrieve the SKU ID' },
      { id: 'c', text: 'New-MgUserLicense' },
      { id: 'd', text: 'Add-MgUserLicense' },
      { id: 'e', text: 'Get-MgUser to verify the user exists' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'To assign a license using Microsoft Graph PowerShell, you first use Get-MgSubscribedSku to retrieve the available license SKU IDs in your tenant. Then you use Set-MgUserLicense with the -AddLicenses parameter to assign the license to the user. New-MgUserLicense and Add-MgUserLicense are not valid cmdlets. While Get-MgUser can verify a user exists, it is not required for the license assignment process.'
  },
  {
    id: 'ig-028',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'drag-drop',
    stem: 'Match each license management scenario to the correct approach in Microsoft Entra ID.',
    items: [
      { id: 'item1', text: 'Group-based licensing with a dynamic group' },
      { id: 'item2', text: 'Direct license assignment in the user profile' },
      { id: 'item3', text: 'Set-MgUserLicense with -RemoveLicenses parameter' },
      { id: 'item4', text: 'Reprocess license assignment on the group' }
    ],
    targets: [
      { id: 'target1', label: 'Automatically assign licenses to users based on department', correctItemId: 'item1' },
      { id: 'target2', label: 'Assign a license to a single contractor for a short-term project', correctItemId: 'item2' },
      { id: 'target3', label: 'Remove a specific license from a user via PowerShell', correctItemId: 'item3' },
      { id: 'target4', label: 'Retry failed license assignments after adding more licenses', correctItemId: 'item4' }
    ],
    explanation: 'Group-based licensing with dynamic groups automates license assignment based on attributes like department. Direct assignment is suitable for individual short-term assignments. Set-MgUserLicense with -RemoveLicenses removes a specific license via PowerShell. Reprocessing a group\'s license assignment retries failed assignments, which is useful after purchasing additional licenses.'
  },
  {
    id: 'ig-029',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'dropdown',
    stem: 'Complete the PowerShell commands to assign a Microsoft 365 E3 license to a user while disabling the Exchange Online service plan.',
    segments: [
      { type: 'text', text: '$sku = ' },
      { type: 'dropdown', id: 'dd1', options: ['Get-MgSubscribedSku', 'Get-MgUserLicense', 'Get-MgLicense', 'Get-AzSubscription'], correctOption: 'Get-MgSubscribedSku' },
      { type: 'text', text: ' | Where-Object { $_.SkuPartNumber -eq "ENTERPRISEPACK" }\n\n$disabledPlans = @($sku.ServicePlans | Where-Object { $_.ServicePlanName -eq "EXCHANGE_S_ENTERPRISE" }).ServicePlanId\n\n' },
      { type: 'dropdown', id: 'dd2', options: ['Set-MgUserLicense', 'Add-MgUserLicense', 'Update-MgUserLicense', 'New-MgUserLicenseDetail'], correctOption: 'Set-MgUserLicense' },
      { type: 'text', text: ' -UserId "user@contoso.com" -AddLicenses @(@{SkuId=$sku.SkuId; DisabledPlans=$disabledPlans}) -RemoveLicenses @()' }
    ],
    explanation: 'Get-MgSubscribedSku retrieves available license SKUs in the tenant. The ENTERPRISEPACK SKU corresponds to Microsoft 365 E3. Set-MgUserLicense assigns or removes licenses. The -AddLicenses parameter accepts a hashtable with the SkuId and an array of DisabledPlans (service plan IDs to disable). -RemoveLicenses must be specified even if empty.'
  },
  {
    id: 'ig-030',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage licenses in Microsoft Entra ID',
    type: 'yes-no',
    scenario: 'Your organization uses group-based licensing to manage Microsoft 365 licenses in Microsoft Entra ID.',
    statements: [
      { id: 's1', text: 'Group-based licensing requires a Microsoft Entra ID P1 or P2 license.', correct: true },
      { id: 's2', text: 'If a user is removed from a licensed group, the license is immediately revoked and the user loses access to all associated services.', correct: true },
      { id: 's3', text: 'You can assign licenses to nested groups, and members of the nested group will inherit the license.', correct: false }
    ],
    explanation: 'Group-based licensing requires Microsoft Entra ID P1 or P2 (or Microsoft 365 E3 and above). When a user is removed from a licensed group, the license is revoked (though there may be a brief processing delay). Group-based licensing does not support inheritance through nested groups; licenses are only assigned to direct members of the group that has the license assigned.'
  },

  // ========================================================================
  // ig-031 to ig-040: "Manage external users" (subsection: manage-entra-users)
  // ========================================================================
  {
    id: 'ig-031',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'single-choice',
    stem: 'You need to invite an external partner (partner@fabrikam.com) to collaborate on resources in your Azure environment. The partner should authenticate using their existing Fabrikam credentials. Which feature should you use?',
    options: [
      { id: 'a', text: 'Create a new member user account for the partner in your tenant' },
      { id: 'b', text: 'Microsoft Entra B2B collaboration to send a guest invitation' },
      { id: 'c', text: 'Microsoft Entra B2C to create a consumer account' },
      { id: 'd', text: 'Configure federation with Fabrikam using AD FS' }
    ],
    correctOptionId: 'b',
    explanation: 'Microsoft Entra B2B (Business-to-Business) collaboration allows you to invite external users as guests to your tenant. The partner authenticates using their home organization\'s (Fabrikam) credentials and can then access resources you share with them. Creating a member account would require managing separate credentials. B2C is for consumer-facing applications. AD FS federation is unnecessary when B2B collaboration handles this scenario natively.'
  },
  {
    id: 'ig-032',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'single-choice',
    stem: 'A guest user in your Microsoft Entra tenant reports they cannot access an Azure resource group that other team members can access. The guest user has been invited and has accepted the invitation. What is the MOST likely cause?',
    options: [
      { id: 'a', text: 'Guest users cannot access Azure resources' },
      { id: 'b', text: 'The guest user has not been assigned an appropriate Azure RBAC role on the resource group' },
      { id: 'c', text: 'The guest user needs a license in your tenant' },
      { id: 'd', text: 'Guest users must wait 24 hours after accepting an invitation before accessing resources' }
    ],
    correctOptionId: 'b',
    explanation: 'Guest users can access Azure resources, but they must be assigned appropriate RBAC roles just like member users. Simply inviting a guest user does not automatically grant them access to any Azure resources. An RBAC role (such as Reader or Contributor) must be explicitly assigned at the appropriate scope. Guest users do not need licenses to access Azure resources (licenses are for Microsoft 365 services). There is no 24-hour waiting period.'
  },
  {
    id: 'ig-033',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'single-choice',
    stem: 'You want to restrict which external domains can be invited as guest users in your Microsoft Entra ID tenant. Where do you configure this?',
    options: [
      { id: 'a', text: 'Microsoft Entra ID > External Identities > External collaboration settings' },
      { id: 'b', text: 'Microsoft Entra ID > Security > Conditional Access' },
      { id: 'c', text: 'Microsoft Entra ID > Users > User settings' },
      { id: 'd', text: 'Microsoft Entra ID > Enterprise applications > Consent and permissions' }
    ],
    correctOptionId: 'a',
    explanation: 'External collaboration settings in Microsoft Entra ID > External Identities allow you to configure collaboration restrictions, including allowing or denying invitations to specific domains. You can set an allow list (only specified domains) or a deny list (all domains except specified ones). Conditional Access can control guest sign-in conditions but not invitation restrictions. User settings and consent/permissions do not control external domain restrictions.'
  },
  {
    id: 'ig-034',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'single-choice',
    stem: 'Which PowerShell command sends a B2B guest invitation to an external user?',
    options: [
      { id: 'a', text: 'New-MgInvitation -InvitedUserEmailAddress "user@fabrikam.com" -InviteRedirectUrl "https://portal.azure.com" -SendInvitationMessage:$true' },
      { id: 'b', text: 'New-MgUser -UserType "Guest" -Mail "user@fabrikam.com"' },
      { id: 'c', text: 'Add-MgGroupMember -GroupId $groupId -DirectoryObjectId "user@fabrikam.com"' },
      { id: 'd', text: 'Send-MgInvitation -Email "user@fabrikam.com" -RedirectUrl "https://portal.azure.com"' }
    ],
    correctOptionId: 'a',
    explanation: 'New-MgInvitation is the Microsoft Graph PowerShell command to send a B2B guest invitation. It requires the invited user\'s email address and a redirect URL (where the user is directed after accepting). The -SendInvitationMessage parameter controls whether an email notification is sent. Creating a user with UserType Guest does not send an invitation. Add-MgGroupMember adds existing users to groups. Send-MgInvitation is not a valid cmdlet.'
  },
  {
    id: 'ig-035',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'single-choice',
    stem: 'Your organization\'s security policy requires that all guest user accounts that have not signed in for 90 days be automatically reviewed and potentially removed. Which Microsoft Entra feature should you implement?',
    options: [
      { id: 'a', text: 'Access reviews for guest users' },
      { id: 'b', text: 'Conditional access policy with sign-in frequency' },
      { id: 'c', text: 'Azure Automation runbook' },
      { id: 'd', text: 'Microsoft Entra ID Governance lifecycle workflows' }
    ],
    correctOptionId: 'a',
    explanation: 'Access reviews in Microsoft Entra ID allow you to create recurring reviews specifically targeting guest users. You can configure reviews to check for inactive guest accounts (those that haven\'t signed in within a specified period) and automatically remove access or the guest account if the review is not completed. Conditional access controls sign-in conditions, not account cleanup. While Azure Automation could be scripted, access reviews are the built-in recommended solution.'
  },
  {
    id: 'ig-036',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'multiple-choice',
    stem: 'Which TWO settings can you configure in the External collaboration settings for guest users in Microsoft Entra ID? (Choose two.)',
    options: [
      { id: 'a', text: 'Whether guest users have limited or the same permissions as member users for directory data' },
      { id: 'b', text: 'The maximum number of guest users allowed in the tenant' },
      { id: 'c', text: 'Who can invite guest users (e.g., admins only, members, or guests themselves)' },
      { id: 'd', text: 'The default license to assign to guest users' },
      { id: 'e', text: 'The maximum session duration for guest users' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'External collaboration settings allow you to configure guest user permission levels (most limited, limited, or same as members) and who can invite guest users (no one, admins only, admins and users in the guest inviter role, members, or everyone including guests). There is no maximum guest user limit, no default license assignment for guests, and session duration is controlled through conditional access, not external collaboration settings.'
  },
  {
    id: 'ig-037',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'drag-drop',
    stem: 'Match each external user management scenario to the appropriate Microsoft Entra feature.',
    items: [
      { id: 'item1', text: 'Microsoft Entra B2B collaboration' },
      { id: 'item2', text: 'Microsoft Entra B2C' },
      { id: 'item3', text: 'Cross-tenant access settings' },
      { id: 'item4', text: 'External collaboration settings - Allow/Deny list' }
    ],
    targets: [
      { id: 'target1', label: 'Invite a business partner to access Azure resources', correctItemId: 'item1' },
      { id: 'target2', label: 'Allow customers to sign up for a web application using social identities', correctItemId: 'item2' },
      { id: 'target3', label: 'Control inbound and outbound access between two Azure AD tenants', correctItemId: 'item3' },
      { id: 'target4', label: 'Block guest invitations from a specific domain', correctItemId: 'item4' }
    ],
    explanation: 'B2B collaboration is for inviting business partners to your tenant. B2C is for consumer-facing applications with social identity support. Cross-tenant access settings define how users in your tenant and other tenants can collaborate across organizations. The Allow/Deny list in external collaboration settings restricts which domains can or cannot be invited.'
  },
  {
    id: 'ig-038',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'dropdown',
    stem: 'You need to invite an external user using Azure CLI and specify that they should be redirected to a specific application after accepting. Complete the command.',
    segments: [
      { type: 'text', text: 'az rest --method POST --url "https://graph.microsoft.com/v1.0/' },
      { type: 'dropdown', id: 'dd1', options: ['invitations', 'users', 'guests', 'externalUsers'], correctOption: 'invitations' },
      { type: 'text', text: '" --body \'{"invitedUserEmailAddress": "partner@fabrikam.com", "inviteRedirectUrl": "https://myapp.contoso.com", "sendInvitationMessage": ' },
      { type: 'dropdown', id: 'dd2', options: ['true', 'false', '"yes"', '1'], correctOption: 'true' },
      { type: 'text', text: '}\'' }
    ],
    explanation: 'The Microsoft Graph API endpoint for creating B2B invitations is /invitations. The request body must include invitedUserEmailAddress and inviteRedirectUrl. Setting sendInvitationMessage to true (a boolean, not a string) sends an email to the invited user with a link to accept the invitation and be redirected to the specified URL.'
  },
  {
    id: 'ig-039',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'yes-no',
    scenario: 'Your organization uses Microsoft Entra B2B to collaborate with external partners.',
    statements: [
      { id: 's1', text: 'Guest users can be assigned Azure RBAC roles on subscriptions, resource groups, and individual resources.', correct: true },
      { id: 's2', text: 'A guest user\'s authentication is managed by the inviting (resource) tenant.', correct: false },
      { id: 's3', text: 'Guest users are identified by a UserType property set to "Guest" in Microsoft Entra ID.', correct: true }
    ],
    explanation: 'Guest users can be assigned any Azure RBAC role at any scope (subscription, resource group, or resource). A guest user authenticates with their home tenant (not the inviting tenant) - the resource tenant trusts the home tenant\'s authentication. Guest users have a UserType property set to "Guest" which distinguishes them from member users in the directory.'
  },
  {
    id: 'ig-040',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Manage external users',
    type: 'yes-no',
    scenario: 'You are reviewing the external user configuration for your Microsoft Entra ID tenant.',
    statements: [
      { id: 's1', text: 'You can convert a guest user to a member user without deleting and re-creating the account.', correct: true },
      { id: 's2', text: 'External users invited via B2B always require a Microsoft account or Azure AD account to sign in.', correct: false },
      { id: 's3', text: 'Guest users can be added to security groups and assigned licenses from the inviting tenant.', correct: true }
    ],
    explanation: 'You can change a user\'s UserType from Guest to Member (or vice versa) in their profile settings. B2B guest users can sign in with various identity providers including Google federation, SAML/WS-Fed federation, or email one-time passcode - they do not require a Microsoft account or Azure AD account. Guest users can be added to security groups and can be assigned licenses from the inviting tenant for services like Microsoft 365.'
  },

  // ========================================================================
  // ig-041 to ig-050: "Configure self-service password reset (SSPR)" (subsection: manage-entra-users)
  // ========================================================================
  {
    id: 'ig-041',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'single-choice',
    stem: 'You need to enable self-service password reset (SSPR) for all users in your Microsoft Entra ID tenant. In the Azure portal, where do you configure this?',
    options: [
      { id: 'a', text: 'Microsoft Entra ID > Security > Authentication methods > Password protection' },
      { id: 'b', text: 'Microsoft Entra ID > Password reset > Properties' },
      { id: 'c', text: 'Microsoft Entra ID > Users > User settings' },
      { id: 'd', text: 'Microsoft Entra ID > Security > Conditional Access' }
    ],
    correctOptionId: 'b',
    explanation: 'SSPR is configured under Microsoft Entra ID > Password reset > Properties. From here, you can set SSPR to None (disabled), Selected (specific groups), or All (all users). Password protection configures banned passwords and lockout settings. User settings configure general user preferences. Conditional Access controls sign-in policies but does not configure SSPR.'
  },
  {
    id: 'ig-042',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'single-choice',
    stem: 'Your organization requires that users provide two authentication methods when performing a self-service password reset. Which combination of methods is valid?',
    options: [
      { id: 'a', text: 'Security questions and email notification' },
      { id: 'b', text: 'Mobile app notification and mobile app code' },
      { id: 'c', text: 'Security questions only (answering two questions)' },
      { id: 'd', text: 'Mobile phone (SMS) and office phone' }
    ],
    correctOptionId: 'd',
    explanation: 'When two methods are required, each must be a different authentication method. Mobile phone (SMS) and office phone are two distinct methods. Security questions count as a single method regardless of how many questions are answered. Mobile app notification and mobile app code are considered the same method (Microsoft Authenticator). Option A with security questions and email would work, but the question asks about valid two-method combinations, and option D is the clearest example of two distinct methods.'
  },
  {
    id: 'ig-043',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'single-choice',
    stem: 'You have enabled SSPR for a selected group of users. A user in the group reports they cannot reset their password. The user has registered authentication methods. What should you check first?',
    options: [
      { id: 'a', text: 'Whether the user has an active Microsoft 365 license' },
      { id: 'b', text: 'Whether the user has registered the required number of authentication methods' },
      { id: 'c', text: 'Whether the user\'s account is a cloud-only or synced account' },
      { id: 'd', text: 'Whether the user has Global Administrator permissions' }
    ],
    correctOptionId: 'b',
    explanation: 'The first thing to check is whether the user has registered the required number of authentication methods for SSPR. If SSPR requires two methods but the user has only registered one, they will not be able to reset their password. The SSPR registration portal allows users to register methods, and administrators can see registration status. A Microsoft 365 license is not required for SSPR (but an Entra ID P1/P2 license is needed for the feature). Account sync status matters only for password writeback scenarios.'
  },
  {
    id: 'ig-044',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'single-choice',
    stem: 'Your organization uses Microsoft Entra Connect to synchronize on-premises Active Directory with Microsoft Entra ID. You want SSPR to write passwords back to on-premises AD. What must you enable?',
    options: [
      { id: 'a', text: 'Password hash synchronization' },
      { id: 'b', text: 'Password writeback in Microsoft Entra Connect' },
      { id: 'c', text: 'Pass-through authentication' },
      { id: 'd', text: 'Federation with AD FS' }
    ],
    correctOptionId: 'b',
    explanation: 'Password writeback is a feature of Microsoft Entra Connect that writes password changes from the cloud back to on-premises Active Directory. This must be enabled in Microsoft Entra Connect configuration for SSPR to update on-premises passwords. Password hash synchronization syncs password hashes from on-premises to the cloud (one direction). Pass-through authentication validates passwords against on-premises AD but does not enable writeback. AD FS federation is a separate authentication method.'
  },
  {
    id: 'ig-045',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'single-choice',
    stem: 'Which Microsoft Entra ID license is required to enable self-service password reset for cloud-only users?',
    options: [
      { id: 'a', text: 'Microsoft Entra ID Free' },
      { id: 'b', text: 'Microsoft Entra ID P1' },
      { id: 'c', text: 'Microsoft Entra ID P2' },
      { id: 'd', text: 'Microsoft 365 E5 only' }
    ],
    correctOptionId: 'b',
    explanation: 'Self-service password reset requires Microsoft Entra ID P1 or higher. The Free tier of Microsoft Entra ID only allows administrators to reset their own passwords. P1 enables SSPR for all users (including password writeback with Entra Connect). P2 includes all P1 features plus additional identity protection features. Microsoft 365 E3 and E5 include P1 and P2 respectively, but they are not the only options.'
  },
  {
    id: 'ig-046',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'multiple-choice',
    stem: 'Which THREE authentication methods can be used for self-service password reset in Microsoft Entra ID? (Choose three.)',
    options: [
      { id: 'a', text: 'Mobile phone (SMS)' },
      { id: 'b', text: 'Security questions' },
      { id: 'c', text: 'Windows Hello for Business' },
      { id: 'd', text: 'Email' },
      { id: 'e', text: 'Smart card certificate' }
    ],
    correctOptionIds: ['a', 'b', 'd'],
    requiredSelections: 3,
    explanation: 'The authentication methods available for SSPR include: mobile phone (SMS or voice call), email (a code sent to an alternate email), security questions, Microsoft Authenticator app (notification or code), and office phone. Windows Hello for Business and smart card certificates are authentication methods for sign-in but are not available as SSPR verification methods.'
  },
  {
    id: 'ig-047',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'drag-drop',
    stem: 'Match each SSPR configuration setting to its correct description.',
    items: [
      { id: 'item1', text: 'Number of methods required to reset' },
      { id: 'item2', text: 'Registration enforcement at sign-in' },
      { id: 'item3', text: 'Number of days before users are asked to re-confirm methods' },
      { id: 'item4', text: 'Notify users on password reset' }
    ],
    targets: [
      { id: 'target1', label: 'Controls whether users must register for SSPR when they next sign in', correctItemId: 'item2' },
      { id: 'target2', label: 'Sets how many verification methods a user must provide (1 or 2)', correctItemId: 'item1' },
      { id: 'target3', label: 'Sends an email to the user when their password has been reset', correctItemId: 'item4' },
      { id: 'target4', label: 'Determines when users must verify their authentication methods are still valid', correctItemId: 'item3' }
    ],
    explanation: 'Registration enforcement requires users to register for SSPR at next sign-in if they haven\'t already. The number of methods required sets whether 1 or 2 verification methods are needed. Notification on password reset alerts users via email when their password changes (helping detect unauthorized resets). The re-confirmation period (0-730 days, 0 means never) ensures authentication contact information stays up to date.'
  },
  {
    id: 'ig-048',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'dropdown',
    stem: 'You are configuring SSPR notifications in Microsoft Entra ID. Complete the configuration to ensure both users and administrators are notified when a password is reset.',
    segments: [
      { type: 'text', text: 'Navigate to Microsoft Entra ID > Password reset > ' },
      { type: 'dropdown', id: 'dd1', options: ['Notifications', 'Properties', 'Authentication methods', 'Registration'], correctOption: 'Notifications' },
      { type: 'text', text: '\n\nSet "Notify users on password resets?" to ' },
      { type: 'dropdown', id: 'dd2', options: ['Yes', 'No', 'Selected groups only', 'Admins only'], correctOption: 'Yes' },
      { type: 'text', text: '\n\nSet "Notify all admins when other admins reset their password?" to Yes' }
    ],
    explanation: 'SSPR notifications are configured under Microsoft Entra ID > Password reset > Notifications. Setting "Notify users on password resets?" to Yes sends an email notification to the user when their password is reset via SSPR. The second setting notifies all administrators when another administrator resets their password, which is a security best practice.'
  },
  {
    id: 'ig-049',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'yes-no',
    scenario: 'Your organization has implemented self-service password reset (SSPR) in Microsoft Entra ID with password writeback enabled through Microsoft Entra Connect.',
    statements: [
      { id: 's1', text: 'SSPR can be enabled for specific groups rather than all users in the tenant.', correct: true },
      { id: 's2', text: 'Users who are assigned the Global Administrator role can use SSPR with only one authentication method, regardless of the tenant SSPR policy.', correct: false },
      { id: 's3', text: 'Password writeback supports both password reset and password change operations.', correct: true }
    ],
    explanation: 'SSPR can be scoped to "Selected" groups, allowing gradual rollout. Global Administrators always require two authentication methods for SSPR, regardless of the policy configured for regular users - this is a security measure that cannot be changed. Password writeback supports both self-service password reset (when a user has forgotten their password) and self-service password change (when a user knows their current password and wants to change it).'
  },
  {
    id: 'ig-050',
    sectionId: 'identity-governance',
    subsectionId: 'manage-entra-users',
    bulletPoint: 'Configure self-service password reset (SSPR)',
    type: 'yes-no',
    scenario: 'You are planning to deploy SSPR across your organization that uses a hybrid identity model with Microsoft Entra Connect.',
    statements: [
      { id: 's1', text: 'Security questions can be used as one of the two required authentication methods when two methods are required.', correct: true },
      { id: 's2', text: 'SSPR combined registration allows users to register for both SSPR and multi-factor authentication at the same time.', correct: true },
      { id: 's3', text: 'Password writeback requires the Microsoft Entra Connect server to have direct inbound internet connectivity on port 443.', correct: false }
    ],
    explanation: 'Security questions are a valid SSPR authentication method and can be one of the two required methods. Combined registration allows users to register authentication methods for both SSPR and MFA in a single experience, reducing user friction. Password writeback uses an outbound (not inbound) connection from the Microsoft Entra Connect server through Azure Service Bus. No inbound ports need to be opened, which simplifies the network configuration.'
  },

  // ========================================================================
  // ig-051 to ig-060: "Manage built-in Azure roles" (subsection: manage-access)
  // ========================================================================
  {
    id: 'ig-051',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'single-choice',
    stem: 'A user needs to view all resources in an Azure subscription but should not be able to make any changes. Which built-in role should you assign?',
    options: [
      { id: 'a', text: 'Contributor' },
      { id: 'b', text: 'Reader' },
      { id: 'c', text: 'User Access Administrator' },
      { id: 'd', text: 'Security Reader' }
    ],
    correctOptionId: 'b',
    explanation: 'The Reader role grants read-only access to all resources in the assigned scope. Users with this role can view all resources and their configurations but cannot create, update, or delete any resources. Contributor allows creating and managing resources. User Access Administrator manages role assignments. Security Reader provides read access only to security-related features, not all resources.'
  },
  {
    id: 'ig-052',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'single-choice',
    stem: 'Which built-in Azure role allows a user to manage access to Azure resources (assign roles to others) without the ability to manage the resources themselves?',
    options: [
      { id: 'a', text: 'Owner' },
      { id: 'b', text: 'Contributor' },
      { id: 'c', text: 'User Access Administrator' },
      { id: 'd', text: 'Security Administrator' }
    ],
    correctOptionId: 'c',
    explanation: 'The User Access Administrator role grants the ability to manage user access to Azure resources - specifically, to create and manage role assignments. It does not grant permissions to manage the resources themselves. Owner includes both resource management and access management. Contributor can manage resources but cannot assign roles. Security Administrator manages security settings but not general RBAC assignments.'
  },
  {
    id: 'ig-053',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'single-choice',
    stem: 'A developer needs to create and manage virtual machines in a resource group but should NOT be able to grant other users access to those VMs. Which role should you assign?',
    options: [
      { id: 'a', text: 'Owner' },
      { id: 'b', text: 'Contributor' },
      { id: 'c', text: 'Virtual Machine Contributor' },
      { id: 'd', text: 'Reader' }
    ],
    correctOptionId: 'c',
    explanation: 'Virtual Machine Contributor allows managing virtual machines (create, update, delete, start, stop, etc.) but does not include permissions to manage access (assign roles). This follows the principle of least privilege. Owner would grant too many permissions including role assignment. Contributor grants broader permissions to all resource types. Reader provides only read access.'
  },
  {
    id: 'ig-054',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'single-choice',
    stem: 'Which Azure CLI command lists all built-in role definitions available in your subscription?',
    options: [
      { id: 'a', text: 'az role definition list --custom-role-only false' },
      { id: 'b', text: 'az role definition list' },
      { id: 'c', text: 'az ad role list' },
      { id: 'd', text: 'az rbac role list --type builtin' }
    ],
    correctOptionId: 'b',
    explanation: 'The command "az role definition list" lists all role definitions (both built-in and custom) available in the current subscription. You can add --custom-role-only true to filter to only custom roles, or --custom-role-only false for only built-in roles. "az ad role list" is not a valid command. "az rbac role list" is not the correct syntax.'
  },
  {
    id: 'ig-055',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'single-choice',
    stem: 'What is the key difference between the Owner role and the Contributor role in Azure RBAC?',
    options: [
      { id: 'a', text: 'Owner can create resources; Contributor cannot' },
      { id: 'b', text: 'Owner can manage role assignments; Contributor cannot' },
      { id: 'c', text: 'Owner applies at subscription level only; Contributor applies at any scope' },
      { id: 'd', text: 'Owner includes read permissions; Contributor does not' }
    ],
    correctOptionId: 'b',
    explanation: 'The primary difference between Owner and Contributor is that Owner includes Microsoft.Authorization/*/Write permission, which allows managing role assignments (granting and revoking access to others). Contributor has full resource management permissions (create, read, update, delete) but cannot manage access. Both roles can create resources, apply at any scope, and include read permissions.'
  },
  {
    id: 'ig-056',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'multiple-choice',
    stem: 'Which TWO of the following are characteristics of Azure built-in roles? (Choose two.)',
    options: [
      { id: 'a', text: 'They cannot be modified or deleted' },
      { id: 'b', text: 'They can be assigned at management group, subscription, resource group, or resource scope' },
      { id: 'c', text: 'They are limited to a maximum of 100 per tenant' },
      { id: 'd', text: 'They can only be assigned to users, not groups or service principals' },
      { id: 'e', text: 'They must be renewed every 90 days' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Built-in roles are defined by Microsoft and cannot be modified or deleted (only custom roles can be edited). They can be assigned at any scope in the Azure hierarchy: management group, subscription, resource group, or individual resource. There is no 100-role limit for built-in roles. Roles can be assigned to users, groups, service principals, and managed identities. Role assignments do not expire unless using Privileged Identity Management (PIM) with time-bound assignments.'
  },
  {
    id: 'ig-057',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'multiple-choice',
    stem: 'A storage administrator needs to manage Azure Storage accounts and their data. Which TWO built-in roles, assigned together, would provide the LEAST privilege to accomplish this? (Choose two.)',
    options: [
      { id: 'a', text: 'Storage Account Contributor' },
      { id: 'b', text: 'Storage Blob Data Contributor' },
      { id: 'c', text: 'Contributor' },
      { id: 'd', text: 'Owner' },
      { id: 'e', text: 'Reader' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Storage Account Contributor allows managing storage accounts (create, delete, configure settings) but does not grant access to the data within. Storage Blob Data Contributor allows reading, writing, and deleting blob data. Together, these two roles provide comprehensive storage management with least privilege. Contributor and Owner grant far broader permissions than needed. Reader only provides read access.'
  },
  {
    id: 'ig-058',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'drag-drop',
    stem: 'Match each built-in Azure role to the permissions it provides.',
    items: [
      { id: 'item1', text: 'Reader' },
      { id: 'item2', text: 'Contributor' },
      { id: 'item3', text: 'Owner' },
      { id: 'item4', text: 'User Access Administrator' }
    ],
    targets: [
      { id: 'target1', label: 'Full control including managing role assignments', correctItemId: 'item3' },
      { id: 'target2', label: 'Create and manage all resources but cannot assign roles', correctItemId: 'item2' },
      { id: 'target3', label: 'View all resources but cannot make changes', correctItemId: 'item1' },
      { id: 'target4', label: 'Manage role assignments but cannot manage resources', correctItemId: 'item4' }
    ],
    explanation: 'Owner has full control over resources including the ability to manage role assignments. Contributor can create and manage all types of Azure resources but cannot grant access to others. Reader can view all resources but cannot make any changes. User Access Administrator can manage role assignments (access) but does not have permissions to manage the resources themselves.'
  },
  {
    id: 'ig-059',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'dropdown',
    stem: 'You need to view the permissions included in the "Network Contributor" built-in role using Azure CLI. Complete the command.',
    segments: [
      { type: 'text', text: 'az ' },
      { type: 'dropdown', id: 'dd1', options: ['role definition list', 'role assignment list', 'ad role list', 'rbac list'], correctOption: 'role definition list' },
      { type: 'text', text: ' --name "' },
      { type: 'dropdown', id: 'dd2', options: ['Network Contributor', 'NetworkContributor', 'network-contributor', 'Microsoft.Network/Contributor'], correctOption: 'Network Contributor' },
      { type: 'text', text: '"' }
    ],
    explanation: 'The "az role definition list" command with --name parameter shows the details of a specific role definition, including its Actions, NotActions, DataActions, and NotDataActions. The role name must match exactly as defined, which is "Network Contributor" (with a space, proper capitalization).'
  },
  {
    id: 'ig-060',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Manage built-in Azure roles',
    type: 'yes-no',
    scenario: 'You are reviewing the built-in Azure RBAC roles for your organization\'s access management strategy.',
    statements: [
      { id: 's1', text: 'The Contributor role includes the permission to create and manage role assignments (Microsoft.Authorization/roleAssignments/write).', correct: false },
      { id: 's2', text: 'Azure RBAC roles defined at a higher scope (like subscription) are inherited by lower scopes (like resource groups).', correct: true },
      { id: 's3', text: 'The built-in "Virtual Machine Administrator Login" role allows a user to sign in to a virtual machine as an administrator.', correct: true }
    ],
    explanation: 'The Contributor role explicitly excludes Microsoft.Authorization/*/Write and Microsoft.Authorization/*/Delete in its NotActions, so it cannot manage role assignments. RBAC roles are inherited from higher scopes to lower scopes (management group to subscription to resource group to resource). The Virtual Machine Administrator Login role grants the ability to view VMs in the portal and sign in as an administrator (with root/administrator privileges on the VM).'
  },

  // ========================================================================
  // ig-061 to ig-070: "Assign roles at different scopes" (subsection: manage-access)
  // ========================================================================
  {
    id: 'ig-061',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'single-choice',
    stem: 'You assign the Reader role to a user at the subscription scope. The subscription contains three resource groups, each with multiple resources. Which resources can the user view?',
    options: [
      { id: 'a', text: 'Only the subscription-level properties, not the resource groups or resources' },
      { id: 'b', text: 'All resources in all three resource groups plus the subscription-level properties' },
      { id: 'c', text: 'Only the resource groups, but not the individual resources within them' },
      { id: 'd', text: 'Only resources that explicitly have the Reader role assigned' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure RBAC roles assigned at a higher scope are inherited by all child scopes. A Reader role assigned at the subscription scope gives the user read access to the subscription itself, all resource groups within the subscription, and all resources within those resource groups. This is the inheritance model: Management Group > Subscription > Resource Group > Resource.'
  },
  {
    id: 'ig-062',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'single-choice',
    stem: 'You need to assign the Contributor role to a user on a specific resource group named "rg-production" using Azure CLI. Which command should you use?',
    options: [
      { id: 'a', text: 'az role assignment create --assignee user@contoso.com --role "Contributor" --resource-group rg-production' },
      { id: 'b', text: 'az role assignment create --assignee user@contoso.com --role "Contributor" --scope /subscriptions/{sub-id}' },
      { id: 'c', text: 'az rbac assign --user user@contoso.com --role "Contributor" --group rg-production' },
      { id: 'd', text: 'az ad role assign --assignee user@contoso.com --role "Contributor" --resource-group rg-production' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct Azure CLI command to assign a role at the resource group scope is "az role assignment create" with the --resource-group parameter. The --assignee identifies the user, --role specifies the role name, and --resource-group specifies the scope. Option B assigns at subscription scope. Options C and D use non-existent command syntax.'
  },
  {
    id: 'ig-063',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'single-choice',
    stem: 'A user has been assigned the Reader role at the subscription scope and the Contributor role at a resource group scope. What effective permissions does the user have on resources within that resource group?',
    options: [
      { id: 'a', text: 'Only Reader permissions because subscription-level assignments take precedence' },
      { id: 'b', text: 'Contributor permissions because Azure RBAC is additive' },
      { id: 'c', text: 'The assignments conflict and the user is denied access' },
      { id: 'd', text: 'Contributor permissions on even-numbered resources and Reader on odd-numbered resources' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure RBAC is additive - permissions are combined across all role assignments. When a user has Reader at the subscription scope and Contributor at a resource group scope, their effective permissions on that resource group are the union of both roles, which effectively means Contributor (since Contributor already includes all Reader permissions plus write and delete). There is no concept of precedence or conflict between role assignments at different scopes; they are always combined.'
  },
  {
    id: 'ig-064',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'single-choice',
    stem: 'You need to assign the Owner role to a service principal at the management group scope. Which PowerShell command should you use?',
    options: [
      { id: 'a', text: 'New-AzRoleAssignment -ObjectId <sp-object-id> -RoleDefinitionName "Owner" -Scope "/providers/Microsoft.Management/managementGroups/<mg-id>"' },
      { id: 'b', text: 'New-AzRoleAssignment -ObjectId <sp-object-id> -RoleDefinitionName "Owner" -ManagementGroupId <mg-id>' },
      { id: 'c', text: 'Set-AzRoleAssignment -ServicePrincipalName <sp-name> -Role "Owner" -ManagementGroup <mg-id>' },
      { id: 'd', text: 'Add-AzRoleAssignment -ApplicationId <app-id> -RoleName "Owner" -Scope "management-group/<mg-id>"' }
    ],
    correctOptionId: 'a',
    explanation: 'New-AzRoleAssignment is the PowerShell command to create role assignments. For management group scope, you must use the -Scope parameter with the full resource ID: /providers/Microsoft.Management/managementGroups/<mg-id>. The -ObjectId parameter accepts the service principal\'s object ID. There is no -ManagementGroupId parameter for New-AzRoleAssignment. Set-AzRoleAssignment and Add-AzRoleAssignment are not valid cmdlets.'
  },
  {
    id: 'ig-065',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'single-choice',
    stem: 'You need to assign a role to a user on a specific Azure resource (a storage account). What is the format of the scope parameter?',
    options: [
      { id: 'a', text: '/subscriptions/{sub-id}/resourceGroups/{rg-name}/providers/Microsoft.Storage/storageAccounts/{account-name}' },
      { id: 'b', text: '/subscriptions/{sub-id}/providers/Microsoft.Storage/{account-name}' },
      { id: 'c', text: '/resourceGroups/{rg-name}/Microsoft.Storage/storageAccounts/{account-name}' },
      { id: 'd', text: '/subscriptions/{sub-id}/resources/{account-name}' }
    ],
    correctOptionId: 'a',
    explanation: 'The full resource ID format for a resource scope in Azure is: /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/{resource-provider}/{resource-type}/{resource-name}. For a storage account, this is /subscriptions/{sub-id}/resourceGroups/{rg-name}/providers/Microsoft.Storage/storageAccounts/{account-name}. All other options are missing required parts of the resource ID hierarchy.'
  },
  {
    id: 'ig-066',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'multiple-choice',
    stem: 'Which TWO scopes are valid for assigning Azure RBAC roles? (Choose two.)',
    options: [
      { id: 'a', text: 'Management group' },
      { id: 'b', text: 'Microsoft Entra ID tenant' },
      { id: 'c', text: 'Individual resource (e.g., a specific virtual machine)' },
      { id: 'd', text: 'Availability zone' },
      { id: 'e', text: 'Azure region' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Azure RBAC supports four scope levels: management group, subscription, resource group, and individual resource. Both management group and individual resource are valid scopes. The Microsoft Entra ID tenant itself is not an RBAC scope (Entra roles are separate from Azure RBAC). Availability zones and Azure regions are not valid RBAC scopes.'
  },
  {
    id: 'ig-067',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'multiple-choice',
    stem: 'You need to assign the "Storage Blob Data Reader" role to a managed identity so it can read blob data from a storage account. Which TWO pieces of information are required for the role assignment? (Choose two.)',
    options: [
      { id: 'a', text: 'The object (principal) ID of the managed identity' },
      { id: 'b', text: 'The access key of the storage account' },
      { id: 'c', text: 'The scope (resource ID of the storage account or container)' },
      { id: 'd', text: 'The connection string of the storage account' },
      { id: 'e', text: 'The managed identity\'s client secret' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'A role assignment requires three elements: who (the principal ID of the managed identity), what (the role definition, "Storage Blob Data Reader"), and where (the scope, which is the resource ID of the storage account or a specific container). Access keys, connection strings, and client secrets are not used in RBAC role assignments. Managed identities do not have client secrets.'
  },
  {
    id: 'ig-068',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'drag-drop',
    stem: 'Match each Azure CLI command to the scope at which it assigns the Contributor role.',
    items: [
      { id: 'item1', text: 'az role assignment create --assignee user@contoso.com --role "Contributor" --scope "/providers/Microsoft.Management/managementGroups/mg1"' },
      { id: 'item2', text: 'az role assignment create --assignee user@contoso.com --role "Contributor" --subscription "sub-id"' },
      { id: 'item3', text: 'az role assignment create --assignee user@contoso.com --role "Contributor" --resource-group "rg-dev"' },
      { id: 'item4', text: 'az role assignment create --assignee user@contoso.com --role "Contributor" --scope "/subscriptions/sub-id/resourceGroups/rg-dev/providers/Microsoft.Compute/virtualMachines/vm1"' }
    ],
    targets: [
      { id: 'target1', label: 'Management group scope', correctItemId: 'item1' },
      { id: 'target2', label: 'Subscription scope', correctItemId: 'item2' },
      { id: 'target3', label: 'Resource group scope', correctItemId: 'item3' },
      { id: 'target4', label: 'Individual resource scope', correctItemId: 'item4' }
    ],
    explanation: 'Management group scope uses --scope with the management group resource ID. Subscription scope uses the --subscription parameter. Resource group scope uses --resource-group. Individual resource scope uses --scope with the full resource ID path of the specific resource.'
  },
  {
    id: 'ig-069',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'dropdown',
    stem: 'Complete the PowerShell command to assign the Reader role to a security group at the resource group scope.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['New-AzRoleAssignment', 'Set-AzRoleAssignment', 'Add-AzRoleAssignment', 'Grant-AzRoleAssignment'], correctOption: 'New-AzRoleAssignment' },
      { type: 'text', text: ' -ObjectId "<group-object-id>" -RoleDefinitionName "Reader" ' },
      { type: 'dropdown', id: 'dd2', options: ['-ResourceGroupName "rg-production"', '-Scope "rg-production"', '-ResourceGroup "rg-production"', '-Group "rg-production"'], correctOption: '-ResourceGroupName "rg-production"' }
    ],
    explanation: 'New-AzRoleAssignment is the correct cmdlet to create a role assignment in Azure PowerShell. The -ObjectId parameter specifies the security group\'s object ID. The -RoleDefinitionName parameter specifies the role. The -ResourceGroupName parameter sets the scope to a specific resource group. There is no -ResourceGroup or -Group parameter for this cmdlet.'
  },
  {
    id: 'ig-070',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Assign roles at different scopes',
    type: 'yes-no',
    scenario: 'You are managing role assignments across different scopes in your Azure environment.',
    statements: [
      { id: 's1', text: 'A deny assignment created at the subscription scope will override an allow role assignment at the resource group scope.', correct: true },
      { id: 's2', text: 'You can assign a maximum of 2,000 role assignments per subscription.', correct: false },
      { id: 's3', text: 'Role assignments at the management group scope are inherited by all subscriptions under that management group.', correct: true }
    ],
    explanation: 'Deny assignments take precedence over role assignments and block users from performing specified actions even if a role assignment grants access. The limit for role assignments is 4,000 per subscription (not 2,000). Role assignments at the management group scope are indeed inherited by all child subscriptions and their resource groups and resources.'
  },

  // ========================================================================
  // ig-071 to ig-080: "Interpret access assignments" (subsection: manage-access)
  // ========================================================================
  {
    id: 'ig-071',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'single-choice',
    stem: 'A user reports they can view a virtual machine but cannot start it. You need to determine why. Where should you look first in the Azure portal?',
    options: [
      { id: 'a', text: 'The virtual machine\'s Access control (IAM) blade > Check access tab' },
      { id: 'b', text: 'Microsoft Entra ID > User properties' },
      { id: 'c', text: 'Azure Monitor > Activity log' },
      { id: 'd', text: 'The virtual machine\'s Networking blade' }
    ],
    correctOptionId: 'a',
    explanation: 'The Access control (IAM) blade on any resource has a "Check access" feature that shows the effective permissions for a user, group, or service principal. This tool evaluates all role assignments (including inherited ones) and shows exactly what the user can and cannot do. Microsoft Entra ID user properties do not show Azure RBAC permissions. Activity log shows past operations. Networking settings do not affect RBAC permissions.'
  },
  {
    id: 'ig-072',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'single-choice',
    stem: 'You run the following command: az role assignment list --assignee user@contoso.com --all. The output shows two role assignments: Reader at the subscription scope and Contributor at a resource group scope. What are the user\'s effective permissions on a resource in that resource group?',
    options: [
      { id: 'a', text: 'Reader only, because subscription-level roles take precedence' },
      { id: 'b', text: 'Contributor, because Azure RBAC combines (unions) permissions from all assignments' },
      { id: 'c', text: 'The user must choose between Reader and Contributor at sign-in' },
      { id: 'd', text: 'Neither role applies; only direct resource-level assignments are effective' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure RBAC is additive. The effective permissions are the union of all role assignments that apply at the given scope. Since Reader is assigned at the subscription (inherited by the resource group) and Contributor is assigned at the resource group, the user effectively has Contributor permissions (which is a superset of Reader) on resources within that resource group.'
  },
  {
    id: 'ig-073',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'single-choice',
    stem: 'A user has no direct role assignments on a storage account but can still read blob data. What is the MOST likely explanation?',
    options: [
      { id: 'a', text: 'The user has the Storage Blob Data Reader role assigned at a higher scope (resource group or subscription)' },
      { id: 'b', text: 'The storage account has anonymous blob access enabled' },
      { id: 'c', text: 'The user is a Global Administrator in Microsoft Entra ID' },
      { id: 'd', text: 'All users can read blob data by default' }
    ],
    correctOptionId: 'a',
    explanation: 'The most likely explanation is that the user has a role assignment at a higher scope (resource group or subscription) that includes blob data read permissions, such as Storage Blob Data Reader or Storage Blob Data Contributor. RBAC roles are inherited from higher scopes. While anonymous access could be a factor, it would mean anyone can access the data without authentication. Global Administrators do not automatically get Azure RBAC permissions (though they can elevate access). Users do not have default read access to blob data.'
  },
  {
    id: 'ig-074',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'single-choice',
    stem: 'You need to list all role assignments for a specific resource group using PowerShell. Which command should you use?',
    options: [
      { id: 'a', text: 'Get-AzRoleAssignment -ResourceGroupName "rg-production"' },
      { id: 'b', text: 'Get-AzRoleDefinition -ResourceGroupName "rg-production"' },
      { id: 'c', text: 'Get-AzAccessAssignment -Scope "rg-production"' },
      { id: 'd', text: 'Show-AzRoleAssignment -ResourceGroup "rg-production"' }
    ],
    correctOptionId: 'a',
    explanation: 'Get-AzRoleAssignment with the -ResourceGroupName parameter lists all role assignments at the specified resource group scope, including inherited assignments from higher scopes. Get-AzRoleDefinition lists role definitions (not assignments). Get-AzAccessAssignment and Show-AzRoleAssignment are not valid cmdlets.'
  },
  {
    id: 'ig-075',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'single-choice',
    stem: 'In the Azure portal, you view the role assignments on a resource group and see an assignment marked as "Inherited." What does this mean?',
    options: [
      { id: 'a', text: 'The role was assigned to the resource group and inherited by child resources' },
      { id: 'b', text: 'The role was assigned at a higher scope (subscription or management group) and inherited by this resource group' },
      { id: 'c', text: 'The role was assigned through a group membership inheritance' },
      { id: 'd', text: 'The role was automatically assigned by Azure Policy' }
    ],
    correctOptionId: 'b',
    explanation: 'When a role assignment is marked as "Inherited" on a resource group, it means the assignment was made at a higher scope (such as the subscription or management group) and is inherited down to this resource group. Direct assignments on the resource group itself are shown as "This resource." The inheritance label indicates the scope at which the assignment was actually created.'
  },
  {
    id: 'ig-076',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'multiple-choice',
    stem: 'A user has the following role assignments:\n- Contributor role at Subscription scope\n- A deny assignment for Microsoft.Compute/virtualMachines/delete at the resource group scope\n\nWhich TWO actions can the user perform on virtual machines in that resource group? (Choose two.)',
    options: [
      { id: 'a', text: 'Create a new virtual machine' },
      { id: 'b', text: 'Delete an existing virtual machine' },
      { id: 'c', text: 'Start and stop a virtual machine' },
      { id: 'd', text: 'Resize a virtual machine' },
      { id: 'e', text: 'Delete all resources in the resource group' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'The user has Contributor permissions inherited from the subscription, which allows creating, managing, and deleting resources. However, the deny assignment for Microsoft.Compute/virtualMachines/delete blocks the ability to delete virtual machines. Deny assignments always override allow role assignments. The user can still create VMs and start/stop them. Resizing typically requires deallocating (stopping) but the resize action itself is allowed. Deleting all resources in the group would fail for VMs. Options A and C are the clearest allowed actions.'
  },
  {
    id: 'ig-077',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'drag-drop',
    stem: 'Match each access interpretation scenario to the correct effective permission result.',
    items: [
      { id: 'item1', text: 'Full Contributor access on the resource group' },
      { id: 'item2', text: 'Reader access on the resource group (read-only)' },
      { id: 'item3', text: 'Owner access on the resource group' },
      { id: 'item4', text: 'No access to the resource group' }
    ],
    targets: [
      { id: 'target1', label: 'User has Reader at subscription + Contributor at resource group', correctItemId: 'item1' },
      { id: 'target2', label: 'User has Reader at subscription + no assignment at resource group', correctItemId: 'item2' },
      { id: 'target3', label: 'User has Owner at subscription + Reader at resource group', correctItemId: 'item3' },
      { id: 'target4', label: 'User has no role assignments at any scope', correctItemId: 'item4' }
    ],
    explanation: 'RBAC is additive: Reader (subscription) + Contributor (resource group) = Contributor. Reader at subscription only with no resource group assignment = Reader (inherited). Owner (subscription) + Reader (resource group) = Owner (Owner is already a superset of Reader). No role assignments anywhere means no access (Azure RBAC is deny-by-default).'
  },
  {
    id: 'ig-078',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'dropdown',
    stem: 'You need to check the effective access of a user on a resource group using Azure CLI. Complete the command.',
    segments: [
      { type: 'text', text: 'az role assignment ' },
      { type: 'dropdown', id: 'dd1', options: ['list', 'check', 'show', 'get'], correctOption: 'list' },
      { type: 'text', text: ' --assignee user@contoso.com --resource-group rg-production ' },
      { type: 'dropdown', id: 'dd2', options: ['--include-inherited', '--all', '--recursive', '--effective'], correctOption: '--include-inherited' },
      { type: 'text', text: '' }
    ],
    explanation: 'The "az role assignment list" command lists role assignments. The --assignee parameter filters by user. The --resource-group parameter specifies the scope. The --include-inherited flag is important because it includes role assignments inherited from higher scopes (subscription, management group), giving you the complete picture of the user\'s access.'
  },
  {
    id: 'ig-079',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'yes-no',
    scenario: 'You are analyzing role assignments in your Azure environment to understand effective permissions.',
    statements: [
      { id: 's1', text: 'If a user is assigned the Reader role through a group membership and the Contributor role directly, the effective permissions are Contributor.', correct: true },
      { id: 's2', text: 'NotActions in a role definition completely deny those actions, overriding any other role assignment that allows them.', correct: false },
      { id: 's3', text: 'The "Check access" feature in the IAM blade shows both direct and inherited role assignments for a user.', correct: true }
    ],
    explanation: 'RBAC is additive, so Reader (via group) + Contributor (direct) = Contributor. NotActions do NOT deny actions; they subtract permissions from the Actions in the same role definition. If another role grants those permissions, the user will still have them. NotActions is not a deny mechanism. The "Check access" feature in IAM shows all effective role assignments including inherited ones, providing a complete view of a user\'s access.'
  },
  {
    id: 'ig-080',
    sectionId: 'identity-governance',
    subsectionId: 'manage-access',
    bulletPoint: 'Interpret access assignments',
    type: 'yes-no',
    scenario: 'You need to understand how Azure RBAC processes access decisions.',
    statements: [
      { id: 's1', text: 'Azure RBAC evaluates deny assignments before role (allow) assignments.', correct: true },
      { id: 's2', text: 'A role assignment at the resource scope can override a deny assignment at the subscription scope.', correct: false },
      { id: 's3', text: 'The Azure Activity Log records when role assignments are created, modified, or deleted.', correct: true }
    ],
    explanation: 'Azure RBAC first checks for deny assignments. If a deny assignment applies, access is denied regardless of any role assignments. A role assignment at a lower scope cannot override a deny assignment at a higher scope; deny always wins. The Azure Activity Log does record role assignment operations (create, update, delete) under the Microsoft.Authorization provider, which is useful for auditing access changes.'
  },

  // ========================================================================
  // ig-081 to ig-090: "Implement and manage Azure Policy" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-081',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'single-choice',
    stem: 'You need to ensure that all new virtual machines deployed in a subscription are limited to specific VM SKUs. Which Azure Policy effect should you use?',
    options: [
      { id: 'a', text: 'Audit' },
      { id: 'b', text: 'Deny' },
      { id: 'c', text: 'Append' },
      { id: 'd', text: 'DeployIfNotExists' }
    ],
    correctOptionId: 'b',
    explanation: 'The Deny effect prevents resource creation or modification that does not comply with the policy rules. Using Deny with the "Allowed virtual machine size SKUs" policy ensures that only specified VM SKUs can be deployed. Audit would only flag non-compliant resources without preventing them. Append adds properties to resources. DeployIfNotExists deploys a related resource when conditions are met.'
  },
  {
    id: 'ig-082',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'single-choice',
    stem: 'You assign an Azure Policy with the "DeployIfNotExists" effect to ensure all virtual machines have the Azure Monitor agent installed. A VM is found to be non-compliant. What happens?',
    options: [
      { id: 'a', text: 'The VM is automatically deleted' },
      { id: 'b', text: 'A remediation task must be created to deploy the agent to existing non-compliant VMs' },
      { id: 'c', text: 'The agent is automatically installed immediately upon policy evaluation' },
      { id: 'd', text: 'The VM is shut down until the agent is installed' }
    ],
    correctOptionId: 'b',
    explanation: 'DeployIfNotExists evaluates compliance and can automatically remediate new resources during creation. However, for existing non-compliant resources, you must create a remediation task to apply the deployment. The policy does not automatically delete or shut down VMs. While new VMs would be remediated during deployment, existing VMs require an explicit remediation task to be triggered.'
  },
  {
    id: 'ig-083',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'single-choice',
    stem: 'You need to organize multiple related Azure Policy definitions into a single unit that can be assigned together. What should you create?',
    options: [
      { id: 'a', text: 'A policy initiative (policy set definition)' },
      { id: 'b', text: 'A management group' },
      { id: 'c', text: 'A resource group with policies' },
      { id: 'd', text: 'A custom RBAC role' }
    ],
    correctOptionId: 'a',
    explanation: 'A policy initiative (also called a policy set definition) groups multiple policy definitions together so they can be assigned as a single unit. This simplifies management when you have multiple related compliance requirements. Management groups organize subscriptions. Resource groups organize resources. Custom RBAC roles define permissions, not compliance rules.'
  },
  {
    id: 'ig-084',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'single-choice',
    stem: 'An Azure Policy with the "Modify" effect is assigned to add a specific tag to all new resources. What additional requirement must be met for this policy to work?',
    options: [
      { id: 'a', text: 'The policy assignment must have a managed identity with appropriate permissions' },
      { id: 'b', text: 'The policy must be assigned at the management group scope only' },
      { id: 'c', text: 'All existing resources must be manually tagged first' },
      { id: 'd', text: 'Azure Policy must be in enforcement mode "Disabled"' }
    ],
    correctOptionId: 'a',
    explanation: 'Policies with the Modify effect (and DeployIfNotExists) require a managed identity to perform the remediation actions. The managed identity must have the appropriate RBAC permissions to make the modifications. The policy can be assigned at any scope, not just management groups. Existing resources require a remediation task. The enforcement mode should be "Enabled" (not "Disabled") for the policy to take effect.'
  },
  {
    id: 'ig-085',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'single-choice',
    stem: 'You want to test an Azure Policy before enforcing it in production. How can you assign the policy without blocking non-compliant resource deployments?',
    options: [
      { id: 'a', text: 'Assign the policy with enforcement mode set to "Disabled"' },
      { id: 'b', text: 'Assign the policy with the "Audit" effect instead' },
      { id: 'c', text: 'Assign the policy to a test subscription only' },
      { id: 'd', text: 'Create the policy definition without assigning it' }
    ],
    correctOptionId: 'a',
    explanation: 'Setting the enforcement mode to "Disabled" (also called DoNotEnforce) on a policy assignment allows you to evaluate compliance without actually enforcing the policy. Non-compliant resources will be flagged but not blocked. This is useful for testing the impact of a policy before enabling enforcement. Changing the effect to Audit would work but modifies the policy behavior. Assigning to a test subscription limits scope. An unassigned policy has no effect.'
  },
  {
    id: 'ig-086',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'multiple-choice',
    stem: 'Which TWO Azure Policy effects can automatically modify or deploy resources to bring them into compliance? (Choose two.)',
    options: [
      { id: 'a', text: 'Modify' },
      { id: 'b', text: 'Deny' },
      { id: 'c', text: 'Audit' },
      { id: 'd', text: 'DeployIfNotExists' },
      { id: 'e', text: 'AuditIfNotExists' }
    ],
    correctOptionIds: ['a', 'd'],
    requiredSelections: 2,
    explanation: 'Modify and DeployIfNotExists are the two policy effects that can automatically change resources. Modify can add, update, or remove properties (like tags) on a resource. DeployIfNotExists can deploy a related resource (like an extension or diagnostic setting) when a condition is not met. Deny prevents resource creation/modification. Audit and AuditIfNotExists only flag non-compliance without making changes.'
  },
  {
    id: 'ig-087',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'drag-drop',
    stem: 'Match each Azure Policy effect to the appropriate use case.',
    items: [
      { id: 'item1', text: 'Deny' },
      { id: 'item2', text: 'Audit' },
      { id: 'item3', text: 'DeployIfNotExists' },
      { id: 'item4', text: 'Modify' }
    ],
    targets: [
      { id: 'target1', label: 'Prevent resources from being created in non-allowed regions', correctItemId: 'item1' },
      { id: 'target2', label: 'Report on storage accounts that do not use HTTPS', correctItemId: 'item2' },
      { id: 'target3', label: 'Automatically install a VM extension on all virtual machines', correctItemId: 'item3' },
      { id: 'target4', label: 'Automatically add a cost center tag to resources during creation', correctItemId: 'item4' }
    ],
    explanation: 'Deny prevents resource creation in unauthorized locations. Audit flags non-compliant resources (like storage accounts without HTTPS) for review. DeployIfNotExists deploys additional resources (like VM extensions) when they are missing. Modify changes resource properties (like adding tags) during creation or update.'
  },
  {
    id: 'ig-088',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'dropdown',
    stem: 'Complete the Azure CLI command to assign a built-in policy definition that restricts resource deployment to specific locations.',
    segments: [
      { type: 'text', text: 'az policy ' },
      { type: 'dropdown', id: 'dd1', options: ['assignment create', 'definition create', 'set-definition create', 'rule create'], correctOption: 'assignment create' },
      { type: 'text', text: ' --name "allowed-locations" --policy "/providers/Microsoft.Authorization/policyDefinitions/e56962a6-4747-49cd-b67b-bf8b01975c4c" ' },
      { type: 'dropdown', id: 'dd2', options: ['--params \'{"listOfAllowedLocations": {"value": ["eastus", "westus"]}}\'', '--parameters \'{"locations": ["eastus", "westus"]}\'', '--settings \'{"allowedLocations": ["eastus", "westus"]}\'', '--config \'{"regions": ["eastus", "westus"]}\''], correctOption: '--params \'{"listOfAllowedLocations": {"value": ["eastus", "westus"]}}\'' }
    ],
    explanation: 'To assign a policy, use "az policy assignment create." The --policy parameter references the built-in policy definition ID for "Allowed locations." The --params parameter provides the required parameter values. The "Allowed locations" policy uses the parameter name "listOfAllowedLocations" with a value array of permitted Azure regions.'
  },
  {
    id: 'ig-089',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'yes-no',
    scenario: 'You have implemented several Azure Policy assignments in your environment.',
    statements: [
      { id: 's1', text: 'Azure Policy can evaluate compliance of existing resources, not just new deployments.', correct: true },
      { id: 's2', text: 'Policy assignments at the management group scope are inherited by all subscriptions in that management group.', correct: true },
      { id: 's3', text: 'A policy exclusion at a resource group scope will override a deny policy assigned at the subscription scope for that resource group.', correct: true }
    ],
    explanation: 'Azure Policy evaluates both existing and new resources for compliance. Policy assignments at the management group scope are inherited by all child subscriptions. Policy exclusions (exemptions) allow you to exclude specific scopes from a policy assignment, effectively overriding the policy for that scope. This is useful when a specific resource group needs to be exempt from a subscription-level policy.'
  },
  {
    id: 'ig-090',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Implement and manage Azure Policy',
    type: 'yes-no',
    scenario: 'You are managing Azure Policy in your organization and need to understand how policies are evaluated.',
    statements: [
      { id: 's1', text: 'Azure Policy evaluation occurs approximately once every 24 hours for existing resources by default.', correct: true },
      { id: 's2', text: 'You can trigger an on-demand policy evaluation scan using the Azure CLI command "az policy state trigger-scan".', correct: true },
      { id: 's3', text: 'When multiple policies with the Deny effect apply to the same resource, the resource is blocked only if all policies evaluate as non-compliant.', correct: false }
    ],
    explanation: 'Azure Policy evaluates existing resources approximately every 24 hours in a standard compliance evaluation cycle. You can trigger an on-demand scan using "az policy state trigger-scan" for immediate evaluation. When multiple deny policies apply, if ANY single policy evaluates as non-compliant, the resource creation/modification is blocked. All applicable deny policies must pass (be compliant) for the operation to succeed.'
  },

  // ========================================================================
  // ig-091 to ig-100: "Configure resource locks" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-091',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'single-choice',
    stem: 'You need to prevent accidental deletion of a production resource group and all its resources. Which type of resource lock should you apply?',
    options: [
      { id: 'a', text: 'ReadOnly lock' },
      { id: 'b', text: 'CanNotDelete lock' },
      { id: 'c', text: 'DoNotModify lock' },
      { id: 'd', text: 'FullLock' }
    ],
    correctOptionId: 'b',
    explanation: 'A CanNotDelete lock prevents deletion of the resource but allows reading and modifying it. This is ideal for protecting production resources from accidental deletion while still allowing normal operations. A ReadOnly lock would be too restrictive as it prevents any modifications. DoNotModify and FullLock are not valid Azure lock types. Azure supports only two lock types: CanNotDelete and ReadOnly.'
  },
  {
    id: 'ig-092',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'single-choice',
    stem: 'You apply a ReadOnly lock to a resource group. A user with the Contributor role tries to create a new virtual machine in the resource group. What happens?',
    options: [
      { id: 'a', text: 'The VM is created successfully because Contributor has write permissions' },
      { id: 'b', text: 'The operation fails because a ReadOnly lock prevents all write operations on the resource group and its resources' },
      { id: 'c', text: 'The VM is created but marked as read-only' },
      { id: 'd', text: 'The VM is created but the user receives a warning' }
    ],
    correctOptionId: 'b',
    explanation: 'A ReadOnly lock prevents any write (create, update, delete) operations on the resource and all resources within the scope. Even users with Owner or Contributor roles cannot modify resources when a ReadOnly lock is in place. The lock must be removed before any changes can be made. ReadOnly locks are inherited by child resources in the scope.'
  },
  {
    id: 'ig-093',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'single-choice',
    stem: 'Which RBAC permission is required to create or delete resource locks?',
    options: [
      { id: 'a', text: 'Microsoft.Authorization/locks/write and Microsoft.Authorization/locks/delete' },
      { id: 'b', text: 'Microsoft.Resources/locks/write' },
      { id: 'c', text: 'Contributor role only' },
      { id: 'd', text: 'Global Administrator role in Microsoft Entra ID' }
    ],
    correctOptionId: 'a',
    explanation: 'Creating and deleting resource locks requires the Microsoft.Authorization/locks/write and Microsoft.Authorization/locks/delete permissions respectively. These permissions are included in the Owner role and User Access Administrator role. The Contributor role does NOT include lock management permissions. Global Administrator is a Microsoft Entra ID role, not an Azure RBAC permission.'
  },
  {
    id: 'ig-094',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'single-choice',
    stem: 'You apply a CanNotDelete lock at the subscription level. You then try to delete a resource group within that subscription. What is the result?',
    options: [
      { id: 'a', text: 'The resource group is deleted because locks only apply to individual resources' },
      { id: 'b', text: 'The deletion fails because the lock is inherited by all resource groups in the subscription' },
      { id: 'c', text: 'The resource group is deleted but its resources are preserved' },
      { id: 'd', text: 'The deletion succeeds after a 24-hour waiting period' }
    ],
    correctOptionId: 'b',
    explanation: 'Resource locks are inherited from parent scopes. A CanNotDelete lock at the subscription level is inherited by all resource groups and resources within the subscription. Therefore, no resource group (or individual resource) can be deleted until the lock is removed. There is no waiting period or partial deletion behavior.'
  },
  {
    id: 'ig-095',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'single-choice',
    stem: 'Which Azure CLI command creates a CanNotDelete lock on a resource group named "rg-production"?',
    options: [
      { id: 'a', text: 'az lock create --name "no-delete" --lock-type CanNotDelete --resource-group rg-production' },
      { id: 'b', text: 'az resource lock create --type delete --resource-group rg-production' },
      { id: 'c', text: 'az lock set --name "no-delete" --type CanNotDelete --scope rg-production' },
      { id: 'd', text: 'az lock add --name "no-delete" --lock-type CanNotDelete --resource-group rg-production' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct Azure CLI command is "az lock create" with --name for the lock name, --lock-type for the type (CanNotDelete or ReadOnly), and --resource-group for the scope. The other options use non-existent command syntax. Note that --lock-type accepts "CanNotDelete" or "ReadOnly" as values.'
  },
  {
    id: 'ig-096',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'multiple-choice',
    stem: 'Which TWO statements about resource locks in Azure are correct? (Choose two.)',
    options: [
      { id: 'a', text: 'Resource locks apply to management plane operations, not data plane operations' },
      { id: 'b', text: 'A ReadOnly lock on a storage account prevents writing data to blob containers' },
      { id: 'c', text: 'Locks can be applied at the subscription, resource group, or resource level' },
      { id: 'd', text: 'Only the Owner role can create locks' },
      { id: 'e', text: 'Locks are automatically removed when the resource is moved to a different resource group' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Resource locks apply to management plane (Azure Resource Manager) operations, not data plane operations. For example, a ReadOnly lock on a storage account prevents management changes but does not prevent reading or writing blob data. Locks can be applied at subscription, resource group, or individual resource level. The Owner and User Access Administrator roles can manage locks (not just Owner). Locks are associated with the resource and move with it.'
  },
  {
    id: 'ig-097',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'drag-drop',
    stem: 'Match each lock type and scenario to the expected outcome.',
    items: [
      { id: 'item1', text: 'Operation succeeds' },
      { id: 'item2', text: 'Operation fails' },
      { id: 'item3', text: 'Operation succeeds' },
      { id: 'item4', text: 'Operation fails' }
    ],
    targets: [
      { id: 'target1', label: 'CanNotDelete lock on resource group + attempt to create a new VM in it', correctItemId: 'item1' },
      { id: 'target2', label: 'CanNotDelete lock on resource group + attempt to delete the resource group', correctItemId: 'item2' },
      { id: 'target3', label: 'ReadOnly lock on storage account + attempt to read blob data', correctItemId: 'item3' },
      { id: 'target4', label: 'ReadOnly lock on resource group + attempt to modify a VM in it', correctItemId: 'item4' }
    ],
    explanation: 'CanNotDelete locks allow all operations except deletion, so creating a VM succeeds but deleting the resource group fails. ReadOnly locks prevent management plane writes but not data plane reads, so reading blob data succeeds. ReadOnly locks prevent any management plane modifications, so modifying a VM in a ReadOnly-locked resource group fails.'
  },
  {
    id: 'ig-098',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'dropdown',
    stem: 'Complete the PowerShell command to create a ReadOnly lock on a specific storage account.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['New-AzResourceLock', 'Set-AzResourceLock', 'Add-AzResourceLock', 'Create-AzResourceLock'], correctOption: 'New-AzResourceLock' },
      { type: 'text', text: ' -LockName "readonly-lock" ' },
      { type: 'dropdown', id: 'dd2', options: ['-LockLevel ReadOnly', '-LockType ReadOnly', '-Level ReadOnly', '-Type ReadOnly'], correctOption: '-LockLevel ReadOnly' },
      { type: 'text', text: ' -ResourceName "stgproduction" -ResourceType "Microsoft.Storage/storageAccounts" -ResourceGroupName "rg-production"' }
    ],
    explanation: 'New-AzResourceLock is the PowerShell cmdlet to create a resource lock. The -LockLevel parameter specifies the lock type (ReadOnly or CanNotDelete). You must specify the resource using -ResourceName, -ResourceType, and -ResourceGroupName when targeting a specific resource rather than a resource group.'
  },
  {
    id: 'ig-099',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'yes-no',
    scenario: 'You are implementing resource locks in your Azure environment to protect critical resources.',
    statements: [
      { id: 's1', text: 'A ReadOnly lock on a virtual machine prevents the VM from being started or stopped.', correct: true },
      { id: 's2', text: 'Resource locks can be bypassed by users with the Global Administrator role in Microsoft Entra ID.', correct: false },
      { id: 's3', text: 'You can apply multiple locks at different levels, and the most restrictive lock takes precedence.', correct: true }
    ],
    explanation: 'A ReadOnly lock on a VM prevents management plane write operations, which includes starting and stopping the VM (these are POST operations on the management plane). Global Administrators in Entra ID do not automatically have Azure RBAC permissions and cannot bypass locks (they would need to elevate access first, and even then would need to remove the lock). When multiple locks exist at different scopes, the most restrictive lock applies.'
  },
  {
    id: 'ig-100',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure resource locks',
    type: 'yes-no',
    scenario: 'Your organization has deployed resource locks to protect production resources.',
    statements: [
      { id: 's1', text: 'A CanNotDelete lock on a resource group prevents you from moving resources out of the resource group.', correct: false },
      { id: 's2', text: 'Removing a lock requires the Microsoft.Authorization/locks/delete permission.', correct: true },
      { id: 's3', text: 'Resource locks are recorded in the Azure Activity Log when they are created, modified, or deleted.', correct: true }
    ],
    explanation: 'A CanNotDelete lock only prevents deletion; it does not prevent moving resources between resource groups. However, a ReadOnly lock would prevent moves since moving requires write operations. Removing a lock requires the Microsoft.Authorization/locks/delete permission. Lock operations are recorded in the Azure Activity Log, which is useful for auditing who created or removed locks.'
  },

  // ========================================================================
  // ig-101 to ig-110: "Apply and manage tags on resources" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-101',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'single-choice',
    stem: 'You need to add a tag "Environment=Production" to an existing resource group named "rg-app" without removing any existing tags. Which Azure CLI command should you use?',
    options: [
      { id: 'a', text: 'az tag create --resource-id /subscriptions/{sub-id}/resourceGroups/rg-app --tags Environment=Production' },
      { id: 'b', text: 'az tag update --resource-id /subscriptions/{sub-id}/resourceGroups/rg-app --operation Merge --tags Environment=Production' },
      { id: 'c', text: 'az group update --name rg-app --set tags.Environment=Production' },
      { id: 'd', text: 'az resource tag --tags Environment=Production --ids /subscriptions/{sub-id}/resourceGroups/rg-app' }
    ],
    correctOptionId: 'b',
    explanation: 'The "az tag update" command with --operation Merge adds or updates the specified tags without removing existing ones. Option A (az tag create) would replace all existing tags. Option C uses az group update which can work but the syntax shown uses --set. Option D (az resource tag) replaces all existing tags with only the specified ones. The Merge operation is the safest way to add tags to a resource that already has tags.'
  },
  {
    id: 'ig-102',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'single-choice',
    stem: 'You have applied tags to a resource group. Are those tags automatically inherited by the resources within the resource group?',
    options: [
      { id: 'a', text: 'Yes, tags are always inherited from resource groups to resources' },
      { id: 'b', text: 'No, tags are not inherited by default, but you can use Azure Policy to enforce tag inheritance' },
      { id: 'c', text: 'Yes, but only for resources created after the tags were applied' },
      { id: 'd', text: 'No, and there is no way to enforce tag inheritance' }
    ],
    correctOptionId: 'b',
    explanation: 'By default, tags applied to a resource group are NOT inherited by the resources within it. Each resource maintains its own tags independently. However, you can use Azure Policy with the "Inherit a tag from the resource group" built-in policy to automatically copy tags from the resource group to its resources. This policy uses the Modify effect to add or update tags on resources.'
  },
  {
    id: 'ig-103',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'single-choice',
    stem: 'You need to enforce that all resources in a subscription must have a "CostCenter" tag. Resources without this tag should not be allowed to be created. Which Azure Policy definition should you use?',
    options: [
      { id: 'a', text: 'Require a tag and its value on resources (with Deny effect)' },
      { id: 'b', text: 'Audit resources that are missing a tag (with Audit effect)' },
      { id: 'c', text: 'Require a tag on resources (with Deny effect)' },
      { id: 'd', text: 'Inherit a tag from the resource group (with Modify effect)' }
    ],
    correctOptionId: 'c',
    explanation: 'The "Require a tag on resources" policy with the Deny effect prevents resources from being created if they do not have the specified tag. This only requires the tag to be present, not a specific value. "Require a tag and its value" would also enforce a specific value, which is more restrictive than needed. The Audit effect would only flag non-compliance without preventing creation. The Inherit policy copies tags from the resource group but does not prevent creation.'
  },
  {
    id: 'ig-104',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'single-choice',
    stem: 'What is the maximum number of tags that can be applied to a single Azure resource?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '50' },
      { id: 'c', text: '100' },
      { id: 'd', text: 'Unlimited' }
    ],
    correctOptionId: 'b',
    explanation: 'Each Azure resource, resource group, or subscription can have a maximum of 50 tag name-value pairs. The tag name has a maximum length of 512 characters, and the tag value has a maximum length of 256 characters (except for storage accounts where the tag name limit is 128 characters and value is 256).'
  },
  {
    id: 'ig-105',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'single-choice',
    stem: 'You want to view all resources in your subscription that have the tag "Department=Finance." Which Azure CLI command should you use?',
    options: [
      { id: 'a', text: 'az resource list --tag Department=Finance' },
      { id: 'b', text: 'az tag list --name Department --value Finance' },
      { id: 'c', text: 'az resource show --tags Department=Finance' },
      { id: 'd', text: 'az group list --tag Department=Finance' }
    ],
    correctOptionId: 'a',
    explanation: 'The "az resource list --tag" command lists all resources that match the specified tag name and value. The format is --tag Name=Value. "az tag list" shows tag names and values defined in the subscription but does not filter resources. "az resource show" shows details of a specific resource. "az group list --tag" would filter resource groups, not individual resources.'
  },
  {
    id: 'ig-106',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'multiple-choice',
    stem: 'Which TWO benefits do tags provide in Azure resource management? (Choose two.)',
    options: [
      { id: 'a', text: 'Organizing resources for cost management and billing reports' },
      { id: 'b', text: 'Controlling access to resources through RBAC' },
      { id: 'c', text: 'Grouping resources logically across resource groups and subscriptions' },
      { id: 'd', text: 'Encrypting resources with specific encryption keys' },
      { id: 'e', text: 'Automatically scaling resources based on demand' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Tags provide two primary benefits: organizing resources for cost management (you can filter and group costs by tags in Azure Cost Management) and logically grouping resources across different resource groups and subscriptions (tags span the entire resource hierarchy). Tags do not control RBAC access (that is done through role assignments), encrypt resources, or configure auto-scaling.'
  },
  {
    id: 'ig-107',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'multiple-choice',
    stem: 'You need to apply tags to multiple existing resources that are missing required tags. Which TWO approaches can you use? (Choose two.)',
    options: [
      { id: 'a', text: 'Create an Azure Policy with the Modify effect and run a remediation task' },
      { id: 'b', text: 'Use a PowerShell script with Update-AzTag to apply tags in bulk' },
      { id: 'c', text: 'Restart the resources to trigger automatic tag application' },
      { id: 'd', text: 'Move the resources to a tagged resource group' },
      { id: 'e', text: 'Delete and recreate the resources with tags' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Azure Policy with the Modify effect can automatically add or modify tags on resources, and a remediation task can apply this to existing non-compliant resources. Using PowerShell with Update-AzTag allows bulk tag operations across multiple resources. Restarting resources does not affect tags. Moving resources to a tagged resource group does not inherit tags. Deleting and recreating is impractical and causes downtime.'
  },
  {
    id: 'ig-108',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'drag-drop',
    stem: 'Match each Azure Policy definition to its tag management behavior.',
    items: [
      { id: 'item1', text: 'Require a tag on resources' },
      { id: 'item2', text: 'Inherit a tag from the resource group' },
      { id: 'item3', text: 'Require a tag and its value on resources' },
      { id: 'item4', text: 'Add a tag to resources' }
    ],
    targets: [
      { id: 'target1', label: 'Denies resource creation if a specified tag is missing, regardless of value', correctItemId: 'item1' },
      { id: 'target2', label: 'Denies resource creation if a specified tag with a specific value is missing', correctItemId: 'item3' },
      { id: 'target3', label: 'Copies a tag from the parent resource group to resources using the Modify effect', correctItemId: 'item2' },
      { id: 'target4', label: 'Automatically adds a specified tag and value using the Modify effect', correctItemId: 'item4' }
    ],
    explanation: '"Require a tag on resources" denies creation if the tag is missing (any value is accepted). "Require a tag and its value" denies creation if both the tag name and a specific value are not present. "Inherit a tag from the resource group" uses the Modify effect to copy a tag from the resource group to its resources. "Add a tag to resources" uses Modify to automatically add a specific tag and value.'
  },
  {
    id: 'ig-109',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'dropdown',
    stem: 'Complete the PowerShell command to merge a new tag to an existing resource group without removing existing tags.',
    segments: [
      { type: 'text', text: '$tags = @{"Environment"="Production"}\n\n' },
      { type: 'dropdown', id: 'dd1', options: ['Update-AzTag', 'Set-AzTag', 'New-AzTag', 'Add-AzTag'], correctOption: 'Update-AzTag' },
      { type: 'text', text: ' -ResourceId "/subscriptions/{sub-id}/resourceGroups/rg-app" -Tag $tags -Operation ' },
      { type: 'dropdown', id: 'dd2', options: ['Merge', 'Replace', 'Append', 'Add'], correctOption: 'Merge' }
    ],
    explanation: 'Update-AzTag is used to update tags on a resource. The -Operation parameter controls behavior: "Merge" adds new tags without removing existing ones (or updates values of existing tag names). "Replace" replaces all existing tags with only the specified ones. "Delete" removes the specified tags. The Merge operation is the safest choice when adding tags to resources that already have tags.'
  },
  {
    id: 'ig-110',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Apply and manage tags on resources',
    type: 'yes-no',
    scenario: 'You are implementing a tagging strategy for your Azure resources.',
    statements: [
      { id: 's1', text: 'Tags can be applied to all Azure resource types.', correct: false },
      { id: 's2', text: 'Tag names are case-insensitive for Azure operations but stored with the original casing.', correct: true },
      { id: 's3', text: 'Tags can be used to filter resources in Azure Cost Management billing reports.', correct: true }
    ],
    explanation: 'Not all Azure resource types support tags. While most do, some resource types (like classic resources) may not support tagging. Tag names are case-insensitive for operations (so "Environment" and "environment" are treated as the same tag) but the casing is preserved as entered. Tags are very useful in Azure Cost Management for filtering, grouping, and analyzing costs by tag values such as department, project, or environment.'
  },

  // ========================================================================
  // ig-111 to ig-120: "Manage resource groups" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-111',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'single-choice',
    stem: 'You need to create a new resource group in the East US region using Azure CLI. Which command should you use?',
    options: [
      { id: 'a', text: 'az group create --name rg-app --location eastus' },
      { id: 'b', text: 'az resource-group create --name rg-app --region eastus' },
      { id: 'c', text: 'az group new --name rg-app --location eastus' },
      { id: 'd', text: 'az create resource-group --name rg-app --location eastus' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct Azure CLI command to create a resource group is "az group create" with --name for the resource group name and --location for the Azure region. The other options use incorrect command syntax. Note that "az group" is the command group for resource group management in Azure CLI.'
  },
  {
    id: 'ig-112',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'single-choice',
    stem: 'A resource group is located in the West Europe region. Can you deploy a virtual machine in the East US region to this resource group?',
    options: [
      { id: 'a', text: 'No, all resources must be in the same region as the resource group' },
      { id: 'b', text: 'Yes, resources can be in any region regardless of the resource group location' },
      { id: 'c', text: 'Yes, but only for compute resources like virtual machines' },
      { id: 'd', text: 'No, unless you create a linked resource group in East US' }
    ],
    correctOptionId: 'b',
    explanation: 'The location of a resource group is where the resource group metadata is stored. Resources within a resource group can be in any Azure region. The resource group location has no impact on where you can deploy resources. This is important for disaster recovery and multi-region architectures where resources in different regions are logically grouped together.'
  },
  {
    id: 'ig-113',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'single-choice',
    stem: 'What happens to the resources inside a resource group when you delete the resource group?',
    options: [
      { id: 'a', text: 'The resources are moved to the default resource group' },
      { id: 'b', text: 'The resources are orphaned and remain in the subscription' },
      { id: 'c', text: 'All resources within the resource group are also deleted' },
      { id: 'd', text: 'The resources are moved to a "deleted items" container for 30 days' }
    ],
    correctOptionId: 'c',
    explanation: 'Deleting a resource group deletes ALL resources contained within it. This is a destructive operation and cannot be undone. Resources are not moved or preserved - they are permanently deleted. This is why resource locks (CanNotDelete) are important for protecting production resource groups from accidental deletion.'
  },
  {
    id: 'ig-114',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'single-choice',
    stem: 'You need to move a virtual machine from one resource group to another within the same subscription. Which consideration is important?',
    options: [
      { id: 'a', text: 'The VM must be stopped (deallocated) during the move' },
      { id: 'b', text: 'Both the source and target resource groups are locked during the move operation' },
      { id: 'c', text: 'The VM\'s IP address will change after the move' },
      { id: 'd', text: 'You must recreate the VM in the target resource group' }
    ],
    correctOptionId: 'b',
    explanation: 'During a resource move operation, both the source and target resource groups are locked, preventing any create, update, or delete operations on resources in either group for the duration of the move. The VM does not need to be stopped (it can be moved while running). The VM\'s configuration, including IP addresses, remains the same. Resources are moved, not recreated.'
  },
  {
    id: 'ig-115',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'single-choice',
    stem: 'You want to export the Azure Resource Manager (ARM) template for an existing resource group to replicate the infrastructure in another environment. Where do you find this option in the Azure portal?',
    options: [
      { id: 'a', text: 'Resource group > Export template' },
      { id: 'b', text: 'Resource group > Properties > Download template' },
      { id: 'c', text: 'Resource group > Deployments > Export' },
      { id: 'd', text: 'Resource group > Tags > Export' }
    ],
    correctOptionId: 'a',
    explanation: 'The "Export template" option on a resource group blade generates an ARM template that describes the current state of all resources in the resource group. This template can be downloaded and used to deploy similar infrastructure in another environment. The Deployments blade shows deployment history, not template export. Properties and Tags do not have export template functionality.'
  },
  {
    id: 'ig-116',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'multiple-choice',
    stem: 'Which TWO statements about Azure resource groups are correct? (Choose two.)',
    options: [
      { id: 'a', text: 'A resource can only belong to one resource group at a time' },
      { id: 'b', text: 'Resource groups can be nested inside other resource groups' },
      { id: 'c', text: 'A resource group can contain resources from multiple Azure regions' },
      { id: 'd', text: 'Resource groups can span multiple subscriptions' },
      { id: 'e', text: 'Deleting a resource group automatically cancels all running resources before deletion' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Each resource belongs to exactly one resource group; it cannot be in multiple resource groups simultaneously. A resource group can contain resources from any Azure region. Resource groups cannot be nested inside each other. Resource groups belong to a single subscription and cannot span multiple subscriptions. Deleting a resource group deletes all resources within it, but it does not gracefully stop them first - it initiates deletion of all resources.'
  },
  {
    id: 'ig-117',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'drag-drop',
    stem: 'Match each Azure CLI command to the resource group management action it performs.',
    items: [
      { id: 'item1', text: 'az group create --name rg-dev --location westus' },
      { id: 'item2', text: 'az group delete --name rg-dev --yes' },
      { id: 'item3', text: 'az group list --tag Environment=Dev' },
      { id: 'item4', text: 'az resource move --destination-group rg-prod --ids <resource-id>' }
    ],
    targets: [
      { id: 'target1', label: 'Create a new resource group', correctItemId: 'item1' },
      { id: 'target2', label: 'Delete a resource group without confirmation prompt', correctItemId: 'item2' },
      { id: 'target3', label: 'List resource groups filtered by tag', correctItemId: 'item3' },
      { id: 'target4', label: 'Move a resource to a different resource group', correctItemId: 'item4' }
    ],
    explanation: '"az group create" creates a new resource group. "az group delete --yes" deletes a resource group and all its resources without a confirmation prompt. "az group list --tag" filters resource groups by a specific tag. "az resource move" moves a resource to a different resource group specified by --destination-group.'
  },
  {
    id: 'ig-118',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'dropdown',
    stem: 'Complete the PowerShell commands to create a resource group and then deploy a template to it.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['New-AzResourceGroup', 'Set-AzResourceGroup', 'Add-AzResourceGroup', 'Create-AzResourceGroup'], correctOption: 'New-AzResourceGroup' },
      { type: 'text', text: ' -Name "rg-app" -Location "eastus"\n\n' },
      { type: 'dropdown', id: 'dd2', options: ['New-AzResourceGroupDeployment', 'Set-AzResourceGroupDeployment', 'Deploy-AzResourceGroup', 'Start-AzDeployment'], correctOption: 'New-AzResourceGroupDeployment' },
      { type: 'text', text: ' -ResourceGroupName "rg-app" -TemplateFile "./template.json"' }
    ],
    explanation: 'New-AzResourceGroup creates a new resource group with a name and location. New-AzResourceGroupDeployment deploys resources to a resource group using an ARM template file. The -TemplateFile parameter specifies the path to the template. These are the standard PowerShell cmdlets for resource group creation and template deployment.'
  },
  {
    id: 'ig-119',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'yes-no',
    scenario: 'You are managing resource groups in your Azure subscription.',
    statements: [
      { id: 's1', text: 'You can change the location (region) of a resource group after it has been created.', correct: false },
      { id: 's2', text: 'RBAC role assignments on a resource group are inherited by all resources within that resource group.', correct: true },
      { id: 's3', text: 'You can move a resource from one resource group to another resource group in a different subscription.', correct: true }
    ],
    explanation: 'The location of a resource group cannot be changed after creation. If you need a different location, you must create a new resource group and move the resources. RBAC assignments are inherited from resource groups to all resources within them. Resources can be moved between resource groups even across different subscriptions (within the same Azure AD tenant), as long as the resource type supports the move operation.'
  },
  {
    id: 'ig-120',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage resource groups',
    type: 'yes-no',
    scenario: 'You are planning the resource group structure for a new Azure deployment.',
    statements: [
      { id: 's1', text: 'Resource group names must be unique within a subscription.', correct: true },
      { id: 's2', text: 'A resource group must contain at least one resource.', correct: false },
      { id: 's3', text: 'When you move a resource to a new resource group, the resource ID changes.', correct: true }
    ],
    explanation: 'Resource group names must be unique within a subscription (different subscriptions can have resource groups with the same name). A resource group can be empty - it can exist without any resources inside it. When a resource is moved to a different resource group, its resource ID changes because the resource ID includes the resource group name in its path (e.g., /subscriptions/{sub-id}/resourceGroups/{new-rg-name}/providers/...).'
  },

  // ========================================================================
  // ig-121 to ig-130: "Manage subscriptions" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-121',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'single-choice',
    stem: 'Your organization needs to separate Azure resources for development, testing, and production environments with different billing and access controls. What is the recommended approach?',
    options: [
      { id: 'a', text: 'Create separate resource groups in a single subscription' },
      { id: 'b', text: 'Create separate subscriptions for each environment' },
      { id: 'c', text: 'Use tags to identify environments within a single subscription' },
      { id: 'd', text: 'Create separate Azure AD tenants for each environment' }
    ],
    correctOptionId: 'b',
    explanation: 'Creating separate subscriptions for development, testing, and production is the recommended approach for environment isolation. Each subscription provides its own billing boundary, RBAC boundary, and resource limits. Resource groups within a single subscription do not provide billing separation. Tags are useful for cost allocation but do not provide access boundaries. Separate tenants add unnecessary complexity for environment isolation.'
  },
  {
    id: 'ig-122',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'single-choice',
    stem: 'You need to transfer an Azure subscription from one Azure AD tenant to another. Which prerequisite must be met?',
    options: [
      { id: 'a', text: 'All resource locks must be removed first' },
      { id: 'b', text: 'You must have Owner or Contributor role on the subscription and Global Administrator in both tenants' },
      { id: 'c', text: 'The subscription must have no resources deployed' },
      { id: 'd', text: 'Both tenants must have the same domain name' }
    ],
    correctOptionId: 'b',
    explanation: 'Transferring a subscription between tenants requires appropriate permissions in both the source and destination. You need at least Owner role on the subscription (for billing transfer) and sufficient permissions in both Azure AD tenants. Resource locks do not need to be removed, the subscription can have resources, and the tenants do not need matching domain names. Note that RBAC role assignments and managed identities may be affected during transfer.'
  },
  {
    id: 'ig-123',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'single-choice',
    stem: 'What happens to existing RBAC role assignments when a subscription is transferred to a different Azure AD tenant?',
    options: [
      { id: 'a', text: 'All role assignments are preserved and continue to work' },
      { id: 'b', text: 'All role assignments are permanently deleted' },
      { id: 'c', text: 'Role assignments are preserved but need to be updated with new user IDs' },
      { id: 'd', text: 'Only Owner role assignments are preserved; others are deleted' }
    ],
    correctOptionId: 'b',
    explanation: 'When a subscription is transferred to a different Azure AD tenant, ALL RBAC role assignments are permanently deleted. This is because role assignments reference Azure AD object IDs (users, groups, service principals) that are specific to the original tenant. After the transfer, new role assignments must be created using identities from the new tenant.'
  },
  {
    id: 'ig-124',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'single-choice',
    stem: 'You have multiple Azure subscriptions and want to view all of them using Azure CLI. Which command should you use?',
    options: [
      { id: 'a', text: 'az account list' },
      { id: 'b', text: 'az subscription list' },
      { id: 'c', text: 'az account show --all' },
      { id: 'd', text: 'az login --list-subscriptions' }
    ],
    correctOptionId: 'a',
    explanation: 'The "az account list" command shows all subscriptions available to the currently logged-in user. It displays subscription names, IDs, states, and which subscription is currently the default. "az subscription list" is not the correct command. "az account show" displays the current default subscription only. "az login --list-subscriptions" is not valid syntax.'
  },
  {
    id: 'ig-125',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'single-choice',
    stem: 'An Azure subscription has reached its resource limits for the number of virtual machines in a region. What should you do to deploy more VMs?',
    options: [
      { id: 'a', text: 'Delete existing VMs to free up quota' },
      { id: 'b', text: 'Submit a support request to increase the subscription quota' },
      { id: 'c', text: 'Create a new Azure AD tenant' },
      { id: 'd', text: 'Upgrade to an Enterprise Agreement subscription' }
    ],
    correctOptionId: 'b',
    explanation: 'When you reach a subscription resource limit (quota), you can request an increase by submitting a support request through the Azure portal (Help + support > New support request > Quota type). Deleting VMs would work but is impractical if you need all existing VMs. Creating a new tenant does not increase quotas. Upgrading the subscription type may provide different default limits but the standard approach is to request a quota increase.'
  },
  {
    id: 'ig-126',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'multiple-choice',
    stem: 'Which TWO options are valid Azure subscription types? (Choose two.)',
    options: [
      { id: 'a', text: 'Pay-as-you-go' },
      { id: 'b', text: 'Free trial' },
      { id: 'c', text: 'Resource-based' },
      { id: 'd', text: 'Per-user licensing' },
      { id: 'e', text: 'Regional subscription' }
    ],
    correctOptionIds: ['a', 'b'],
    requiredSelections: 2,
    explanation: 'Pay-as-you-go and Free trial are valid Azure subscription types. Other types include Enterprise Agreement (EA), Microsoft Customer Agreement (MCA), Cloud Solution Provider (CSP), and Visual Studio/Dev/Test subscriptions. Resource-based, per-user licensing, and regional subscriptions are not valid Azure subscription types.'
  },
  {
    id: 'ig-127',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'drag-drop',
    stem: 'Match each subscription management task to the correct Azure CLI command.',
    items: [
      { id: 'item1', text: 'az account list' },
      { id: 'item2', text: 'az account set --subscription "sub-name"' },
      { id: 'item3', text: 'az account show' },
      { id: 'item4', text: 'az account list-locations' }
    ],
    targets: [
      { id: 'target1', label: 'List all available subscriptions', correctItemId: 'item1' },
      { id: 'target2', label: 'Set the default subscription for CLI commands', correctItemId: 'item2' },
      { id: 'target3', label: 'Show details of the current default subscription', correctItemId: 'item3' },
      { id: 'target4', label: 'List all available Azure regions for the subscription', correctItemId: 'item4' }
    ],
    explanation: '"az account list" shows all subscriptions. "az account set" changes the default subscription for subsequent CLI commands. "az account show" displays details of the currently selected subscription. "az account list-locations" lists all Azure regions available for the subscription.'
  },
  {
    id: 'ig-128',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'dropdown',
    stem: 'You need to change the default subscription for your Azure PowerShell session. Complete the command.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['Set-AzContext', 'Select-AzSubscription', 'Switch-AzSubscription', 'Use-AzSubscription'], correctOption: 'Set-AzContext' },
      { type: 'text', text: ' -SubscriptionId "' },
      { type: 'dropdown', id: 'dd2', options: ['subscription-guid-here', 'subscription-name-here', 'tenant-id-here', 'resource-group-name'], correctOption: 'subscription-guid-here' },
      { type: 'text', text: '"' }
    ],
    explanation: 'Set-AzContext is the PowerShell cmdlet to switch the current Azure context to a different subscription. The -SubscriptionId parameter accepts the subscription GUID (you can also use -SubscriptionName with the display name). Select-AzSubscription is an alias but Set-AzContext is the primary cmdlet. Switch-AzSubscription and Use-AzSubscription do not exist.'
  },
  {
    id: 'ig-129',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'yes-no',
    scenario: 'You are managing multiple Azure subscriptions for your organization.',
    statements: [
      { id: 's1', text: 'A single Azure AD tenant can be associated with multiple Azure subscriptions.', correct: true },
      { id: 's2', text: 'An Azure subscription can be associated with multiple Azure AD tenants simultaneously.', correct: false },
      { id: 's3', text: 'Canceling an Azure subscription immediately and permanently deletes all resources.', correct: false }
    ],
    explanation: 'A single Azure AD tenant can have multiple subscriptions associated with it (this is the common enterprise setup). An Azure subscription is associated with exactly one Azure AD tenant at a time (though it can be transferred to a different tenant). Canceling a subscription does not immediately delete resources; the subscription enters a disabled state for a grace period (typically 30-90 days depending on subscription type) before permanent deletion.'
  },
  {
    id: 'ig-130',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage subscriptions',
    type: 'yes-no',
    scenario: 'You need to understand Azure subscription boundaries and capabilities.',
    statements: [
      { id: 's1', text: 'Azure subscriptions serve as a billing boundary for Azure resource usage.', correct: true },
      { id: 's2', text: 'Resource quotas (limits) are tracked at the subscription level per region.', correct: true },
      { id: 's3', text: 'An Azure subscription can contain a maximum of 100 resource groups.', correct: false }
    ],
    explanation: 'Azure subscriptions are a billing boundary - charges for resources are aggregated and billed per subscription. Resource quotas are tracked per subscription per region (for example, you might have a quota of 250 vCPUs in East US for a specific subscription). There is no limit of 100 resource groups per subscription; the default limit is 980 resource groups per subscription.'
  },

  // ========================================================================
  // ig-131 to ig-140: "Manage costs by using alerts, budgets, and Azure Advisor recommendations" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-131',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'single-choice',
    stem: 'You need to set up a notification when your Azure subscription spending reaches 80% of a monthly budget of $10,000. Where should you configure this?',
    options: [
      { id: 'a', text: 'Azure Cost Management > Budgets > Create a budget with an alert condition at 80%' },
      { id: 'b', text: 'Azure Monitor > Alerts > Create a new cost alert' },
      { id: 'c', text: 'Azure Advisor > Cost recommendations > Set threshold' },
      { id: 'd', text: 'Subscription > Properties > Spending limit' }
    ],
    correctOptionId: 'a',
    explanation: 'Azure Cost Management includes a Budgets feature that allows you to create budgets with alert conditions. You can set the budget amount ($10,000/month) and configure alerts at specific percentage thresholds (80%). When spending reaches the threshold, email notifications are sent to configured recipients. Azure Monitor is for resource metrics and logs. Azure Advisor provides recommendations but does not create budget alerts. Subscription spending limits are different from budgets.'
  },
  {
    id: 'ig-132',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'single-choice',
    stem: 'You want to analyze cost trends and identify which resource groups are consuming the most budget. Which Azure tool should you use?',
    options: [
      { id: 'a', text: 'Azure Cost Management > Cost analysis' },
      { id: 'b', text: 'Azure Monitor > Metrics' },
      { id: 'c', text: 'Azure Advisor > Overview' },
      { id: 'd', text: 'Azure Policy > Compliance' }
    ],
    correctOptionId: 'a',
    explanation: 'Cost analysis in Azure Cost Management provides detailed views of your costs with the ability to group by resource group, resource type, location, tag, and more. You can view cost trends over time, forecast future costs, and identify cost drivers. Azure Monitor tracks operational metrics. Azure Advisor provides general recommendations. Azure Policy tracks compliance, not costs.'
  },
  {
    id: 'ig-133',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'single-choice',
    stem: 'Azure Advisor provides a cost recommendation to resize an underutilized virtual machine. What does this recommendation typically suggest?',
    options: [
      { id: 'a', text: 'Delete the virtual machine entirely' },
      { id: 'b', text: 'Shut down or resize the VM to a smaller SKU based on CPU and memory utilization' },
      { id: 'c', text: 'Move the VM to a different region with lower costs' },
      { id: 'd', text: 'Convert the VM from managed disks to unmanaged disks' }
    ],
    correctOptionId: 'b',
    explanation: 'Azure Advisor analyzes VM utilization metrics (CPU, memory, network) and recommends shutting down or resizing underutilized VMs to smaller SKUs. This helps reduce costs by matching resource capacity to actual usage. Advisor does not typically recommend deleting VMs, moving to different regions, or converting disk types as cost optimization strategies.'
  },
  {
    id: 'ig-134',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'single-choice',
    stem: 'You create a budget in Azure Cost Management with an alert at 100% of the budget amount. What happens when the budget is reached?',
    options: [
      { id: 'a', text: 'All resources in the subscription are automatically stopped' },
      { id: 'b', text: 'An email notification is sent to the configured recipients, but resources continue running' },
      { id: 'c', text: 'The subscription is automatically suspended' },
      { id: 'd', text: 'New resource deployments are blocked, but existing resources continue' }
    ],
    correctOptionId: 'b',
    explanation: 'Budget alerts in Azure Cost Management are notification-only by default. When spending reaches the configured threshold, an email notification is sent to the specified recipients. Resources continue running and are not stopped or blocked. Budget alerts inform you about spending but do not automatically take action. You can configure action groups to trigger automation (like Azure Functions) for more automated responses.'
  },
  {
    id: 'ig-135',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'single-choice',
    stem: 'Which Azure Advisor category provides recommendations for reducing Azure spending?',
    options: [
      { id: 'a', text: 'Reliability' },
      { id: 'b', text: 'Security' },
      { id: 'c', text: 'Cost' },
      { id: 'd', text: 'Operational Excellence' }
    ],
    correctOptionId: 'c',
    explanation: 'Azure Advisor has five recommendation categories: Reliability (formerly High Availability), Security, Performance, Cost, and Operational Excellence. The Cost category specifically provides recommendations for reducing Azure spending, such as resizing underutilized VMs, purchasing reserved instances, and deleting unused resources.'
  },
  {
    id: 'ig-136',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'multiple-choice',
    stem: 'Which TWO types of alert conditions can you configure when creating a budget in Azure Cost Management? (Choose two.)',
    options: [
      { id: 'a', text: 'Actual cost reaching a percentage of the budget' },
      { id: 'b', text: 'Resource count exceeding a threshold' },
      { id: 'c', text: 'Forecasted cost reaching a percentage of the budget' },
      { id: 'd', text: 'CPU utilization exceeding a threshold' },
      { id: 'e', text: 'Number of users accessing resources' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Azure Cost Management budgets support two types of alert conditions: actual cost (triggers when actual spending reaches the specified percentage) and forecasted cost (triggers when the projected spending based on current trends is expected to reach the specified percentage). Resource count, CPU utilization, and user access metrics are not budget alert conditions - those are Azure Monitor metrics.'
  },
  {
    id: 'ig-137',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'drag-drop',
    stem: 'Match each Azure cost management feature to its primary purpose.',
    items: [
      { id: 'item1', text: 'Azure Cost Management - Cost analysis' },
      { id: 'item2', text: 'Azure Cost Management - Budgets' },
      { id: 'item3', text: 'Azure Advisor - Cost recommendations' },
      { id: 'item4', text: 'Azure Cost Management - Cost alerts' }
    ],
    targets: [
      { id: 'target1', label: 'Visualize and explore current and historical spending patterns', correctItemId: 'item1' },
      { id: 'target2', label: 'Set spending thresholds and receive notifications when exceeded', correctItemId: 'item2' },
      { id: 'target3', label: 'Get actionable suggestions to reduce waste and optimize spending', correctItemId: 'item3' },
      { id: 'target4', label: 'View anomaly, budget, and credit-based spending notifications in one place', correctItemId: 'item4' }
    ],
    explanation: 'Cost analysis provides visualization and exploration of spending data. Budgets set spending limits with notification thresholds. Azure Advisor cost recommendations identify specific resources that can be optimized (resized, deleted, or reserved). Cost alerts provide a centralized view of all cost-related notifications including anomaly alerts, budget alerts, and credit alerts.'
  },
  {
    id: 'ig-138',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'dropdown',
    stem: 'You need to create a monthly budget of $5,000 for a resource group using Azure CLI. Complete the command.',
    segments: [
      { type: 'text', text: 'az consumption budget create --budget-name "monthly-budget" --amount ' },
      { type: 'dropdown', id: 'dd1', options: ['5000', '"$5000"', '5000.00 --currency USD', '"5,000"'], correctOption: '5000' },
      { type: 'text', text: ' --time-grain ' },
      { type: 'dropdown', id: 'dd2', options: ['Monthly', 'monthly', 'Month', 'Per-Month'], correctOption: 'Monthly' },
      { type: 'text', text: ' --category Cost --resource-group rg-production --start-date 2024-01-01 --end-date 2024-12-31' }
    ],
    explanation: 'The "az consumption budget create" command creates a budget. The --amount parameter takes a numeric value without currency symbols. The --time-grain parameter specifies the budget period (Monthly, Quarterly, or Annually) with proper capitalization. The --category is "Cost" for spending budgets. You must specify --resource-group to scope the budget to a specific resource group, and --start-date and --end-date define the budget period.'
  },
  {
    id: 'ig-139',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'yes-no',
    scenario: 'You are implementing cost management controls for your Azure environment.',
    statements: [
      { id: 's1', text: 'Azure budgets can automatically shut down resources when the budget threshold is exceeded.', correct: false },
      { id: 's2', text: 'You can configure budget alerts to trigger an action group that runs an Azure Automation runbook.', correct: true },
      { id: 's3', text: 'Azure Advisor cost recommendations include suggestions for purchasing reserved instances to save money on long-running workloads.', correct: true }
    ],
    explanation: 'Azure budgets do not automatically shut down resources; they only send notifications. However, you can configure budget alerts to trigger an action group, which can run an Azure Automation runbook or Azure Function to take automated actions (like stopping VMs). Azure Advisor does recommend purchasing reserved instances (reservations) when it detects VMs or other resources that run consistently and would benefit from reservation pricing.'
  },
  {
    id: 'ig-140',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Manage costs by using alerts, budgets, and Azure Advisor recommendations',
    type: 'yes-no',
    scenario: 'You are reviewing Azure Advisor recommendations for cost optimization.',
    statements: [
      { id: 's1', text: 'Azure Advisor is a free service available to all Azure subscriptions.', correct: true },
      { id: 's2', text: 'Azure Advisor recommendations are updated in real-time as resource configurations change.', correct: false },
      { id: 's3', text: 'You can dismiss or postpone Azure Advisor recommendations.', correct: true }
    ],
    explanation: 'Azure Advisor is a free personalized cloud consultant available to all Azure subscribers. Advisor recommendations are not real-time; they are updated periodically (typically every 24 hours) based on resource telemetry and best practices. You can dismiss recommendations that are not applicable or postpone them for a specified period, which helps keep the recommendation list manageable and relevant.'
  },

  // ========================================================================
  // ig-141 to ig-150: "Configure management groups" (subsection: manage-subscriptions)
  // ========================================================================
  {
    id: 'ig-141',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'single-choice',
    stem: 'Your organization has 20 Azure subscriptions and needs to apply consistent Azure Policy and RBAC across multiple subscriptions. What should you implement?',
    options: [
      { id: 'a', text: 'Azure Management Groups to organize subscriptions into a hierarchy' },
      { id: 'b', text: 'Azure Blueprints applied to each subscription individually' },
      { id: 'c', text: 'Duplicate Azure Policy assignments in each subscription' },
      { id: 'd', text: 'A single mega-subscription with resource groups for each department' }
    ],
    correctOptionId: 'a',
    explanation: 'Management groups provide a governance scope above subscriptions. By organizing subscriptions into a management group hierarchy, you can apply Azure Policy and RBAC at the management group level, and these are inherited by all subscriptions beneath. This eliminates the need to duplicate policies across subscriptions. Using a single subscription or duplicating policies is not scalable.'
  },
  {
    id: 'ig-142',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'single-choice',
    stem: 'What is the maximum depth of the management group hierarchy in Azure (excluding the root management group and the subscription level)?',
    options: [
      { id: 'a', text: '3 levels' },
      { id: 'b', text: '6 levels' },
      { id: 'c', text: '10 levels' },
      { id: 'd', text: 'Unlimited levels' }
    ],
    correctOptionId: 'b',
    explanation: 'The management group hierarchy supports up to 6 levels of depth, not counting the root management group or the subscription level. So the total depth from root to subscription is 6 levels of management groups + the root level + subscription level. This provides sufficient organizational flexibility for most enterprise scenarios.'
  },
  {
    id: 'ig-143',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'single-choice',
    stem: 'You create a new management group named "IT-Department" and assign an Azure Policy at this management group level. A subscription is then moved into this management group. What happens to the subscription regarding the policy?',
    options: [
      { id: 'a', text: 'The subscription must be manually configured to inherit the policy' },
      { id: 'b', text: 'The policy is automatically inherited by the subscription and all its resources' },
      { id: 'c', text: 'The policy only applies to new resources created after the subscription was moved' },
      { id: 'd', text: 'The subscription gets a copy of the policy that can be independently modified' }
    ],
    correctOptionId: 'b',
    explanation: 'When a subscription is moved into a management group, it automatically inherits all Azure Policy assignments and RBAC role assignments from the management group. This applies to both existing and new resources within the subscription. The inheritance is automatic and does not require manual configuration. The policy is not copied; it is inherited, so changes to the management group policy affect all child subscriptions.'
  },
  {
    id: 'ig-144',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'single-choice',
    stem: 'Where are all new Azure subscriptions placed by default if management groups have been enabled?',
    options: [
      { id: 'a', text: 'They are not placed in any management group until manually assigned' },
      { id: 'b', text: 'Under the root management group (Tenant Root Group)' },
      { id: 'c', text: 'In a "Default" management group' },
      { id: 'd', text: 'Under the management group specified by the subscription creator' }
    ],
    correctOptionId: 'b',
    explanation: 'By default, all new subscriptions are placed under the root management group (Tenant Root Group) when management groups are enabled. The root management group is automatically created for each Azure AD tenant and cannot be moved or deleted. Administrators can configure a default management group for new subscriptions, but the default behavior is placement under the root group.'
  },
  {
    id: 'ig-145',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'single-choice',
    stem: 'Which Azure CLI command creates a new management group?',
    options: [
      { id: 'a', text: 'az account management-group create --name "IT" --display-name "IT Department"' },
      { id: 'b', text: 'az management-group create --name "IT" --display-name "IT Department"' },
      { id: 'c', text: 'az group create --name "IT" --type management' },
      { id: 'd', text: 'az ad management-group new --name "IT" --display-name "IT Department"' }
    ],
    correctOptionId: 'a',
    explanation: 'The correct Azure CLI command to create a management group is "az account management-group create" with --name (the ID) and --display-name (the friendly name). The management group commands are under the "az account management-group" command group. The other options use incorrect command syntax.'
  },
  {
    id: 'ig-146',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'multiple-choice',
    stem: 'Which TWO items can be directly placed inside a management group? (Choose two.)',
    options: [
      { id: 'a', text: 'Azure subscriptions' },
      { id: 'b', text: 'Resource groups' },
      { id: 'c', text: 'Other management groups' },
      { id: 'd', text: 'Individual Azure resources' },
      { id: 'e', text: 'Azure AD tenants' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'Management groups can contain two types of children: Azure subscriptions and other management groups. This allows you to build a flexible hierarchy. Resource groups and individual resources exist within subscriptions, not directly in management groups. An Azure AD tenant is the top-level container that includes the root management group, so a tenant cannot be placed inside a management group.'
  },
  {
    id: 'ig-147',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'multiple-choice',
    stem: 'Which TWO permissions are required to create a new management group in Azure? (Choose two.)',
    options: [
      { id: 'a', text: 'Microsoft.Management/managementGroups/write on the parent management group' },
      { id: 'b', text: 'Global Administrator role in Microsoft Entra ID' },
      { id: 'c', text: 'Microsoft.Management/managementGroups/write on the root management group (if no parent is specified)' },
      { id: 'd', text: 'Owner role on all subscriptions in the tenant' },
      { id: 'e', text: 'Subscription Administrator role' }
    ],
    correctOptionIds: ['a', 'c'],
    requiredSelections: 2,
    explanation: 'To create a management group, you need Microsoft.Management/managementGroups/write permission on the parent management group. If no parent is specified, the group is created under the root management group, so you need write permission there. You do not need Global Administrator, Owner on all subscriptions, or Subscription Administrator. Any user with the appropriate management group write permission can create child management groups.'
  },
  {
    id: 'ig-148',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'drag-drop',
    stem: 'Match each management group operation to the correct Azure CLI command.',
    items: [
      { id: 'item1', text: 'az account management-group create --name "mg-prod" --display-name "Production"' },
      { id: 'item2', text: 'az account management-group subscription add --name "mg-prod" --subscription "sub-id"' },
      { id: 'item3', text: 'az account management-group list' },
      { id: 'item4', text: 'az account management-group delete --name "mg-prod"' }
    ],
    targets: [
      { id: 'target1', label: 'Create a new management group', correctItemId: 'item1' },
      { id: 'target2', label: 'Add a subscription to a management group', correctItemId: 'item2' },
      { id: 'target3', label: 'List all management groups', correctItemId: 'item3' },
      { id: 'target4', label: 'Delete a management group', correctItemId: 'item4' }
    ],
    explanation: '"az account management-group create" creates a new management group. "az account management-group subscription add" moves a subscription into a management group. "az account management-group list" displays all management groups. "az account management-group delete" removes a management group (it must be empty of child management groups and subscriptions).'
  },
  {
    id: 'ig-149',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'dropdown',
    stem: 'You need to move an existing subscription into a management group using PowerShell. Complete the command.',
    segments: [
      { type: 'dropdown', id: 'dd1', options: ['New-AzManagementGroupSubscription', 'Add-AzManagementGroupSubscription', 'Set-AzManagementGroupSubscription', 'Move-AzSubscription'], correctOption: 'New-AzManagementGroupSubscription' },
      { type: 'text', text: ' -GroupId "' },
      { type: 'dropdown', id: 'dd2', options: ['mg-production', '/providers/Microsoft.Management/managementGroups/mg-production', 'management-group-id', '/subscriptions/mg-production'], correctOption: 'mg-production' },
      { type: 'text', text: '" -SubscriptionId "subscription-guid-here"' }
    ],
    explanation: 'New-AzManagementGroupSubscription is the PowerShell cmdlet to add a subscription to a management group. The -GroupId parameter takes the management group name/ID (not the full resource path). The -SubscriptionId takes the subscription GUID. This effectively moves the subscription from its current parent (root or another management group) into the specified management group.'
  },
  {
    id: 'ig-150',
    sectionId: 'identity-governance',
    subsectionId: 'manage-subscriptions',
    bulletPoint: 'Configure management groups',
    type: 'yes-no',
    scenario: 'Your organization is implementing a management group hierarchy for governance across multiple Azure subscriptions.',
    statements: [
      { id: 's1', text: 'The root management group can be moved or deleted.', correct: false },
      { id: 's2', text: 'A single subscription can exist in multiple management groups simultaneously.', correct: false },
      { id: 's3', text: 'Azure Policy assigned at a management group scope applies to all resources in all subscriptions under that management group.', correct: true }
    ],
    explanation: 'The root management group (Tenant Root Group) cannot be moved or deleted; it is a permanent part of every Azure AD tenant. A subscription can only belong to one management group at a time (though it can be moved between management groups). Azure Policy assignments at the management group level are inherited by all subscriptions underneath, and the policies apply to all resources within those subscriptions.'
  }
];
