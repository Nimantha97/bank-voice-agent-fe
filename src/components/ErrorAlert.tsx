interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => {
  const getErrorDetails = (msg: string) => {
    if (msg.includes('Network Error') || msg.includes('timeout')) {
      return {
        title: 'Connection Error',
        description: 'Unable to connect to the server. Please check your internet connection.',
      };
    }
    if (msg.includes('401') || msg.includes('403')) {
      return {
        title: 'Authentication Error',
        description: 'Your session has expired. Please verify your identity again.',
      };
    }
    if (msg.includes('500')) {
      return {
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
      };
    }
    return {
      title: 'Error',
      description: msg,
    };
  };

  const error = getErrorDetails(message);

  return (
    <div className="mb-4" role="alert" aria-live="assertive">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">{error.title}</h3>
            <p className="text-sm text-red-700 dark:text-red-300">{error.description}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 text-sm font-medium text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 underline"
                aria-label="Retry action"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
