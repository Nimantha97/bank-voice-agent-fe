import { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import { useSession } from '../hooks/useSession';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createSession } from '../store/chatHistorySlice';
import { setMessages } from '../store/chatSlice';
import Sidebar from '../components/Sidebar';
import UnifiedHeader from '../components/UnifiedHeader';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import ErrorAlert from '../components/ErrorAlert';
import VoiceInputButton from '../components/VoiceInputButton';
import VoiceControls from '../components/VoiceControls';

const ChatPage = () => {
  useSession();
  const dispatch = useAppDispatch();
  const { messages, loading, error, sendMessage } = useChat();
  const { sessions, activeSessionId } = useAppSelector((state) => state.chatHistory);
  
  // Voice features
  const { transcript, isListening, isSupported: sttSupported, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { speak, stop, isSpeaking, isSupported: ttsSupported, rate, setRate, enabled: ttsEnabled, setEnabled: setTtsEnabled } = useSpeechSynthesis();
  
  const [inputValue, setInputValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isSendingMessageRef = useRef(false);

  // Load messages when active session changes
  useEffect(() => {
    const activeSession = sessions.find(s => s.id === activeSessionId);
    if (activeSession) {
      dispatch(setMessages(activeSession.messages));
    }
  }, [activeSessionId, sessions, dispatch]);

  useEffect(() => {
    if (sessions.length === 0) {
      dispatch(createSession('New Conversation'));
    }
  }, [dispatch, sessions.length]);

  // Update input with voice transcript
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  // Auto-submit after voice input stops
  useEffect(() => {
    if (!isListening && transcript && inputValue) {
      const timer = setTimeout(() => {
        handleSendMessage();
      }, 1500); // 1.5 second delay after voice stops

      return () => clearTimeout(timer);
    }
  }, [isListening, transcript, inputValue]);

  // Auto-read agent responses - only when actively sending messages
  useEffect(() => {
    if (!isSendingMessageRef.current || messages.length === 0 || !ttsEnabled) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'agent') {
      speak(lastMessage.content);
      isSendingMessageRef.current = false; // Reset after playing
    }
  }, [messages, ttsEnabled, speak]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading || !activeSessionId) return;

    if (isListening) {
      stopListening();
    }

    const messageText = inputValue;
    setInputValue('');
    resetTranscript();

    isSendingMessageRef.current = true;

    try {
      await sendMessage(messageText, activeSessionId);
    } catch (err) {
      console.error('Failed to send message:', err);
      isSendingMessageRef.current = false;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <UnifiedHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 overflow-hidden flex flex-col px-6 sm:px-8 lg:px-12 py-6">
          <MessageList messages={messages} loading={loading} />
          
          {error && <ErrorAlert message={error} />}
          
          {ttsSupported && (
            <div className="mb-4">
              <VoiceControls
                enabled={ttsEnabled}
                onToggle={() => setTtsEnabled(!ttsEnabled)}
                isSpeaking={isSpeaking}
                onStop={stop}
                rate={rate}
                onRateChange={setRate}
              />
            </div>
          )}
          
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            onKeyPress={handleKeyPress}
            disabled={loading}
            loading={loading}
            voiceButton={
              <VoiceInputButton
                isListening={isListening}
                isSupported={sttSupported}
                onStart={startListening}
                onStop={stopListening}
                disabled={loading}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
