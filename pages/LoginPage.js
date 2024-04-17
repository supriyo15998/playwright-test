exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = `id=login2`;
    this.userNameField = `#loginusername`;
    this.passwordField = `#loginpassword`;
    this.loginBtn = `//button[text()='Log in']`;
    this.loggedInUserName = `//a[@id="nameofuser"]`
  }
  async clickOnLoginLink() {
    await this.page.locator(this.loginLink).click();
  }
  async enterUserName(username) {
    await this.page.locator(this.userNameField).fill(username);
  }
  async enterPassword(password) {
    await this.page.locator(this.passwordField).fill(password);
  }
  async clickOnLoginBtn() {
    await this.page.locator(this.loginBtn).click();
  }
};
