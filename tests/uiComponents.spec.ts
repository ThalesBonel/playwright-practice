import { test, expect } from "@playwright/test"
import { PagesRoutingModule } from "../src/app/pages/pages-routing.module";
import { ConstantPool } from "@angular/compiler";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input Fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();

    // Simulate slower typing
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 300,
    });

    //generic assertion
    const inputvalue = await usingTheGridEmailInput.inputValue();
    expect(inputvalue).toEqual("test2@test.com");
    console.log(inputvalue);
    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("Radio Buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    //await usingTheGridForm.getByLabel('Option 1').check({force: true})

    //getByrole -> Most recommended way to locate a radio button
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    //Generic Assertion
    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeTruthy();

    //Locator assertion
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    // expect(await usingTheGridForm.getByRole('radio',{name: "Option 1"}).isChecked()).toBeFalsy()
    // expect(await usingTheGridForm.getByRole('radio',{name: "Option 2"}).isChecked()).toBeTruthy()

    //Forma RECOMENDADA DE UTILIZAR > locator assertion!
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 2" })
    ).toBeChecked();

    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).not.toBeChecked();
  });
});

test('Checkboxes', async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
  await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

  const allBoxes = page.getByRole('checkbox')

  for (const box of await allBoxes.all()) {
    await box.check({ force: true })
    await expect(box).toBeChecked()
  }

  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true })
    await expect(box).not.toBeChecked()
  }
})

test('Lists and Dropdowns', async ({ page }) => {
  const dropdownMenu = page.locator('ngx-header nb-select')
  await dropdownMenu.click()

  page.getByRole('list') //when the list has a UL tag
  page.getByRole('listitem') //when the list has LI tag 

  //const optionsListItens = page.getByRole('list').locator('nb-option')
  const optionsListItens = page.locator('nb-option-list nb-option')
  await expect(optionsListItens).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
  await optionsListItens.filter({ hasText: "Cosmic" }).click()

  const header = page.locator('nb-layout-header')
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
  }

  await dropdownMenu.click()
  for (const color in colors) {
    await optionsListItens.filter({ hasText: color }).click()
    await expect(header).toHaveCSS('background-color', colors[color])

    if (color != "Corporate") {
      await dropdownMenu.click()
    }
  }
})

test('Tooltips', async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const toolTipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
  await toolTipCard.getByRole('button', { name: 'Top' }).hover()

  page.getByRole('tooltip') // if you have a role tooltip created
  const tooltip = await page.locator('nb-tooltip').textContent()

  expect(tooltip).toEqual("This is a tooltip")
})


// Web Tables
// f user by email AND editing the user AGE
test('Web Tables', async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  const lineThree = page.getByRole('row', { name: 'twitter@outlook.com' })
  await lineThree.locator('.nb-edit').click()

  const ageInput = page.locator('input-editor').getByPlaceholder('Age')
  await ageInput.clear()
  await ageInput.fill('30')
  await page.locator('.nb-checkmark').click()

  const NewAgeInputValue = await lineThree.locator('td').last().textContent()
  console.log(NewAgeInputValue);

  expect(Number(NewAgeInputValue)).toEqual(30);


  // get the row based on the value in the specific column AND edit the user EMAIL

  await page.locator('.ng2-smart-page-link').getByText('2').click()
  const targetRowById = page.getByRole('row', { name: '19' }).filter({ has: page.locator('td').nth(1).getByText('19') })
  await targetRowById.locator('.nb-edit').click()

  await page.locator('input-editor').getByPlaceholder('E-mail').clear()
  await page.locator('input-editor').getByPlaceholder('E-mail').fill('novoemail@teste.com')
  await page.locator('.nb-checkmark').click()

  await expect(targetRowById.locator('td').nth(5)).toHaveText('novoemail@teste.com')

  // how to loop through the rows and columns of a table
  // test data age = 20, 30, 40, 200

  const ages = [
    "20",
    "30",
    "40",
    "200"
  ]

  await page.locator('input-filter').getByPlaceholder('Age').click()

  for (let age of ages) {
    await page.locator('input-filter').getByPlaceholder('Age').clear()
    await page.locator('input-filter').getByPlaceholder('Age').fill(age)
    await page.waitForTimeout(500)

    const ageRowValue = page.locator('tbody tr')

    for (let row of await ageRowValue.all()) {
      const cellValue = await row.locator('td').last().textContent()

      if (age === "200") {
        expect((await page.getByRole('table').locator('td').textContent()).trim()).toEqual("No data found")
      } else {
        expect(cellValue).toEqual(age)
      }

    }
  }

})



