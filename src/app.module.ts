import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SpamService } from './spam.service';

@Module({
  imports: [HttpModule],
  providers: [SpamService],
})
export class AppModule {}
