import { useEffect, useRef } from 'react';
import { BACKEND_URL } from '../config/env';

export const useWebSocket = (onNewMember, onMemberDeleted) => {
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  const connect = () => {
    try {
      // Convert http:// to ws:// or https:// to wss://
      const wsUrl = BACKEND_URL.replace(/^http/, 'ws') + '/ws';
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('✅ WebSocket connected');
        clearTimeout(reconnectTimeout.current);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          switch (message.type) {
            case 'NEW_MEMBER':
              console.log('📨 Received new member:', message.data);
              onNewMember(message.data);
              break;
              
            case 'MEMBER_DELETED':
              console.log('📨 Received deleted member:', message.data);
              onMemberDeleted(message.data.id);
              break;
              
            default:
              console.log('Unknown message type:', message.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('❌ WebSocket disconnected, attempting reconnect...');
        // Attempt reconnect after 3 seconds
        reconnectTimeout.current = setTimeout(connect, 3000);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      clearTimeout(reconnectTimeout.current);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return ws;
};