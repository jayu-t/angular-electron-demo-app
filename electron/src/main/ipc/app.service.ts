import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World Demo!';
  }

  saveFile(fileContent: string): void {
    let filePath = path.join(__dirname, '../data.txt');
    writeFileSync(filePath, fileContent);
  }
}
