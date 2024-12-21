import { createState } from 'clairview-ui';

import { MessageThread } from '@/activities/emails/types/MessageThread';

export const messageThreadState = createState<MessageThread | null>({
  key: 'messageThreadState',
  defaultValue: null,
});
