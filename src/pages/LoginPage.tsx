import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { setCustomerId, setVerified } from '../store/sessionSlice';
import { setCustomer } from '../store/authSlice';
import { chatService } from '../services/chatService';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [customerId, setCustomerIdInput] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await chatService.verifyIdentity({
        customer_id: customerId,
        pin,
      });

      if (response.verified) {
        dispatch(setCustomerId(customerId));
        dispatch(setVerified(true));
        if (response.customer) {
          dispatch(setCustomer(response.customer));
        }
        navigate('/chat');
      } else {
        setError('Invalid Customer ID or PIN');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-8 py-10 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bank ABC
            </h1>
            <p className="text-blue-100">
              AI-Powered Banking Assistant
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sign in to access your banking assistant
              </p>
            </div>

            {/* Customer ID */}
            <div>
              <label
                htmlFor="customerId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Customer ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="customerId"
                  value={customerId}
                  onChange={(e) => setCustomerIdInput(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your Customer ID"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* PIN */}
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your PIN"
                  maxLength={4}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Test Credentials */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Credentials:
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Customer ID: <span className="font-mono font-semibold">CUST001</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                PIN: <span className="font-mono font-semibold">1234</span>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Secure banking powered by AI technology
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
