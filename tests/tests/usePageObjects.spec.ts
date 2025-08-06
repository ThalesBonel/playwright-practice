import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  
});

test('Navigate to form page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Input Using the Grid Fields', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('teste@test.com.br', 'senha123', 'Option 2')
})

test('Input Inline Form Fields', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitInlineFormWithCrendencialsAndCheckbox('Thales Test', 'thalesbonel@test.com', true)
})

test('Input Common DatePicker date', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(1)
})

test('Input Range DatePicker date', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(10, 20)
})

