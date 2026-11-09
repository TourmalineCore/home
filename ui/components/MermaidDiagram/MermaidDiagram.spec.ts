import { ComponentName } from '../../common/enums';
import { test, expect } from '../../playwright-tests/custom-test';

test.describe(`MermaidDiagram`, () => {
  test(`
    GIVEN mermaid diagram component
    WHEN render the component
    THEN diagram should be visible
  `, async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.MERMAID_DIAGRAM_VALID);

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

    await expect(page.getByTestId(`mermaid-loading`))
      .not
      .toBeVisible();
  });

  test(` 
    GIVEN mermaid diagram component
    AND incorrect mermaid code
    WHEN render the component
    THEN should see error message
  `, async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.MERMAID_DIAGRAM_INVALID);

    const errorBlock = page.getByTestId(`mermaid-error`);

    await expect(page.getByTestId(`mermaid-diagram-container`))
      .not
      .toBeVisible();

    await expect(page.getByTestId(`mermaid-loading`))
      .not
      .toBeVisible();

    await expect(errorBlock)
      .toBeVisible();

    await expect(errorBlock)
      .toHaveText(`Произошла ошибка при загрузке диаграммы.`);
  });
});
