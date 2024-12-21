import { createState } from 'clairview-ui';

export const lastShowPageRecordIdState = createState<string | null>({
  key: 'lastShowPageRecordIdState',
  defaultValue: null,
});
