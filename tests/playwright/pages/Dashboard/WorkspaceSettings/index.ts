import BasePage from '../../Base';
import { DashboardPage } from '..';

export class WorkspaceSettingsObject extends BasePage {
  readonly dashboard: DashboardPage;

  constructor(parent: DashboardPage) {
    super(parent.rootPage);

    this.dashboard = parent;
  }

  get() {
    return this.dashboard.get().locator(`.cv-workspace-settings`);
  }

  async open() {
    await this.dashboard.leftSidebar.clickTeamAndSettings();
  }

  async clickSettingsTab() {
    await this.get().getByTestId('cv-workspace-settings-tab-settings').click();
  }

  async renameWorkspace({ newTitle }: { newTitle: string }) {
    await this.clickSettingsTab();
    await this.get().getByTestId('cv-workspace-settings-settings-rename-input').fill(newTitle);
    const submitAction = () => this.rootPage.keyboard.press('Enter');

    await this.waitForResponse({
      uiAction: submitAction,
      httpMethodsToMatch: ['PATCH'],
      requestUrlPathToMatch: `/api/v1/workspaces/`,
    });
  }
}
