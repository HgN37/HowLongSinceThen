const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')
require('electron-debug')({showDevTools: true});

let win = null

function createWindow() {
    win = new BrowserWindow({width:1200, height:1000})
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    win.on('close', () => {
        win = null
    })
    win.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd   Q
    if (process.platform != 'darwin') {
      app.quit();
    }
});
