import { WebSocket, WebSocketServer } from 'ws';

export const initSocket = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WebSocket) => {
    console.log('A client connected');

    ws.on('message', (message: string) => {
      console.log(`A client joined room: ${message}`);
    });

    ws.on('close', () => {
      console.log('A client disconnected');
    });
  });

  return wss;
};
