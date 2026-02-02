import { test as setup } from './api-test-fixtures';
import fs from 'fs';
import FormData from 'form-data';
import { TEST_FILE_NAME_PREFIX } from './constants';
import { HttpStatusCode } from './enums';
import { expect } from '@playwright/test';

setup(`upload test files`, async ({
  apiRequest 
}) => {
  const files = [
    {
      name: `${TEST_FILE_NAME_PREFIX}-stub.png`,
      path: `./playwright-tests/fixtures/${TEST_FILE_NAME_PREFIX}-stub.png`
    },
  ];

  const formData = new FormData();

  files.forEach((file) => {
    formData.append(
      `files`,
      fs.readFileSync(file.path),
      file.name
    );
  });

  try {
    const response = await apiRequest(`/api/upload`, {
      method: `post`,
      headers: formData.getHeaders(),
      data: formData.getBuffer()
    });

    expect(response.status(), `Files should be uploaded with status 201`)
      .toEqual(HttpStatusCode.Created);
  } catch (error) {
    throw new Error(`Failed to upload files: ${error.message}`)
  }
});