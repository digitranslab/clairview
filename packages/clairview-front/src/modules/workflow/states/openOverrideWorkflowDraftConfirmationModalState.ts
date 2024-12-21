import { createState } from 'clairview-ui';

export const openOverrideWorkflowDraftConfirmationModalState =
  createState<boolean>({
    key: 'openOverrideWorkflowDraftConfirmationModalState',
    defaultValue: false,
  });
