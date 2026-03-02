class PIMPage {
    constructor(page) {
        this.page = page;
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.employeeNameSearch = page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.tableRow = page.locator('.oxd-table-card');
    }

    async addEmployee(first, last) {
        await this.addButton.click();
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.saveButton.click();
    }

    async searchEmployee(name) {
        await this.employeeNameSearch.fill(name);
        await this.searchButton.click();
    }
}
module.exports = { PIMPage };