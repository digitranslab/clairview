import { createState } from 'clairview-ui';

export const emailThreadIdWhenEmailThreadWasClosedState = createState<
  string | null
>({
  key: 'emailThreadIdWhenEmailThreadWasClosedState',
  defaultValue: null,
});
