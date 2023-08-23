import { contextBridge, ipcRenderer } from 'electron';

console.log('from preload');

contextBridge.exposeInMainWorld('ipc', {
  send: (channelName: string, args: any) => ipcRenderer.send(channelName, args),
  invoke: (channelName: string, args: any) =>
    ipcRenderer.invoke(channelName, args),
});
