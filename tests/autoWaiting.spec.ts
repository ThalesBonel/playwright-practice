import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/ajax")
  await page.getByText("Button Triggering AJAX Request").click()
});

test('Auto-Waiting', async ({ page }) => {
  const sucessButton = page.locator('.bg-success')
  // await sucessButton.click()

  // const text = await sucessButton.textContent()

  /*  await sucessButton.waitFor({ state: 'attached' })
   // await page.waitForTimeout(5000) // 5 seconds
   const text = await sucessButton.allTextContents()
 
   expect(text).toContain('Data loaded with AJAX get request.') */

  await expect(sucessButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test('Alternative Waits', async ({ page }) => {
  const sucessButton = page.locator('.bg-success')

  // wait for element
  /* await page.waitForSelector('.bg-success') */

  // wait for particular response
  await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

  // wait for network calls to be completed (NOT RECOMMENDED)
  //await page.waitForLoadState('networkidle')

  const text = await sucessButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
 
})

