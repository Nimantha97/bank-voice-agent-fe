import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatHistoryState, ChatSession } from '../types/chatHistory';
import type { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'bank_chat_history';

const loadFromStorage = (): ChatHistoryState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        sessions: parsed.sessions.map((s: ChatSession) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
          messages: s.messages.map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        })),
        activeSessionId: parsed.activeSessionId,
      };
    }
  } catch (error) {
    console.error('Failed to load chat history:', error);
  }
  return { sessions: [], activeSessionId: null };
};

const saveToStorage = (state: ChatHistoryState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

const initialState: ChatHistoryState = loadFromStorage();

const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    createSession: (state, action: PayloadAction<string>) => {
      const newSession: ChatSession = {
        id: uuidv4(),
        title: action.payload || 'New Conversation',
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [],
      };
      state.sessions.unshift(newSession);
      state.activeSessionId = newSession.id;
      saveToStorage(state);
    },
    setActiveSession: (state, action: PayloadAction<string>) => {
      state.activeSessionId = action.payload;
      saveToStorage(state);
    },
    updateSessionTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const session = state.sessions.find(s => s.id === action.payload.id);
      if (session) {
        session.title = action.payload.title;
        session.updatedAt = new Date();
        saveToStorage(state);
      }
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
      if (state.activeSessionId === action.payload) {
        state.activeSessionId = state.sessions[0]?.id || null;
      }
      saveToStorage(state);
    },
    addMessageToSession: (state, action: PayloadAction<{ sessionId: string; message: Message }>) => {
      const session = state.sessions.find(s => s.id === action.payload.sessionId);
      if (session) {
        session.messages.push(action.payload.message);
        session.updatedAt = new Date();
        if (session.messages.length === 1) {
          session.title = action.payload.message.content.slice(0, 50);
        }
        saveToStorage(state);
      }
    },
    clearAllSessions: (state) => {
      state.sessions = [];
      state.activeSessionId = null;
      saveToStorage(state);
    },
  },
});

export const { 
  createSession, 
  setActiveSession, 
  updateSessionTitle, 
  deleteSession,
  addMessageToSession,
  clearAllSessions 
} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
