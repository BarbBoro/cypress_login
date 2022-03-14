import { times } from "cypress/types/lodash"

export class Login{
    variables:any
    /*constructor(vars:any){
      //  this.variables = vars
    }*/

    /**
     * 
     * @returns front page login user icon
     */
    buttonLoginUser(){
        return cy.get(".header > .greet > .user-dropdown")
    }

    /**
     * 
     * @returns submit button on login page
     */

    buttonSubmitLogin(){
        return cy.get(".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2")
    }

    /**
     * 
     * @param pageType options: login OR create
     */

    returnAccountTypePage(pageType: string){
        this.buttonLoginUser().click()
        cy.get(`.dropdown-content > [href="https://new.gymbeam.sk/customer/account/${pageType}/"]`).click();
    }


    /**
     * 
     * @returns email imput on login page
     */
    getEmailInput(){
        return  cy.get("#email")
    }

    /**
     * @returns password input on login page
     */

    getPasswordInput(){
       return cy.get(".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass")
    }

    /**
     * 
     * @returns error message div
     */

    getErrorMessage(){
        return cy.get('.message-error > div')
    }

    /**
     * 
     * @returns email error message
     */

    getMailError(){
        return cy.get('#email-error')
    }

    getBaseTitle(){
        return cy.get('.base')
    }
}