import { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface VoiceVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (customerId: string, pin: string) => void;
  error?: string;
}

const VoiceVerificationModal = ({
  isOpen,
  onClose,
  onVerify,
  error,
}: VoiceVerificationModalProps) => {
  const [customerId, setCustomerId] = useState('');
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(customerId, pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Identity Verification</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Please verify your identity to continue with voice banking services.
          </p>

          {/* Customer ID */}
          <div>
            <label
              htmlFor="customerId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Customer ID
            </label>
            <input
              type="text"
              id="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="Enter your Customer ID"
              required
            />
          </div>

          {/* PIN */}
          <div>
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="Enter your PIN"
              maxLength={4}
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white transition-colors font-medium shadow-lg shadow-blue-500/30"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoiceVerificationModal;
