const { test, expect } = require('@playwright/test');

test.describe('OrangeHRM Automation Suite', () => {

    test.beforeEach(async ({ page }) => {
        // Go to the login page before every test
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    // 1. Valid Login
    test('Login with valid credentials', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        
        await expect(page).toHaveURL(/dashboard/);
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    // 2. Invalid Login
    test('Login with invalid credentials', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('WrongUser');
        await page.getByPlaceholder('Password').fill('WrongPass');
        await page.getByRole('button', { name: 'Login' }).click();
        
        const errorAlert = page.locator('.oxd-alert-content-text');
        await expect(errorAlert).toHaveText('Invalid credentials');
    });

    // 3. Logout
    test('User can logout successfully', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        await page.locator('.oxd-userdropdown-name').click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        
        await expect(page).toHaveURL(/login/);
    });

    // 4. PIM - Add Employee
    test('Add New Employee in PIM module', async ({ page }) => {
        // Login first
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        await page.getByRole('link', { name: 'PIM' }).click();
        await page.getByRole('button', { name: ' Add' }).click();

        await page.getByPlaceholder('First Name').fill('John');
        await page.getByPlaceholder('Last Name').fill('Doe');
        
        // Wait for network to be idle or the save button to be clickable
        await page.getByRole('button', { name: 'Save' }).click();
        
        await expect(page.locator('text=Personal Details')).toBeVisible({ timeout: 10000 });
    });

    // 5. Search Employee
    test('Search for employee by name', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        await page.getByRole('link', { name: 'PIM' }).click();
        // Target the Employee Name input (it's often the first one in the list)
        await page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').fill('John');
        await page.getByRole('button', { name: 'Search' }).click();
        
        await expect(page.locator('.oxd-table-card')).toBeVisible();
    });

    // 6. Admin Module - Search User
    test('Search System User in Admin module', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        await page.getByRole('link', { name: 'Admin' }).click();
        await page.locator('.oxd-input--active').nth(1).fill('Admin');
        await page.getByRole('button', { name: 'Search' }).click();
        
        await expect(page.locator('.oxd-table-card')).toContainText('Admin');
    });

    // 7. Forgot Password Redirection
    test('Forgot Password link redirection', async ({ page }) => {
        await page.locator('.orangehrm-login-forgot-header').click();
        await expect(page).toHaveURL(/requestPasswordResetCode/);
        await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    });

    // 8. Sidebar Toggle
    test('Toggle Sidebar Menu', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        const sidebar = page.locator('.oxd-sidepanel');
        await page.locator('.oxd-main-menu-button').click();
        await expect(sidebar).toHaveClass(/toggled/);
    });

    // 9. Dashboard Components Visibility
    test('Verify Dashboard Quick Launch icons', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        const quickLaunch = page.locator('.orangehrm-dashboard-grid');
        await expect(quickLaunch).toBeVisible();
    });

    // 10. Mobile Viewport Check
    test('Check Login page on Mobile Viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        const loginButton = page.getByRole('button', { name: 'Login' });
        await expect(loginButton).toBeVisible();
    });
});
