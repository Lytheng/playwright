import {test, expect} from '@playwright/test';

test('Playwright special locators', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    // 5 seconds default timeout for expect assertion
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout: 10_000});
    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();
});

test('Playwright test level timeout', async ({page}) => {
    const slow_expect = expect.configure({timeout: 10_000});
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    // 5 seconds default timeout for expect assertion
    await slow_expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout: 10_000});
    await page.getByRole('link', {name: 'Shop'}).click();
    await slow_expect(page.locator('.my-4').first()).toHaveText('Shop Name');
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();
});