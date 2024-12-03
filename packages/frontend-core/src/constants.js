/**
 * Operator options for lucene queries
 */
export {
  OperatorOptions,
  SqlNumberTypeRangeMap,
  DEFAULT_BB_DATASOURCE_ID,
} from "@clairview/shared-core"
export { Feature as Features } from "@clairview/types"
import { BpmCorrelationKey } from "@clairview/shared-core"
import { FieldType, BBReferenceFieldSubType } from "@clairview/types"

export const BannedSearchTypes = [
  FieldType.LINK,
  FieldType.ATTACHMENT_SINGLE,
  FieldType.ATTACHMENTS,
  FieldType.FORMULA,
  FieldType.JSON,
  FieldType.ATTACHMENT_SINGLE,
  FieldType.SIGNATURE_SINGLE,
  "jsonarray",
  "queryarray",
]

// Cookie names
export const Cookies = {
  Auth: "clairview:auth",
  CurrentApp: "clairview:currentapp",
  ReturnUrl: "clairview:returnurl",
  AccountReturnUrl: "clairview:account:returnurl",
  OnboardingProcessCorrelationKey: BpmCorrelationKey.ONBOARDING,
}

// Table names
export const TableNames = {
  USERS: "ta_users",
}

export const ClairviewRoles = {
  AppUser: "appUser",
  Developer: "developer",
  Creator: "creator",
  Admin: "admin",
  Owner: "owner",
}

export const ClairviewRoleOptionsOld = [
  {
    label: "Developer",
    value: ClairviewRoles.Developer,
  },
]
export const ClairviewRoleOptions = [
  {
    label: "Account admin",
    value: ClairviewRoles.Admin,
    subtitle: "Has full access to all apps and settings in your account",
    sortOrder: 1,
  },
  {
    label: "Creator",
    value: ClairviewRoles.Creator,
    subtitle: "Can create and edit apps they have access to",
    sortOrder: 2,
  },
  {
    label: "App user",
    value: ClairviewRoles.AppUser,
    subtitle: "Can only use published apps they have access to",
    sortOrder: 3,
  },
]
export const ExtendedClairviewRoleOptions = [
  {
    label: "Account holder",
    value: ClairviewRoles.Owner,
    sortOrder: 0,
  },
]
  .concat(ClairviewRoleOptions)
  .concat(ClairviewRoleOptionsOld)

export const PlanType = {
  FREE: "free",
  TEAM: "team",
  PRO: "pro",
  BUSINESS: "business",
  PREMIUM: "premium",
  ENTERPRISE: "enterprise",
  ENTERPRISE_BASIC_TRIAL: "enterprise_basic_trial",
}

/**
 * API version header attached to all requests.
 * Version changelog:
 * v1:
 *   - Coerce types for search endpoint
 */
export const ApiVersion = "1"

// Role IDs
export const Roles = {
  ADMIN: "ADMIN",
  POWER: "POWER",
  BASIC: "BASIC",
  PUBLIC: "PUBLIC",
  BUILDER: "BUILDER",
  CREATOR: "CREATOR",
}

export const EventPublishType = {
  ENV_VAR_UPGRADE_PANEL_OPENED: "environment_variable_upgrade_panel_opened",
}

export const ContextScopes = {
  Local: "local",
  Global: "global",
}

export const TypeIconMap = {
  [FieldType.STRING]: "Text",
  [FieldType.OPTIONS]: "Dropdown",
  [FieldType.DATETIME]: "Calendar",
  [FieldType.BARCODEQR]: "Camera",
  [FieldType.SIGNATURE_SINGLE]: "AnnotatePen",
  [FieldType.LONGFORM]: "TextAlignLeft",
  [FieldType.ARRAY]: "Duplicate",
  [FieldType.NUMBER]: "123",
  [FieldType.BOOLEAN]: "Boolean",
  [FieldType.ATTACHMENTS]: "DocumentFragmentGroup",
  [FieldType.ATTACHMENT_SINGLE]: "DocumentFragment",
  [FieldType.LINK]: "DataCorrelated",
  [FieldType.FORMULA]: "Calculator",
  [FieldType.AI]: "MagicWand",
  [FieldType.JSON]: "Brackets",
  [FieldType.BIGINT]: "TagBold",
  [FieldType.AUTO]: "Shapes",
  [FieldType.BB_REFERENCE]: {
    [BBReferenceFieldSubType.USER]: "UserGroup",
    [BBReferenceFieldSubType.USERS]: "UserGroup",
  },
  [FieldType.BB_REFERENCE_SINGLE]: {
    [BBReferenceFieldSubType.USER]: "User",
  },
}

export const OptionColours = [...new Array(12).keys()].map(idx => {
  return `hsla(${((idx + 1) * 222) % 360}, 90%, 75%, 0.3)`
})

export const FilterOperator = {
  ANY: "any",
  ALL: "all",
}

export const OnEmptyFilter = {
  RETURN_ALL: "all",
  RETURN_NONE: "none",
}

export const FilterValueType = {
  BINDING: "Binding",
  VALUE: "Value",
}

export const FieldPermissions = {
  WRITABLE: "writable",
  READONLY: "readonly",
  HIDDEN: "hidden",
}
