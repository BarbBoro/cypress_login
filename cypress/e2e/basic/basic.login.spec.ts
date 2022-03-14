/// <reference types="cypress" />

import { Login } from "../../support/general.objects";



describe("login operations", () => {
  let login: Login = new Login()
  before(function () {
    cy.fixture("general.json").then((general) => {
      this.general = general;

    });
  });

  context("login", () => {
    beforeEach(function () {
      cy.visit(this.general.pageLogin.pageLoginUrl, {
        auth: {
          username: this.general.pageLogin.pageLoginName,
          password: this.general.pageLogin.pageLoginPassword,
        },
      });
    });

    it("TC01 - Successful login and logout", function () {

      login.returnAccountTypePage('login')
      login.getEmailInput().should("exist").clear().type("testing1@zoznam.sk");
      login.getPasswordInput().should("exist").type("Test123456")
      login.buttonSubmitLogin().should('exist').click()

      //assert login is successful
      cy.url().should('eq', 'https://new.gymbeam.sk/customer/account/')
      login.getBaseTitle().should('contain.text', this.general.baseTexts.myAccount)
      login.returnAccountTypePage('logout')
      login.getBaseTitle().should('contain.text', this.general.baseTexts.successLogout)

    });

    it("TC02 - Login as not existing user", function () {

      login.returnAccountTypePage('login')
      login.getEmailInput().should("exist").clear().type("dummy@email.com");
      login.getPasswordInput().should("exist").type("password")
      login.buttonSubmitLogin().should('exist').click()

      //assert login is not successful
      cy.intercept(this.general.urls.waitForPostEvent).as('loginPost')
      cy.wait(5000)
      cy.wait('@loginPost')
      login.getErrorMessage().should('contain.text', this.general.alerts.wrongLogin)
    });

    it("TC03 - Try to login with only email input filled ", function () {
      login.returnAccountTypePage('login')
      login.getEmailInput().should("exist").clear().type("dummy@email.com");
      login.buttonSubmitLogin().should('exist').click()
      login.buttonSubmitLogin().should('exist').click()

      //assert login is not successful
      cy.intercept(this.general.urls.waitForPostEvent).as('loginPost')
      cy.wait(5000)
      cy.wait('@loginPost')
      login.getErrorMessage().should('contain.text', this.general.alerts.mandatoryCredentials)

    });

    it("TC04 - Try to login with only password input filled ", function () {
      login.returnAccountTypePage('login')
      login.getPasswordInput().should("exist").type("password")
      login.buttonSubmitLogin().should('exist').click()
      login.buttonSubmitLogin().should('exist').click()

      //assert login is not successful
      cy.intercept(this.general.urls.waitForPostEvent).as('loginPost')
      cy.wait(5000)
      cy.wait('@loginPost')
      login.getErrorMessage().should('contain.text', this.general.alerts.mandatoryCredentials)
    });

  });


});
