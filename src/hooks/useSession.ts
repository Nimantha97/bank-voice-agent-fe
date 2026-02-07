import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { restoreSession } from '../store/sessionSlice';
import { storage } from '../services/storage';

export const useSession = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session);

  // Restore session on mount
  useEffect(() => {
    const savedSession = storage.loadSession();
    if (savedSession) {
      dispatch(restoreSession(savedSession));
    }
  }, [dispatch]);

  // Save session on change
  useEffect(() => {
    storage.saveSession(session);
  }, [session]);

  return session;
};
