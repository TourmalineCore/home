import { ApiTestFixtures } from "./api-test-fixtures";
import { TEST_FILE_NAME_PREFIX } from "./constants";

export async function getFileIdByName({
  name = `${TEST_FILE_NAME_PREFIX}-stub.png`,
  apiRequest
}: {
  name?: string;
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const filesResponse = await apiRequest(`/api/upload/files`);
  const filesData = await filesResponse.json();

  return filesData.find((file) => file.name === name).id;
}
