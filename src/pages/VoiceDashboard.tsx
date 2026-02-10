import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  transcribeAudio,
  sendVoiceMessage,
  synthesizeSpeech,
  setRecording,
  setPlaying,
  addMessage,
  clearMessages
  ,
  clearError,
} from '../store/voiceSlice';
import {
  createVoiceSession,
  addMessageToVoiceSession,
} from '../store/voiceHistorySlice';
import VoiceStatusIndicator from '../components/VoiceStatusIndicator';
import VoiceConversationView from '../components/VoiceConversationView';
import UnifiedHeader from '../components/UnifiedHeader';
import VoiceSidebar from '../components/VoiceSidebar';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { audioManager } from '../utils/audioManager';

const VoiceDashboard = () => {
  const dispatch = useAppDispatch();
  const {
    messages,
    isProcessing,
    processingStatus,
    error,
  } = useAppSelector((state) => state.voice);
  
  const { customerId, } = useAppSelector((state) => state.session);
  const { sessions, activeSessionId } = useAppSelector((state) => state.voiceHistory);

  const [textInput, setTextInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isProcessingRef = useRef(false);
  const speakingTimeoutRef = useRef<number | null>(null);

  const {
    isRecording,
    recordingTime,
    audioBlob,
    error: recorderError,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder(5000);

  // Initialize session
  useEffect(() => {
    if (sessions.length === 0) {
      dispatch(createVoiceSession('New Voice Chat'));
    }
  }, [dispatch, sessions.length]);

  // Load messages when active session changes
  useEffect(() => {
    const activeSession = sessions.find(s => s.id === activeSessionId);
    if (activeSession) {
      dispatch(clearMessages());
      activeSession.messages.forEach(msg => {
        dispatch(addMessage(msg));
      });
    }
  }, [activeSessionId, sessions, dispatch]);

  // Sync recording state with store
  useEffect(() => {
    dispatch(setRecording(isRecording));
  }, [isRecording, dispatch]);

  // Handle audio blob after recording with 2-second delay for auto-submit
  useEffect(() => {
    if (audioBlob && !isRecording) {
      const timer = setTimeout(() => {
        handleTranscription(audioBlob);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [audioBlob, isRecording]);

  const handleTranscription = async (blob: Blob) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    
    try {
      const result = await dispatch(transcribeAudio(blob)).unwrap();
      
      const userMessage = {
        role: 'user' as const,
        content: result,
        isVoice: true,
      };
      dispatch(addMessage(userMessage));
      
      if (activeSessionId) {
        dispatch(addMessageToVoiceSession({
          sessionId: activeSessionId,
          message: {
            ...userMessage,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        }));
      }

      await handleSendMessage(result);
      clearRecording();
    } catch (err: any) {
      console.error('Transcription error:', err);
    } finally {
      isProcessingRef.current = false;
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await dispatch(
        sendVoiceMessage({
          message,
          customerId: customerId!,
          verified: true,
        })
      ).unwrap();

      const audioUrl = await dispatch(synthesizeSpeech(response.text_response)).unwrap();
      
      const agentMessage = {
        role: 'agent' as const,
        content: response.text_response,
        isVoice: false,
        audioUrl,
        flow: response.flow,
      };
      dispatch(addMessage(agentMessage));
      
      if (activeSessionId) {
        dispatch(addMessageToVoiceSession({
          sessionId: activeSessionId,
          message: {
            ...agentMessage,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        }));
      }

      playAudio(audioUrl);
      
    } catch (err: any) {
      console.error('Send message error:', err);
    }
  };

  const playAudio = (audioUrl: string) => {
    // Clear any existing timeout
    if (speakingTimeoutRef.current) {
      clearTimeout(speakingTimeoutRef.current);
    }

    dispatch(setPlaying(true));
    audioManager.play(
      audioUrl,
      () => {
        dispatch(setPlaying(false));
        if (speakingTimeoutRef.current) {
          clearTimeout(speakingTimeoutRef.current);
        }
      },
      () => {
        dispatch(setPlaying(false));
        if (speakingTimeoutRef.current) {
          clearTimeout(speakingTimeoutRef.current);
        }
      }
    );

    // Fallback: Stop speaking status after 30 seconds
    speakingTimeoutRef.current = window.setTimeout(() => {
      dispatch(setPlaying(false));
    }, 2000);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: textInput,
      isVoice: false,
    };
    dispatch(addMessage(userMessage));
    
    // Save to session
    if (activeSessionId) {
      dispatch(addMessageToVoiceSession({
        sessionId: activeSessionId,
        message: {
          ...userMessage,
          id: Date.now().toString(),
          timestamp: new Date(),
        },
      }));
    }

    handleSendMessage(textInput);
    setTextInput('');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <VoiceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <UnifiedHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
        {/* Conversation Area */}
        <VoiceConversationView messages={messages} />

        {/* Voice Recorder Section */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <div className="max-w-4xl mx-auto">
            {/* Status Indicator */}
            <div className="flex justify-center mb-3">
              <VoiceStatusIndicator
                isConnected={true}
                processingStatus={processingStatus}
              />
            </div>

            {/* Error Display */}
            {(error || recorderError) && (
              <div className="mb-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {error || recorderError}
                </p>
                <button
                  onClick={() => dispatch(clearError())}
                  className="text-xs text-red-600 dark:text-red-400 underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Recording Status */}
            {isRecording && (
              <div className="mb-3 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-400">
                    Recording... {(recordingTime / 1000).toFixed(1)}s
                  </span>
                </div>
              </div>
            )}

            {/* Compact Input Row */}
            <form onSubmit={handleTextSubmit} className="flex items-center gap-2 sm:gap-3">
              {/* Voice Button */}
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                }`}
                aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              >
                {isRecording ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type or use voice..."
                disabled={isProcessing}
                className="flex-1 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={isProcessing || !textInput.trim()}
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center justify-center"
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </form>

            {/* Helper Text */}
            {!isRecording && !isProcessing && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Click mic to speak (max 5s) or type your message
              </p>
            )}
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default VoiceDashboard;
