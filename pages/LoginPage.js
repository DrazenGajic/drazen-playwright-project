class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.locator('.orangehrm-login-forgot-header');
        this.userDropdown = page.locator('.oxd-userdropdown-name');
        this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
        this.errorMessage = page.locator('.oxd-alert-content-text');
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(user, pass) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutLink.click();
    }
}
module.exports = { LoginPage };