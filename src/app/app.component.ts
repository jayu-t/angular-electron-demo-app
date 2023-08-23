import { Component } from '@angular/core';

const ipcSend = (window as any).ipc.send;
const ipcInvoke = (window as any).ipc.invoke;
const saveFileIpc = (window as any).ipc.saveFile;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileContent = '';

  send1() {
    console.log('send1 click');
    ipcSend('hello1', 'Hello from send 1');
  }

  send2() {
    console.log('send2 click');
    ipcSend('hello2', { msg: 'Hello from send 2' });
  }

  invoke1() {
    console.log('invoke1 click');
    ipcInvoke('hello3', 'Hello from invoke 1');
  }

  invoke2() {
    console.log('invoke2 click');
    ipcInvoke('hello4', { msg: 'Hello from invoke 2' });
  }

  saveFile() {
    console.log('save file click');
    console.log(this.fileContent);
    saveFileIpc(this.fileContent);
  }
}
