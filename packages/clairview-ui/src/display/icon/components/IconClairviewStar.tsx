import { useTheme } from '@emotion/react';

import IconClairviewStarRaw from '@ui/display/icon/assets/clairview-star.svg?react';
import { IconComponentProps } from '@ui/display/icon/types/IconComponent';

type IconClairviewStarProps = Pick<IconComponentProps, 'size' | 'stroke'>;

export const IconClairviewStar = (props: IconClairviewStarProps) => {
  const theme = useTheme();
  const size = props.size ?? 24;
  const stroke = props.stroke ?? theme.icon.stroke.md;

  return <IconClairviewStarRaw height={size} width={size} strokeWidth={stroke} />;
};
