import { expect } from '@playwright/test';
import BasePage from '../../Base';

export abstract class ErdBasePage extends BasePage {
  vueFlow() {
    return this.get().locator('.vue-flow__viewport');
  }

  async clickShowColumnNames() {
    await this.get().locator(`.cv-erd-showColumns-checkbox`).click();
    await (await this.vueFlow().elementHandle())?.waitForElementState('stable');
  }

  async dbClickShowColumnNames() {
    await this.get().locator(`.cv-erd-showColumns-label`).dblclick();
    await (await this.vueFlow().elementHandle())?.waitForElementState('stable');
  }

  async clickShowPkAndFk() {
    await this.get().locator(`.cv-erd-showPkAndFk-checkbox`).click();
    await (await this.vueFlow().elementHandle())?.waitForElementState('stable');
  }

  async clickShowSqlViews() {
    await this.get().locator(`.cv-erd-showViews-checkbox`).click();
    await (await this.vueFlow().elementHandle())?.waitForElementState('stable');
  }

  async clickShowMMTables() {
    await this.get().locator(`.cv-erd-showMMTables-checkbox`).click();
    await (await this.vueFlow().elementHandle())?.waitForElementState('stable');
  }

  async clickShowJunctionTableNames() {
    await this.get().locator(`.cv-erd-showJunctionTableNames-checkbox`).click();
    await (await this.vueFlow().elementHandle())?.waitForElementState('stable');
  }

  async verifyEasterEggNotShown() {
    await expect(this.get().locator('.cv-erd-showMMTables-checkbox')).not.toBeVisible();
  }

  async verifyNode({
    tableName,
    columnName,
    columnNameShouldNotExist,
  }: {
    tableName: string;
    columnName?: string;
    columnNameShouldNotExist?: string;
  }) {
    await this.get().locator(`.cv-erd-table-node-${tableName}`).waitFor({ state: 'visible' });
    if (columnName) {
      await this.get().locator(`.cv-erd-table-node-${tableName}-column-${columnName}`).waitFor({ state: 'visible' });
    }
    if (columnNameShouldNotExist) {
      await this.get()
        .locator(`.cv-erd-table-node-${tableName}-column-${columnNameShouldNotExist}`)
        .waitFor({ state: 'hidden' });
    }
  }

  async verifyNodeDoesNotExist({ tableName }: { tableName: string }) {
    await this.get().locator(`.cv-erd-table-node-${tableName}`).waitFor({ state: 'hidden' });
  }

  async verifyColumns({ tableName, columns }: { tableName: string; columns: string[] }) {
    for (const column of columns) {
      await this.verifyNode({ tableName, columnName: column });
    }
  }

  async verifyNodesCount(count: number) {
    await expect(this.get().locator('.cv-erd-table-node')).toHaveCount(count);
  }

  async verifyEdgesCount({
    count,
    circleCount,
    rectangleCount,
  }: {
    count: number;
    circleCount: number;
    rectangleCount: number;
  }) {
    await expect(this.get().locator('.vue-flow__edge')).toHaveCount(count);
    await expect(this.get().locator('.cv-erd-edge-circle')).toHaveCount(circleCount);
    await expect(this.get().locator('.cv-erd-edge-rect')).toHaveCount(rectangleCount);
  }

  async verifyJunctionTableLabel({ tableTitle, tableName }: { tableName: string; tableTitle: string }) {
    await this.vueFlow().locator(`.cv-erd-table-label-${tableTitle}-${tableName}`).waitFor({
      state: 'visible',
    });
  }
}
