import { IconComponent, Tag, ThemeColor } from 'clairview-ui';

type SelectDisplayProps = {
  color: ThemeColor | 'transparent';
  label: string;
  Icon?: IconComponent;
};

export const SelectDisplay = ({ color, label, Icon }: SelectDisplayProps) => {
  return <Tag preventShrink color={color} text={label} Icon={Icon} />;
};
