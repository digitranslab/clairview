import { createState } from 'clairview-ui';
import { RefObject } from 'react';

export const workflowReactFlowRefState =
  createState<RefObject<HTMLDivElement> | null>({
    key: 'workflowReactFlowRefState',
    defaultValue: null,
  });
