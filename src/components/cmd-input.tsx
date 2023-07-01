import { useState } from 'react';
import TextInput from 'ink-text-input';
import { Box, Text } from 'ink';
import { Questions } from './questions.js';

interface CmdInputProps {
  questions: string[];
  onSubmit: (query: string) => void;
}

export const CmdInput = (props: CmdInputProps) => {

  const [query, setQuery] = useState('');

  return (
    <Box flexDirection='column'>
      <Box marginBottom={1} flexDirection='column'>
        {Boolean(props.questions.length === 0) && <>
          <Text>Enter your CLI question to ChatGPT:</Text>
          <Text color="gray">Exmple: How do I convert a video to a gif using ffmpeg?</Text>
        </>}
        {Boolean(props.questions.length) && <>
          <Box marginBottom={1}>
            <Questions questions={props.questions} isHighlightLast={false} />
          </Box>
          <Text>Ask a follow-up:</Text>
        </>}
      </Box>
      <Box marginRight={1}>
        <Text bold color="cyan">
          ›{' '}
        </Text>
        <TextInput value={query} onChange={setQuery} onSubmit={props.onSubmit} />
      </Box>
    </Box>
  );

};