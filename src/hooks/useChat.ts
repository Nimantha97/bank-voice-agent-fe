import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addMessage, setLoading, setError, clearError } from '../store/chatSlice';
import { setCustomerId, setVerified } from '../store/sessionSlice';
import { setCustomer } from '../store/authSlice';
import { addMessageToSession } from '../store/chatHistorySlice';
import { chatService } from '../services/chatService';
import type { ChatRequest, VerificationRequest, Message } from '../types';

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector((state) => state.chat);
  const { sessionId, customerId, verified } = useAppSelector((state) => state.session);

  // Send message to backend
  const sendMessage = useCallback(async (message: string, activeSessionId?: string) => {
    try {
      dispatch(clearError());
      dispatch(setLoading(true));

      // Create user message
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: message,
        timestamp: new Date(),
      };

      // Add to Redux state
      dispatch(addMessage(userMessage));
      
      // Save to session history
      if (activeSessionId) {
        dispatch(addMessageToSession({ sessionId: activeSessionId, message: userMessage }));
      }

      // Send to backend
      const request: ChatRequest = {
        message,
        customer_id: customerId,
        session_id: sessionId,
        verified,
      };

      const response = await chatService.sendMessage(request);

      // Create agent message
      const agentMessage: Message = {
        id: uuidv4(),
        role: 'agent',
        content: response.response,
        timestamp: new Date(),
        flow: response.flow,
        balance: response.balance,
        cards: response.cards,
        transactions: response.transactions,
      };

      // Add to Redux state
      dispatch(addMessage(agentMessage));
      
      // Save to session history
      if (activeSessionId) {
        dispatch(addMessageToSession({ sessionId: activeSessionId, message: agentMessage }));
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, sessionId, customerId, verified]);

  // Verify customer identity
  const verifyIdentity = useCallback(async (customerId: string, pin: string) => {
    try {
      dispatch(clearError());
      dispatch(setLoading(true));

      const request: VerificationRequest = {
        customer_id: customerId,
        pin,
      };

      const response = await chatService.verifyIdentity(request);

      if (response.verified) {
        dispatch(setCustomerId(customerId));
        dispatch(setVerified(true));
        if (response.customer) {
          dispatch(setCustomer(response.customer));
        }
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    verifyIdentity,
  };
};
