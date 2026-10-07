import { ComponentType, PropsWithChildren } from 'react';
import {
  CheckboxGroup,
  Flex,
  Heading,
  RadioGroup,
  Text,
  TextArea,
} from '@radix-ui/themes';
import { MAX_TEXT_LENGTH, ZooMapSurveyFormValues } from '../../getZooMapSurveyResponseData';
import { ChoiceQuestion, CUSTOM_ANSWER_OPTION, SurveyQuestion } from '../../zooMapSurveyQuestions';

// With "moduleResolution": "node" TypeScript can't resolve the `radix-ui/internal` types that CheckboxGroup.Root props
// are built from, so the inherited div props (including children) are lost and have to be added back
const CheckboxGroupRoot = CheckboxGroup.Root as ComponentType<PropsWithChildren<CheckboxGroup.RootProps & {
  'aria-labelledby'?: string;
}>>;

type AnswerHandlers = {
  onChoiceChange: (questionId: string, value: string[]) => void;
  onTextChange: (questionId: string, value: string) => void;
};

export function ZooMapSurveyQuestion({
  question,
  choices,
  texts,
  onChoiceChange,
  onTextChange,
}: ZooMapSurveyFormValues & AnswerHandlers & {
  question: SurveyQuestion;
}) {
  const labelId = `${question.id}-label`;

  if (question.type === `group`) {
    return (
      <div
        role="group"
        aria-labelledby={labelId}
      >
        <Heading
          as="h2"
          size="4"
          mb="4"
          id={labelId}
        >
          {question.label}
        </Heading>
        <Flex
          direction="column"
          gap="5"
        >
          {question.questions.map((groupQuestion) => (
            <div key={groupQuestion.id}>
              <ZooMapSurveyChoiceQuestion
                question={groupQuestion}
                groupLabelId={labelId}
                choices={choices}
                texts={texts}
                onChoiceChange={onChoiceChange}
                onTextChange={onTextChange}
              />
            </div>
          ))}
        </Flex>
      </div>
    );
  }

  if (question.type === `text`) {
    return (
      <>
        <Heading
          as="h2"
          size="4"
          mb="3"
        >
          <label htmlFor={question.id}>
            {question.label}
          </label>
        </Heading>
        <TextArea
          id={question.id}
          size="3"
          resize="vertical"
          maxLength={MAX_TEXT_LENGTH}
          value={texts[question.id] || ``}
          onChange={(e) => onTextChange(question.id, e.target.value)}
        />
      </>
    );
  }

  return (
    <ZooMapSurveyChoiceQuestion
      question={question}
      choices={choices}
      texts={texts}
      onChoiceChange={onChoiceChange}
      onTextChange={onTextChange}
    />
  );
}

function ZooMapSurveyChoiceQuestion({
  question,
  groupLabelId,
  choices,
  texts,
  onChoiceChange,
  onTextChange,
}: ZooMapSurveyFormValues & AnswerHandlers & {
  question: ChoiceQuestion;
  // Id of the group title, it is set for the questions of a group
  groupLabelId?: string;
}) {
  const labelId = `${question.id}-label`;
  const selectedOptions = choices[question.id] || [];

  return (
    <>
      {
        question.label && (
          groupLabelId ? (
            <Text
              as="p"
              size="3"
              weight="medium"
              mb="3"
              id={labelId}
            >
              {question.label}
            </Text>
          ) : (
            <Heading
              as="h2"
              size="4"
              mb="3"
              id={labelId}
            >
              {question.label}
            </Heading>
          )
        )
      }
      {
        question.type === `radio` ? (
          <RadioGroup.Root
            size="3"
            aria-labelledby={question.label ? labelId : groupLabelId}
            value={selectedOptions[0] || ``}
            onValueChange={(value) => onChoiceChange(question.id, [value])}
          >
            {question.options.map((option) => (
              <RadioGroup.Item
                key={option}
                value={option}
              >
                {option}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        ) : (
          <CheckboxGroupRoot
            size="3"
            aria-labelledby={question.label ? labelId : groupLabelId}
            value={selectedOptions}
            onValueChange={(value) => onChoiceChange(question.id, value)}
          >
            {question.options.map((option) => (
              <CheckboxGroup.Item
                key={option}
                value={option}
              >
                {option}
              </CheckboxGroup.Item>
            ))}
          </CheckboxGroupRoot>
        )
      }
      {
        selectedOptions.includes(CUSTOM_ANSWER_OPTION) && (
          <TextArea
            mt="3"
            size="3"
            resize="vertical"
            maxLength={MAX_TEXT_LENGTH}
            aria-label={CUSTOM_ANSWER_OPTION}
            data-testid={`zoo-map-survey-custom-answer-${question.id}`}
            value={texts[question.id] || ``}
            onChange={(e) => onTextChange(question.id, e.target.value)}
          />
        )
      }
    </>
  );
}
