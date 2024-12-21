import { WorkflowDiagram } from '@/workflow/types/WorkflowDiagram';
import { createState } from 'clairview-ui';

export const workflowDiagramState = createState<WorkflowDiagram | undefined>({
  key: 'workflowDiagramState',
  defaultValue: undefined,
});
