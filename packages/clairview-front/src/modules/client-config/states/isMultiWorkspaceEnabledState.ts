import { createState } from 'clairview-ui';

export const isMultiWorkspaceEnabledState = createState<boolean>({
  key: 'isMultiWorkspaceEnabled',
  defaultValue: false,
});
