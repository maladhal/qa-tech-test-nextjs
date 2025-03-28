
import { type Page } from '@playwright/test';

export async function takeScreenShot(page: Page) {
    await page.screenshot({
        path: 'screenshots/full-page.png',
        fullPage: false
    });
}
const today = new Date();
