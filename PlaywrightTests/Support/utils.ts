
// not used in the end but useful for later... 

async function takeScreenShot(page: Page) {
    await page.screenshot({
        path: 'screenshots/full-page.png',
        fullPage: false
    });
}
const today = new Date();
