// image-gallery.spec.ts
import { test, expect } from './imageGalleryPom';
import * as util from '../Support/utils'; //this is only for debugging, now there is a global screenshot on fail.
const initialImageCount = 3;
const altAttributeBook:[string,string] =  ['alt', 'book, study, pages']; // cant seem to use this below but that [string,string] is used 3 times
import { validTitle, validUrl } from '../Support/sharedVariables';

test.describe('Image Gallery Tests', () => {
  test.beforeEach(async ({ app }) => {
    await app.page.goto('/');
  });

  test('Page has the correct title and header is visible', async ({ app }) => {
    await expect(app.page).toHaveTitle('Create Next App');
    await expect(app.header).toBeVisible();
  });
  //this test will fail if GUI tests are run twice - no way to clean up in the GUI but i would want to only run these on a clean deployment (pipeline temp deployment)
  test('Page has 3 items in image list on initial load', async ({ app }) => {
    await expect(app.imageList).toBeVisible();
    await expect(app.imagesArray).toHaveCount(initialImageCount);
  });

  test('Add Image button present and functioning', async ({ app }) => {
    await expect(app.addButton).toBeVisible();
    await expect(app.addButton).toHaveCSS('background-color', 'rgb(156, 39, 176)');
    await app.addButton.click();
    await expect(app.submitImageMenu).toBeVisible();
    await app.submitImageMenuCancel.click();
    await expect(app.submitImageMenu).toBeHidden();
  });
  test('Can add a image and the page is refreshed showing it', async ({ app }) => {
    await expect(app.addButton).toBeVisible();
    await app.addButton.click();
    await expect(app.submitImageMenu).toBeVisible();
    await app.addTitle.fill(validTitle);
    await app.addUrl.fill(validUrl);
    //await app.addKeywords.fill(validKeyWords[1]); couldnt get the identifer to work for this, think its the :: - would bug a dev at this point
    await app.submitImageMenuSubmit.click();
    await expect(app.submitImageMenu).toBeHidden();
    //Same as initial check, will fail on re-run.
    await expect(app.imagesArray).toHaveCount(initialImageCount+1);
  });
  test('Date filters filter images correctly', async ({ app }) => {
    const startDate = '01/01/2023';
    const endDate = '12/31/2024';

    await expect(app.startDate).toHaveAttribute('placeholder', 'MM/DD/YYYY');
    await expect(app.endDate).toHaveValue(getFormattedDate());

    await app.startDate.fill(startDate);
    await app.endDate.fill(endDate);
    
    await expect(app.startDate).toHaveValue(startDate);
    await expect(app.endDate).toHaveValue(endDate);
    await expect(app.imagesArray).toHaveCount(1);
    await expect(app.filterOptionImageTitle).toHaveAttribute('alt', 'coffee, cup, mug');

  });

  test('Should have working filter dropdown and find book', async ({ app }) => {
    await expect(app.filterDropdown).toBeVisible();
    await app.filterDropdown.click();
    await app.filterOptionBook.click(); // Specific option ID
    await expect(app.imagesArray).toHaveCount(1);
    await expect(app.filterOptionImageTitle).toHaveAttribute('alt', 'book, study, pages');//i couldnt pass these in as a const, keeps saying expects string not [STRING:STRING]
  });
  test('Text search finds the correct image from title', async ({ app }) => {
    await expect(app.searchInput).toBeVisible();
    await app.searchInput.fill('Mountains');
    await expect(app.searchInput).toHaveValue('Mountains');
    await expect(app.imagesArray).toHaveCount(1);
    await expect(app.filterOptionImageTitle).toHaveAttribute('alt', 'mountains, snow, cold');
  });

  //test fails as sub strings get found in keywords, this a bug in the app.
  test('Text search does not find any image from title sub string', async ({ app }) => {
    await expect(app.searchInput).toBeVisible();
    await app.searchInput.fill('ount');
    await expect(app.searchInput).toHaveValue('ount');
     // the below check was passing as the image was still loading when it checked. Wait isnt ideal but we are waiting for nothing
     // so cant do a waitUntiVisible etc. Would ask dev to help with a invisible element to notify if no images are still loading. 
    await app.page.waitForTimeout(1000);
    await expect(app.imagesArray).toHaveCount(0);

  });
  function getFormattedDate(): string {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  

});