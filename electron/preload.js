import { contextBridge, ipcRenderer } from 'electron';
import { settings } from './store';

contextBridge.exposeInMainWorld('backend', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, (_, payload) => callback(payload));
  },

  toggleInteceptor: (state) => ipcRenderer.send('toggle-inteceptor', state),

  onMessage: (cb) =>
    ipcRenderer.on('go-event', (_, data) => {
      cb(data);
      console.log('DATA receiving in onMessage');
    }),
});

contextBridge.executeInMainWorld('settings', {
  get: (key) => settings.get(key),
  set: (key, value) => settings.set(key, value),
});
