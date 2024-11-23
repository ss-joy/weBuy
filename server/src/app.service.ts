import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isServerON(): string {
    return 'We Buy server is ON!!!';
  }
}
