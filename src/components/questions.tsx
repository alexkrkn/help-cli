import { Box, Text } from 'ink';

interface QuestionsProps {
  questions: string[];
  isHighlightLast: boolean;
}

export const Questions = (props: QuestionsProps) => {

  return (
    <Box flexDirection='column'>
      {props.questions.map((message, i) => {
        if (i === props.questions.length - 1 && props.isHighlightLast) {
          return <Text bold color="white" key={i}>› {message}</Text>;
        } else {
          return <Text color="gray" key={i}>› {message}</Text>;
        }
      })}
    </Box>
  );

};