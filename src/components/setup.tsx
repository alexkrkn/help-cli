import { useCallback, useState } from 'react';
import TextInput from 'ink-text-input';
import { Box, Text } from 'ink';
import { useInput } from 'ink';
import { DEFAULT_MODEL } from '../hooks/use-openai.js';

interface CmdInputProps {
  configPath: string;
  onSetApiKey: (key: string) => void;
  onSetModel: (model: string) => void;
  onDone: () => void;
}

export const Setup = (props: CmdInputProps) => {

  const [setupState, setSetupState] = useState<'apiKey' | 'model' | 'done'>('apiKey');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');

  useInput(() => {
    if (setupState === 'done') {
      props.onDone();
    }
  });

  const onSubmitApiKey = useCallback(() => {
    props.onSetApiKey(apiKey);
    setSetupState('model');
  }, [apiKey]);

  const onSubmitModel = useCallback(() => {
    props.onSetModel(model);
    setSetupState('done');
  }, [model]);

  return (
    <Box flexDirection='column'>
      <Box marginBottom={1} flexDirection='column'>
        <Text color="cyan" bold underline>Initial Setup</Text>
      </Box>
      {Boolean(setupState === 'apiKey') && <>
        <Box marginBottom={1} flexDirection='column'>
          <Text>Your OpenAI API key is required to make requests</Text>
          <Text color="gray">Get it from https://platform.openai.com/account/api-keys</Text>
        </Box>
        <Box marginBottom={1} flexDirection='row'>
          <Box marginRight={1}>
            <Text bold>Enter OpenAI API Key:</Text>
          </Box>
          <TextInput value={apiKey} onChange={setApiKey} onSubmit={onSubmitApiKey} />
        </Box>
      </>}
      {Boolean(setupState === 'model') && <>
        <Box marginBottom={1} flexDirection='column'>
          <Text>Enter the model to use</Text>
          <Text color="gray">Leave empty to use '{DEFAULT_MODEL}'</Text>
        </Box>
        <Box marginBottom={1} flexDirection='row'>
          <Box marginRight={1}>
            <Text bold>Enter Model:</Text>
          </Box>
          <TextInput value={model} onChange={setModel} onSubmit={onSubmitModel} />
        </Box>
      </>}
      {Boolean(setupState === 'done') && <>
        <Box marginBottom={1} flexDirection='column'>
          <Text>Config was saved to {props.configPath}</Text>
        </Box>
        <Box marginBottom={1} flexDirection='row'>
          <Box marginRight={1}>
            <Text bold>Press any key to continue...</Text>
          </Box>
        </Box>
      </>}
    </Box>
  );

};