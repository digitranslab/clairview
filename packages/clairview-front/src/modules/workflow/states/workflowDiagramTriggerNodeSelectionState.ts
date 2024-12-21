import { createState } from 'clairview-ui';

export const workflowDiagramTriggerNodeSelectionState = createState<
  string | undefined
>({
  key: 'workflowDiagramTriggerNodeSelectionState',
  defaultValue: undefined,
});
