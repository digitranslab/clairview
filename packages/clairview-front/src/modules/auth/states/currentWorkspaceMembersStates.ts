import { CurrentWorkspaceMember } from '@/auth/states/currentWorkspaceMemberState';
import { createState } from 'clairview-ui';

export const currentWorkspaceMembersState = createState<
  CurrentWorkspaceMember[]
>({
  key: 'currentWorkspaceMembersState',
  defaultValue: [],
});
