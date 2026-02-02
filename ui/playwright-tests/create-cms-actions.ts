import { Page } from "./custom-test";

export const createCmsActions = (page: Page) => ({
  authorize: async () => {
    await page.locator(`input[name=email]`)
      .fill(process.env.CMS_EMAIL as string);

    await page.locator(`input[name=password]`)
      .fill(process.env.CMS_PASSWORD as string);

    await page.getByText(`Login`)
      .click();
  },

  navigateToContentManager: async () => {
    await page.getByText(`Content Manager`)
      .click();
  },

  navigateToContentTypeByName: async (name: string) => {
    await page.getByRole(`link`, {
      name,
    })
      .click();
  },

  addComponentBlock: async () => {
    await page.getByRole(`button`, {
      name: `Add a component to blocks`,
    })
      .click();
  },

  clickOnText: async (text: string) => {
    await page.getByText(text)
      .click();
  },

  createNewEntry: async () => {
    await page.getByRole(`link`, {
      name: `Create new entry`,
    })
      .last()
      .click();
  },

  fillInputByName: async ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    await page.locator(`input[name="${name}"]`)
      .fill(value);
  },

  fillTextareaByName: async ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    await page.locator(`textarea[name="${name}"]`)
      .fill(value);
  },

  checkCheckbox: async (name: string) => {
    await page.locator(`input[name="${name}"]`)
      .check();
  },

  focusInput: async (name: string) => {
    await page.locator(`input[name="${name}"]`)
      .click();
  },

  publish: async () => {
    await page.getByRole(`button`, {
      name: `Publish`,
    })
      .click();

    // Wait until record is saved in db
    await page.waitForTimeout(1500);
  },

  skipTutorial: async () => {
    await page.getByRole(`button`, {
      name: `Skip`,
    })
      .click();
  },
});
