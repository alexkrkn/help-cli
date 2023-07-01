import { useCallback, useRef } from 'react';
import json5 from 'json5';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { PROMPT_SYSTEM, PROMPT_USER_RESPONSE } from '../prompts.js';

// const DEFAULT_MODEL = 'gpt-3.5-turbo-0301';
export const DEFAULT_MODEL = 'gpt-3.5-turbo';

const FIRST_MESSAGE: ChatCompletionRequestMessage = { role: 'user', content: PROMPT_SYSTEM };
const RESPONSE_FORMAT_MESSAGE: ChatCompletionRequestMessage = { role: 'user', content: PROMPT_USER_RESPONSE };

export interface ChatResponse {
  command: string;
  explanation: string;
  error: string;
}

const errorResponse = (error: string): ChatResponse => {
  return {
    command: '',
    explanation: '',
    error,
  };
};

export const useOpenAI = () => {

  const apiRef = useRef<OpenAIApi | null>(null);

  const makeRequest = useCallback(async (questions: string[]): Promise<ChatResponse> => {
    if (!apiRef.current) {
      throw Error('Cannot make request before api is initialized');
    }
    const messages: ChatCompletionRequestMessage[] = [FIRST_MESSAGE];
    for (const question of questions) {
      messages.push({ role: 'user', content: question });
    }
    messages.push(RESPONSE_FORMAT_MESSAGE);
    // console.log(messages);
    try {
      const completion = await apiRef.current.createChatCompletion({
        model: DEFAULT_MODEL,
        messages,
      });
      if (completion.data?.choices.length) {
        const resp = completion.data.choices[0].message?.content;
        if (resp) {
          return json5.parse(resp);
        } else {
          return errorResponse('Could not parse response from OpenAI');
        }
      } else {
        return errorResponse('No response from OpenAI');
      }
    } catch (e: any) {
      // console.error(e);
      return errorResponse(e.message);
    }
  }, []);

  const setApiKey = useCallback((apiKey: string) => {
    apiRef.current = new OpenAIApi(new Configuration({ apiKey }));
  }, []);

  return {
    makeRequest,
    setApiKey,
  };

}