import { useContext } from 'react';
import { AuthContext, ChatApiContext } from '../contexts/index';

export const useAuth = () => useContext(AuthContext);
export const useChatApi = () => useContext(ChatApiContext);
