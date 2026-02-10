import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { VoiceMessage } from '../types/voice';
import { v4 as uuidv4 } from 'uuid';

interface VoiceSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: VoiceMessage[];
}

interface VoiceHistoryState {
  sessions: VoiceSession[];
  activeSessionId: string | null;
}

const STORAGE_KEY = 'bank_voice_history';

const loadFromStorage = (): VoiceHistoryState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        sessions: parsed.sessions.map((s: VoiceSession) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
          messages: s.messages.map((m: VoiceMessage) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        })),
        activeSessionId: parsed.activeSessionId,
      };
    }
  } catch (error) {
    console.error('Failed to load voice history:', error);
  }
  return { sessions: [], activeSessionId: null };
};

const saveToStorage = (state: VoiceHistoryState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save voice history:', error);
  }
};

const initialState: VoiceHistoryState = loadFromStorage();

const voiceHistorySlice = createSlice({
  name: 'voiceHistory',
  initialState,
  reducers: {
    createVoiceSession: (state, action: PayloadAction<string>) => {
      const newSession: VoiceSession = {
        id: uuidv4(),
        title: action.payload || 'New Voice Chat',
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [],
      };
      state.sessions.unshift(newSession);
      state.activeSessionId = newSession.id;
      saveToStorage(state);
    },
    setActiveVoiceSession: (state, action: PayloadAction<string>) => {
      state.activeSessionId = action.payload;
      saveToStorage(state);
    },
    deleteVoiceSession: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
      if (state.activeSessionId === action.payload) {
        state.activeSessionId = state.sessions[0]?.id || null;
      }
      saveToStorage(state);
    },
    addMessageToVoiceSession: (state, action: PayloadAction<{ sessionId: string; message: VoiceMessage }>) => {
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
    loadVoiceSessionMessages: () => {
      // This is handled by the component
    },
  },
});

export const { 
  createVoiceSession, 
  setActiveVoiceSession, 
  deleteVoiceSession,
  addMessageToVoiceSession,
  loadVoiceSessionMessages,
} = voiceHistorySlice.actions;

export default voiceHistorySlice.reducer;
