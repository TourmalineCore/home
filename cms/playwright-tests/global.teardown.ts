import { expect } from '@playwright/test';
import { test as teardown } from './api-test-fixtures';
import { TEST_FILE_NAME_PREFIX } from './constants';
import { HttpStatusCode } from './enums';
// import { expect, test as teardown } from './helpers/api-test-fixtures';

teardown(`remove test files`, async ({
  apiRequest 
}) => {
  const filesResponse = await apiRequest(`/api/upload/files`);
  const filesData = await filesResponse.json();

  const filesDelete = filesData.filter((file) => file.name?.startsWith(TEST_FILE_NAME_PREFIX));

  if (filesDelete.length) {
    for (const {
      id 
    } of filesDelete) {
      try {
        const response = await apiRequest(`/api/upload/files/${id}`, {
          method: `delete`
        });

        expect(response.status(), `Files should be deleted with status 200`)
          .toEqual(HttpStatusCode.Ok);
      } catch (error) {
        throw new Error(`Failed to delete files: ${error.message}`)
      }
    }
  }
});