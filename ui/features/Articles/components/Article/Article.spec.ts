import { ComponentName } from "../../../../common/enums";
import { expect, test } from "../../../../playwright-tests/custom-test";

test.describe(`Article`, () => {
  test(`
    GIVEN article component with mermaid code
    WHEN render the component
    THEN should see them
  `, async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.ARTICLE);

    const diagramContainer = page.getByTestId(`mermaid-diagram-container`);

    await expect(diagramContainer)
      .toBeVisible();

    // We check that there really is an SVG inside
    const svg = diagramContainer.locator(`svg`);

    await expect(svg)
      .toBeVisible();

    await expect(diagramContainer)
      .toContainText(`Dev`);

    await expect(diagramContainer)
      .toContainText(`Push changes`);

    await expect(diagramContainer)
      .toContainText(`GitHub`);
  });
});
