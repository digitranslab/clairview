import { createState } from 'clairview-ui';

export const workflowSelectedNodeState = createState<string | undefined>({
  key: 'workflowSelectedNodeState',
  defaultValue: undefined,
});
