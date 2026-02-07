interface BalanceCardProps {
  balance: number;
  accountNumber?: string;
}

const BalanceCard = ({ balance, accountNumber }: BalanceCardProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-sm font-medium opacity-90">Account Balance</span>
        </div>
        {accountNumber && (
          <span className="text-xs opacity-75">****{accountNumber.slice(-4)}</span>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-3xl font-bold tracking-tight">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      
      <div className="text-xs opacity-75">
        Available Balance
      </div>
    </div>
  );
};

export default BalanceCard;
