import { createState } from 'clairview-ui';

export const workflowIdState = createState<string | undefined>({
  key: 'workflowIdState',
  defaultValue: undefined,
});
