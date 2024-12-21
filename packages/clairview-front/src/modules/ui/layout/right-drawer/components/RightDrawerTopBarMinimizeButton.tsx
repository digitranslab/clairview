import { IconMinus, LightIconButton } from 'clairview-ui';

import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';

export const RightDrawerTopBarMinimizeButton = () => {
  const { isRightDrawerMinimized, minimizeRightDrawer, maximizeRightDrawer } =
    useRightDrawer();

  const handleButtonClick = () => {
    isRightDrawerMinimized ? maximizeRightDrawer() : minimizeRightDrawer();
  };

  return (
    <LightIconButton
      Icon={IconMinus}
      onClick={handleButtonClick}
      size="medium"
      accent="tertiary"
    />
  );
};
