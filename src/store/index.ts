import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import sessionReducer from './sessionSlice';
import authReducer from './authSlice';
import chatHistoryReducer from './chatHistorySlice';
import themeReducer from './themeSlice';
import voiceReducer from './voiceSlice';
import voiceHistoryReducer from './voiceHistorySlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    session: sessionReducer,
    auth: authReducer,
    chatHistory: chatHistoryReducer,
    theme: themeReducer,
    voice: voiceReducer,
    voiceHistory: voiceHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore timestamp fields in messages
        ignoredActions: ['chat/addMessage', 'chatHistory/createSession', 'chatHistory/updateSessionTitle'],
        ignoredPaths: ['chat.messages', 'chatHistory.sessions'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
