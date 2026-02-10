import { useAppSelector } from '../store/hooks';
import ThemeToggle from './ThemeToggle';

interface ChatHeaderProps {
  onMenuClick: () => void;
}

const ChatHeader = ({ onMenuClick }: ChatHeaderProps) => {
  const { customerId, verified } = useAppSelector((state) => state.session);
  const { customer } = useAppSelector((state) => state.auth);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center h-20 px-6 sm:px-8 lg:px-10">
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Bank ABC Voice Agent
          </h1>
          
          <div className="flex items-center space-x-4">
            {customer && (
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{customer.name}</span>
              </div>
            )}
            
            {customerId && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                verified ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
                {verified ? 'Verified' : 'Not Verified'}
              </span>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
