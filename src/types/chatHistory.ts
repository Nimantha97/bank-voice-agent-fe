import type { Message } from './index';

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface ChatHistoryState {
  sessions: ChatSession[];
  activeSessionId: string | null;
}
