const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const vm = require('vm');
const fetch = require('node-fetch');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, 'assets/icon.png'),
    menuBarVisible: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('run-code', async (event, code) => {
    try {
      const logs = [];
      const allowedModules = ['fs', 'http', 'path', 'os', 'node-fetch'];
  
      const context = {
        console: {
          log: (...args) => {
            logs.push({ type: 'log', content: args.join(' ') });
          },
          error: (...args) => {
            logs.push({ type: 'error', content: args.join(' ') });
          }
        },
        require: (moduleName) => {
          if (allowedModules.includes(moduleName)) {
            return require(moduleName);
          } else {
            throw new Error(`Module not allowed: ${moduleName}`);
          }
        },
        fetch: fetch,
        Buffer: Buffer,
        process: {
          env: process.env
        },
        setTimeout: setTimeout,
        clearTimeout: clearTimeout
      };
  
      const wrappedCode = `
        (async () => {
          ${code}
          await new Promise(resolve => setTimeout(resolve, 1000));
        })()
      `;
  
      vm.createContext(context);
      await vm.runInContext(wrappedCode, context, { timeout: 15000 }); // Aumentamos el timeout a 15 segundos
      return { success: true, logs: logs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });