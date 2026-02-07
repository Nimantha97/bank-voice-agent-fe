import apiClient from './api';
import type { ChatRequest, ChatResponse, VerificationRequest, VerificationResponse } from '../types';
import { API_ENDPOINTS } from '../types/constants';

export const chatService = {
  // Send chat message
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>(API_ENDPOINTS.CHAT, request);
    return response.data;
  },

  // Verify customer identity
  verifyIdentity: async (request: VerificationRequest): Promise<VerificationResponse> => {
    const response = await apiClient.post<VerificationResponse>(API_ENDPOINTS.VERIFY, request);
    return response.data;
  },
};
