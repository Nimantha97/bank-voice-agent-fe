import apiClient from './api';
import type {
  TranscribeResponse,
  VoiceChatRequest,
  VoiceChatResponse,
} from '../types/voice';

const VOICE_BASE = '/api/voice';

export const voiceService = {
  // Speech-to-Text
  async transcribe(audioBlob: Blob): Promise<TranscribeResponse> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    const response = await apiClient.post<TranscribeResponse>(
      `${VOICE_BASE}/transcribe`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Text-to-Speech
  async synthesize(text: string, voice: string = 'alloy'): Promise<Blob> {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('voice', voice);

    const response = await apiClient.post(
      `${VOICE_BASE}/synthesize`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      }
    );
    return response.data;
  },

  // Voice Chat
  async chat(request: VoiceChatRequest): Promise<VoiceChatResponse> {
    const response = await apiClient.post<VoiceChatResponse>(
      `${VOICE_BASE}/chat`,
      request
    );
    return response.data;
  },
};
