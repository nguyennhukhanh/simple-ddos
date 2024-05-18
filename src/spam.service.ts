import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cron from 'node-cron';

const logger = new Logger('SPAM');

@Injectable()
export class SpamService implements OnModuleInit {
  constructor(private httpService: HttpService) {}

  onModuleInit() {
    // Send request every 10 seconds
    cron.schedule('*/10 * * * * *', () => {
      logger.log('Starting spam service: ' + new Date());

      for (let i = 0; i < 200; i++) {
        this.sendRequest();
      }
    });
  }

  async sendRequest() {
    const res = this.httpService.get(
      'https://music-app-anti-ddos.onrender.com',
    );

    try {
      const response = await lastValueFrom(res);

      logger.log('Request success with status code ' + response.status);
    } catch (error) {
      logger.error(error.message);
    }
  }
}
