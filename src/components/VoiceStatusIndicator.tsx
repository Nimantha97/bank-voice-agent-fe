import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import type { ProcessingStatus } from '../types/voice';

interface VoiceStatusIndicatorProps {
  isConnected: boolean;
  processingStatus: ProcessingStatus;
}

const VoiceStatusIndicator = ({ isConnected, processingStatus }: VoiceStatusIndicatorProps) => {
  const getStatusText = () => {
    switch (processingStatus) {
      case 'listening':
        return 'Listening...';
      case 'transcribing':
        return 'Transcribing...';
      case 'thinking':
        return 'Thinking...';
      case 'speaking':
        return 'Speaking...';
      default:
        return isConnected ? 'Connected' : 'Disconnected';
    }
  };

  const getStatusColor = () => {
    if (!isConnected) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700';
    if (processingStatus !== 'idle') return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700';
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700';
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor()} transition-colors duration-300`}>
      {processingStatus !== 'idle' ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isConnected ? (
        <Wifi className="w-4 h-4" />
      ) : (
        <WifiOff className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{getStatusText()}</span>
    </div>
  );
};

export default VoiceStatusIndicator;
