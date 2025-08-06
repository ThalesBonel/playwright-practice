import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    readonly inlineFormName: Locator
    readonly inlineFormEmail: Locator
    readonly inlineFormCheckbox: Locator
    readonly inlineFormSubmitButton: Locator

    constructor(page: Page) {
        super(page)
        const inlineFormInputs = this.page.locator('nb-card', {hasText: 'Inline form'})

        this.inlineFormName = inlineFormInputs.getByPlaceholder('Jane Doe')
        this.inlineFormEmail = inlineFormInputs.getByPlaceholder('Email')
        this.inlineFormCheckbox = inlineFormInputs.getByRole('checkbox')
        this.inlineFormSubmitButton = inlineFormInputs.getByRole('button')
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const inputsUsingTheGrid = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await inputsUsingTheGrid.getByPlaceholder('Email').fill(email)
        await inputsUsingTheGrid.getByPlaceholder('Password').fill(password)
        await inputsUsingTheGrid.getByRole('radio', {name: optionText}).check({force: true})
    }

    /**
     * Método para preencher os dados do Inline Form e enviar o formulário
     * @param name - nome do usuário
     * @param email - email do usuário
     * @param rememberMe - checkbox selecionado caso true
     */
    async submitInlineFormWithCrendencialsAndCheckbox(name: string, email: string, rememberMe: boolean) {
        await this.inlineFormName.fill(name)
        await this.inlineFormEmail.fill(email)
        if(rememberMe === true)
            await this.inlineFormCheckbox.check({force: true})
        await this.inlineFormSubmitButton.click()
    }
}