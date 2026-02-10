import { useState } from 'react';
import { Plus, Trash2, X, Mic } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createVoiceSession, setActiveVoiceSession, deleteVoiceSession } from '../store/voiceHistorySlice';
import DeleteConfirmModal from './DeleteConfirmModal';

interface VoiceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSidebar = ({ isOpen, onClose }: VoiceSidebarProps) => {
  const dispatch = useAppDispatch();
  const { sessions, activeSessionId } = useAppSelector((state) => state.voiceHistory);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleNewChat = () => {
    dispatch(createVoiceSession('New Voice Chat'));
  };

  const handleSelectSession = (sessionId: string) => {
    dispatch(setActiveVoiceSession(sessionId));
    onClose();
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionToDelete(sessionId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      dispatch(deleteVoiceSession(sessionToDelete));
      setSessionToDelete(null);
    }
  };

  return (
    <>
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Voice Conversation"
        message="Are you sure you want to delete this voice conversation? This action cannot be undone."
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Chats
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
            New Voice Chat
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Mic className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No voice conversations yet</p>
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleSelectSession(session.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors group ${
                  session.id === activeSessionId
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {session.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Bank ABC Voice Agent
          </p>
        </div>
      </aside>
    </>
  );
};

export default VoiceSidebar;
