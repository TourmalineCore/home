import { APIResponse, test as base, request } from '@playwright/test';

type PlaywrightRequestOptions = {
  method?: `get` | `post` | `put` | `delete` | `patch`;
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export type ApiTestFixtures = {
  apiRequest: (endpoint: string, options?: PlaywrightRequestOptions) => Promise<APIResponse>;
};

// https://playwright.dev/docs/test-fixtures
// Extend base test by providing "apiRequest"
export const test = base.extend<ApiTestFixtures>({
  // eslint-disable-next-line no-empty-pattern
  apiRequest: async ({}, use) => {
    // Create apiContext with default settings
    const apiContext = await request.newContext({
      extraHTTPHeaders: {
        // Disable cache for test request
        'Cache-Control': `no-cache`,
      },
    });

    const apiRequest = async (
      endpoint: string,
      options: PlaywrightRequestOptions = {}
    ) => {
      const baseUrl = process.env.SERVER_URL || `http://localhost:1337`;
      const method = options.method || `get`;
      const response = await apiContext[method](`${baseUrl}${endpoint}`, options)
      return response;
    };

    // Use the fixture value in the test
    await use(apiRequest);

    // Clean up the apiContext
    await apiContext.dispose();
  },
});

export {
  Page,
  expect,
} from '@playwright/test';