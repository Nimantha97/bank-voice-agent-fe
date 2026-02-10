import { useState } from 'react';
import { MessageSquare, Plus, Trash2, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { createSession, setActiveSession, deleteSession } from '../store/chatHistorySlice';
import DeleteConfirmModal from './DeleteConfirmModal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const { sessions, activeSessionId } = useAppSelector((state) => state.chatHistory);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleNewChat = () => {
    dispatch(createSession('New Conversation'));
    onClose();
  };

  const handleSelectSession = (id: string) => {
    dispatch(setActiveSession(id));
    onClose();
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      dispatch(deleteSession(sessionToDelete));
      setSessionToDelete(null);
    }
  };

  return (
    <>
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Text Chats
              </h2>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleSelectSession(session.id)}
                  className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    activeSessionId === session.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{session.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="ml-2 p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Bank ABC Voice Agent
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
