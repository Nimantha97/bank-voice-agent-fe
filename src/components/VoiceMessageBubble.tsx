import { memo, useState, useEffect, useRef } from 'react';
import { Volume2, Mic, Pause } from 'lucide-react';
import type { VoiceMessage } from '../types/voice';
import { audioManager } from '../utils/audioManager';

interface VoiceMessageBubbleProps {
  message: VoiceMessage;
}

const VoiceMessageBubble = memo(({ message }: VoiceMessageBubbleProps) => {
  const isUser = message.role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStop = () => setIsPlaying(false);
    const element = containerRef.current;
    if (element) {
      element.addEventListener('stopAudio', handleStop);
      return () => element.removeEventListener('stopAudio', handleStop);
    }
  }, []);

  const handlePlayAudio = () => {
    if (!message.audioUrl) return;

    if (isPlaying) {
      audioManager.stop();
      setIsPlaying(false);
    } else {
      // Stop any other playing message
      const allMessages = document.querySelectorAll('[data-audio-playing="true"]');
      allMessages.forEach(msg => {
        const event = new CustomEvent('stopAudio');
        msg.dispatchEvent(event);
      });

      audioManager.play(
        message.audioUrl,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      setIsPlaying(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      data-audio-playing={isPlaying}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-md ${
            isUser
              ? 'bg-blue-600 dark:bg-blue-700 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
          }`}
        >
          {/* Voice indicator */}
          {message.isVoice && (
            <div className={`flex items-center gap-1.5 mb-2 text-xs ${isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              <Mic className="w-3 h-3" />
              <span>Voice message</span>
            </div>
          )}

          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Flow indicator */}
          {message.flow && !isUser && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Flow: {message.flow}
              </span>
            </div>
          )}
        </div>

        {/* Audio playback button for agent messages */}
        {!isUser && message.audioUrl && (
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors text-sm"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Timestamp */}
        <div className={`mt-1.5 text-xs text-gray-500 dark:text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
});

export default VoiceMessageBubble;
