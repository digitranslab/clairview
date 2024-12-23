import BasePage from '../../Base';
import { CalendarPage } from './index';

export class CalendarYearPage extends BasePage {
  readonly parent: CalendarPage;

  constructor(parent: CalendarPage) {
    super(parent.rootPage);
    this.parent = parent;
  }

  get() {
    return this.rootPage.getByTestId('cv-calendar-year-view');
  }

  getMonth({ index }: { index: number }) {
    return this.get().getByTestId('cv-calendar-year-view-month-selector').nth(index);
  }

  async selectDate({ monthIndex, dayIndex }: { monthIndex: number; dayIndex: number }) {
    const month = this.getMonth({ index: monthIndex });
    const day = month.getByTestId('cv-calendar-date').nth(dayIndex);
    await day.click({ force: true });
  }
}
