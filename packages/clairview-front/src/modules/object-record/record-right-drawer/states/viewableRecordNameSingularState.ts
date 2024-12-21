import { createState } from 'clairview-ui';

export const viewableRecordNameSingularState = createState<string | null>({
  key: 'activities/viewable-record-name-singular',
  defaultValue: null,
});
