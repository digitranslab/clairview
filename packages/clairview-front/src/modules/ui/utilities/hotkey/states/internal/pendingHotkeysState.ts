import { Keys } from 'react-hotkeys-hook/dist/types';
import { createState } from 'clairview-ui';

export const pendingHotkeyState = createState<Keys | null>({
  key: 'pendingHotkeyState',
  defaultValue: null,
});
