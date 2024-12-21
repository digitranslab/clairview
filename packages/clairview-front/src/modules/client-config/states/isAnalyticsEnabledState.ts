import { createState } from 'clairview-ui';

export const isAnalyticsEnabledState = createState<boolean>({
  key: 'isAnalyticsEnabled',
  defaultValue: false,
});
