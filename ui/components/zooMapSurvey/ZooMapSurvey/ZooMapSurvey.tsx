import '@radix-ui/themes/styles.css';

import { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  Progress,
  Text,
  Theme,
} from '@radix-ui/themes';
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { useSmartCaptcha } from '../../../common/hooks/useSmartCaptcha';
import { saveZooMapSurveyResponse } from '../../../services/zooMapSurvey/saveZooMapSurveyResponse';
import { ZooMapSurveySubmittedModal } from '../ZooMapSurveySubmittedModal/ZooMapSurveySubmittedModal';
import { ZooMapSurveyQuestion } from './components/ZooMapSurveyQuestion/ZooMapSurveyQuestion';
import { getZooMapSurveyResponseData } from './getZooMapSurveyResponseData';
import { ZOO_MAP_SURVEY_DESCRIPTION, ZOO_MAP_SURVEY_PAGES, ZOO_MAP_SURVEY_TITLE } from './zooMapSurveyQuestions';

const LAST_PAGE_INDEX = ZOO_MAP_SURVEY_PAGES.length - 1;
const PAGE_COUNTER_ID = `zoo-map-survey-page-counter`;

export function ZooMapSurvey() {
  const [pageIndex, setPageIndex] = useState(0);
  // Selected options by question id, a radio question keeps a single value
  const [choices, setChoices] = useState<Record<string, string[]>>({});
  // Free-text answers and "свой ответ" texts by question id
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const [error, setError] = useState(``);

  const {
    isSmartCaptchaEnabled,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha,
    hideSmartCaptcha,
    resetSmartCaptcha,
  } = useSmartCaptcha();

  return (
    <>
      <Theme
        appearance="light"
        data-testid="zoo-map-survey"
      >
        <Container
          size="2"
          px="4"
          py="8"
        >
          <Heading
            as="h1"
            size="8"
            mb="5"
          >
            {ZOO_MAP_SURVEY_TITLE}
          </Heading>
          {
            !isSubmitted && pageIndex === 0 && (
              <Text
                as="p"
                size="3"
                mb="5"
              >
                {ZOO_MAP_SURVEY_DESCRIPTION}
              </Text>
            )
          }
          {
            isSubmitted ? (
              <Card size="3">
                <Heading
                  as="h2"
                  size="5"
                  mb="2"
                >
                  Спасибо!
                </Heading>
                <Text as="p">
                  Ваши ответы отправлены.
                </Text>
              </Card>
            ) : (
              <form onSubmit={onSubmit}>
                <Flex
                  direction="column"
                  gap="4"
                >
                  <Box>
                    <Text
                      as="p"
                      size="2"
                      color="gray"
                      mb="2"
                      id={PAGE_COUNTER_ID}
                    >
                      {`Страница ${pageIndex + 1} из ${ZOO_MAP_SURVEY_PAGES.length}`}
                    </Text>
                    <Progress
                      aria-labelledby={PAGE_COUNTER_ID}
                      value={((pageIndex + 1) / ZOO_MAP_SURVEY_PAGES.length) * 100}
                    />
                  </Box>
                  {ZOO_MAP_SURVEY_PAGES[pageIndex].map((question) => (
                    <Card
                      key={question.id}
                      size="3"
                    >
                      <ZooMapSurveyQuestion
                        question={question}
                        choices={choices}
                        texts={texts}
                        onChoiceChange={setChoice}
                        onTextChange={setText}
                      />
                    </Card>
                  ))}
                  {
                    error && (
                      <Callout.Root
                        color="red"
                        role="alert"
                      >
                        <Callout.Text>
                          {error}
                        </Callout.Text>
                      </Callout.Root>
                    )
                  }
                  <Flex
                    gap="3"
                    justify="between"
                  >
                    {
                      pageIndex > 0 ? (
                        <Button
                          type="button"
                          size="3"
                          variant="soft"
                          color="gray"
                          disabled={isLoading}
                          onClick={() => goToPage(pageIndex - 1)}
                        >
                          Назад
                        </Button>
                      ) : <span />
                    }
                    {
                      pageIndex < LAST_PAGE_INDEX ? (
                        <Button
                          // Without the key React reuses this button for the submit one and the click submits the form
                          key="next"
                          type="button"
                          size="3"
                          onClick={() => goToPage(pageIndex + 1)}
                        >
                          Далее
                        </Button>
                      ) : (
                        <Button
                          key="submit"
                          type="submit"
                          size="3"
                          loading={isLoading}
                          data-testid="zoo-map-survey-submit-button"
                        >
                          Отправить
                        </Button>
                      )
                    }
                  </Flex>
                </Flex>
                {isSmartCaptchaEnabled && (
                  <InvisibleSmartCaptcha
                    key={smartCaptchaKey}
                    sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY as string}
                    language="ru"
                    onSuccess={onCaptchaSuccess}
                    onChallengeHidden={hideSmartCaptcha}
                    visible={isSmartCaptchaVisible}
                    hideShield
                  />
                )}
              </form>
            )
          }
        </Container>
      </Theme>
      {/* It is rendered outside of the Theme in order to keep the look it has on the rest of the site */}
      {isSubmittedModalOpen && <ZooMapSurveySubmittedModal onCloseModal={() => setIsSubmittedModalOpen(false)} />}
    </>
  );

  function setChoice(questionId: string, value: string[]) {
    setChoices((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function setText(questionId: string, value: string) {
    setTexts((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function goToPage(newPageIndex: number) {
    setError(``);
    setPageIndex(newPageIndex);
    window.scrollTo({
      top: 0,
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasAnswers = Object.keys(getZooMapSurveyResponseData({
      choices,
      texts,
    })).length > 0;

    if (!hasAnswers) {
      setError(`Ответьте хотя бы на один вопрос.`);
      return;
    }

    if (isSmartCaptchaEnabled) {
      showSmartCaptcha();
    } else {
      await submitAnswers();
    }
  }

  async function onCaptchaSuccess(smartCaptchaToken: string) {
    try {
      await submitAnswers(smartCaptchaToken);
    } finally {
      resetSmartCaptcha();
    }
  }

  async function submitAnswers(token = ``) {
    setIsLoading(true);

    try {
      await saveZooMapSurveyResponse({
        choices,
        texts,
        token,
      });

      setError(``);
      setIsSubmitted(true);
      setIsSubmittedModalOpen(true);
    } catch {
      setError(`Не удалось отправить ответы. Попробуйте ещё раз.`);
    } finally {
      setIsLoading(false);
    }
  }
}
