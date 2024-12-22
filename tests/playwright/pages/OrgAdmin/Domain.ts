import BasePage from '../Base';
import { OrgAdminPage } from './index';

export class Domain extends BasePage {
  readonly orgAdminPage: OrgAdminPage;

  constructor(orgAdminPage: OrgAdminPage) {
    super(orgAdminPage.rootPage);
    this.orgAdminPage = orgAdminPage;
  }

  get() {
    return this.rootPage.locator('[data-test-id="cv-org-domain"]');
  }

  async addDomain(domainName: string) {
    await this.get().locator('[data-test-id="cv-org-domain-add"]').click();
    await this.rootPage.locator('[data-test-id="cv-org-domain-name"]').fill(domainName);

    await this.waitForResponse({
      uiAction: () => this.rootPage.locator('[data-test-id="cv-org-domain-submit"]').click(),
      httpMethodsToMatch: ['PATCH', 'POST'],
      requestUrlPathToMatch: /api\/v2\/domains\/\w+/,
    });
  }

  async openOptionMenu(domainName: string) {
    await this.rootPage
      .locator(`[data-test-id="cv-domain-${domainName}"]`)
      .locator('[data-test-id="cv-domain-more-option"]')
      .click();
  }

  async verifyDomain(domainName: string) {
    await this.openOptionMenu(domainName);
    await this.waitForResponse({
      uiAction: () => this.rootPage.locator('[data-test-id="cv-domain-verify"]').click(),
      httpMethodsToMatch: ['POST'],
      requestUrlPathToMatch: `/api/v2/org-domain/${domainName}`,
    });
  }

  async deleteDomain(domainName: string) {
    await this.openOptionMenu(domainName);
    await this.waitForResponse({
      uiAction: () => this.rootPage.locator('[data-test-id="cv-domain-delete"]').click(),
      httpMethodsToMatch: ['DELETE'],
      requestUrlPathToMatch: `/api/v2/org-domain/${domainName}`,
    });
  }
}
