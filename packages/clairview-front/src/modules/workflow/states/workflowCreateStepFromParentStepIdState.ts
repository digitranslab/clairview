import { createState } from 'clairview-ui';

export const workflowCreateStepFromParentStepIdState = createState<
  string | undefined
>({
  key: 'workflowCreateStepFromParentStepId',
  defaultValue: undefined,
});
