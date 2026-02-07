interface VoiceControlsProps {
  enabled: boolean;
  onToggle: () => void;
  isSpeaking: boolean;
  onStop: () => void;
  rate: number;
  onRateChange: (rate: number) => void;
}

const VoiceControls = ({ 
  enabled, 
  onToggle, 
  isSpeaking, 
  onStop,
  rate,
  onRateChange 
}: VoiceControlsProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          enabled
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        {enabled ? 'Voice ON' : 'Voice OFF'}
      </button>

      {enabled && (
        <>
          {isSpeaking && (
            <button
              onClick={onStop}
              className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          )}

          <div className="flex items-center gap-2 ml-2">
            <label className="text-xs text-gray-600 dark:text-gray-400">Speed:</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{rate.toFixed(1)}x</span>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceControls;
