//hooks/usewebsocket.js
import { useEffect, useRef } from 'react';
import { BACKEND_URL } from '../config/env';

export const useWebSocket = (onNewMember, onMemberDeleted, weddingCode) => {
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  const connect = () => {
    try {
      // ✅ CHECK IF WEDDING CODE EXISTS
      if (!weddingCode) {
        console.log('⏸️ No wedding code provided, skipping WebSocket connection');
        return;
      }

      // ✅ INCLUDE WEDDING CODE IN WEBSOCKET URL
      const wsUrl = `${BACKEND_URL.replace(/^http/, 'ws')}/ws?weddingCode=${weddingCode}`;
      console.log(`🔗 Connecting WebSocket for wedding: ${weddingCode}`);
      
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log(`✅ WebSocket connected for wedding: ${weddingCode}`);
        clearTimeout(reconnectTimeout.current);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          // ✅ VERIFY THE MESSAGE IS FOR OUR WEDDING
          if (message.weddingCode && message.weddingCode !== weddingCode) {
            console.log(`🔒 Received message for different wedding (${message.weddingCode}), ignoring for our wedding (${weddingCode})`);
            return;
          }
          
          switch (message.type) {
            case 'NEW_MEMBER':
              console.log(`📨 Received new member for wedding ${weddingCode}:`, message.data);
              onNewMember(message.data);
              break;
              
            case 'MEMBER_DELETED':
              console.log(`📨 Received deleted member for wedding ${weddingCode}:`, message.data);
              onMemberDeleted(message.data.id);
              break;
              
            default:
              console.log('Unknown WebSocket message type:', message.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = (event) => {
        console.log(`❌ WebSocket disconnected for wedding ${weddingCode}, code: ${event.code}, reason: ${event.reason}`);
        
        // ✅ ONLY RECONNECT IF WE STILL HAVE A WEDDING CODE
        if (weddingCode) {
          console.log(`🔄 Attempting reconnect for wedding ${weddingCode} in 3 seconds...`);
          reconnectTimeout.current = setTimeout(connect, 3000);
        }
      };

      ws.current.onerror = (error) => {
        console.error(`❌ WebSocket error for wedding ${weddingCode}:`, error);
      };

    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  };

  const disconnect = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close(1000, 'Component unmounting');
    }
    clearTimeout(reconnectTimeout.current);
  };

  useEffect(() => {
    // ✅ CONNECT ONLY IF WE HAVE A WEDDING CODE
    if (weddingCode) {
      connect();
    } else {
      console.log('⏸️ No wedding code, WebSocket not connected');
    }

    return () => {
      disconnect();
    };
  }, [weddingCode]); // ✅ RECONNECT WHEN WEDDING CODE CHANGES

  // ✅ RETURN CONNECTION STATUS
  const isConnected = ws.current?.readyState === WebSocket.OPEN;
  
  return {
    ws,
    isConnected,
    weddingCode
  };
};