import http from 'http';

import WebSocket from 'ws';

export const initSocket = (server: http.Server): WebSocket.Server => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('A client connected');

    ws.on('message', (message: string) => {
      const { type, room } = JSON.parse(message);

      switch (type) {
        case 'joinRoom':
          console.log(`A client joined room: ${room}`);
          break;
        case 'leaveRoom':
          console.log(`A client left room: ${room}`);
          break;
        default:
          break;
      }
    });

    ws.on('close', () => {
      console.log('A client disconnected');
    });
  });

  return wss;
};
