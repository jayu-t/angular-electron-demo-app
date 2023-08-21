import {
  app,
  BrowserWindow,
  desktopCapturer,
  ipcMain,
  dialog,
  netLog,
} from 'electron';
import * as url from 'url';
import * as path from 'path';
import * as fs from 'fs';

let win: any = null;

async function onReady() {
  netLog.startLogging(path.join(__dirname, '/../logs/netlog.log'));
  win = new BrowserWindow({
    width: 900,
    height: 6700,
    webPreferences: {
      //   preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        '/../dist/angular-electron-demo-app/index.html'
      ),
      protocol: 'file:',
      slashes: true,
    })
  );

  //   await netLog.startLogging(path.join(__dirname, "/../logs/netlog.log"));
}

app.on('ready', onReady);
app.on('quit', () => {
  netLog.stopLogging();
  app.quit();
});

ipcMain.on('capture-screenshot', () => {
  takeScreenShot();
});

ipcMain.on('ping-google', () => {
  // Refer: https://www.npmjs.com/package/ping#promise-wrapper
  // ping.promise.probe('www.google.com').then(function (res: any) {
  //   console.log(res);
  //   console.log('Currently Logging - ', netLog.currentlyLogging);
  //   win.webContents.send('ping-google-end');
  // });
});

ipcMain.on('ping-facebook', () => {
  // Refer: h?ttps://www.npmjs.com/package/ping#promise-wrapper
  // ping.promise.probe('www.facebook.com').then(function (res: any) {
  //   console.log(res);
  //   console.log('Currently Logging - ', netLog.currentlyLogging);
  //   win.webContents.send('ping-facebook-end');
  // });
});

const takeScreenShot = () => {
  let win = BrowserWindow.getFocusedWindow();
  win?.webContents
    .capturePage({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    })
    .then((img: any) => {
      dialog
        .showSaveDialog({
          title: 'Select the File Path to save',

          // Default path to assets folder
          defaultPath: path.join(__dirname, '../screenshots/image.png'),

          // defaultPath: path.join(__dirname,
          // '../assets/image.jpeg'),
          buttonLabel: 'Save',

          // Restricting the user to only Image Files.
          filters: [
            {
              name: 'Image Files',
              extensions: ['png', 'jpeg', 'jpg'],
            },
          ],
          properties: [],
        })
        .then((file: any) => {
          // Stating whether dialog operation was
          // cancelled or not.
          console.log(file.canceled);
          if (!file.canceled) {
            console.log(file.filePath.toString());

            // Creating and Writing to the image.png file
            // Can save the File as a jpeg file as well,
            // by simply using img.toJPEG(100);
            fs.writeFile(
              file.filePath.toString(),
              img.toPNG(),
              'base64',
              function (err: any) {
                if (err) throw err;
                console.log('Saved!');
              }
            );
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    })

    .catch((err: any) => {
      console.log(err);
    });
};
