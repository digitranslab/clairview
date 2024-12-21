import IconClairviewStarFilledRaw from '@ui/display/icon/assets/clairview-star-filled.svg?react';
import { IconComponentProps } from '@ui/display/icon/types/IconComponent';
import { THEME_COMMON } from '@ui/theme';

type IconClairviewStarFilledProps = Pick<IconComponentProps, 'size' | 'stroke'>;

const iconStrokeMd = THEME_COMMON.icon.stroke.md;

export const IconClairviewStarFilled = (props: IconClairviewStarFilledProps) => {
  const size = props.size ?? 24;
  const stroke = props.stroke ?? iconStrokeMd;

  return (
    <IconClairviewStarFilledRaw height={size} width={size} strokeWidth={stroke} />
  );
};
