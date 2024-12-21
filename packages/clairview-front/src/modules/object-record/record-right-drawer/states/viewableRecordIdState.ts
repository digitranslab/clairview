import { createState } from 'clairview-ui';

export const viewableRecordIdState = createState<string | null>({
  key: 'activities/viewable-record-id',
  defaultValue: null,
});
