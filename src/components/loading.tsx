import Spinner from 'ink-spinner';
import { Box, Text } from 'ink';
import { Questions } from './questions.js';

interface LoadingProps {
  questions: string[];
}

export const Loading = (props: LoadingProps) => {

  return (
    <Box flexDirection='column'>
      <Box marginBottom={1}>
        <Questions questions={props.questions} isHighlightLast={true} />
      </Box>
      <Box marginBottom={1}>
        <Box marginRight={1}>
          <Spinner type="dots" />
        </Box>
        <Text color="gray">🤔 ChatGPT is thinking...</Text>
      </Box>
    </Box>
  );

};