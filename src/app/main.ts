import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import isDev from 'electron-is-dev'

let mainWindow: BrowserWindow;

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        title: 'Caffeine',
        width: 800,
        height: 600,
        fullscreen: true,
        webPreferences: {
            // minimumFontSize: 18,
            // defaultFontSize: 24,
            // defaultMonospaceFontSize: 20,
            preload: path.join(__dirname, 'preload.js'),
            // nodeIntegration: true,
            // contextIsolation: false,
            textAreasAreResizable: false
        }
    })

    // mainWindow.loadURL(`file://${__dirname}/index.html`).then(r => {})
    mainWindow.loadFile(path.join(__dirname, 'index.html')).then(r => {});

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'bottom' });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    // app.on('activate', function () {
    //     // On macOS it's common to re-create a window in the app when the
    //     // dock icon is clicked and there are no other windows open.
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow();
    // });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    //     app.quit()
    // }
    app.quit()
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('re-render', () => {
    mainWindow.loadFile(path.join(__dirname, 'index.html')).then(r => {})
})