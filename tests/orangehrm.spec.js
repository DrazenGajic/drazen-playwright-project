const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PIMPage } = require('../pages/PIMPage');
const { AdminPage } = require('../pages/AdminPage');

test.describe('OrangeHRM Full POM Suite', () => {
    let loginPage, dashboardPage, pimPage, adminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        pimPage = new PIMPage(page);
        adminPage = new AdminPage(page);
        await loginPage.goto();
    });

    test('TC1: Valid Login', async () => {
        await loginPage.login('Admin', 'admin123');
        await expect(dashboardPage.dashboardHeading).toBeVisible();
    });

    test('TC2: Invalid Login', async () => {
        await loginPage.login('WrongUser', 'WrongPass');
        await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    });

    test('TC3: Logout Functionality', async () => {
        await loginPage.login('Admin', 'admin123');
        await loginPage.logout();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('TC4: Forgot Password Redirection', async () => {
        await loginPage.forgotPasswordLink.click();
        await expect(loginPage.page).toHaveURL(/requestPasswordResetCode/);
    });

    test('TC5: Add New Employee', async () => {
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.navigateTo('PIM');
        await pimPage.addEmployee('Tony', 'Stark');
        await expect(loginPage.page.locator('text=Personal Details')).toBeVisible();
    });

    test('TC6: Search Employee', async () => {
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.navigateTo('PIM');
        await pimPage.searchEmployee('Tony');
        await expect(pimPage.tableRow).toBeVisible();
    });

    test('TC7: Admin User Search', async () => {
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.navigateTo('Admin');
        await adminPage.searchUser('Admin');
        await expect(adminPage.tableResults).toContainText('Admin');
    });

    test('TC8: Sidebar Toggle Check', async () => {
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.toggleSidebar();
        await expect(dashboardPage.sidePanel).toHaveClass(/toggled/);
    });

    test('TC9: Mobile Login Visibility', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(loginPage.loginButton).toBeVisible();
    });
});