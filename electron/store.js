import store from 'electron-store';

export const settings = new store({
  name: 'settings',
  defaults: {
    proxyPort: 8080,
    theme: 'light',
    interceptEnabled: false,
  },
});
