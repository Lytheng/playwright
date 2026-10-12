const {test, expect} = require('@playwright/test');

const waitForDelay = async (page, ms = 2000) => {
  await page.waitForTimeout(ms);
};

test('Browser context playwright test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/');
    console.log(await page.title());
});

test('Page playwright test', async ({page}) => {
    await page.goto('https://www.google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test.only('Login test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator('[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/#');
    console.log(await page.title());
    await page.locator('#username').fill('rahulshettyacademy');
    // await waitForDelay(page);
    await page.locator('#password').fill('Learning@830$3mK2');
    // await waitForDelay(page);

    await page.locator('input[name="radio"][value="admin"]').check();
    await page.locator('input[name="radio"][value="user"]').check();
    await page.locator('#okayBtn').click();
    console.log('radio button check: ', await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();

    // await page.pause();
    await page.locator('select.form-control').selectOption('Teacher');
    await page.locator('select.form-control').selectOption('Student');

    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');

    await page.locator('#signInBtn').click(); // method 1
    // await page.getByRole('button', { name: 'Sign In' }).click(); // method 2
    await page.waitForLoadState('networkidle');
    const productLinks = page.locator('.card-body a');
    await expect(productLinks.first()).toBeVisible();
    console.log(await productLinks.allTextContents()); // method 1
    console.log(await productLinks.first().textContent()); // method 2
    console.log(await productLinks.nth(1).textContent()); // method 3
});

test('Child window handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/#');
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    await waitForDelay(page, 5000);
});