import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

  readonly formLayoutsMenuItem: Locator
  readonly datePickerLayoutsMenuItem: Locator
  readonly smartTableLayoutsMenuItem: Locator
  readonly toastrLayoutsMenuItem: Locator
  readonly tooltipLayoutsMenuItem: Locator

  constructor(page: Page) {
    super(page)

    this.formLayoutsMenuItem = page.getByText("Form Layouts")
    this.datePickerLayoutsMenuItem = page.getByText("Datepicker")
    this.smartTableLayoutsMenuItem = page.getByText("Smart Table")
    this.toastrLayoutsMenuItem = page.getByText("Toastr")
    this.tooltipLayoutsMenuItem = page.getByText("Tooltip")
  }

  async formLayoutsPage() {
    await this.selectGruopMenuItem("Forms");
    await this.formLayoutsMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGruopMenuItem("Forms");
    await this.datePickerLayoutsMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGruopMenuItem("Tables & Data");
    await this.smartTableLayoutsMenuItem.click();
  }

  async toastrPage() {d
    await this.selectGruopMenuItem("Modal & Overlays");
    await this.toastrLayoutsMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGruopMenuItem("Modal & Overlays");
    await this.tooltipLayoutsMenuItem.click();
  }

  private async selectGruopMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") await groupMenuItem.click();
  }
}
