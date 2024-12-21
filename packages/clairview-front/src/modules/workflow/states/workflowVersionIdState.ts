import { createState } from 'clairview-ui';

export const workflowVersionIdState = createState<string | undefined>({
  key: 'workflowVersionIdState',
  defaultValue: undefined,
});
