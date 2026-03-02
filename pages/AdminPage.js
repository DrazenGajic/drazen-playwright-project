class AdminPage {
    constructor(page) {
        this.page = page;
        this.usernameSearchInput = page.locator('.oxd-input--active').nth(1);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.tableResults = page.locator('.oxd-table-card');
    }

    async searchUser(username) {
        await this.usernameSearchInput.fill(username);
        await this.searchButton.click();
    }
}
module.exports = { AdminPage };