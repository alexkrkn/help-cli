import { useState } from 'react';
import { Box, Text } from 'ink';
import { Questions } from './questions.js';
import { Menu } from './menu.js';
import { useInput } from 'ink';
import { marked } from 'marked'
import MarkedTerminal from 'marked-terminal'

marked.setOptions({
  renderer: new MarkedTerminal() as any,
  mangle: false,
  headerIds: false,
});

interface ResultProps {
  questions: string[];
  text: string;
  explanation: string;
  onNewQuestion: () => void;
  onAskFollowup: () => void;
  onCopyToClipboard: () => void;
  onExit: () => void;
}

export const Result = (props: ResultProps) => {

  const [notification, setNotification] = useState<string>('');

  useInput((input) => {
    if (input === 'n') {
      props.onNewQuestion();
    }
    if (input === 'f') {
      props.onAskFollowup();
    }
    if (input === 'c') {
      props.onCopyToClipboard();
      setNotification('👍 Copied to clipboard!');
      setTimeout(() => {
        setNotification('');
      }, 1500);
    }
    if (input === 'q') {
      props.onExit();
    }
  });

  return (
    <Box flexDirection='column' marginBottom={1}>
      <Box marginBottom={1}>
        <Questions questions={props.questions} isHighlightLast={true} />
      </Box>
      <Box marginBottom={1}>
        <Text bold underline color="cyan">Command:</Text>
      </Box>
      <Text>{props.text}</Text>
      <Box marginBottom={1} marginTop={1}>
        <Text bold underline color="cyanBright">Explanation:</Text>
      </Box>
      <Text>{marked(props.explanation)}</Text>
      <Box marginTop={2}>
        {Boolean(notification) && <Text color="green">{notification}</Text>}
        {Boolean(!notification) &&
          <Menu items={[
            { letter: 'n', name: 'New question' },
            { letter: 'f', name: 'Ask a followup' },
            { letter: 'c', name: 'Copy command' },
            { letter: 'q', name: 'Quit' },
          ]} />
        }
      </Box>
    </Box>
  );

};