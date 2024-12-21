import { createState } from 'clairview-ui';

export const isNewViewableRecordLoadingState = createState<boolean>({
  key: 'activities/is-new-viewable-record-loading',
  defaultValue: false,
});
