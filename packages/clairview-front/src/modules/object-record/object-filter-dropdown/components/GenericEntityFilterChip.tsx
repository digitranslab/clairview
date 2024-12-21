import { AvatarChip, IconComponent } from 'clairview-ui';

import { Filter } from '../types/Filter';

type GenericEntityFilterChipProps = {
  filter: Filter;
  Icon?: IconComponent;
};

export const GenericEntityFilterChip = ({
  filter,
  Icon,
}: GenericEntityFilterChipProps) => (
  <AvatarChip
    placeholderColorSeed={filter.value}
    name={filter.displayValue}
    avatarType="rounded"
    avatarUrl={filter.displayAvatarUrl}
    LeftIcon={Icon}
  />
);
