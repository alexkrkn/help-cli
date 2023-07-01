import { useCallback, useLayoutEffect, useState } from 'react';
import { render, Box, useApp } from 'ink';
import { ChatResponse } from './hooks/use-openai.js';
import { Loading } from './components/loading.js';
import { CmdInput } from './components/cmd-input.js';
import { Result } from './components/result.js';
import { ErrorMessage } from './components/error-message.js';
import clipboard from 'clipboardy';
import Conf from 'conf';
import { Setup } from './components/setup.js';
import { useOpenAI } from './hooks/use-openai.js';

export const CONFIG_KEY_API_KEY = 'apiKey';
export const CONFIG_KEY_MODEL = 'model';

export const config = new Conf({ projectName: 'help-cli' });

const Main = () => {

  const [appState, setAppState] = useState<'setup' | 'loading' | 'error' | 'result' | 'input'>('input');
  const { makeRequest, setApiKey } = useOpenAI();
  const [questions, setQuestions] = useState<string[]>([]);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const { exit } = useApp();

  useLayoutEffect(() => {
    if (!config.get(CONFIG_KEY_API_KEY)) {
      setAppState('setup');
    } else {
      setApiKey(config.get(CONFIG_KEY_API_KEY) as string);
      setAppState('input');
    }
  }, []);

  const onSetApiKey = useCallback((apiKey: string) => {
    config.set(CONFIG_KEY_API_KEY, apiKey);
    setApiKey(apiKey);
  }, [setApiKey]);

  const onSetModel = useCallback((model: string) => {
    config.set(CONFIG_KEY_MODEL, model);
  }, []);

  const onNewQuestion = useCallback(() => {
    setQuestions([]);
    setAppState('input');
  }, []);

  const onAskFollowup = useCallback(() => {
    setAppState('input');
  }, []);

  const onCopyToClipboard = useCallback(() => {
    if (result?.command) {
      clipboard.write(result.command);
    }
  }, []);

  const onExit = useCallback(() => {
    exit();
  }, []);

  const onSubmit = useCallback(async (query: string) => {
    setAppState('loading');
    setQuestions(q => [...q, query]);
    const res = await makeRequest([...questions, query]);
    setResult(res);
    if (res.error) {
      setAppState('error');
    } else {
      setAppState('result');
    }
  }, [questions]);

  const onSetupDone = useCallback(() => {
    setAppState('input');
  }, []);

  return (
    <Box marginLeft={4} marginRight={4} marginTop={2} marginBottom={2}>
      {appState === 'setup' && <Setup
        configPath={config.path}
        onSetApiKey={onSetApiKey}
        onSetModel={onSetModel}
        onDone={onSetupDone}
      />}
      {appState === 'input' && <CmdInput questions={questions} onSubmit={onSubmit} />}
      {appState === 'loading' && <Loading questions={questions} />}
      {appState === 'error' && <ErrorMessage
        message={result?.error as string}
        onNewQuestion={onNewQuestion}
        onExit={onExit}
      />}
      {appState === 'result' && <Result
        questions={questions}
        text={result?.command as string}
        explanation={result?.explanation as string}
        onAskFollowup={onAskFollowup}
        onCopyToClipboard={onCopyToClipboard}
        onNewQuestion={onNewQuestion}
        onExit={onExit}
      />}
    </Box>
  );
};

export const renderCli = () => {
  render(<Main />);
};