import { createState } from 'clairview-ui';

export const isAppWaitingForFreshObjectMetadataState = createState<boolean>({
  key: 'isAppWaitingForFreshObjectMetadataState',
  defaultValue: false,
});
