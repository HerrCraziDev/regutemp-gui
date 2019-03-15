const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Cree la fenetre du navigateur.
    let win = new BrowserWindow({
        width: 120,
        height: 700,
        x: 0,
        y:0,
        alwaysOnTop: false,
        frame: true,
        backgroundColor: '#313028',
        show: false
    });

    // and load the index.html of the app.
    win.loadFile('src/index.html');
    // win.loadURL("http://127.0.0.1:8081/src/index.html")

    win.once('ready-to-show', () => {
        win.show();
    })
}

app.on('ready', createWindow);