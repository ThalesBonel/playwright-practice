import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(nummberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToExpect = await this.selectDateInTheCalendar(nummberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToExpect);
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToExpectStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToExpectEnd = await this.selectDateInTheCalendar(endDayFromToday)

        
        const dateToExpect = `${dateToExpectStart} - ${dateToExpectEnd}`
        await expect(calendarInputField).toHaveValue(dateToExpect);
    }



    private async selectDateInTheCalendar(nummberOfDaysFromToday: number) {
        let date = new Date();
          date.setDate(date.getDate() + nummberOfDaysFromToday);
          const expectedDate = date.getDate().toString();
          const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
          const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
          const expectedYear = date.getFullYear();
          const dateToExpect = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
          const expectedCalendarMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
        
          let calendarMonthAndYear = await this.page
            .locator("nb-calendar-view-mode")
            .textContent();
        
          while (!calendarMonthAndYear.includes(expectedCalendarMonthAndYear)) {
            await this.page
              .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
              .click();
            calendarMonthAndYear = await this.page
              .locator("nb-calendar-view-mode")
              .textContent();
          }
        
          await this.page
            .locator('.day-cell.ng-star-inserted:not(.bounding-month)')
            .getByText(expectedDate, { exact: true })
            .click();
          return dateToExpect
    }
}