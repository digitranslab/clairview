import BasePage from '../Base';
import { WorkspacePage } from './';
import { Locator } from '@playwright/test';

/*
  cv-workspace-settings
    cv-collaborator-table-container
 */

export class CollaborationPage extends BasePage {
  readonly workspace: WorkspacePage;
  readonly list_collaborators: Locator;

  constructor(workspace: WorkspacePage) {
    super(workspace.rootPage);
    this.workspace = workspace;
    this.list_collaborators = this.get().locator('.cv-collaborators-list-table');
  }

  get() {
    return this.workspace.get().locator('.cv-workspace-settings').locator('.cv-collaborator-table-container');
  }

  async waitFor({ state }) {
    await this.get().waitFor({ state });
  }

  async addUsers(email: string, role: string) {
    await this.waitFor({ state: 'visible' });

    // click add user button to open modal
    await this.get().getByTestId('cv-add-member-btn').click();

    const inviteModal = this.rootPage.locator('.cv-invite-dlg');

    await inviteModal.waitFor({ state: 'visible' });

    const input_email = inviteModal.locator('input[id="email"]');
    const selector_role = inviteModal.locator('.ant-select-selector');
    const button_addUser = inviteModal.locator('.cv-invite-btn');

    // flaky test: wait for the input to be ready
    await this.rootPage.waitForTimeout(500);

    // email
    await input_email.fill(email + ' ');

    // role
    await selector_role.first().click();
    const menu = this.rootPage.locator('.cv-role-selector-dropdown:visible');
    await menu.locator(`.cv-role-select-workspace-level-${role.toLowerCase()}:visible`).first().click();

    // submit

    // allow button to be enabled
    await this.rootPage.waitForTimeout(500);

    await button_addUser.click();
    await this.verifyToast({ message: 'Invitation sent successfully' });
    await this.rootPage.waitForTimeout(500);
  }

  async getCollaboratorsCount() {
    await this.waitFor({ state: 'visible' });
    const collaborators = await this.list_collaborators.locator('tr.ant-table-row').count();
    return collaborators;
  }

  async getCollaborator({ index }: { index: number }) {
    await this.waitFor({ state: 'visible' });
    const email = await this.list_collaborators
      .locator('tr.ant-table-row')
      .nth(index)
      .locator('td.ant-table-cell')
      .nth(0)
      .innerText();
    const role = await this.list_collaborators
      .locator('tr.ant-table-row')
      .nth(index)
      .locator('td.ant-table-cell')
      .nth(1)
      .innerText();
    return { email, role };
  }

  async removeCollaborator({ index }: { index: number }) {
    await this.waitFor({ state: 'visible' });
    await this.list_collaborators
      .locator('tr.ant-table-row')
      .nth(index)
      .locator('td.ant-table-cell')
      .nth(2)
      .locator('button')
      .click();
  }
}
