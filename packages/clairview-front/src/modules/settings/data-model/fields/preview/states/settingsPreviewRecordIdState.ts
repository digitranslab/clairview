import { createState } from 'clairview-ui';

export const settingsPreviewRecordIdState = createState<string | null>({
  key: 'settingsPreviewRecordIdState',
  defaultValue: null,
});
