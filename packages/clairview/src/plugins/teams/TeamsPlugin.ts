import Teams from './Teams';
import type { IWebhookNotificationAdapter } from '~/types/cv-plugin';
import { XcWebhookNotificationPlugin } from '~/types/cv-plugin';

class TeamsPlugin extends XcWebhookNotificationPlugin {
  private static notificationAdapter: Teams;

  public getAdapter(): IWebhookNotificationAdapter {
    return TeamsPlugin.notificationAdapter;
  }

  public async init(_config: any): Promise<any> {
    TeamsPlugin.notificationAdapter = new Teams();
    await TeamsPlugin.notificationAdapter.init();
  }
}

export default TeamsPlugin;
