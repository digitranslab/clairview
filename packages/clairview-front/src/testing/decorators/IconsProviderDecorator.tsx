import { Decorator } from '@storybook/react';
import { IconsProvider } from 'clairview-ui';

export const IconsProviderDecorator: Decorator = (Story) => {
  return (
    <IconsProvider>
      <Story />
    </IconsProvider>
  );
};
