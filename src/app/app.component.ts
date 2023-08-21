import { Component } from '@angular/core';
import logger from '../../electron/src/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-electron-demo-app';
  constructor() {
    console.log('ffff');

    logger.info('info');
    logger.debug('debug');
  }
}
