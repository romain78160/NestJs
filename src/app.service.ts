import { Injectable } from '@nestjs/common';

@Injectable()//declaration de la classe en tant que service
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
