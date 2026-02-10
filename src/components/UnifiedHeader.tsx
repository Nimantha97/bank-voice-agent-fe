import { Menu, ShieldCheck, ShieldAlert, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setVerified, setCustomerId } from '../store/sessionSlice';
import { setCustomer } from '../store/authSlice';
import ThemeToggle from './ThemeToggle';
import Navigation from './Navigation';

interface UnifiedHeaderProps {
  onMenuClick: () => void;
  showNavigation?: boolean;
}

const UnifiedHeader = ({ onMenuClick, showNavigation = true }: UnifiedHeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { verified } = useAppSelector((state) => state.session);

  const handleLogout = () => {
    dispatch(setVerified(false));
    dispatch(setCustomerId(null));
    dispatch(setCustomer(null));
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Bank ABC Voice Agent
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              AI-Powered Banking Assistant
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Verification Status */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            verified
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600'
          }`}>
            {verified ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Verified</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span className="hidden sm:inline">Not Verified</span>
              </>
            )}
          </div>
          
          {/* Logout Button */}
          {verified && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
          
          <ThemeToggle />
        </div>
      </div>
      
      {showNavigation && (
        <div className="overflow-x-auto">
          <Navigation />
        </div>
      )}
    </header>
  );
};

export default UnifiedHeader;
