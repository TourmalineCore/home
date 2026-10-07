import { ChoiceQuestion, CUSTOM_ANSWER_OPTION, ZOO_MAP_SURVEY_PAGES } from './zooMapSurveyQuestions';

export const MAX_TEXT_LENGTH = 2000;
const OPTIONS_SEPARATOR = `; `;

export type ZooMapSurveyFormValues = {
  // Selected options by question id, a radio question keeps a single value
  choices: Record<string, string[]>;
  // Free-text answers and "свой ответ" texts by question id
  texts: Record<string, string>;
};

// Builds a row of the zoo-map-survey-responses CMS collection: a field per question,
// plus a `<question id>Custom` field for the "свой ответ" text. Unanswered questions are omitted.
// It also runs on the server against untrusted input, so only the known questions and options get through
export function getZooMapSurveyResponseData({
  choices,
  texts,
}: Partial<ZooMapSurveyFormValues>) {
  const data: Record<string, string> = {};

  ZOO_MAP_SURVEY_PAGES.flat()
    .forEach((question) => {
      if (question.type === `text`) {
        const text = getText(texts, question.id);

        if (text) {
          data[question.id] = text;
        }

        return;
      }

      const choiceQuestions: ChoiceQuestion[] = question.type === `group` ? question.questions : [question];

      choiceQuestions.forEach(({
        id,
        type,
        options,
      }) => {
        const selectedOptions = getSelectedOptions(choices, id)
          .filter((option) => options.includes(option))
          .slice(0, type === `radio` ? 1 : options.length);

        if (selectedOptions.length === 0) {
          return;
        }

        data[id] = selectedOptions.join(OPTIONS_SEPARATOR);

        const customAnswer = getText(texts, id);

        if (selectedOptions.includes(CUSTOM_ANSWER_OPTION) && customAnswer) {
          data[`${id}Custom`] = customAnswer;
        }
      });
    });

  return data;
}

function getSelectedOptions(choices: unknown, questionId: string) {
  const selectedOptions = (choices as Record<string, unknown> | undefined)?.[questionId];

  return Array.isArray(selectedOptions)
    ? [...new Set(selectedOptions.filter((option): option is string => typeof option === `string`))]
    : [];
}

function getText(texts: unknown, questionId: string) {
  const text = (texts as Record<string, unknown> | undefined)?.[questionId];

  return typeof text === `string` ? sanitizeText(text) : ``;
}

function sanitizeText(text: string) {
  const cleanText = text
    .replace(/\r\n?/g, `\n`)
    // Control characters are of no use in an answer, and Postgres rejects a null byte in a text column
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, ``)
    .trim();

  // The responses are analysed in spreadsheets, where a cell starting with one of these characters is run as a formula.
  // The leading apostrophe makes a spreadsheet treat the cell as plain text
  const safeText = /^[=+\-@\t]/.test(cleanText) ? `'${cleanText}` : cleanText;

  return safeText.slice(0, MAX_TEXT_LENGTH);
}
