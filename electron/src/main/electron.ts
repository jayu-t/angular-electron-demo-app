import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { bootstrapNestApp } from './ipc/main';
import { logger } from './logger';

bootstrapNestApp();

function createWindow() {
  logger.info('main process');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.bundle.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'angular-app/index.html'));
  win.maximize();
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
