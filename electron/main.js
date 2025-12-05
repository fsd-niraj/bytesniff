import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Keep a reference to the Go process so we can kill it on exit
let goProcess = null;
let win;
const DEV_MODE = true;

function startGoBackend() {
  goProcess = spawn('go', ['run', 'main.go'], {
    cwd: path.join(__dirname, '..', 'core'),
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  goProcess.stdout.on('data', (data) => {
    console.log('[MAIN.JS]:', data.toString());
    let msg;
    try {
      msg = JSON.parse(text);
    } catch {
      return;
    }
    // win.webContents.send('go-event', msg);
  });

  goProcess.on('exit', (code) => {
    console.log('Go backend exited with code', code);
  });
}

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    titleBarStyle: 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      contextIsolation: true,
    },
  });
  if (DEV_MODE) {
    win.loadURL('http://localhost:5173/');
  } else {
    win.loadFile(path.join(__dirname, '..', 'ui', 'dist', 'index.html'));
  }
}

function sendToGo(msg) {
  goProcess.stdin.write(JSON.stringify(msg) + '\n');
}

ipcMain.on('toggle-inteceptor', (_, state) => {
  sendToGo({
    type: 'toggle_inteceptor',
    data: state,
  });
});

app.whenReady().then(() => {
  createWindow();
  startGoBackend();
});

// macOS: reopen window on dock click
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Ensure Go backend exits with Electron
app.on('before-quit', () => {
  if (goProcess) goProcess.kill();
  console.log('killing go process');
});
