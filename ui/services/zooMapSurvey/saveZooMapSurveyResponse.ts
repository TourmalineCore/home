import { ZooMapSurveyFormValues } from '../../components/zooMapSurvey/ZooMapSurvey/getZooMapSurveyResponseData';

export async function saveZooMapSurveyResponse({
  choices,
  texts,
  token,
}: ZooMapSurveyFormValues & {
  token: string;
}) {
  const response = await fetch(`/api/save-zoo-map-survey-response`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify({
      choices,
      texts,
      token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save zoo map survey response`);
  }
}
