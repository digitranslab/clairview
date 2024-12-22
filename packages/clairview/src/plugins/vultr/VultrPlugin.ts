import Vultr from './Vultr';
import type { IStorageAdapterV2 } from '~/types/cv-plugin';
import { XcStoragePlugin } from '~/types/cv-plugin';

class VultrPlugin extends XcStoragePlugin {
  private static storageAdapter: Vultr;

  public getAdapter(): IStorageAdapterV2 {
    return VultrPlugin.storageAdapter;
  }

  public async init(config: any): Promise<any> {
    VultrPlugin.storageAdapter = new Vultr(config);
    await VultrPlugin.storageAdapter.init();
  }
}

export default VultrPlugin;
