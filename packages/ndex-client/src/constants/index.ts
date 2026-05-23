/**
 * NDEx Client Constants
 * 
 * Centralized definition of all string literal constants used throughout the NDEx client library.
 * Using the const + type pattern for better developer experience with autocomplete and type safety.
 */

// ============================================================================
// Authentication Constants
// ============================================================================

/**
 * Authentication types supported by NDEx client
 */
export const AuthType = {
  BASIC: 'basic',
  OAUTH: 'oauth',
} as const;

export type AuthType = (typeof AuthType)[keyof typeof AuthType];

// ============================================================================
// Network Access Constants
// ============================================================================

/**
 * Visibility settings for networks, folders, and shortcuts.
 * Based on YouTube's permission model.
 * 
 * ## Visibility Type Definitions:
 * 
 * **PUBLIC**
 * - Accessibility: Anyone can discover and view the content
 * - Searchability: Appears in search results and can be found through search engines  
 * - Sharing: Can be shared freely with anyone
 * - Visibility: Shows up on the owner's public profile
 * 
 * **PRIVATE**
 * - Accessibility: Only the owner and specifically invited users can view the content
 * - Searchability: Does not appear in any search results (internal or external)
 * - Sharing: Even with a direct link, uninvited users cannot access the content
 * - Visibility: Does not appear on the owner's public profile
 * 
 * **UNLISTED**
 * - Accessibility: Anyone with the direct link can view the content
 * - Searchability: Does not appear in search results unless added to a public collection
 * - Sharing: Can be shared via direct link without requiring special permissions
 * - Visibility: Does not appear on the owner's public profile
 * 
 * @example
 * ```typescript
 * const network: NetworkSummaryV3 = {
 *   externalId: "12345",
 *   name: "Sample Network",
 *   visibility: Visibility.UNLISTED // Only accessible via direct link
 * };
 * ```
 */
export const Visibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  UNLISTED: 'UNLISTED',
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

/**
 * Permission levels for network and folder access control.
 * 
 * ## Permission Level Definitions:
 * 
 * **READ**
 * - View the network/folder content
 * - Download network data
 * - Access network metadata and summary information
 * 
 * **WRITE** 
 * - All READ permissions
 * - Modify network content and metadata
 * - Update network properties and attributes
 * 
 * **ADMIN**
 * - All WRITE permissions  
 * - Delete networks/folders
 * - Manage permissions for other users
 * - Transfer ownership
 * 
 * @example
 * ```typescript
 * const permission: NetworkPermission = {
 *   uuid: "permission-uuid",
 *   permission: Permission.WRITE,
 *   memberUUID: "user-uuid",
 *   resourceUUID: "network-uuid"
 * };
 * ```
 */
export const Permission = {
  READ: 'READ',
  WRITE: 'WRITE',
  ADMIN: 'ADMIN',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

// ============================================================================
// NDEx Object Type Constants
// ============================================================================

/**
 * File types for NDEx objects
 */
export const NDExFileType = {
  NETWORK: 'NETWORK',
  FOLDER: 'FOLDER',
  SHORTCUT: 'SHORTCUT',
} as const;

export type NDExFileType = (typeof NDExFileType)[keyof typeof NDExFileType];

// ============================================================================
// Visual Property Constants
// ============================================================================

/**
 * Visual Property Mapping Types for CX2 networks
 */
export const VPMappingType = {
  DISCRETE: 'DISCRETE',
  CONTINUOUS: 'CONTINUOUS',
  PASSTHROUGH: 'PASSTHROUGH',
} as const;

export type VPMappingType = (typeof VPMappingType)[keyof typeof VPMappingType];

// ============================================================================
// CX Data Type Constants
// ============================================================================

/**
 * CX data types for network properties and attributes
 */
export const CXDataType = {
  STRING: 'string',
  LONG: 'long',
  INTEGER: 'integer',
  DOUBLE: 'double',
  BOOLEAN: 'boolean',
  LIST_OF_STRING: 'list_of_string',
  LIST_OF_LONG: 'list_of_long',
  LIST_OF_INTEGER: 'list_of_integer',
  LIST_OF_DOUBLE: 'list_of_double',
  LIST_OF_BOOLEAN: 'list_of_boolean',
} as const;

export type CXDataType = (typeof CXDataType)[keyof typeof CXDataType];