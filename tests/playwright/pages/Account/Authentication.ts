import BasePage from '../Base';
import { AccountPage } from './index';
import * as assert from 'assert';
import { expect } from '@playwright/test';

export class AccountAuthenticationPage extends BasePage {
  private accountPage: AccountPage;

  constructor(accountPage: AccountPage) {
    super(accountPage.rootPage);
    this.accountPage = accountPage;
  }

  async goto() {
    await this.waitForResponse({
      uiAction: () => this.rootPage.goto('/#/account/authentication', { waitUntil: 'networkidle' }),
      httpMethodsToMatch: ['GET'],
      requestUrlPathToMatch: /\/sso-client/,
    });
  }

  get() {
    return this.accountPage.get().locator(`[data-test-id="cv-authentication"]`);
  }

  async verifySAMLProviderCount({ count }: { count: number }) {
    await expect.poll(async () => await this.get().locator('.cv-saml-provider').count()).toBe(count);
  }

  async verifyOIDCProviderCount({ count }: { count: number }) {
    await expect.poll(async () => await this.get().locator('.cv-oidc-provider').count()).toBe(count);
  }

  async getProvider(provider: 'saml' | 'oidc', title: string) {
    return this.rootPage.locator(`[data-test-id="cv-${provider}-provider-${title}"]`);
  }

  async deleteProvider(provider: 'saml' | 'oidc' | 'google', title: string) {
    await this.rootPage
      .locator(provider === 'google' ? '.cv-google-more-option' : `.cv-${provider}-${title}-more-option`)
      .click();
    await this.waitForResponse({
      uiAction: () => this.rootPage.locator(`[data-test-id="cv-${provider}-delete"]`).click(),
      httpMethodsToMatch: ['DELETE'],
      requestUrlPathToMatch: /\/sso-client/,
    });
  }

  async toggleProvider(provider: 'saml' | 'oidc' | 'google', title: string) {
    await this.waitForResponse({
      uiAction: () => this.get().locator(`.cv-${provider}-${title}-enable .cv-switch`).click(),
      httpMethodsToMatch: ['PATCH'],
      requestUrlPathToMatch: /\/\w+\/sso-client/,
    });
  }

  async selectScope({ type, locator }: { type: string[] }) {
    await this.rootPage.locator('.ant-select-selector').click();

    await this.rootPage.locator('.ant-select-selection-search-input[aria-expanded="true"]').waitFor();
    for (const t of type) {
      await this.rootPage.locator('.rc-virtual-list-holder-inner > div').locator(`text="${t}"`).click();
    }
  }

  async createSAMLProvider(
    p: { title: string; url?: string; xml?: string },
    setupRedirectUrlCbk?: ({ redirectUrl: string, audience: string }) => Promise<void>
  ) {
    const newSamlBtn = this.get().locator('[data-test-id="cv-new-saml-provider"]');

    await newSamlBtn.click();

    const samlModal = this.accountPage.rootPage.locator('.cv-saml-modal');

    // wait until redirect url is generated
    await samlModal.locator('[data-test-id="cv-saml-redirect-url"]:has-text("http://")').waitFor();

    if (setupRedirectUrlCbk) {
      const redirectUrl = (
        await samlModal.locator('[data-test-id="cv-saml-redirect-url"]:has-text("http://")').textContent()
      ).trim();
      const audience = (
        await samlModal.locator('[data-test-id="cv-saml-issuer-url"]:has-text("http://")').textContent()
      ).trim();
      await setupRedirectUrlCbk({ redirectUrl, audience });
    }

    await samlModal.locator('[data-test-id="cv-saml-title"]').fill(p.title);
    if (p.url) {
      await samlModal.locator('[data-test-id="cv-saml-metadata-url"]').fill(p.url);
    }
    if (p.xml) {
      await samlModal.locator('[data-test-id="cv-saml-xml"]').fill(p.xml);
    }

    await this.waitForResponse({
      uiAction: () => samlModal.locator('[data-test-id="cv-saml-submit"]').click(),
      httpMethodsToMatch: ['GET'],
      requestUrlPathToMatch: /\/sso-client/,
    });
  }

  async createOIDCProvider(
    p: {
      issuer: string;
      title: string;
      clientId: string;
      clientSecret: string;
      authUrl: string;
      userInfoUrl: string;
      tokenUrl: string;
      jwkUrl: string;
      scopes: Array<string>;
      userAttributes: string;
    },
    setupRedirectUrlCbk?: ({ redirectUrl: string }) => Promise<void>
  ) {
    const newOIDCBtn = this.get().locator('[data-test-id="cv-new-oidc-provider"]');

    await newOIDCBtn.click();

    const oidcModal = this.accountPage.rootPage.locator('.cv-oidc-modal');

    // wait until redirect url is generated
    await oidcModal.locator('[data-test-id="cv-openid-redirect-url"]:has-text("http://")').waitFor();

    if (setupRedirectUrlCbk) {
      const redirectUrl = (
        await oidcModal.locator('[data-test-id="cv-openid-redirect-url"]:has-text("http://")').textContent()
      ).trim();
      await setupRedirectUrlCbk({ redirectUrl });
    }

    await oidcModal.locator('[data-test-id="cv-oidc-title"]').fill(p.title);

    await oidcModal.locator('[data-test-id="cv-oidc-issuer"]').fill(p.issuer);

    await oidcModal.locator('[data-test-id="cv-oidc-client-id"]').fill(p.clientId);

    await oidcModal.locator('[data-test-id="cv-oidc-client-secret"]').fill(p.clientSecret);

    await oidcModal.locator('[data-test-id="cv-oidc-auth-url"]').fill(p.authUrl);

    await oidcModal.locator('[data-test-id="cv-oidc-token-url"]').fill(p.tokenUrl);

    await oidcModal.locator('[data-test-id="cv-oidc-user-info-url"]').fill(p.userInfoUrl);

    await oidcModal.locator('[data-test-id="cv-oidc-jwk-url"]').fill(p.jwkUrl);

    await this.selectScope({
      type: p.scopes,
      locator: oidcModal.locator('[data-test-id="cv-oidc-scope"]'),
    });

    await oidcModal.locator('[data-test-id="cv-oidc-user-attribute"]').fill(p.userAttributes);

    await this.waitForResponse({
      uiAction: () => oidcModal.locator('[data-test-id="cv-oidc-save-btn"]').click(),
      httpMethodsToMatch: ['GET'],
      requestUrlPathToMatch: /\/sso-client/,
    });
  }

  async createGoogleProvider(p: { clientId: string; clientSecret: string }) {
    await this.rootPage.locator(`.cv-google-more-option`).click();
    await this.rootPage.locator(`[data-test-id="cv-google-edit"]`).click();

    const googleModal = this.accountPage.rootPage.locator('.cv-google-modal');
    // wait until redirect url is generated
    await googleModal.locator('[data-test-id="cv-google-redirect-url"]:has-text("http://")').waitFor();

    await googleModal.locator('[data-test-id="cv-google-client-id"]').fill(p.clientId);

    await googleModal.locator('[data-test-id="cv-google-client-secret"]').fill(p.clientSecret);

    await this.waitForResponse({
      uiAction: () => googleModal.locator('[data-test-id="cv-google-save-btn"]').click(),
      httpMethodsToMatch: ['GET'],
      requestUrlPathToMatch: /\/sso-client/,
    });
  }

  async verifyGoogleProviderCount(param: { count: number }) {}
}
