class DashboardPage {
    constructor(page) {
        this.page = page;
        this.sidebarItems = (name) => page.getByRole('link', { name: name });
        this.sidebarToggleButton = page.locator('.oxd-main-menu-button');
        this.sidePanel = page.locator('.oxd-sidepanel');
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    }

    async navigateTo(menuName) {
        await this.sidebarItems(menuName).click();
    }

    async toggleSidebar() {
        await this.sidebarToggleButton.click();
    }
}
module.exports = { DashboardPage };