import { createState } from 'clairview-ui';

import { ActivityTargetableObject } from '../types/ActivityTargetableEntity';

export const activityTargetableEntityArrayState = createState<
  ActivityTargetableObject[]
>({
  key: 'activities/targetable-entity-array',
  defaultValue: [],
});
