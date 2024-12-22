import Backblaze from './Backblaze';
import type { IStorageAdapterV2 } from '~/types/cv-plugin';
import { XcStoragePlugin } from '~/types/cv-plugin';

class BackblazePlugin extends XcStoragePlugin {
  private static storageAdapter: Backblaze;

  public getAdapter(): IStorageAdapterV2 {
    return BackblazePlugin.storageAdapter;
  }

  public async init(config: any): Promise<any> {
    BackblazePlugin.storageAdapter = new Backblaze(config);
    await BackblazePlugin.storageAdapter.init();
  }
}

export default BackblazePlugin;
