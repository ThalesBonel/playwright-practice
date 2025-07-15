import {test, expect} from "@playwright/test"


test.beforeEach(async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/ajax")
  await page.getByText("Button Triggering AJAX Request").click()
});

test('Auto-Waiting', async ({page}) => {
  const sucessButton = page.locator('.bg-success')
  await sucessButton.click()
})
