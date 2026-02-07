import { memo } from 'react';
import type { Message } from '../types';
import MessageActions from './MessageActions';
import BalanceCard from './BalanceCard';
import CardsList from './CardsList';
import TransactionTable from './TransactionTable';

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

const MessageBubble = memo(({ message, onRegenerate }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const hasData = message.balance !== undefined || message.cards || message.transactions;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl ${isUser ? 'order-1' : 'order-2'} group`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-blue-600 dark:bg-blue-700 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          
          {message.flow && !isUser && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Flow: {message.flow}</span>
            </div>
          )}
        </div>

        {/* Display banking data if available */}
        {!isUser && hasData && (
          <div className="mt-3 space-y-3">
            {message.balance !== undefined && (
              <BalanceCard balance={message.balance} />
            )}
            
            {message.cards && message.cards.length > 0 && (
              <CardsList cards={message.cards} />
            )}
            
            {message.transactions && message.transactions.length > 0 && (
              <TransactionTable transactions={message.transactions} />
            )}
          </div>
        )}

        {/* Message actions */}
        {!isUser && (
          <MessageActions
            content={message.content}
            onRegenerate={onRegenerate}
            isAgent={true}
          />
        )}
        
        <div className={`mt-1 text-xs text-gray-500 dark:text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
});

export default MessageBubble;
