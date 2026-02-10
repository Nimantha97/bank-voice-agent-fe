import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { voiceService } from '../services/voiceService';
import type { VoiceState, VoiceMessage, ProcessingStatus } from '../types/voice';

const initialState: VoiceState = {
  messages: [],
  isRecording: false,
  isProcessing: false,
  processingStatus: 'idle',
  isPlaying: false,
  error: null,
  sessionId: null,
  verified: false,
  customerId: null,
};

// Async Thunks
export const transcribeAudio = createAsyncThunk(
  'voice/transcribe',
  async (audioBlob: Blob) => {
    const response = await voiceService.transcribe(audioBlob);
    return response.text;
  }
);

export const sendVoiceMessage = createAsyncThunk(
  'voice/sendMessage',
  async (
    { message, customerId, verified, sessionId }: {
      message: string;
      customerId: string;
      verified: boolean;
      sessionId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await voiceService.chat({
        message,
        customer_id: customerId,
        verified,
        session_id: sessionId,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const synthesizeSpeech = createAsyncThunk(
  'voice/synthesize',
  async (text: string) => {
    const audioBlob = await voiceService.synthesize(text);
    return URL.createObjectURL(audioBlob);
  }
);

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
      state.processingStatus = action.payload ? 'listening' : 'idle';
    },
    setProcessingStatus: (state, action: PayloadAction<ProcessingStatus>) => {
      state.processingStatus = action.payload;
      state.isProcessing = action.payload !== 'idle';
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
      if (action.payload) {
        state.processingStatus = 'speaking';
      } else if (state.processingStatus === 'speaking') {
        state.processingStatus = 'idle';
      }
    },
    addMessage: (state, action: PayloadAction<any>) => {
      const message: VoiceMessage = {
        role: action.payload.role,
        content: action.payload.content,
        isVoice: action.payload.isVoice,
        id: action.payload.id || Date.now().toString(),
        timestamp: action.payload.timestamp || new Date(),
        audioUrl: action.payload.audioUrl,
        flow: action.payload.flow,
      };
      // Avoid duplicates
      if (!state.messages.find(m => m.id === message.id)) {
        state.messages.push(message);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
    setVerification: (state, action: PayloadAction<{ verified: boolean; customerId: string }>) => {
      state.verified = action.payload.verified;
      state.customerId = action.payload.customerId;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Transcribe
    builder
      .addCase(transcribeAudio.pending, (state) => {
        state.processingStatus = 'transcribing';
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(transcribeAudio.fulfilled, (state) => {
        state.processingStatus = 'idle';
        state.isProcessing = false;
      })
      .addCase(transcribeAudio.rejected, (state, action) => {
        state.processingStatus = 'idle';
        state.isProcessing = false;
        state.error = action.error.message || 'Transcription failed';
      });

    // Send Message
    builder
      .addCase(sendVoiceMessage.pending, (state) => {
        state.processingStatus = 'thinking';
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(sendVoiceMessage.fulfilled, (state, action) => {
        state.sessionId = action.payload.session_id;
        state.processingStatus = 'idle';
        state.isProcessing = false;
      })
      .addCase(sendVoiceMessage.rejected, (state, action) => {
        state.processingStatus = 'idle';
        state.isProcessing = false;
        state.error = action.payload as string || 'Failed to send message';
      });

    // Synthesize
    builder
      .addCase(synthesizeSpeech.pending, (state) => {
        state.processingStatus = 'speaking';
        state.isProcessing = true;
      })
      .addCase(synthesizeSpeech.fulfilled, (state) => {
        state.isProcessing = false;
      })
      .addCase(synthesizeSpeech.rejected, (state, action) => {
        state.processingStatus = 'idle';
        state.isProcessing = false;
        state.error = action.error.message || 'Speech synthesis failed';
      });
  },
});

export const {
  setRecording,
  setProcessingStatus,
  setPlaying,
  addMessage,
  clearMessages,
  setVerification,
  clearError,
} = voiceSlice.actions;

export default voiceSlice.reducer;
