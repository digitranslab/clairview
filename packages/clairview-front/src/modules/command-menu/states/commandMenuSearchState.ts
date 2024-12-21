import { createState } from 'clairview-ui';

export const commandMenuSearchState = createState<string>({
  key: 'command-menu/commandMenuSearchState',
  defaultValue: '',
});
