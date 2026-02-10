import { Mic, Square } from 'lucide-react';

interface VoiceRecorderButtonProps {
  isRecording: boolean;
  recordingTime: number;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const VoiceRecorderButton = ({
  isRecording,
  recordingTime,
  isProcessing,
  onStartRecording,
  onStopRecording,
}: VoiceRecorderButtonProps) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 100);
    return `${seconds}.${milliseconds}s`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        disabled={isProcessing}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
        }`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {/* Pulsing animation when recording */}
        {isRecording && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500 dark:bg-red-600 animate-ping opacity-75" />
            <span className="absolute inset-0 rounded-full bg-red-500 dark:bg-red-600 animate-pulse" />
          </>
        )}
        
        {isRecording ? (
          <Square className="w-10 h-10 text-white relative z-10" fill="white" />
        ) : (
          <Mic className="w-10 h-10 text-white relative z-10" />
        )}
      </button>

      {/* Recording timer */}
      {isRecording && (
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
            {formatTime(recordingTime)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Recording...
          </div>
        </div>
      )}

      {/* Instruction text */}
      {!isRecording && !isProcessing && (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Tap to Speak
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Hold for up to 5 seconds
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderButton;
