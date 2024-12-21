import { ConfigurableModuleBuilder } from '@nestjs/common';

import { ClairviewORMOptions } from './interfaces/clairview-orm-options.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ClairviewORMOptions>().build();
