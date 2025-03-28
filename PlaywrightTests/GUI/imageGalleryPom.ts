// fixtures.ts
import { test as base } from '@playwright/test';

class PageObjects {
  constructor(public page: any) {}

  // Header elements
  get header() {
    return this.page.locator('h2.MuiTypography-root');
  }

  get addButton() {
    return this.page.locator('[id="\\:Rd9cm\\:"]'); 
  }
  get submitImageMenu() {
    return this.page.locator('.MuiPaper-root');
  }
  get submitImageMenuCancel() {
    //return this.page.locator('[id=":rm:"]'); 
    return this.page.getByRole('button', { name: 'Cancel' }) // cant parse \:ra\: so using getByRole again - need to not use special Chars in id names.
  }
  get submitImageMenuSubmit() {
    //return this.page.locator('[id="\\:rn\\:"]');
    return this.page.getByRole('button', { name: 'Submit' }) ;
  }
  get searchInput() {
    return this.page.locator('#input');
  }
  get addTitle() {
    return this.page.locator('#Title');
  }
  get addUrl() {
    return this.page.locator('#Url');
  }
  get addKeywords() {
    return this.page.getByRole('label', { name: 'Keywords' })
  }
  // Date filters
  get startDate() {
    return this.page.locator('[id="\\:R9lacm\\:"]');
  }

  get endDate() {
    return this.page.locator('[id="\\:Ralacm\\:"]');
  }

  // Filter dropdown
  get filterDropdown() {
    return this.page.locator('.MuiSelect-select');
  }
  get filterOptionBook() {
    return this.page.getByRole('option', { name: 'Book' })
  }
  get filterOptionImageTitle(){
    return this.page.locator('.MuiImageListItem-img')
  }
  // Image list
  get imageList() {
    return this.page.locator('.MuiImageList-root');
  }

  get imagesArray() {
    return this.page.locator('.MuiImageList-root').locator('li');
  }
}

export const test = base.extend<{ app: PageObjects }>({
  app: async ({ page }, use) => {
    const app = new PageObjects(page);
    await use(app);
  },
});

export { expect } from '@playwright/test';