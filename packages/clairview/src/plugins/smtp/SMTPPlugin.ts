import SMTP from './SMTP';
import type { IEmailAdapter } from '~/types/cv-plugin';
import { XcEmailPlugin } from '~/types/cv-plugin';

class SMTPPlugin extends XcEmailPlugin {
  private static storageAdapter: SMTP;

  public getAdapter(): IEmailAdapter {
    return SMTPPlugin.storageAdapter;
  }

  public async init(config: any): Promise<any> {
    SMTPPlugin.storageAdapter = new SMTP(config);
    await SMTPPlugin.storageAdapter.init();
  }
}

export default SMTPPlugin;
