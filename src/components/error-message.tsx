import { Box, Text } from 'ink';
import { Menu } from './menu.js';
import { useInput } from 'ink';

interface ErrorMessageProps {
  message: string;
  onNewQuestion: () => void;
  onExit: () => void;
}

export const ErrorMessage = (props: ErrorMessageProps) => {

  useInput((input) => {
    if (input === 'n') {
      props.onNewQuestion();
    }
    if (input === 'q') {
      props.onExit();
    }
  });

  return (
    <Box flexDirection='column'>
      <Box marginRight={1}>
        <Text backgroundColor="red" color="white">ERROR:</Text>
      </Box>
      <Text>{props.message}</Text>
      <Box marginTop={2}>
        <Menu items={[
          { letter: 'n', name: 'New question' },
          { letter: 'q', name: 'Quit' },
        ]} />
      </Box>
    </Box>
  );

};