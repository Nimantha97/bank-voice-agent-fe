import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Mic } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
      <Link
        to="/chat"
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium text-sm ${
          isActive('/chat')
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        <span>Text Chat</span>
      </Link>
      
      <Link
        to="/voice"
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium text-sm ${
          isActive('/voice')
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        <Mic className="w-4 h-4" />
        <span>Voice AI</span>
      </Link>
    </nav>
  );
};

export default Navigation;
