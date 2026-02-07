const BalanceSkeleton = () => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 animate-pulse">
    <div className="h-4 bg-blue-400 rounded w-24 mb-4"></div>
    <div className="h-8 bg-blue-400 rounded w-32 mb-2"></div>
    <div className="h-3 bg-blue-400 rounded w-28"></div>
  </div>
);

const CardsSkeleton = () => (
  <div className="space-y-3">
    {[1, 2].map((i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
      </div>
    ))}
  </div>
);

const TransactionsSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div></th>
            <th className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div></th>
            <th className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div></th>
            <th className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i} className="border-t border-gray-200 dark:border-gray-700 animate-pulse">
              <td className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export { BalanceSkeleton, CardsSkeleton, TransactionsSkeleton };
