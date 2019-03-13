const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Cree la fenetre du navigateur.
    let win = new BrowserWindow({ width: 120, height: 700 });

    // and load the index.html of the app.
    win.loadFile('src/index.html');
}

app.on('ready', createWindow);