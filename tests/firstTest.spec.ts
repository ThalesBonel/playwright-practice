import { test } from "@playwright/test";
import { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/")
  await page.getByText("Forms").click()
  await page.getByText("Form Layouts").click()
});

test('Locator syntax rules', async ({ page }) => {
  //by tag name
  await page.locator('input').first().click()

  //by ID
  page.locator('#inputEmail1')

  //by class value
  page.locator('.shape-rectangle')

  //by attribute
  page.locator('placeholder="Email"')

  //by Class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //combine different locators
  page.locator('input[placeholder="Email"][nbinput]')

  //by Xpath >> NOT RECOMMENDED <<
  page.locator('//*[@id="inputEmail1"]')

  //by partial text match
  await page.locator(':text("Using")').click()

  //by exact text match
  await page.locator(':text-is("Using the Grid")').click()
})

test('User Facing Locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('button', { name: 'Sign in' }).first().click()

  await page.getByLabel('Password').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTestId('SignIn').click()

  await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  //await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()

  // unir locator e user facing locator
  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

  //ultimo caso, buscar por child
  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test.only('Locating Parents Elements', async ({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"})
    .getByRole('textbox', {name: "Email"}).click()

  await page.locator('nb-card', {has: page.locator('#inputEmail1')})
    .getByRole('textbox', {name: "Email"}).click()

  await page.locator('nb-card')
    .filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()

  await page.locator('nb-card')
    .filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

  await page.locator('nb-card')
    .filter({has: page.locator('nb-checkbox')})
    .filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

  await page.locator(':text-is("Using the Grid")')
    .locator('..').getByRole('textbox', {name: "Email"}).click()
})
test('Reusing Locators', async({page}) => {
  const basicForm = page.locator('nb-card', {hasText: "Basic Form"})
  const emailForm = basicForm.getByRole('textbox', {name: "Email"})

  await emailForm.fill('teste@email.com')
  await basicForm.getByRole('textbox', {name: "Password"}).fill('senha123')
  await basicForm.getByRole('button').click()

  await expect(emailForm).toHaveValue('teste@email.com')
});

test('Extracting Values', async ({page}) => {
  //single text value
  const basicForm = page.locator('nb-card', {hasText: "Basic Form"})
  const buttonText = await basicForm.locator('button').textContent()
  console.log(buttonText)
  expect(buttonText).toEqual('Submit')

  //all text values
  const allRadioButtonsLabel = await page.locator('nb-radio').allTextContents()
  console.log(allRadioButtonsLabel)
  expect(allRadioButtonsLabel).toContain('Option 1')

  //input value
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill("test@test.com")
  const emailValue = await emailField.inputValue()
  console.log(emailValue)
  expect(emailValue).toEqual("test@test.com")

  //get attribute value
  const getPlaceHolderValue = await emailField.getAttribute('placeholder')
  console.log(getPlaceHolderValue)
  expect(getPlaceHolderValue).toEqual('Email')
})

test('Assertions', async ({page}) => {
  //General Assertions
  const value = 5
  expect(value).toEqual(5)

  const basicFormButton = page.locator('nb-card', {hasText: "Basic Form"}).locator('button')

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  //Locator Assertion
  await expect(basicFormButton).toHaveText('Submit')

  //Soft Assertion
  await expect.soft(basicFormButton).toHaveText('Submit4')
  await basicFormButton.click()
})



