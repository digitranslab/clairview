import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClairviewORMOptions {}

export type ClairviewORMModuleAsyncOptions = {
  useFactory: (...args: any[]) => ClairviewORMOptions | Promise<ClairviewORMOptions>;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;
