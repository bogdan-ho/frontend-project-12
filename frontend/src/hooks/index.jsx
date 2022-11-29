import { useContext } from 'react';
import { AuthContext, SocketContext } from '../contexts/index';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
