import { contextBridge, ipcRenderer } from 'electron';
// import { logger } from './logger';

console.log('from preload');

contextBridge.exposeInMainWorld('ipc', {
  saveFile: (fileContent: string) => {
    ipcRenderer.send('save-file', fileContent);
  },
  send: (channelName: string, args: any) => ipcRenderer.send(channelName, args),
  invoke: (channelName: string, args: any) =>
    ipcRenderer.invoke(channelName, args),
  // logger: logger,
});
